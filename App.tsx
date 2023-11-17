import { SafeAreaView } from 'react-native';
import { Provider } from "react-redux";
import { styles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import React from 'react';
import { ConnectionManagerAuto } from './src/components/ConnectionManagerAuto';
import { ThemeProvider, createTheme, Button } from '@rneui/themed';
import colors from './src/styles/variables/colors';


export default function App() {

  const theme = createTheme({
    // lightColors: {
    //   primary: colors.tertiary,
    //   warning: colors.danger
    // },
    // darkColors: {
    //   primary: '#000',
    // },
    // mode: 'light',
    components: {
      ListItem: {
        containerStyle: {
          backgroundColor: colors.secondary
        }
      },
      // Button: {
      //   raised: true,
      //   buttonStyle: {
      //     backgroundColor: colors.tertiary
      //   }
      // },
    },
  });



  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.wrapper}>
          <Navigator />
          <ConnectionManagerAuto />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

