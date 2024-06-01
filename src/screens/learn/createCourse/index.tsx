import { View, Text, ScrollView, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { sizes } from "../../../styles/variables/measures";
import { Button, Card, CheckBox, ListItem } from "@rneui/themed";
import colors from "../../../styles/variables/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CourseT } from "../../../types/learning";
import MarkdownEditor from "../../../components/learn/courses/MarkdownEditor";
import useImagePicker from "../../../functions/hooks";
import ConfirmationOverlay from "../../../components/ConfirmationOverlay";
import { useCreateCourse } from "../../../functions/hooks/learn";

const CreateCourse = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    const { createCourse, loading, error, success } = useCreateCourse()

    const [title, setTitle] = useState('');
    const [subheading, setSubheading] = useState('');
    const [introductionMD, setIntroductionMD] = useState('');
    const [goalsMD, setGoalsMD] = useState('');
    const [requirementsMD, setRequirementsMD] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    const [mediumLanguage, setMediumLanguage] = useState<'english' | 'thai'>('thai');
    const [learningLanguage, setLearningLanguage] = useState<'english' | 'thai'>('english');
    const [level, setLevel] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [expandedMedium, setExpandedMedium] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState<null | string>(null)
    const randomNumber = Math.floor(Math.random() * 1000000)
    const [showLevelPicker, setShowLevelPicker] = useState(false)
    const difficultyLevels = [1, 2, 3, 4, 5, 6]

    const { image, pickImage } = useImagePicker();


    const handleCreateCourse = () => {

        if (title.length < 4) {
            setOverlayMessage(
                'Please make sure the title is at least 4 characters'
            )
        } else if (subheading.length < 8) {
            setOverlayMessage(
                'Please make sure the subheading is at least 8 characters'
            )
        } else if (introductionMD.length < 40) {
            setOverlayMessage(
                'Please make sure the introduction is at least 40 characters'
            )
        } else if (goalsMD.length < 20) {
            setOverlayMessage(
                'Please make sure the goals field is at least 20 characters'
            )
        } else if (requirementsMD.length < 20) {
            setOverlayMessage(
                'Please make sure the requirements field is at least 20 characters'
            )
        } else if (videoUrl.length < 15) {
            setOverlayMessage(
                'Please make sure to include the link to the video'
            )
        } else if (!image) {
            setOverlayMessage(
                'Please add an image'
            )
        } else if (level === 0) {
            setOverlayMessage(
                'Please select a difficulty level for your course'
            )
        } else {

            const newCourse: CourseT = {
                id: `crs${randomNumber}u${user.id!}d${Date.now()}`,
                creatorId: user.id!,
                mediumLanguage,
                learningLanguage,
                title,
                subheading,
                introductionMD,
                goalsMD,
                requirementsMD,
                videoUrl,
                imageUrl: image,
                level,
                created_at: new Date(),
                units: []
            };

            console.log({
                newCourse
            });
            createCourse(newCourse)
        }
    };

    return (
        <ScrollView>

            <Card>
                <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>Medium language</ListItem.Title>
                            <ListItem.Subtitle>{mediumLanguage}</ListItem.Subtitle>
                        </ListItem.Content>
                    }
                    isExpanded={expandedMedium}
                    onPress={() => {
                        setExpandedMedium(!expandedMedium);
                    }}
                >
                    <ListItem containerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                        <CheckBox
                            title="English"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={mediumLanguage === 'english'}
                            onPress={() => {
                                setMediumLanguage('english');
                                setExpandedMedium(false)
                            }}
                        />
                        <CheckBox
                            title="Thai"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={mediumLanguage === 'thai'}
                            onPress={() => {
                                setMediumLanguage('thai');
                                setExpandedMedium(false)
                            }}
                        />
                    </ListItem>
                </ListItem.Accordion>
            </Card>
            <Card>
                <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>Learning language</ListItem.Title>
                            <ListItem.Subtitle>{learningLanguage}</ListItem.Subtitle>
                        </ListItem.Content>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                        setExpanded(!expanded);
                    }}
                >
                    <ListItem containerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                        <CheckBox
                            title="English"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={learningLanguage === 'english'}
                            onPress={() => {
                                setLearningLanguage('english');
                                setExpanded(false)
                            }}
                        />
                        <CheckBox
                            title="Thai"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={learningLanguage === 'thai'}
                            onPress={() => {
                                setLearningLanguage('thai');
                                setExpanded(false)
                            }}
                        />
                    </ListItem>
                </ListItem.Accordion>
            </Card>
            <Card >
                <Card.Title>Course title</Card.Title>
                <TextInput
                    // autoFocus={true}
                    placeholder="Maximum 50 characters"
                    multiline={true}
                    numberOfLines={3}
                    // style={{ padding: title ? sizes.XS : null }}
                    style={{ paddingLeft: 3 }}
                    onChangeText={setTitle}
                />

                <Text>Subheading</Text>
                <TextInput
                    // autoFocus={true}
                    placeholder="Maximum 150 characters"
                    // value={subheading}
                    multiline={true}
                    numberOfLines={6}
                    // style={{ padding: title ? sizes.XS : null }}
                    style={{ paddingLeft: 6 }}
                    onChangeText={setSubheading}
                />
            </Card>
            {/* <TextInput
                    placeholder="Subheading"
                    style={styles.input}
                    value={subheading}
                    onChangeText={setSubheading}
                /> */}
            <MarkdownEditor
                title="Introduction"
                placeholder="Max 600 characters"
                // style={styles.input}
                // multiline={true}
                numberOfLines={12}
                value={introductionMD}
                maxLength={600}
                onChangeText={setIntroductionMD}
            />

            <MarkdownEditor
                title="Goals"
                placeholder="Max 600 characters"
                // style={styles.input}
                // multiline={true}
                numberOfLines={12}
                value={goalsMD}
                maxLength={600}
                onChangeText={setGoalsMD}
            />


            {/* <TextInput
                    placeholder="Goals"
                    style={styles.input}
                    value={goalsMD}
                    onChangeText={setGoalsMD}
                /> */}
            <MarkdownEditor
                title="Requirements"
                placeholder="Max 600 characters"
                // style={styles.input}
                // multiline={true}
                numberOfLines={12}
                value={requirementsMD}
                maxLength={600}
                onChangeText={setRequirementsMD}
            />
            {/* <TextInput
                    placeholder="Requirements"
                    style={styles.input}
                    value={requirementsMD}
                    onChangeText={setRequirementsMD}
                /> */}
            <Card>
                <TextInput
                    placeholder="Video URL"
                    style={styles.input}
                    value={videoUrl}
                    onChangeText={setVideoUrl}
                />
            </Card>


            <Card>
                {image && <Card.Image
                    style={{ marginBottom: sizes.S }}
                    source={{ uri: image }}
                />}
                <Button
                    type="outline"
                    title={image ? 'Change the image' : 'Add an image'}
                    // loading={false}
                    // loadingProps={{ size: 'small', color: 'black' }}
                    // icon={{
                    //     name: 'plus',
                    //     type: 'ant-design',
                    //     size: sizes.M,
                    //     color: colors.tertiary,
                    // }}
                    onPress={pickImage}
                />
            </Card>




            {/* <TextInput
                placeholder="Image URL"
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
            /> */}
            <Card>
                <View
                    style={{
                        display: 'flex',
                        gap: 12,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: level && level > 0 ? 'space-between' : 'flex-start',
                        paddingHorizontal: sizes.XS,
                    }}       >
                    <Button
                        type={'outline'}
                        title={level && level > 0 ? `Level: ${level}` : "Select a level"}
                        onPress={() => {
                            setShowLevelPicker(!showLevelPicker)

                        }}
                    // buttonStyle={{ width: 56 }}

                    />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                        {showLevelPicker && difficultyLevels.map(level => (
                            <ListItem key={level}
                                onPress={() => {
                                    setLevel(level);
                                    setShowLevelPicker(false)
                                }} >
                                <ListItem.Content style={{ borderWidth: 1, borderStyle: 'solid', borderColor: colors.secondaryFont, borderRadius: 6, paddingVertical: 5, paddingHorizontal: 11, }}>
                                    <ListItem.Title style={{ fontSize: 14 }}>{level}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>

                        ))}
                    </View>
                </View>
            </Card>
            <Button
                title="Create Course"
                onPress={handleCreateCourse}
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
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default CreateCourse;
