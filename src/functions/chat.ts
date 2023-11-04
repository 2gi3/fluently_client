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
    //@ts-ignore
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
    //@ts-ignore
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