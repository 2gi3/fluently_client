import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, FlatList, Pressable, ScrollView, ActivityIndicator, ImageBackground } from "react-native"
import colors from '../../../styles/variables/colors'
import TempScreen from '../../../components/learn/courses/MarkdownEditor'
import CourseCard from '../../../components/learn/courses/CourseCard'
import mockCourses from '../../../../mock_data/courses.json'
import { useNavigation } from '@react-navigation/native'
import { useGetAllCourses } from '../../../functions/hooks/learn'
import CoursesGallerySkeleton from './skeleton'
import { Card, Tile } from '@rneui/themed'
import { sizes } from '../../../styles/variables/measures'
import ErrorPage from '../../../components/ErrorPage'
const CoursesGallery = () => {
    const navigation = useNavigation()
    const { loading, error, courses, refreshData, isValidating } = useGetAllCourses()

    useEffect(() => {
        console.log(error)


        console.log({
            backendCourses: courses
        })
    }, [courses, error])

    const renderItem = ({ item }: { item: any }) => (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Course', {
                courseId: item.id,
                courseCreator: item.creatorId,
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
            <ErrorPage message={error.message} onPress={() => refreshData} />
        );
    }

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.primaryLight
        }}>
            <View>
                <FlatList
                    data={courses!}
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