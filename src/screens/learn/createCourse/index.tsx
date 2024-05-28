import { View, Text, ScrollView, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { sizes } from "../../../styles/variables/measures";
import { Button, Card, CheckBox, ListItem } from "@rneui/themed";
import colors from "../../../styles/variables/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CourseT } from "../../../types/learning";
import MarkdownDisplay from "../../../components/learn/courses/MarkdownEditor";
import MarkdownEditor from "../../../components/learn/courses/MarkdownEditor";

const CreateCourse = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);

    const [title, setTitle] = useState('');
    const [subheading, setSubheading] = useState('');
    const [introductionMD, setIntroductionMD] = useState('');
    const [goalsMD, setGoalsMD] = useState('');
    const [requirementsMD, setRequirementsMD] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [mediumLanguage, setMediumLanguage] = useState<'english' | 'thai'>('thai');
    const [learningLanguage, setLearningLanguage] = useState<'english' | 'thai'>('english');
    const [level, setLevel] = useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [expandedMedium, setExpandedMedium] = React.useState(false);

    const randomNumber = Math.floor(Math.random() * 1000000)

    const handleCreateCourse = () => {


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
            imageUrl,
            level,
            created_at: new Date(),
            units: []
        };

        console.log({
            newCourse
        });
    };

    return (
        <ScrollView>
            <Card>
                <Card.Title>Create a New Course</Card.Title>




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












                {/* <TextInput
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                /> */}
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
                        onChangeText={setTitle}
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
                <TextInput
                    placeholder="Goals"
                    style={styles.input}
                    value={goalsMD}
                    onChangeText={setGoalsMD}
                />
                <TextInput
                    placeholder="Requirements"
                    style={styles.input}
                    value={requirementsMD}
                    onChangeText={setRequirementsMD}
                />
                <TextInput
                    placeholder="Video URL"
                    style={styles.input}
                    value={videoUrl}
                    onChangeText={setVideoUrl}
                />
                <TextInput
                    placeholder="Image URL"
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={setImageUrl}
                />
                <TextInput
                    placeholder="Level"
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(level)}
                    onChangeText={(text) => setLevel(Number(text))}
                />
                <Button
                    title="Create Course"
                    onPress={handleCreateCourse}
                />
            </Card>
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
