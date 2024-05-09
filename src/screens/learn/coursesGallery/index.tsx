import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, FlatList, Pressable, ScrollView } from "react-native"
import colors from '../../../styles/variables/colors'
import TempScreen from '../../../components/learn/courses/MarkdownEditor'
import CourseCard from '../../../components/learn/courses/CourseCard'
import mockCourses from '../../../../mock_data/courses.json'
import { useNavigation } from '@react-navigation/native'
const CoursesGallery = () => {
    const navigation = useNavigation()


    const renderItem = ({ item }: { item: any }) => (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Course', {
                courseId: item.id,
                courseTitle: item.title,
                courseLevel: item.level,
                courseSubheading: item.subheading,
                courseIntroductionMD: item.introductionMD,
                courseGoalsMD: item.goalsMD,
                courseRequirementsMD: item.requirementsMD,
                courseVideoUrl: item.videoUrl,
                courseImageUrl: item.imageUrl,
                courseCreated_at: item.created_at,
                lessonsTitles: item.lessonsTitles
            })}

            style={{ flex: 1 }}
        >
            <CourseCard
                course={item}
            />
        </Pressable>
    );
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.primaryLight
        }}>

            <View>
                <FlatList
                    data={mockCourses!}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => `${item.id}-${i}`}
                />
            </View>
            {/* <FlatList
                data={posts!}
                renderItem={renderItem}
                keyExtractor={(item, i) => `${item.title}-${i}`}
            /> */}
        </ScrollView>)
}

export default CoursesGallery