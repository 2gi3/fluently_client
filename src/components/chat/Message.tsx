import { Text, View, } from "react-native"
import { Badge } from '@rneui/themed';
// import { ChatMessageT, MessageT, UserT } from "../../types"
import { chatStyles } from "../../styles/chat"
import moment from "moment";
import { ChatMessageT, MessageT } from "../../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";



const Message = ({ message }: { message: ChatMessageT }) => {
    const user = useSelector((state: RootState) => state.user.user);


    const isMyMessage = () => {
        return message.user.id === user.id
    }
    return (
        <View
            key={`${message.id}_${message.text}`}
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