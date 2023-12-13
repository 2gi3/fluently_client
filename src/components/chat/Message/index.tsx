import React from 'react'
import { Text, View, } from "react-native"
import { chatStyles } from "../../../styles/chat"
import moment from "moment";
import { MessageT } from "../../../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { updateMessageStatus } from "../../../functions/chat";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../styles/variables/colors';
import { styles } from './styles';


const Message = ({ message, messageRead, isLastMessage }: { message: MessageT, messageRead: boolean, isLastMessage: boolean }) => {
    const user = useSelector((state: RootState) => state.user);
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

            <Text style={styles.messageText}>{message.text}</Text>

            <Text style={[styles.timestamp, isMyMessage() ? styles.myMessage : styles.otherMessage]}>
                {moment(message.created_at).fromNow()}
            </Text>

            {isMyMessage() && isLastMessage ? (
                <MaterialCommunityIcons
                    name={message.status === 'read' ? 'check-circle-outline' : 'dots-horizontal'}
                    size={14}
                    color={message.status === 'read' ? confirmation : secondaryFont}
                    style={styles.icon}
                />)
                : null
            }

        </View>
    )
}
export default Message