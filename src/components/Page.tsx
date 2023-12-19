import { Badge, Image, Text, Avatar } from '@rneui/themed'
import React from 'react'
import { ScrollView, View } from "react-native"
import { PostT } from '../types/community'
import { globalStyles } from '../styles'
import { sizes } from '../styles/variables/measures'

const Page = ({ page }: { page: PostT }) => {

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text h1>
                    {page.title}
                </Text>
                <View style={globalStyles.tagsListContainer}>
                    {page.type && <Badge value={page.type} />}
                    {page.topic && <Text>{page.topic}</Text>}
                </View>
            </View>
            {page.image && (
                <View style={globalStyles.elementContainer}>
                    <Image
                        source={{ uri: page.image }}
                    />
                </View>
            )}
            {page.body && (
                <View style={[globalStyles.container, { paddingTop: page.image ? sizes.M : 0 }]}>
                    <Text>
                        {page.body}
                    </Text>
                </View>
            )}
            <View style={{ margin: sizes.S, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: sizes.XS }}>
                <Avatar
                    size={sizes.M}
                    rounded
                    source={{ uri: page.user?.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp' }}
                    title="Hi"
                />

                <Text>{page.user?.name}</Text>

            </View>
        </ScrollView>
    )
}
export default Page