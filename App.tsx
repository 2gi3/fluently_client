import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChatsList from './src/screens/chat/ChatsList';
import chatsData from './mock_data/chatsData.json'
import { Provider } from "react-redux";
import { styles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

