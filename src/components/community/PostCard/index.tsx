import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Icon, ListItem } from "@rneui/themed"
import { Pressable, Text, TextInput, View } from 'react-native'
import { CommentT, PostCardPropsT } from '../../../types/community'
import { sizes } from '../../../styles/variables/measures'
import { Avatar } from '@rneui/base'
import colors from '../../../styles/variables/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles'

import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store'
import { useCreateComment, useManageSavedPosts } from '../../../functions/hooks/community'
import { useDispatch } from 'react-redux'
import { fetchSavedPostsFromLocalStorage } from '../../../redux/slices/ownPostsSlice'

const PostCard = ({ post }: PostCardPropsT) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const manageOpenPost = () => {
        // @ts-ignore
        navigation.navigate('Post', { id: post.id })
    }
    const { toggleSaveUnsavePost, loading: loadingSavedPost } = useManageSavedPosts()

    const { createComment, loading, error, success } = useCreateComment()
    const [localComments, setLocalComments] = useState<CommentT[] | undefined>(post.comments)
    const user = useSelector((state: RootState) => state.user);
    const savedPosts = useSelector((state: RootState) => state.ownPosts.savedPosts);
    const [commentBody, setCommentBody] = useState<null | string>(null)
    const [postBodyExpand, setPostBodyExpand] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        if (success === true) {
            setCommentBody(null)
        }
    }, [success])
    console.log({ savedPostsb: savedPosts })



    useEffect(() => {
        dispatch(fetchSavedPostsFromLocalStorage() as any)
        console.log({ savedPostsA: savedPosts })


    }, [])

    useEffect(() => {
        console.log({ savedPostsc: savedPosts })

        if (savedPosts.some(item => item.postId === post.id)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [savedPosts])


    return (
        <Card >

            <View style={{ marginBottom: sizes.XS, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
                <Avatar
                    size={sizes.M}
                    rounded
                    source={{ uri: post.user?.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                    title="Hi"
                // containerStyle={styles.avatarContainer}
                />

                <Text>{post.user?.name}</Text>
                {/* <Text>( + 18 replies )</Text> */}
                {user.id && <Icon
                    raised
                    // key={isSaved ? 'saved' : 'not_saved'}
                    reverse={isSaved}
                    disabled={loadingSavedPost}
                    name={!isSaved ? "bookmark" : "bookmark-outline"}
                    color={colors.tertiary}
                    size={14}
                    type='ionicon'
                    containerStyle={{
                        marginRight: 0,
                        marginLeft: 'auto',
                        shadowColor: colors.tertiary
                    }}
                    onPress={() => {
                        toggleSaveUnsavePost({
                            userId: user.id!,
                            postId: post.id
                        })
                    }}
                />}

            </View>
            <Card.Title h2 h2Style={{ fontSize: 16 }}>
                {post.topic && <Badge containerStyle={{ marginRight: 4 }} value={post.topic} />}
                {post.title}
            </Card.Title>

            {post.image && <Card.Image
                source={{
                    uri: post.image
                }}
            />}


            {post.body && <Text style={{ marginBottom: sizes.S, height: 'auto' }}>
                {post.body.length > 100 && !postBodyExpand ? `${post.body.slice(0, 100)}` : post.body}
                {post.body.length > 100 && <Button
                    type='clear'
                    title={postBodyExpand ? 'Read less' : 'More...'}
                    titleStyle={{ fontSize: 12, borderBottomWidth: 1, borderColor: colors.tertiary }}
                    buttonStyle={{ padding: 0, paddingLeft: 4 }}
                    onPress={() => setPostBodyExpand(!postBodyExpand)}
                />}

            </Text>}
            {localComments && localComments.length > 0 && <View>
                <ListItem.Content style={styles.comments}>
                    {/* <ListItem.Title>Personal details:</ListItem.Title> */}
                    {localComments.map((comment: CommentT, i: number) => {
                        if (i < 3) {
                            return (
                                <ListItem.Subtitle style={styles.commemt} key={`${comment.body}-${i}`}>
                                    <View style={{ marginBottom: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
                                        <Avatar
                                            size={24}
                                            rounded
                                            source={{ uri: comment.user?.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                                            title="Hi"
                                        />

                                        <Text>{comment.user?.name}</Text>

                                    </View>
                                    <Text style={{ color: '#666666', fontSize: 12 }}>
                                        {comment.body}
                                    </Text>{' '}
                                </ListItem.Subtitle>
                            )
                        }
                    })}
                    {localComments.length > 3 && (
                        <Button
                            type='clear'
                            style={styles.commemt}
                            onPress={() => manageOpenPost()}
                            iconPosition='right'
                            icon={
                                <Icon
                                    name="navigate-next"
                                    color={colors.tertiary}
                                    type='material'
                                // iconStyle={{ marginRight: 10 }}
                                />
                            }
                        >


                            <Text style={{ fontSize: 12, marginLeft: 'auto' }}>
                                {`View ${localComments.length - 3} more ${post.type === 'question'
                                    ? 'answers'
                                    : 'contributions'
                                    }`}
                            </Text>
                        </Button>

                    )}
                </ListItem.Content>
            </View>}
            {/* {post.comments && post.comments.length < 4 && <Button
                type="outline"

                title={post.comments && post.comments.length > 3 ? "View more comments" : 'Open post'}
                onPress={() => manageOpenPost()}

            />} */}
            {localComments && localComments.length < 4 && (
                <ListItem.Content style={styles.comments}>
                    <ListItem.Subtitle
                        style={[
                            styles.commemt,
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                shadowColor: colors.tertiary,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 3
                            }]} >
                        <View style={{ marginBottom: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
                            <Avatar
                                size={24}
                                rounded
                                source={{ uri: user.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                                title="Hi"
                            />

                            <Text>{user.name}</Text>

                        </View>
                        {/* <Text style={{ color: '#666666', fontSize: 12 }}>{comment.body}</Text>{' '} */}
                        <TextInput
                            placeholder={`${post.type === 'question'
                                ? 'Answer'
                                : 'Contribute to'
                                } this ${post.type || 'post'}`
                            }
                            multiline={true}
                            numberOfLines={commentBody ? 4 : 1}
                            style={{ paddingLeft: 4, color: '#666666', fontSize: 12 }}
                            onChangeText={(value) => setCommentBody(value)}
                        />
                    </ListItem.Subtitle>
                    {commentBody && (
                        <Button
                            loading={loading}
                            loadingProps={{ size: 'small', color: colors.secondary }}
                            icon={{
                                name: 'send',
                                type: 'material-ui-icons',
                                size: 15,
                                color: colors.secondary,
                            }}
                            buttonStyle={styles.sendButton}
                            titleStyle={styles.buttonTitle}
                            containerStyle={styles.buttonContainer}
                            onPress={() => {
                                createComment(
                                    {
                                        userId: user.id!,
                                        postId: post.id!,
                                        body: commentBody
                                    }
                                );

                                setLocalComments((prev: CommentT[] | undefined) => {
                                    if (prev) {
                                        const newComments = [...prev, {
                                            userId: user.id!,
                                            postId: post.id!,
                                            body: commentBody,
                                            user: {
                                                name: user.name,
                                                Image: user.image

                                            }
                                        }];
                                        return newComments;
                                    }
                                    return prev;
                                });
                            }
                            }
                        />
                    )}
                </ListItem.Content>
            )}

        </Card>
    )
}
export default PostCard