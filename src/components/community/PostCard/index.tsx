import React from 'react'
import { Badge, Button, Card, Icon } from "@rneui/themed"
import { Text, View } from 'react-native'
import { PostCardPropsT } from '../../../types/community'
import { sizes } from '../../../styles/variables/measures'
import { Avatar } from '@rneui/base'
import colors from '../../../styles/variables/colors'

const PostCard = ({ post }: PostCardPropsT) => {
    console.log(post)
    return (
        <Card >
            <Icon
                raised
                // reverse
                name="bookmark-outline"
                color={colors.tertiary}
                size={14}
                type='ionicon'
                containerStyle={{
                    position: 'absolute',
                    top: sizes.XS,
                    right: sizes.XS,
                    zIndex: 2,
                    margin: 0,
                    marginRight: 2,
                    shadowColor: colors.tertiary
                }}
            />
            {post.image && <Card.Image
                source={{
                    uri: post.image
                }}
            />}
            <Card.Title>{post.title}</Card.Title>
            <View style={{ marginBottom: sizes.S, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
                <Avatar
                    size={sizes.M}
                    rounded
                    source={{ uri: post.user?.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                    title="Hi"
                // containerStyle={styles.avatarContainer}
                />

                <Text>{post.user?.name}</Text>
                {/* <Text>( + 18 replies )</Text> */}

            </View>

            <View>

                <View style={{ marginBottom: 11, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center', gap: sizes.S }}>
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
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>

                        {/* <Icon
                            name="book-education-outline"
                            color={colors.secondaryFont}
                            size={sizes.M}
                            type='material-community'
                        /> */}
                        {/* <Icon
                            name={icon}
                            color={colors.secondaryFont}
                            size={sizes.M}
                            type='simple-line-icon'
                            containerStyle={{
                                height: 32,
                                overflow: 'visible'
                            }}
                            style={{
                                marginTop: -2
                            }}
                        /> */}
                        {/* <Badge value='Pronouns' badgeStyle={{ height: 'auto' }} containerStyle={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Badge> */}
                        {post.topic && <Badge value={post.topic} />}
                    </View>
                    {/* <View style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}> */}



                    {/* <Badge value='Pronouns' badgeStyle={{ height: 'auto' }} containerStyle={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Badge> */}
                    {/* <Text>save</Text> */}

                    {/* </View> */}

                </View>

            </View>

            <Text style={{ marginBottom: sizes.S, height: 'auto' }}>
                {post.body}
            </Text>
            <Button
                type="outline"

                // icon={
                //     <Icon
                //         name="code"
                //         color="#ffffff"
                //         iconStyle={{ marginRight: 10 }}
                //     />
                // }
                title="VIEW NOW"
            />
        </Card>
    )
}
export default PostCard