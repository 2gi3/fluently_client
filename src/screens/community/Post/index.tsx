import React, { useEffect } from 'react'
import { Skeleton } from "@rneui/themed"
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native"
import { sizes } from '../../../styles/variables/measures'
import { PostT } from '../../../types/community'
import PostCard from '../../../components/community/PostCard'
// import posts from '../../../../mock_data/posts.json'
import { useGetAllPosts, useGetOnePost } from '../../../functions/hooks/community'
import PostsSkeleton from './skeleton'
import { useNavigation, useRoute } from "@react-navigation/native"
import Page from '../../../components/Page'


const Post = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const postId = (route.params as { id?: string })?.id;

    const { loading, error, post, refreshData, isValidating } = useGetOnePost(String(postId));

    useEffect(() => {
        navigation.setOptions({
            title: post?.type === 'moment' ? `${post.user?.name}'s story`
                : post?.type === 'question' ? `${post.user?.name}'s question`
                    : `${post?.user?.name}'s post`,
            headerTitleAlign: 'center'

        })
    }, [post])

    const renderItem = ({ item }: { item: PostT }) => (
        <View
            // @ts-ignore
            // onPress={() => navigation.navigate('Chat', {
            //     id: item.id!.toString(),
            //     user2id: user.id == item.user2Id ? item.user1Id : item.user2Id,
            // })}
            style={{ display: 'flex', flexDirection: 'column', gap: 44 }}        >
            <PostCard
                post={item}
            />
        </View>
    );


    return (
        loading ? (
            <SafeAreaView style={{ flex: 1 }}>
                <PostsSkeleton />
            </SafeAreaView>
        ) : <Page page={post!} />
    )
}
export default Post