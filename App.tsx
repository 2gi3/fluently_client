import { SafeAreaView } from 'react-native';
import { Provider } from "react-redux";
import { globalStyles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import React from 'react';
import { ConnectionManagerAuto } from './src/components/ConnectionManagerAuto';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/theme';


export default function App() {





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

