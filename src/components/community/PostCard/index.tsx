import React from 'react'
import { Badge, Button, Card, Icon, ListItem } from "@rneui/themed"
import { Pressable, Text, View } from 'react-native'
import { CommentT, PostCardPropsT } from '../../../types/community'
import { sizes } from '../../../styles/variables/measures'
import { Avatar } from '@rneui/base'
import colors from '../../../styles/variables/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles'


const PostCard = ({ post }: PostCardPropsT) => {
    const navigation = useNavigation()
    const manageOpenPost = () => {
        // @ts-ignore
        navigation.navigate('Post', { id: post.id })
    }
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
                <Icon
                    raised
                    // reverse
                    name="bookmark-outline"
                    color={colors.tertiary}
                    size={14}
                    type='ionicon'
                    containerStyle={{
                        // position: 'absolute',
                        // top: sizes.XS,
                        // right: sizes.XS,
                        // zIndex: 2,
                        // margin: 0,
                        marginRight: 0,
                        marginLeft: 'auto',
                        shadowColor: colors.tertiary

                    }}
                />

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


            {/* <View> */}

            {/* <View style={{ marginBottom: 11, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center', gap: sizes.S }}> */}
            {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}>
                        <Avatar
                            size={sizes.M}
                            rounded
                            source={{ uri: 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                            title="Hi"
                        // containerStyle={styles.avatarContainer}
                        />

                        <Text>John Doe</Text>

                    </View> */}
            {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>

                        {post.topic && <Badge value={post.topic} />}
                    </View> */}
            {/* <View style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}> */}



            {/* <Badge value='Pronouns' badgeStyle={{ height: 'auto' }} containerStyle={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Badge> */}
            {/* <Text>save</Text> */}

            {/* </View> */}

            {/* </View> */}

            {/* </View> */}

            <Text style={{ marginBottom: sizes.S, height: 'auto' }}>
                {post.body}
            </Text>
            {post.comments && post.comments?.length > 0 && <View>
                <ListItem.Content style={styles.comments}>
                    {/* <ListItem.Title>Personal details:</ListItem.Title> */}
                    {post.comments.map((comment: CommentT, i: number) => {
                        if (i < 3) {
                            return (
                                <ListItem.Subtitle style={styles.commemt} key={`${comment.id}-${i}`}>
                                    <View style={{ marginBottom: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
                                        <Avatar
                                            size={24}
                                            rounded
                                            source={{ uri: comment.user?.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                                            title="Hi"
                                        />

                                        <Text>{comment.user?.name}</Text>

                                    </View>
                                    <Text style={{ color: '#666666', fontSize: 12 }}>{comment.body}</Text>{' '}
                                </ListItem.Subtitle>
                            )
                        }
                    })}
                    {post.comments.length > 3 && (
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
                                {`View ${post.comments.length - 3} more comments`}
                            </Text>
                        </Button>

                    )}
                </ListItem.Content>
            </View>}
            <Button
                type="outline"

                // icon={
                //     <Icon
                //         name="code"
                //         color="#ffffff"
                //         iconStyle={{ marginRight: 10 }}
                //     />
                // }
                title={post.comments && post.comments.length > 3 ? "View more comments" : 'Open post'}
                onPress={() => manageOpenPost()}

            />
        </Card>
    )
}
export default PostCard