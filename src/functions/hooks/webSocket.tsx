import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearSocketUrl, selectSocketUrl, setConnected } from '../../redux/slices/statusSlice';
import { clearSocket, setConnectedUsers, setSocket } from '../../redux/slices/webSocketSlice';
import { addMessage, addToPendingChats } from '../../redux/slices/chatSlice';
import { notifyUser } from '../chat';



export function useWebSocketConnection() {
    const dispatch = useDispatch();
    const socketUrl = useSelector(selectSocketUrl);
    const user = useSelector((state: RootState) => state.user.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const activeChatRef = useRef<string | number | null>(null);

    useEffect(() => {
        if (activeChat) {
            activeChatRef.current = activeChat;
        }
    }, [activeChat]);

    useEffect(() => {
        if (socketUrl && user) {
            const newSocket = new WebSocket(socketUrl);

            newSocket.onopen = () => {
                dispatch(setConnected(true));
                dispatch(setSocket(newSocket));
                newSocket.send(JSON.stringify({ connectedUserId: user.id }));
                console.log('Connected to the server via WebSocket');
            };

            newSocket.onmessage = (event) => {
                const message = event.data;

                if (message instanceof Blob) {
                    // Handle Blob messages
                    const reader = new FileReader();
                    reader.onload = function () {
                        const blobData: any = reader.result;
                        const textData = new TextDecoder().decode(blobData);

                        try {
                            const parsedObject = JSON.parse(textData);

                            if (parsedObject.type === 'chatMessage') {
                                if (activeChatRef.current === parsedObject.content.chatId) {
                                    dispatch(addMessage(parsedObject.content));
                                } else if (activeChatRef.current !== parsedObject.content.chatId) {
                                    dispatch(addToPendingChats(parsedObject.content.chatId));
                                    notifyUser(`New message: ${parsedObject.content.text}`);
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
                        dispatch(setConnectedUsers(parsedObject.userSockets));
                        console.log(parsedObject.userSockets);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            };

            newSocket.onclose = (event) => {
                dispatch(setConnected(false));
                dispatch(clearSocket());
                if (event.wasClean) {
                    console.log('Closed cleanly, code=' + event.code + ', reason=' + event.reason);
                } else {
                    console.error('Connection died');
                }
            };

            return () => {
                newSocket.close();
                dispatch(clearSocketUrl());
                dispatch(clearSocket());
            };
        }
    }, [socketUrl, dispatch]);
}

// You can use this hook in your components like this:
// import { useWebSocketConnection } from './useWebSocketConnection';

// function MyComponent() {
//   useWebSocketConnection();

//   // Rest of your component code

//   return null;
// }
