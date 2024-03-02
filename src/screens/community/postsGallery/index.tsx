import React, { useEffect } from 'react'
import { Skeleton } from "@rneui/themed"
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from "react-native"
import { sizes } from '../../../styles/variables/measures'
import { PostT } from '../../../types/community'
import PostCard from '../../../components/community/PostCard'
// import posts from '../../../../mock_data/posts.json'
import { useGetAllPosts } from '../../../functions/hooks/community'
import PostsGallerySkeleton from './skeleton'
import colors from '../../../styles/variables/colors'

const PostsGallery = () => {
    const { loading, error, posts, refreshData, isValidating } = useGetAllPosts();

    useEffect(() => {
        console.log('adsf')
        console.log({ posts })
        console.log({ loading })
        console.log({ error })
    }, [posts, loading, error])
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
                <PostsGallerySkeleton />
                <PostsGallerySkeleton />
            </SafeAreaView>
        ) : (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryLight, flexDirection: 'row', maxWidth: sizes.XXXL, margin: 'auto' }}>
                <FlatList
                    data={posts!}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => `${item.title}-${i}`}
                />
            </SafeAreaView>)
    )
}
export default PostsGallery