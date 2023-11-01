import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable, View, Text } from 'react-native';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation, useRoute } from '@react-navigation/native'
import StudentCard from '../../components/chat/StudentCard';
import { useGetUsers } from '../../functions/hooks/user';
import { UserT } from '../../types/user';
import { Skeleton } from '@rneui/base';
import { sizes } from '../../styles/variables/measures';
import TopTabButton from '../../components/navigation/TopTabButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



const StudentsList = () => {
    const route = useRoute()
    const navigation = useNavigation()
    //@ts-ignore
    const url = process.env.SERVER_URL
    const connectedUsers = useSelector((state: RootState) => state.webSocket.connectedUsers)
    const { loading, error, users, refreshData, isValidating } = useGetUsers(`${url}/api/user`);
    const [connectedUsersArray, setConnectedUsersArray] = useState<any[] | null>()
    const [disconnectedUsersArray, setDisconnectedUsersArray] = useState<any[] | null>()
    const [combinedUsers, setCombinedUsers] = useState<any[] | null>(users)

    // const connectedUsersArray = users.filter((user: any) => connectedUsers.includes(user.id));
    // const disconnectedUsersArray = users.filter((user: any) => !connectedUsers.includes(user.id));

    // // Concatenate connected users on top of disconnected users
    // const combinedUsers = [...connectedUsersArray, ...disconnectedUsersArray];
    // console.log({ connectedUsersArray })
    // console.log({ combinedUsers })



    const renderItem = ({ item }: { item: UserT }) => {
        //@ts-ignore
        const isUserConnected = connectedUsers.includes(item.id);

        return (<Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Student', { id: item.id.toString(), name: item.name })}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        >
            <StudentCard user={item} isConnected={isUserConnected} />
        </Pressable>)
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TopTabButton
                    disabled={isValidating}
                    onPress={refreshData}
                    iconName="refresh"
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ headerTitleAlign: 'center' })

    }, [route.params])

    useEffect(() => {
        if (users && connectedUsers.length > 0) {
            const connected = users.filter((user: any) => connectedUsers.includes(user.id));
            const disconnected = users.filter((user: any) => !connectedUsers.includes(user.id));

            setConnectedUsersArray(connected);
            setDisconnectedUsersArray(disconnected);
            setCombinedUsers([...connected, ...disconnected]);

        }
        console.log(connectedUsers)

    }, [users, connectedUsers])

    return (
        loading ?
            <View style={{ flexDirection: 'column', gap: sizes.S }} >
                <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            </View> :
            <FlatList
                data={combinedUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
    );
};

export default StudentsList
