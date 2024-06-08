import { useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { globalStyles } from '../../../styles'
import { Video } from 'expo-av'
import { sizes } from '../../../styles/variables/measures'
import { Button, Text } from '@rneui/themed'

const lessonPage = () => {
    const route = useRoute()
    const [status, setStatus] = useState<any>(null)
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
    const video = useRef(null)

    const videoSource = 'https://res.cloudinary.com/gippolito/video/upload/v1717578349/fluently/courses/videos/F_lesson_igr39g.mp4'

    const handleVideoLoad = (status) => {
        if (status && status.naturalSize) {
            const { naturalSize } = status;
            const ratio = naturalSize.width / naturalSize.height;
            setAspectRatio(ratio);
        }
    };
    // useEffect(() => {
    //     //@ts-ignore
    //     if (route.params?.title) {
    //         //@ts-ignore
    //         navigation.setOptions({ title: route.params?.title, headerTitleAlign: 'center' })
    //     }


    // }, [route.params])

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text>
                    Place holder title 50 characters and no more
                </Text>
                <Video
                    ref={video}
                    style={{
                        marginVertical: sizes.S,
                        flex: 1,
                        alignSelf: 'stretch',
                        height: 'auto',
                        maxWidth: 'auto',
                        aspectRatio: 16 / 9,
                        backgroundColor: '#red',

                    }}
                    videoStyle={{
                        marginVertical: sizes.S,
                        flex: 1,
                        alignSelf: 'stretch',
                        height: 'auto',
                        maxWidth: 'auto',
                        aspectRatio: 16 / 9,
                        backgroundColor: '#red',

                    }}
                    source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    useNativeControls
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(status)}
                    onLoad={handleVideoLoad}
                />
            </View>
            <View>
                <Button
                    // iconRight
                    // buttonStyle={styles.buttonStylePrimary}
                    title="Create a paragraph"
                    onPress={() => console.log('create paragraph')}
                />
            </View>


        </ScrollView>

    )
}

export default lessonPage