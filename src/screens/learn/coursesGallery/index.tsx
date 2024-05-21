import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, FlatList, Pressable, ScrollView, ActivityIndicator } from "react-native"
import colors from '../../../styles/variables/colors'
import TempScreen from '../../../components/learn/courses/MarkdownEditor'
import CourseCard from '../../../components/learn/courses/CourseCard'
import mockCourses from '../../../../mock_data/courses.json'
import { useNavigation } from '@react-navigation/native'
import { useGetAllCourses } from '../../../functions/hooks/learn'
import CoursesGallerySkeleton from './skeleton'
const CoursesGallery = () => {
    const navigation = useNavigation()
    const { loading, error, courses, refreshData, isValidating } = useGetAllCourses()

    useEffect(() => {
        console.log({
            backendCourses: courses
        })
    }, [courses])

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
                units: item.units
            })}

            style={{ flex: 1 }}
        >
            <CourseCard
                course={item}
            />
        </Pressable>
    );

    if (loading) {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: colors.primaryLight
            }}>
                <View>
                    <CoursesGallerySkeleton />
                    <CoursesGallerySkeleton />
                    <CoursesGallerySkeleton />
                    <CoursesGallerySkeleton />
                </View>
            </ScrollView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryLight }}>
                <Text style={{ color: 'red' }}>Failed to load courses. Please try again later.</Text>
                <Pressable onPress={refreshData} style={{ marginTop: 20, padding: 10, backgroundColor: colors.primary }}>
                    <Text style={{ color: 'white' }}>Retry</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

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