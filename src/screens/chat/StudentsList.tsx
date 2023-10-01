import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, Pressable, View, Text } from 'react-native';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation, useRoute } from '@react-navigation/native'
import StudentCard from '../../components/chat/StudentCard';
import { ChatT, MockChatType } from '../../types/chat';
import { useGetUsers } from '../../functions/hooks/user';
import { UserT } from '../../types/user';
import { Skeleton } from '@rneui/base';
import { sizes } from '../../styles/variables/measures';
import TopTabButton from '../../components/navigation/TopTabButton';



const StudentsList = () => {
    const route = useRoute()
    const navigation = useNavigation()
    //@ts-ignore
    const url = `${process.env.SERVER_URL}/api/user`

    const { loading, error, users, refreshData, isValidating } = useGetUsers(url);
    console.log(users)


    const renderItem = ({ item }: { item: UserT }) => (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Student', { id: item.id.toString(), name: item.name })}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        >
            <StudentCard user={item} />
        </Pressable>
    );

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
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
    );
};

export default StudentsList
