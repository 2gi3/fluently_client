import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChatsList from './src/screens/chat/ChatsList';
import chatsData from './mock_data/chatsData.json'
import { Provider, useDispatch } from "react-redux";
import { styles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import { useEffect, useState } from 'react';
import { ConnectionManagerAuto } from './src/components/ConnectionManagerAuto';

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <Navigator />
        <ConnectionManagerAuto />
      </SafeAreaView>
    </Provider>
  );
}

