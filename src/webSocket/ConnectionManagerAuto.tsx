import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectSocketUrl, clearSocketUrl, setConnected, setSocketUrl } from '../redux/slices/statusSlice';
import { clearOutgoingMessage, setConnectedUsers, setReadyState } from '../redux/slices/webSocketSlice';
import { addMessage, addToPendingChats, setPendingChats } from '../redux/slices/chatSlice';
import { notifyUser } from '../functions/chat';
import moment from 'moment';

export function ConnectionManagerAuto() {
  const dispatch = useDispatch();
  const socketUrl = useSelector(selectSocketUrl);
  const user = useSelector((state: RootState) => state.user);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat)
  const activeChatRef = useRef<string | number | null>(null);
  const outgoingMessage = useSelector((state: RootState) => state.webSocket.outgoingMessage)
  const socketUrlVar = process.env.WEB_SOCKET_URL
  const [webSocket, setWebSocket] = useState<null | WebSocket>()

  const [lastCheckTimestamp, setLastCheckTimestamp] = useState<number | null>(null);
  const [loggingTimeoutId, setLoggingTimeoutId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // Check the heartBeat from the server every 22 seconds
    if (loggingTimeoutId) {
      clearTimeout(loggingTimeoutId);
    }

    const logMessage = () => {
      if (!lastCheckTimestamp) {
        console.log('Timestamp', lastCheckTimestamp);
        // warn user and reload the page
        dispatch(setSocketUrl(null));

        setTimeout(() => {
          dispatch(setSocketUrl(socketUrlVar!));
        }, 2000);

      } else if (Date.now() - lastCheckTimestamp > 20000) {
        console.log({
          message: 'timestamp older than 20 seconds',
          milliseconds: Date.now() - lastCheckTimestamp
        });
        dispatch(setSocketUrl(null));

        setTimeout(() => {
          dispatch(setSocketUrl(socketUrlVar!));
        }, 2000);
      } else {
        console.log({
          message: 'Server heartBeat received less than 20 seconds ago',
          milliseconds: Date.now() - lastCheckTimestamp
        });
      }

      // Schedule the next logging
      const newLoggingTimeoutId = setTimeout(logMessage, 22000);
      setLoggingTimeoutId(newLoggingTimeoutId);
    };

    // Start logging
    const initialLoggingTimeoutId = setTimeout(logMessage, 22000);
    setLoggingTimeoutId(initialLoggingTimeoutId);

    return () => {
      if (loggingTimeoutId) {
        clearTimeout(loggingTimeoutId);
      }
    };
  }, [lastCheckTimestamp]);


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
    dispatch(setSocketUrl(socketUrlVar!));
    let newSocket
    if (socketUrl && user.id) {
      newSocket = new WebSocket(socketUrl);
      newSocket.onopen = () => {
        setLastCheckTimestamp(Date.now());
        dispatch(setConnected(true));
        dispatch(setReadyState(newSocket.readyState));
        setWebSocket(newSocket)
        newSocket.send(JSON.stringify({ connectedUserId: user.id }));
        console.log('Connected to the server via WebSocket');
      };

      newSocket.onmessage = (event) => {
        dispatch(setReadyState(newSocket.readyState));
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
              setLastCheckTimestamp(Date.now)
              dispatch(setReadyState(newSocket.readyState));
              console.log({
                check: moment(parsedObject.time).format('hh:mm:ss'),
                connectedUsers: parsedObject.connectedUsers.toString(),
                readyState: newSocket.readyState
              })
              if (parsedObject.connectedUsers.length < 2) {
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
        dispatch(setReadyState(newSocket.readyState));
        if (event.wasClean) {
          console.log('Closed cleanly, code=' + event.code + ', reason=' + event.reason);
        } else {
          // console.error('Connection died');
        }
      };

      return () => {
        newSocket.close();
        dispatch(clearSocketUrl());
        dispatch(clearOutgoingMessage())
        dispatch(setReadyState(newSocket.readyState));
        setTimeout(() => {
          dispatch(setSocketUrl(socketUrlVar!));
        }, 1000);
        setWebSocket(null)
      };
    }
  }, [socketUrl, dispatch, user]);

  return null;
}
