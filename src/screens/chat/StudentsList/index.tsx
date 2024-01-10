import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable, View, Text } from 'react-native';
import chatsData from '../../../../mock_data/chatsData.json'
import { useNavigation, useRoute } from '@react-navigation/native'
import StudentCard from '../../../components/chat/StudentCard';
import { useGetUsers, useUserData } from '../../../functions/hooks/user';
import { UserT } from '../../../types/user';
import { Skeleton } from '@rneui/themed';
import { sizes } from '../../../styles/variables/measures';
import TopTabButton from '../../../components/navigation/TopTabButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import StudentsListSkeleton from './skeleton';



const StudentsList = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const url = process.env.SERVER_URL
    const connectedUsers = useSelector((state: RootState) => state.webSocket.connectedUsers)
    const { loading, error, users, refreshData, isValidating } = useGetUsers(`${url}/api/user`);
    const [connectedUsersArray, setConnectedUsersArray] = useState<UserT[] | null>()
    const [disconnectedUsersArray, setDisconnectedUsersArray] = useState<UserT[] | null>()
    const [combinedUsers, setCombinedUsers] = useState<UserT[] | null>(null)
    const { user } = useUserData()



    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TopTabButton
                    disabled={isValidating}
                    onPress={() => refreshData}
                    iconName="refresh"
                    isLoading={loading || isValidating}
                    type="outline"
                />
            ),
        });
    }, [navigation, loading, isValidating]);

    useEffect(() => {
        navigation.setOptions({ title: 'Your fellow students', headerTitleAlign: 'center' })

    }, [route.params])

    useEffect(() => {
        if (users && connectedUsers.length > 0) {
            const connected = users.filter((userDB: UserT) => connectedUsers.includes(userDB.id! as number) && userDB.id !== user?.id);
            const disconnected = users.filter((userDB: UserT) => !connectedUsers.includes(userDB.id! as number) && userDB.id !== user?.id);
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
            <StudentsListSkeleton /> :
            <FlatList
                data={combinedUsers}
                renderItem={renderItem}
                keyExtractor={(item: UserT, index: number) => (item.id ? item.id.toString() : `user-${index.toString()}`)}
            />
    );
};

export default StudentsList
