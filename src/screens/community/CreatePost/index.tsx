import { View, Text, ScrollView, TextInput } from "react-native"
import React, { useState } from "react";
import { Overlay, Skeleton } from "@rneui/base";
import { sizes } from "../../../styles/variables/measures";
import { Button, Card, CheckBox, ListItem } from "@rneui/themed";



const CreatePost = () => {
    const [loading, setLoading] = useState(false)
    const [postType, setPostType] = useState<null | 'question' | 'moment'>(null)
    const [title, setTitle] = useState<null | string>(null)
    const [expanded, setExpanded] = React.useState(false);



    if (loading) {
        return (
            <View style={{ display: 'flex', flexDirection: 'column', gap: sizes.M, padding: sizes.L }}>
                <Skeleton
                    circle
                    animation="wave"
                    width={80}
                    height={80}
                />
                <Skeleton
                    animation="wave"
                    width={180}
                    height={80}
                />

                <Skeleton
                    animation="wave"
                    width={220}
                    height={40}
                />
                <Skeleton
                    animation="wave"
                    width={220}
                    height={40}
                />

            </View>

        )
    } else {
        return (
            <ScrollView>
                <Card >
                    <Card.Title>What would you like to share?</Card.Title>
                    {/* <Card.Divider /> */}

                    <View style={{ display: 'flex', flexDirection: 'row', gap: sizes.S }}>
                        <CheckBox
                            title="A question"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={postType === 'question'}
                            onPress={() => setPostType('question')}
                        />
                        <CheckBox
                            title="A moment"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
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
                <Card>
                    <ListItem.Accordion
                        content={
                            <ListItem.Content>
                                <ListItem.Title>Select a topic</ListItem.Title>
                                {postType && <ListItem.Subtitle>{postType}</ListItem.Subtitle>}
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
                                checked={postType === 'question'}
                                onPress={() => {
                                    setPostType('question');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="Past tense"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={postType === 'moment'}
                                onPress={() => {
                                    setPostType('moment');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="questions"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={postType === 'question'}
                                onPress={() => {
                                    setPostType('question');
                                    setExpanded(false)
                                }}
                            />
                            <CheckBox
                                title="Future tense"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={postType === 'moment'}
                                onPress={() => {
                                    setPostType('moment');
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
            </ScrollView >
        );
    }
};
export default CreatePost

{/* {showCount && <View style={{ margin: 'auto' }}>
                        <Text style={{ color: colors.danger, fontSize: 14, fontWeight: '500' }}>Remaining attempts: {count}</Text>
                    </View>
                    } */}