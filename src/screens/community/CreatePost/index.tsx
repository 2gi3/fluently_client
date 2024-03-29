import { View, Text, ScrollView, TextInput, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react";
import { Overlay, Skeleton } from "@rneui/base";
import { sizes } from "../../../styles/variables/measures";
import { Button, Card, CheckBox, ListItem } from "@rneui/themed";
import colors from "../../../styles/variables/colors";
import useImagePicker from "../../../functions/hooks";
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCreatePost } from "../../../functions/hooks/community";
import { PostT } from "../../../types/community";




const CreatePost = () => {
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user);
    const [postType, setPostType] = useState<null | 'question' | 'moment'>(null)
    const [title, setTitle] = useState('')
    const [expanded, setExpanded] = React.useState(false);
    const { image, pickImage } = useImagePicker();
    const [topic, setTopic] = useState<null | string>(null)
    const [body, setBody] = useState<null | string>(null)


    const postData: PostT = {
        userId: user.id!,
        type: postType || 'moment',
        topic,
        image,
        title,
        body,

    }

    const { createPost, loading, error, success } = useCreatePost()

    useEffect(() => {
        navigation.setOptions({
            title: postType === 'moment' ? 'Your story matters'
                : postType === 'question' ? 'Let\'s do this together'
                    : 'Embrace our community',
            headerTitleAlign: 'center'

        })
    }, [postType])

    if (loading) {
        return (
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.tertiary} />

            </View>

        )
    } else {
        return (
            <ScrollView>
                <Card >
                    <Card.Title>Would you like to:</Card.Title>
                    {/* <Card.Divider /> */}

                    <View style={{ display: 'flex', flexDirection: 'row', gap: sizes.S }}>
                        <CheckBox
                            title="Ask a question"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            textStyle={{ fontWeight: 'normal' }}
                            checked={postType === 'question'}
                            onPress={() => setPostType('question')}
                        />
                        <CheckBox
                            title="Share a moment"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            textStyle={{ fontWeight: 'normal' }}
                            checked={postType === 'moment'}
                            onPress={() => setPostType('moment')}
                        />
                        {/* <Button
                            type="outline"
                            iconRight
                            // icon={
                            //     <Icon
                            //         name="navigate-next"
                            //         color={primaryFont}
                            //         iconStyle={{ marginLeft: 10, marginBottom: -1 }}
                            //     />
                            // }
                            // buttonStyle={globalStyles.whideButton}
                            title="Question"
                            onPress={() => console.log('post a question')}
                        />
                        <Button
                            type="outline"
                            iconRight
                            // icon={
                            //     <Icon
                            //         name="navigate-next"
                            //         color={primaryFont}
                            //         iconStyle={{ marginLeft: 10, marginBottom: -1 }}
                            //     />
                            // }
                            // buttonStyle={globalStyles.whideButton}
                            title="Moment"
                            onPress={() => console.log('Share a moment')}
                        /> */}
                    </View>


                    {/* <Card.Divider style={{
                        marginBottom: sizes.M,
                    }} /> */}
                    {/* <Text style={{
                        marginBottom: sizes.S,
                    }} >You don't have an account yet?</Text>
                    <Button type="outline" onPress={() => toggleLoginState(false)}>
                        Create an account
                    </Button> */}

                    {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                        overlayStyle={{ backgroundColor: secondary, padding: sizes.M }}>
                        <Text style={{ marginVertical: sizes.M }} >{errorMessage}</Text>


                        <Button
                            icon={
                                <Icon
                                    name="close"
                                    type="material-icons"
                                    color={secondary}
                                    size={25}
                                // iconStyle={}
                                />
                            }
                            // title="Try again"
                            onPress={toggleOverlay}
                            buttonStyle={{ width: 'auto', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        />
                    </Overlay> */}
                    {/* </View> */}

                </Card>
                {postType === 'question' && <Card>
                    <ListItem.Accordion
                        content={
                            <ListItem.Content>
                                <ListItem.Title>Select a topic</ListItem.Title>
                                {postType && <ListItem.Subtitle>{topic}</ListItem.Subtitle>}
                            </ListItem.Content>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}
                    >
                        <ListItem containerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                            <CheckBox
                                title="Pronouns"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={topic === 'Pronouns'}
                                onPress={() => {
                                    setTopic('Pronouns');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="Past tense"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={topic === 'Past tense'}
                                onPress={() => {
                                    setTopic('Past tense');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="verbs"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={topic === 'verbs'}
                                onPress={() => {
                                    setTopic('verbs');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="Future tense"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={topic === 'Future tense'}
                                onPress={() => {
                                    setTopic('Future tense');
                                    setExpanded(false)
                                }}
                            />
                        </ListItem>
                        {/* <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Albert</ListItem.Title>
            <ListItem.Subtitle>Staff Engineer</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem> */}
                    </ListItem.Accordion>
                </Card>}
                {postType &&
                    <>
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
                        <Card >
                            <Card.Title>Give your {postType} a title</Card.Title>
                            <TextInput
                                // autoFocus={true}
                                placeholder="Maximum 100 leters"
                                multiline={true}
                                numberOfLines={4}
                                // style={{ padding: title ? sizes.XS : null }}
                                style={{ paddingLeft: 4 }}
                                onChangeText={(value) => setTitle(value)}
                            />
                        </Card>
                        <Card >
                            <Card.Title>Add more informations</Card.Title>
                            <TextInput
                                // autoFocus={true}
                                placeholder="Maximum 600 leters"
                                multiline={true}
                                numberOfLines={8}
                                // style={{ padding: title ? sizes.XS : null }}
                                style={{ paddingLeft: 4 }}
                                onChangeText={(value) => setBody(value)}
                            />
                        </Card>
                        <Button
                            title={`Post your ${postType}`}
                            containerStyle={{
                                margin: sizes.S,
                                marginBottom: sizes.L
                            }}
                            // loading={false}
                            // loadingProps={{ size: 'small', color: 'black' }}
                            // icon={{
                            //     name: 'plus',
                            //     type: 'ant-design',
                            //     size: sizes.M,
                            //     color: colors.tertiary,
                            // }}
                            onPress={() => {
                                console.log({ postData });
                                createPost(postData)
                            }}
                        />
                    </>
                }

            </ScrollView >
        );
    }
};
export default CreatePost

{/* {showCount && <View style={{ margin: 'auto' }}>
                        <Text style={{ color: colors.danger, fontSize: 14, fontWeight: '500' }}>Remaining attempts: {count}</Text>
                    </View>
                    } */}