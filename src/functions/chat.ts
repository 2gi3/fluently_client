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
            credentials: 'include',
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
            credentials: 'include',
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
    } catch (error) {
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
            credentials: 'include',
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

