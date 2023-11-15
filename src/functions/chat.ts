import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ChatroomT, MessageT } from "../types/chat";


export const createNewChatroom = async (endpoint: string, user1Id: number, user2Id: number) => {

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user1Id,
                user2Id
            }),
        });
        const chartoom = await response.json()

        if (response.ok) {
            console.log('Chatroom created successfully');
            return chartoom
        } else {
            console.error('Failed to create chatroom');
        }
    } catch (error) {
        console.error('An error occurred while creating the chatroom:', error);
    }

}

export const createMessage = async ({ chatId, userId, text, status }: MessageT) => {
    const baseUlr = process.env.SERVER_URL

    try {
        const response = await fetch(`${baseUlr}/api/chat/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId,
                userId,
                text,
                status
            }),
        });
        const message = await response.json();
        if (response.ok) {
            console.log('Message created successfully')
            return message
        } else {
            console.log('Failed to create chatroom');
        }
    } catch (error: any) {
        console.log(`An error occurred while creating the chatroom: ${error.message}`);
    } finally {

    }



};

export const updateMessageStatus = async (messageId: string | number, newStatus: string = 'read') => {
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/chat/message/${messageId}`
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            console.log('Message status updated successfully');
            return response
        } else {
            console.error('Failed to update message status');
            return response
        }
    } catch (error) {
        console.error('Error updating message status:', error);
    }

}

export const notifyUser = (body: string) => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('Fluently', {
                body,
                icon: '../assets/images/logos/logo2.png',
                // tag: 'New message'
            })
        }
    })
}


// export async function sendPushNotification(expoPushToken: string) {
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

// export async function registerForPushNotificationsAsync(): Promise<string | null> {
//     let token: string | null | any = null;
//     console.log({ Constants })
//     if (Constants) {
//         token = await Notifications.getExpoPushTokenAsync({
//             projectId: Constants.expoConfig!.extra!.eas.projectId,
//         });
//     }

//    if (Platform.OS === 'android') {
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