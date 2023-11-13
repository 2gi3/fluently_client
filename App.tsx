import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChatsList from './src/screens/chat/ChatsList';
import chatsData from './mock_data/chatsData.json'
import { Provider, useDispatch } from "react-redux";
import { styles } from './src/styles';
import Navigator from './src/navigation';
import { store } from './src/redux/store';
import { useEffect, useRef, useState } from 'react';
import { ConnectionManagerAuto } from './src/components/ConnectionManagerAuto';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification } from './src/functions/chat';
import { Text, View, Button, Platform } from 'react-native';



// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState<string>('');
  // const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  // const notificationListener = useRef<Notifications.Subscription | null>(null);
  // const responseListener = useRef<Notifications.Subscription | null>(null);



  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <Navigator />
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {notification?.request.content.title} </Text>
            <Text>Body: {notification?.request.content.body}</Text>
            <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : ''}</Text>
          </View>
          <Button
            title="Press to Send Notification"
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          />
        </View> */}
        <ConnectionManagerAuto />
      </SafeAreaView>
    </Provider>
  );
}

