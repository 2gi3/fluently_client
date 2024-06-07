import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Card, CheckBox, ListItem, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { UnitT } from "../../../types/learning";
import { sizes } from "../../../styles/variables/measures";
import ConfirmationOverlay from "../../../components/ConfirmationOverlay";
import { useCreateCourseUnit } from "../../../functions/hooks/learn";

const CreateCourseUnit = () => {
    const route = useRoute()
    const navigation = useNavigation();
    const { createCourseUnit, loading, error, success } = useCreateCourseUnit()
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'learn' | 'exercise'>('learn');
    const [expanded, setExpanded] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState<null | string>(null)
    const randomNumber = Math.floor(Math.random() * 1000000)
    //@ts-ignore
    const courseID = route.params!.courseId


    const handleCreateUnit = () => {

        if (title.length < 4) {
            setOverlayMessage(
                'Please make sure the title is at least 4 characters'
            )
        } else {

            const newUnit: UnitT = {
                id: `${courseID}-unt${Date.now()}`,
                //@ts-ignore
                courseId: route.params!.courseId,
                title,
                type,
            };

            console.log({
                newUnit
            });
            createCourseUnit(newUnit)
        }
    };

    return (
        <ScrollView>
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
            <Card>
                <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>Type</ListItem.Title>
                            <ListItem.Subtitle>{type}</ListItem.Subtitle>
                        </ListItem.Content>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                        setExpanded(!expanded);
                    }}
                >
                    <ListItem containerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                        <CheckBox
                            title="learn"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={type === 'learn'}
                            onPress={() => {
                                setType('learn');
                                setExpanded(false)
                            }}
                        />
                        <CheckBox
                            title="exercise"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={type === 'exercise'}
                            onPress={() => {
                                setType('exercise');
                                setExpanded(false)
                            }}
                        />
                    </ListItem>
                </ListItem.Accordion>
            </Card>
            <Card >
                <Card.Title>Unit title</Card.Title>
                <TextInput
                    // autoFocus={true}
                    placeholder="Maximum 50 characters"
                    multiline={true}
                    numberOfLines={3}
                    // style={{ padding: title ? sizes.XS : null }}
                    style={{ paddingLeft: 3 }}
                    onChangeText={setTitle}
                />


            </Card>
            <Button
                title="Create Unit"
                onPress={handleCreateUnit}
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

export default CreateCourseUnit