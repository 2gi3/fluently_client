import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChatsList from './src/screens/chat/ChatsList';
import chatsData from './mock_data/chatsData.json'
import { Provider, useDispatch } from "react-redux";
import { styles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import { useEffect, useState } from 'react';
import { connect, disconnect } from './src/redux/slices/statusSlice';

export default function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    //@ts-ignore
    const newSocket = new WebSocket(process.env.SERVER_URL);

    newSocket.onopen = () => {
      console.log('Connected to the server via WebSocket');
      dispatch(connect());

    };

    newSocket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message from the server:', message);
    };

    newSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Closed cleanly, code=' + event.code + ', reason=' + event.reason);
        dispatch(disconnect());

      } else {
        console.error('Connection died');
      }
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

