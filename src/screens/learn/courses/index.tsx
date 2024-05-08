import React from 'react'
import { SafeAreaView, View, Text } from "react-native"
import colors from '../../../styles/variables/colors'
import TempScreen from '../../../components/learn/courses/MarkdownEditor'

const Courses = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primaryLight
        }}>
            <View>
                <Text>
                    A list of all courses
                </Text>
                <TempScreen />
            </View>
            {/* <FlatList
                data={posts!}
                renderItem={renderItem}
                keyExtractor={(item, i) => `${item.title}-${i}`}
            /> */}
        </SafeAreaView>)
}

export default Courses