import { Text, View, } from "react-native"
import { Badge } from '@rneui/themed';
import { ChatMessageT, MessageT, UserT } from "../../types"
import { chatStyles } from "../../styles/chat"
import moment from "moment";



const Message = ({ message }: { message: ChatMessageT }) => {

    const isMyMessage = () => {
        return message.user.id === 'u9'
    }
    return (
        <View
            key={message.id}
            style={[chatStyles.message,
            {
                backgroundColor: isMyMessage() ? '#C8DEF8' : '#f1f1f1',
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
            }]}
        >
            {/* <Badge value={message.text} status="success" /> */}

            <Text>{message.text}</Text>

            <Text style={{
                fontSize: 12,
                color: 'grey',
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
            }}>{moment(message.createdAt).fromNow()}</Text>
        </View>
    )
}
export default Message