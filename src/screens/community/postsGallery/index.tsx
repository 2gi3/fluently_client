import React, { useEffect } from 'react'
import { Skeleton } from "@rneui/themed"
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from "react-native"
import { sizes } from '../../../styles/variables/measures'
import { PostT } from '../../../types/community'
import PostCard from '../../../components/community/PostCard'
// import posts from '../../../../mock_data/posts.json'
import { useGetAllPosts } from '../../../functions/hooks/community'
import PostsGallerySkeleton from './skeleton'

const PostsGallery = () => {
    const { loading, error, posts, refreshData, isValidating } = useGetAllPosts();


    const renderItem = ({ item }: { item: PostT }) => (
        <Pressable
            // @ts-ignore
            // onPress={() => navigation.navigate('Chat', {
            //     id: item.id!.toString(),
            //     user2id: user.id == item.user2Id ? item.user1Id : item.user2Id,
            // })}
            style={{ display: 'flex', flexDirection: 'column', gap: 44 }}        >
            <PostCard
                post={item}
            />
        </Pressable>
    );


    return (
        loading ?
            <PostsGallerySkeleton />
            : (<SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
                <FlatList
                    data={posts!}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => `${item.title}-${i}`}
                />
            </SafeAreaView>)
    )
}
export default PostsGallery