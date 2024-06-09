import React, { useEffect, useState, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { globalStyles } from '../../../styles'
import { Button, Icon, Text } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../../styles/variables/colors'
import { sizes } from '../../../styles/variables/measures'
import { useVideoPlayer, VideoView } from 'expo-video';
import { UnitT } from '../../../types/learning'
import DifficultyLevel from '../../../components/learn/courses/DifficultyLevel'
import { Video } from 'expo-av'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'



const CourseIntroduction = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user);
    const [units, setUnits] = useState<UnitT[] | null>(null)
    const video = useRef(null)
    const secondVideo = useRef(null)
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
    const [status, setStatus] = useState<any>(null)
    const [secondStatus, setSecondStatus] = useState(null)
    const videoSource = 'https://res.cloudinary.com/gippolito/video/upload/v1717578349/fluently/courses/videos/F_lesson_igr39g.mp4'
    //@ts-ignore
    const courseCreator = route.params?.courseCreator
    const handleVideoLoad = (status) => {
        if (status && status.naturalSize) {
            const { naturalSize } = status;
            const ratio = naturalSize.width / naturalSize.height;
            setAspectRatio(ratio);
        }
    };

    useEffect(() => {

        navigation.setOptions({
            //@ts-ignore
            title: route.params?.courseTitle,
            headerTitleAlign: 'center'
        })
        //@ts-ignore

        if (route.params && route.params.units) {
            //@ts-ignore
            const units: any[] = route.params.units.map(unit => ({
                title: unit.title,
                id: unit.id,
                lessons: unit.lessons ? unit.lessons.map(lesson => lesson.title) : []
            }))
            setUnits(units)
        }

    }, [route.params])

    return (<ScrollView>
        {units && units.length > 0 ?
            <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.S, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Icon
                    name='compass'
                    type="font-awesome"
                    style={{ marginRight: sizes.XS }}
                />
                {units.map(unit => (
                    unit.lessons && unit.lessons.length > 0 ?
                        <View style={{
                            marginRight: sizes.XS,
                            // paddingVertical: 4,
                            alignItems: 'center',
                            // backgroundColor: colors.secondary,
                            // borderRadius: sizes.XS
                        }}>
                            <View key={unit.title} style={{ marginRight: sizes.XS, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>

                                {unit.lessons.map((lesson, index) => (
                                    <View key={index} style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }} />
                                ))}
                            </View>
                            {courseCreator === user.id && (
                                <Button
                                    key={unit.title}
                                    buttonStyle={{ padding: 0 }}
                                    title={'+ lessons'}
                                    titleStyle={{ color: colors.tertiary, fontSize: 14 }}
                                    type='clear'
                                    //@ts-ignore
                                    onPress={() => navigation.navigate('Create-lesson', {
                                        //@ts-ignore
                                        courseID: route.params.courseId,
                                        unitID: unit.id,
                                        unitTitle: unit.title
                                    })} />
                            )}
                        </View>
                        :
                        <View style={{
                            marginRight: sizes.XS,
                            paddingVertical: 4,
                            alignItems: 'center',
                            backgroundColor: colors.secondary,
                            borderRadius: sizes.XS
                        }}>
                            <Text style={{ fontSize: 12, color: colors.secondaryFont }}>{unit.title}</Text>
                            {courseCreator === user.id && (
                                <Button
                                    key={unit.title}
                                    buttonStyle={{ padding: 0 }}
                                    title={'+ lessons'}
                                    titleStyle={{ color: colors.tertiary, fontSize: 14 }}
                                    type='clear'
                                    //@ts-ignore
                                    onPress={() => navigation.navigate('Create-lesson', {
                                        //@ts-ignore
                                        courseID: route.params.courseId,
                                        unitID: unit.id,
                                        unitTitle: unit.title
                                    })} />
                            )}
                        </View>
                ))}
                <Icon
                    name='flag'
                    type="font-awesome"

                />
            </View>
            :
            <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.M, flexDirection: 'row', justifyContent: 'center', gap: 2 }}>

                {route.params && <Button
                    iconRight
                    // buttonStyle={styles.buttonStylePrimary}
                    title="Create a unit"
                    // @ts-ignore
                    onPress={() => navigation.navigate('Create-courseUnit', {
                        //@ts-ignore
                        courseId: route.params!.courseId,
                        //@ts-ignore
                        courseTitle: route.params!.courseTitle,
                        // courseLevel: item.level,
                        // courseSubheading: item.subheading,
                        // courseIntroductionMD: item.introductionMD,
                        // courseGoalsMD: item.goalsMD,
                        // courseRequirementsMD: item.requirementsMD,
                        // courseVideoUrl: item.videoUrl,
                        // courseImageUrl: item.imageUrl,
                        // courseCreated_at: item.created_at,
                        // units: item.units
                    })}
                />}
            </View>
        }
        <View style={globalStyles.container}>
            <View style={{}}>
                <Text>
                    {
                        //@ts-ignore
                        route.params?.courseSubheading
                    }
                </Text>
                <DifficultyLevel level={
                    //@ts-ignore
                    route.params!.courseLevel
                } />
                {/* <View
                    style={{ marginVertical: sizes.S, backgroundColor: 'green', width: 'auto' }}>
                </View> */}
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }}> */}
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
                {/* </View> */}
                <View
                >
                    <Text style={{ fontWeight: 'bold', marginTop: sizes.M, marginBottom: sizes.XS }}>
                        Goals:
                    </Text>
                    <Text>
                        {
                            //@ts-ignore
                            route.params?.courseGoalsMD
                        }
                    </Text>
                </View>
                <View style={{ position: 'relative', marginTop: sizes.M, backgroundColor: colors.warning, padding: sizes.S }}>

                    <Text style={{ position: 'absolute', top: -8, left: 0, fontWeight: 'bold' }}>Prerequisites:</Text>
                    <Text >

                        {
                            //@ts-ignore
                            route.params?.courseRequirementsMD
                        }
                    </Text>
                    <Icon
                        name='warning'
                        type="font-awesome"
                        size={16}
                        style={{ marginLeft: 'auto', marginBottom: 0, zIndex: 2 }}
                    />
                </View>
            </View>
        </View >

        <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.M, flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
            <Button
                iconRight
                // buttonStyle={styles.buttonStylePrimary}
                title="Start Now"
                onPress={async () => {
                    //@ts-ignore
                    navigation.navigate('Lesson'
                        // , {
                        //     courseId: item.id,
                        // }
                    )
                }}
            />

        </View>

    </ScrollView>

    )
}


export default CourseIntroduction




{/* <View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View> */}
