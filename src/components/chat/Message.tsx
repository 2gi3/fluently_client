import React from 'react'
import { Text, View, } from "react-native"
import { Badge } from '@rneui/themed';
// import { ChatMessageT, MessageT, UserT } from "../../types"
import { chatStyles } from "../../styles/chat"
import moment from "moment";
import { ChatMessageT, MessageT } from "../../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { updateMessageStatus } from "../../functions/chat";
import { Avatar } from "@rneui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/variables/colors';


const Message = ({ message, messageRead, isLastMessage }: { message: MessageT, messageRead: boolean, isLastMessage: boolean }) => {
    const user = useSelector((state: RootState) => state.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const { secondary, primary, confirmation, secondaryFont } = colors


    const isMyMessage = () => {
        if (user.id) {
            const result = message.userId.toString() === user.id.toString();
            return result;
        } else {
            return false
        }
    }

    useEffect(() => {
        if (!isMyMessage() && message.status === 'sent' && messageRead === true) {
            updateMessageStatus(message.id!)
        }

    }, [])

    return (
        <View
            key={`${message.id}_${message.text}`}
            style={[chatStyles.message,
            {
                backgroundColor: isMyMessage() ? primary : secondary,
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
            }]}
        >

            <Text style={{ marginBottom: 8 }}>{message.text}</Text>

            <Text style={{
                fontSize: 12,
                color: '#8e8e8f',
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
            }}>{moment(message.created_at).fromNow()}</Text>

            {
                isMyMessage() && isLastMessage ?
                    <MaterialCommunityIcons
                        name={message.status === 'read' ? "check-circle-outline" : "dots-horizontal"}
                        size={14} color={message.status === 'read' ? confirmation : secondaryFont}
                        style={{ position: 'absolute', bottom: -3, right: -14 }} />
                    : null
            }

        </View>
    )
}
export default Message