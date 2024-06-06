import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

const CreateCourseUnit = () => {
    const route = useRoute()
    const navigation = useNavigation();

    return (
        <View>
            <Text>
                This will createe a new unit for:
            </Text>

            <Text>
                Course title: {
                    //@ts-ignore
                    route.params!.courseTitle}
                course ID: {
                    //@ts-ignore
                    route.params!.courseId}
            </Text>
        </View>
    )
}

export default CreateCourseUnit