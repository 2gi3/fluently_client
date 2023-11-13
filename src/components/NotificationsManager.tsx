import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//     }),
// });

// async function sendPushNotification(expoPushToken: string) {
//     const message = {
//         to: expoPushToken,
//         sound: 'default',
//         title: 'Original Title',
//         body: 'And here is the body!',
//         data: { someData: 'goes here' },
//     };

//     await fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Accept-encoding': 'gzip, deflate',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(message),
//     });
// }

// async function registerForPushNotificationsAsync(): Promise<string | null> {
//     let token: string | null = null;

//     if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }

//     if (Device.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//             alert('Failed to get push token for push notification!');
//         } else {
//             const expoConfig = Constants.expoConfig;
//             if (expoConfig) {
//                 const easProjectId = expoConfig.extra?.eas.projectId;
//                 if (easProjectId) {
//                     const expoToken = await Notifications.getExpoPushTokenAsync({
//                         projectId: easProjectId,
//                     });
//                     token = expoToken.data;
//                     console.log({ token });
//                 }
//             }
//         }
//     } else {
//         alert('Must use a physical device for Push Notifications');
//     }

//     return token;
// }

// export default function App() {
// const [expoPushToken, setExpoPushToken] = useState<string>('');
// const [notification, setNotification] = useState<Notifications.Notification | null>(null);
// const notificationListener = useRef<Notifications.Subscription | null>(null);
// const responseListener = useRef<Notifications.Subscription | null>(null);

// useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token || ''));

//     notificationListener.current = Notifications.addNotificationReceivedListener((receivedNotification) => {
//         setNotification(receivedNotification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//     });

//     return () => {
//         if (notificationListener.current) {
//             notificationListener.current = null;
//         }
//         if (responseListener.current) {
//             responseListener.current = null;
//         }
//     };
// }, []);

// return (
// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//     <Text>Your expo push token: {expoPushToken}</Text>
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification?.request.content.title} </Text>
//         <Text>Body: {notification?.request.content.body}</Text>
//         <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : ''}</Text>
//     </View>
//     <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//             await sendPushNotification(expoPushToken);
//         }}
//     />
// </View>
//     );
// }
