import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Card, CheckBox, ListItem, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { LessonT, UnitT } from "../../../types/learning";
import { sizes } from "../../../styles/variables/measures";
import ConfirmationOverlay from "../../../components/ConfirmationOverlay";
import { useCreateCourseUnit } from "../../../functions/hooks/learn";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CreateLesson = () => {
    const route = useRoute()
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    // const { createCourseUnit, loading, error, success } = useCreateCourseUnit()
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState<null | string>(null)
    // const randomNumber = Math.floor(Math.random() * 1000000)
    //@ts-ignore
    const unitID = route.params!.unitID
    //@ts-ignore
    const courseID = route.params!.courseID
    //@ts-ignore
    const unitTitle = route.params.unitTitle

    console.log({ params: route.params })


    const handleCreateLesson = () => {

        if (title.length < 4) {
            setOverlayMessage(
                'Please make sure the title is at least 4 characters'
            )
        } else if (!videoUrl || videoUrl.length < 15) {
            setOverlayMessage(
                'Please make sure to add a video'
            )
        } else {

            const newLesson: LessonT = {
                id: `${unitID}-lsn${Date.now()}`,
                userId: user.id!,
                courseId: courseID,
                unitId: unitID,
                title,
                videoUrl,
            };

            console.log({
                newLesson
            });
            // createCourseUnit(newUnit)
        }
    };

    return (
        <ScrollView>
            <View>
                <Text>
                    This will createe a new lesson for:
                </Text>

                <Text>
                    Course title: {
                        //@ts-ignore
                        route.params!.courseTitle}
                    unit title: {unitTitle}
                </Text>
            </View>
            <Card >
                <Card.Title>Lesson title</Card.Title>
                <TextInput
                    // autoFocus={true}
                    placeholder="Maximum 50 characters"
                    multiline={true}
                    numberOfLines={3}
                    // style={{ padding: title ? sizes.XS : null }}
                    style={{ paddingLeft: 3 }}
                    onChangeText={setTitle}
                />


            </Card><Card >
                <Card.Title>Video URL</Card.Title>
                <TextInput
                    // autoFocus={true}
                    placeholder="Video must be mp4 and 16/9"
                    multiline={false}
                    // numberOfLines={3}
                    // style={{ padding: title ? sizes.XS : null }}
                    style={{ paddingLeft: 3 }}
                    onChangeText={setVideoUrl}
                />
            </Card>
            <Button
                title="Create lesson"
                onPress={handleCreateLesson}
                containerStyle={{ marginHorizontal: sizes.S, marginVertical: sizes.M }}
            />
            <ConfirmationOverlay
                isVisible={overlayMessage !== null}
                warning={overlayMessage || ''}
                onBackdropPress={() => setOverlayMessage(null)}
                onConfirm={() => setOverlayMessage(null)}
                consfirmButtonTitle={'ok'}


            />
        </ScrollView>
    )
}

export default CreateLesson