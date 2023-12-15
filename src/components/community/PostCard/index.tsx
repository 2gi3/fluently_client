import React from 'react'
import { Badge, Button, Card, Icon } from "@rneui/themed"
import { Text, View } from 'react-native'
import { PostCardPropsT } from '../../../types/community'
import { sizes } from '../../../styles/variables/measures'
import { Avatar } from '@rneui/base'
import colors from '../../../styles/variables/colors'
import { getIconForPostType } from '../../../functions/community'

const PostCard = ({ post }: PostCardPropsT) => {
    const icon = getIconForPostType(post.type);
    return (
        <Card >
            <Card.Image
                source={{
                    uri:
                        'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                }}
            />
            <View>

                <View style={{ marginBottom: 11, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center', gap: sizes.S }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}>
                        <Avatar
                            size={sizes.M}
                            rounded
                            source={{ uri: 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                            title="Hi"
                        // containerStyle={styles.avatarContainer}
                        />

                        <Text>John Doe</Text>

                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}>

                        {/* <Icon
                            name="book-education-outline"
                            color={colors.secondaryFont}
                            size={sizes.M}
                            type='material-community'
                        /> */}
                        <Icon
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
                        />
                        {/* <Badge value='Pronouns' badgeStyle={{ height: 'auto' }} containerStyle={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Badge> */}
                        <Text>{post.label}</Text>

                    </View>
                    <View style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sizes.XS }}>


                        <Icon
                            raised
                            // reverse
                            name="heart"
                            color={colors.tertiary}
                            size={14}
                            type='simple-line-icon'
                            containerStyle={{
                                margin: 0,
                                marginRight: 2,
                                shadowColor: colors.tertiary
                            }}
                        />
                        {/* <Badge value='Pronouns' badgeStyle={{ height: 'auto' }} containerStyle={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Badge> */}
                        <Text>11</Text>

                    </View>

                </View>

            </View>
            <Card.Title>{post.title}</Card.Title>


            <Text style={{ marginBottom: 13, height: 'auto' }}>
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