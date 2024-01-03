import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectSocketUrl, clearSocketUrl, setConnected, setSocketUrl } from '../redux/slices/statusSlice';
import { clearOutgoingMessage, setConnectedUsers } from '../redux/slices/webSocketSlice';
import { addMessage, addToPendingChats, setPendingChats } from '../redux/slices/chatSlice';
import { notifyUser } from '../functions/chat';
import moment from 'moment';
import { useGetChats } from '../functions/hooks/chat';
import { ChatMessageT } from '../types/chat';

export function ConnectionManagerAuto() {
  const { chatrooms } = useGetChats()
  const dispatch = useDispatch();
  const socketUrl = useSelector(selectSocketUrl);
  const user = useSelector((state: RootState) => state.user);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat)
  const activeChatRef = useRef<string | number | null>(null);
  const outgoingMessage = useSelector((state: RootState) => state.webSocket.outgoingMessage)
  const socketUrlVar = process.env.WEB_SOCKET_URL
  const [webSocket, setWebSocket] = useState<null | WebSocket>()

  const handlePendingChats = () => {
    const lastMessages = chatrooms?.lastMessages
    if (lastMessages && lastMessages?.length > 0) {
      const hasUnread = lastMessages.some(message => message.status !== 'read');

      if (hasUnread) {
        const unreadChatIds = lastMessages
          .filter(message => message.status !== 'read' && message.userId !== user.id)
          .map(message => message.chatId);
        console.log({ unreadChatIds })
        dispatch(setPendingChats(unreadChatIds));

        // unreadChatIds.forEach(chatId => {
        //   dispatch(setPendingChats(unreadChatIds));
        //   // notifyUser(`New message: ${}`)

        // });
      }
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      handlePendingChats()

      if (socketUrl) {
        console.log('WebSocket is already connected.');
        return;
      }

      // const newSocketUrl = replaceHttpWithWs(serverUrl);
      dispatch(setSocketUrl(socketUrlVar!));

    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  useEffect(() => {
    if (activeChat) {
      activeChatRef.current = activeChat;
    }
  }, [activeChat]);
  useEffect(() => {
    if (outgoingMessage && webSocket) {
      webSocket.send(outgoingMessage)
      dispatch(clearOutgoingMessage())
    }

  }, [outgoingMessage])

  useEffect(() => {
    handlePendingChats()
  }, [user, chatrooms])

  useEffect(() => {
    dispatch(setSocketUrl(socketUrlVar!));

    let newSocket
    if (socketUrl && user.id) {
      newSocket = new WebSocket(socketUrl);
      newSocket.onopen = () => {
        dispatch(setConnected(true));
        // dispatch(setSocket(newSocket));
        setWebSocket(newSocket)
        newSocket.send(JSON.stringify({ connectedUserId: user.id }));
        console.log('Connected to the server via WebSocket');
      };

      newSocket.onmessage = (event) => {
        const message = event.data;
        if (message instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function () {
            const blobData: any = reader.result;
            const textData = new TextDecoder().decode(blobData);

            try {
              const parsedObject = JSON.parse(textData);

              if (parsedObject.type === 'chatMessage') {
                if (activeChatRef.current === parsedObject.content.chatId) {

                  dispatch(addMessage(parsedObject.content))

                } else if (activeChatRef.current !== parsedObject.content.chatId) {
                  dispatch(addToPendingChats(parsedObject.content.chatId))
                  notifyUser(`New message: ${parsedObject.content.text}`)
                } else {
                  console.log({ 'Parsed JSON object: ': parsedObject });

                }
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          };

          reader.readAsArrayBuffer(message);
        } else {
          // Handle other types of messages
          try {
            const parsedObject = JSON.parse(message);
            if (parsedObject.type === 'Check') {
              console.log({
                check: moment(parsedObject.time).format('hh:mm:ss'),
                connectedUsers: parsedObject.connectedUsers.toString(),
                readyState: newSocket.readyState
              })
              if (parsedObject.connectedUsers.length < 2) {
                console.log(parsedObject.connectedUsers.length)
                // newSocket.close();
                dispatch(setSocketUrl(null));

                setTimeout(() => {
                  dispatch(setSocketUrl(socketUrlVar!));
                  console.log({ readyState: newSocket.readyState })
                }, 2000);
              }
            } else {
              console.log({ parsedObject })
            }
            dispatch(setConnectedUsers(parsedObject.userSockets))
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      };

      newSocket.onclose = (event) => {
        dispatch(setConnected(false));
        // dispatch(clearSocketUrl());
        if (event.wasClean) {
          console.log('Closed cleanly, code=' + event.code + ', reason=' + event.reason);
        } else {
          console.error('Connection died');
        }
      };

      return () => {
        newSocket.close();
        dispatch(clearSocketUrl());
        dispatch(clearOutgoingMessage())
        // dispatch(clearSocket())
        setTimeout(() => {
          dispatch(setSocketUrl(socketUrlVar!));
        }, 1000);
        setWebSocket(null)
      };
    }
  }, [socketUrl, dispatch, user]);

  return null;
}
