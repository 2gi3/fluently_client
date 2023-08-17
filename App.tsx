import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChatsList from './src/screens/chat/ChatsList';
import chatsData from './mock_data/chatsData.json'
import ChatScreen from './src/screens/chat/ChatScreen';
import { styles } from './src/styles';
import Navigator from './src/navigation';

export default function App() {
  return (

    <SafeAreaView style={styles.wrapper}>
      {/* <ChatsList chats={chatsData} /> */}
      <Navigator />
      {/* <ChatScreen /> */}
    </SafeAreaView>
  );
}

