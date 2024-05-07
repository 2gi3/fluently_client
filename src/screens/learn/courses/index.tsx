import React from 'react'
import { SafeAreaView, View, Text } from "react-native"
import colors from '../../../styles/variables/colors'

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
            </View>
            {/* <FlatList
                data={posts!}
                renderItem={renderItem}
                keyExtractor={(item, i) => `${item.title}-${i}`}
            /> */}
        </SafeAreaView>)
}

export default Courses