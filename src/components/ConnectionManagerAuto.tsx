import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSocketUrl, clearSocketUrl, setConnected } from '../redux/slices/statusSlice';
import { clearSocket, setConnectedUsers, setSocket } from '../redux/slices/webSocketSlice';
import { RootState } from '../redux/store';
import { addMessage, addToPendingChats } from '../redux/slices/chatSlice';

export function ConnectionManagerAuto() {
  const dispatch = useDispatch();
  const socketUrl = useSelector(selectSocketUrl);
  const user = useSelector((state: RootState) => state.user.user);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat)
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
        // console.log(message)
        if (message instanceof Blob) {
          // Handle Blob messages (similar to the previous example)
          const reader = new FileReader();

          reader.onload = function () {
            const blobData: any = reader.result;
            // console.log('Received a Blob: ', blobData);

            // You can process the binary data here, e.g., convert it to a string
            const textData = new TextDecoder().decode(blobData);
            // console.log('Decoded Blob as text: ', textData);

            // If the message is expected to be JSON, you can parse it
            try {
              const parsedObject = JSON.parse(textData);
              console.log({ activeChat2: activeChat })

              if (parsedObject.type === 'chatMessage') {
                if (activeChatRef.current === parsedObject.content.chatId) {

                  dispatch(addMessage(parsedObject.content))

                } else if (activeChatRef.current !== parsedObject.content.chatId) {
                  dispatch(addToPendingChats(parsedObject.content.chatId))
                  console.log(parsedObject.content)
                  Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                      new Notification('Fluently', {
                        body: `New message: ${parsedObject.content.text}`,
                        icon: '../assets/images/logos/logo2.png',
                        // tag: 'New message'
                      })
                    }
                  })
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
            dispatch(setConnectedUsers(parsedObject.userSockets))
            console.log(parsedObject.userSockets);
            // Now 'parsedObject' should contain the userSockets map
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
        dispatch(clearSocket())
      };
    }
  }, [socketUrl, dispatch]);

  return null;
}
