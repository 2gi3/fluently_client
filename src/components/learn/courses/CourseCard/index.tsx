import { Card } from '@rneui/base'
import { Badge, Icon, Text } from '@rneui/themed'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { sizes } from '../../../../styles/variables/measures'
import colors from '../../../../styles/variables/colors'
import { CourseT } from '../../../../types/learning'

const CourseCard = ({ course }: { course: CourseT }) => {

    return (
        <View>
            <Card containerStyle={{ maxWidth: sizes.XXXL }}>

                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Card.Image
                        containerStyle={{ flex: 1, maxWidth: sizes.XXL }}
                        source={{
                            // uri: course.imageUrl || '../../../../assets/images/mockImg.jpg'
                            uri: '../../../../assets/images/mockImg.jpg'
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <Badge containerStyle={{ marginBottom: 3, }} value={`Learn ${course.learningLanguage}`} />
                        <Card.Title h2
                            h2Style={{ fontSize: 16, textAlign: 'left', marginBottom: sizes.XS, }}>
                            {course.title}
                        </Card.Title>
                        <Text
                            style={{ marginBottom: sizes.XS, height: 'auto' }}
                            numberOfLines={2}
                        >
                            {course.subheading}

                        </Text>
                        <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                            <Text style={{ marginRight: 4 }}>Level:</Text>
                            <View style={{ width: 4, height: 4, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                            <View style={{ width: 4, height: 6, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                            <View style={{ width: 4, height: 8, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                            <View style={{ width: 4, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
                            <View style={{ width: 4, height: 12, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>

    )
}

export default CourseCard