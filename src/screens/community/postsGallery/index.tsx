import React from 'react'
import { Skeleton } from "@rneui/themed"
import { FlatList, Pressable, ScrollView, View } from "react-native"
import { sizes } from '../../../styles/variables/measures'
import { PostT } from '../../../types/community'
import PostCard from '../../../components/community/PostCard'
import posts from '../../../../mock_data/posts.json'

const PostsGallery = () => {

    const renderItem = ({ item }: { item: PostT }) => (
        <Pressable
            // @ts-ignore
            // onPress={() => navigation.navigate('Chat', {
            //     id: item.id!.toString(),
            //     user2id: user.id == item.user2Id ? item.user1Id : item.user2Id,
            // })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}        >
            <PostCard
                post={item}
            />
        </Pressable>
    );

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item, i) => `${item.title}-${i}`}
        />
    )
}
export default PostsGallery