import { SafeAreaView } from 'react-native';
import { Provider } from "react-redux";
import { globalStyles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import React, { useEffect } from 'react';
import { ConnectionManagerAuto } from './src/components/ConnectionManagerAuto';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useTokenRefresher } from './src/functions/hooks/auth';


export default function App() {
  useTokenRefresher()



  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={globalStyles.wrapper}>
          <Navigator />
          <ConnectionManagerAuto />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

