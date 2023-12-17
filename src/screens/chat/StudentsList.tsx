import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable, View, Text } from 'react-native';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation, useRoute } from '@react-navigation/native'
import StudentCard from '../../components/chat/StudentCard';
import { useGetUsers } from '../../functions/hooks/user';
import { UserT } from '../../types/user';
import { Skeleton } from '@rneui/themed';
import { sizes } from '../../styles/variables/measures';
import TopTabButton from '../../components/navigation/TopTabButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



const StudentsList = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const url = process.env.SERVER_URL
    const connectedUsers = useSelector((state: RootState) => state.webSocket.connectedUsers)
    const { loading, error, users, refreshData, isValidating } = useGetUsers(`${url}/api/user`);
    const [connectedUsersArray, setConnectedUsersArray] = useState<UserT[] | null>()
    const [disconnectedUsersArray, setDisconnectedUsersArray] = useState<UserT[] | null>()
    const [combinedUsers, setCombinedUsers] = useState<UserT[] | null>(null)



    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TopTabButton
                    disabled={isValidating}
                    onPress={() => refreshData}
                    iconName="refresh"
                    isLoading={loading}
                />
            ),
        });
    }, [navigation, loading, isValidating]);

    useEffect(() => {
        navigation.setOptions({ title: 'Your fellow students', headerTitleAlign: 'center' })

    }, [route.params])

    useEffect(() => {
        console.log({ connectedUsers })
        if (users && connectedUsers.length > 0) {
            const connected = users.filter((user: UserT) => connectedUsers.includes(user.id! as number));
            const disconnected = users.filter((user: UserT) => !connectedUsers.includes(user.id! as number));

            // setConnectedUsersArray(connected);
            // setDisconnectedUsersArray(disconnected);
            setCombinedUsers([...connected, ...disconnected]);
            console.log(users)
            console.log({ connected })
            console.log({ disconnected })
            console.log({ combinedUsers })

        } else
            setCombinedUsers(users)


    }, [users, connectedUsers])

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
    return (
        !combinedUsers ?
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
                keyExtractor={(item: UserT, index: number) => (item.id ? item.id.toString() : `user-${index.toString()}`)}
            />
    );
};

export default StudentsList
