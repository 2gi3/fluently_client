import { ImageBackground, FlatList, SafeAreaView } from "react-native"
import Message from "../../components/chat/Message"
import { ChatMessageT, MessageT } from "../../types"
import chatData from "../../../mock_data/chatsData.json"


const ChatScreen = () => {

    const messages = chatData.map(chat => ({
        user: {
            id: chat.user.id,
            name: chat.user.name
        },
        id: chat.lastMessage.id,
        text: chat.lastMessage.text,
        createdAt: chat.lastMessage.createdAt,

    }));

    const renderItem = ({ item }: { item: ChatMessageT }) => (

        <Message message={item} />
    );
    return (
        <FlatList
            style={{
                backgroundColor: '#dddddd'
            }}
            data={messages}
            renderItem={renderItem}
            inverted
            keyExtractor={(item) => item.id.toString()}
        />

    )
}
export default ChatScreen