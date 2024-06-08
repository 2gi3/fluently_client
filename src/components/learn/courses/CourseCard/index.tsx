import { Card } from '@rneui/base'
import { Badge, Icon, Text } from '@rneui/themed'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { sizes } from '../../../../styles/variables/measures'
import colors from '../../../../styles/variables/colors'
import { CourseT } from '../../../../types/learning'
import DifficultyLevel from '../DifficultyLevel'
// import DifficultyLevel from '../DifficultyLevel'
// import DifficultyLevel2 from '../DifficultyLevel'

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

                        <DifficultyLevel level={course.level} />
                    </View>
                </View>
            </Card>
        </View>

    )
}

const style = StyleSheet.create({
    solidBar: { width: 4, backgroundColor: colors.secondaryFont, marginBottom: -2 },
    outlinedBar: { width: 4, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }

})

export default CourseCard