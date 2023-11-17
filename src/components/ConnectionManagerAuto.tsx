import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectSocketUrl, clearSocketUrl, setConnected } from '../redux/slices/statusSlice';
import { clearOutgoingMessage, setConnectedUsers } from '../redux/slices/webSocketSlice';
import { addMessage, addToPendingChats } from '../redux/slices/chatSlice';
import { notifyUser } from '../functions/chat';

export function ConnectionManagerAuto() {
  const dispatch = useDispatch();
  const socketUrl = useSelector(selectSocketUrl);
  const user = useSelector((state: RootState) => state.user);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat)
  const activeChatRef = useRef<string | number | null>(null);
  const outgoingMessage = useSelector((state: RootState) => state.webSocket.outgoingMessage)

  const [webSocket, setWebSocket] = useState<null | WebSocket>()

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

    if (socketUrl && user) {
      const newSocket = new WebSocket(socketUrl);
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
            console.log({ parsedObject })

            dispatch(setConnectedUsers(parsedObject.userSockets))
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      };

      newSocket.onclose = (event) => {
        dispatch(setConnected(false));
        // dispatch(clearSocket());
        setWebSocket(null)
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
        setWebSocket(null)
      };
    }
  }, [socketUrl, dispatch]);

  return null;
}
