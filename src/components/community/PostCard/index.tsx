import React from 'react'
import { Button, Card, Icon } from "@rneui/themed"
import { Text, View } from 'react-native'
import { PostCardPropsT } from '../../../types/community'

const PostCard = ({ post }: PostCardPropsT) => {
    return (
        <Card >
            <Card.Image
                source={{
                    uri:
                        'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                }}
            />
            <View>
                <Icon
                    name="code"
                    color="black"
                    size={88}
                // style={{ marginBottom: 10 }}
                />

            </View>
            <Card.Title>{post.title}</Card.Title>


            <Text style={{ marginBottom: 10, height: 'auto' }}>
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