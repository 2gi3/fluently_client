import { Avatar, Button, Dialog, Divider, Icon, Input, ListItem, Overlay, Text, color } from "@rneui/base"
import { Image, ScrollView, TextInput, View } from "react-native"
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { UserT } from "../../types/user";
import { sizes } from "../../styles/variables/measures";
import { useEffect, useState } from "react";
import { useLogIn, useLogOut } from "../../functions/hooks/user";
import { updateUser } from "../../functions/user";
import ImagePickerExample from "./ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import { updateNewUserField } from "../../redux/slices/newUserSlice";
import { manipulateAsync } from "expo-image-manipulator";
import AuthInput from "./AuthInput";
import { studentName } from "../../regex";


const Dashboard = ({ user }: { user: UserT }) => {
    // const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const logIn = useLogIn()
    const logOut = useLogOut();
    const { XS, S, M, L, XL } = sizes

    const [overlayVisible, setOverlayVisible] = useState(false);
    const confirmationSentence: string = 'delete'
    const [confirmationInput, setConfirmationInput] = useState('')
    const [inputError, setInputError] = useState<string | undefined>()
    const [visible, setVisible] = useState(false);
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [nameVisible, setNameVisible] = useState(false);

    const [image, setImage] = useState<any>();
    const [displeyNameErrors, setDispleyNameErrors] = useState(false)

    const [introduction, setIntroduction] = useState<string | null>()
    const [name, setName] = useState<string>('')
    //@ts-ignore
    const updateUserEndpoint = `${process.env.SERVER_URL}/api/user/${user.id}`


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setVisible(true)
                // The Back-End accepts images ok max 100KB ( Back-End can be modified )
                const manipResult = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 150 } }],
                    { compress: 1 }
                )
                setImage(manipResult.uri);
            }
        }

    };







    const handleDeleteAccount = async () => {
        if (confirmationSentence === confirmationInput.trim().toLocaleLowerCase()) {
            console.log(user.id)
            try {
                //@ts-ignore
                const response = await fetch(`${process.env.SERVER_URL}/api/user/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response)

                if (response.status === 200) {
                    console.log('Account deleted successfully');
                    logOut();
                    setOverlayVisible(!overlayVisible);

                } else {
                    console.error('Failed to delete account');
                }

            } catch (error) {
                console.error('Error:', error);
            } finally {

            }
        } else {
            console.log('the words do not match')
        }

        // setOverlayVisible(!overlayVisible)
    }

    useEffect(() => {
        if (user.image) {
            setImage(user.image)
        } else {
            setImage('https://randomuser.me/api/portraits/lego/2.jpg')
        }

        // console.log(image)
    }, [])

    return (
        <ScrollView>
            <ListItem>
                <ListItem.Content style={{
                    alignItems: 'center',
                    paddingVertical: S
                }}>
                    <Avatar
                        size={XL}
                        rounded
                        source={{ uri: image }}
                        title="Hi"
                        containerStyle={{ backgroundColor: 'grey' }}
                    >
                        <Avatar.Accessory
                            onPress={() => {
                                pickImage()
                            }
                            }
                            size={23} />
                    </Avatar>

                    {visible && <Button
                        title="Confirm new picture"
                        onPress={async () => {
                            const data: any = await updateUser({ imageFile: image }, updateUserEndpoint);
                            user['image'] = data.image
                            logIn(user)
                            setVisible(false)
                        }}
                        containerStyle={{ marginTop: 25 }}

                    />

                    }
                    <View>
                        <View>
                            <Text h3 style={{ marginTop: S }}>{user.name}</Text>
                            <Avatar.Accessory
                                size={18}
                                onPress={() => {
                                    setNameVisible(!nameVisible)
                                }} />
                            <Dialog
                                isVisible={nameVisible}
                                onBackdropPress={() => setNameVisible(!nameVisible)}
                                overlayStyle={{ backgroundColor: '#ffffff', width: 'auto' }}
                            >

                                {/* <TextInput
                                    autoFocus={true}
                                    placeholder="Share about your Job or studies, hobbies, future goals and personal interests"
                                    multiline={false}
                                    // numberOfLines={8}
                                    style={{ padding: sizes.XS }}
                                    onChangeText={value => setName(value)}
                                /> */}
                                <AuthInput
                                    autoFocus={true}
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    onBlur={() => setDispleyNameErrors(true)}
                                    errorMessage={!displeyNameErrors || studentName.test(name) || name === '' ? undefined : 'The name can be either Thai or English, minimum 2 and maximum 20 characters'}
                                />
                                <Dialog.Actions>
                                    <Dialog.Button title="Upload name" onPress={async () => {
                                        const data: any = await updateUser({ name: name }, updateUserEndpoint);
                                        logIn(data.updatedUser)
                                        setNameVisible(false)
                                    }} />
                                </Dialog.Actions>
                            </Dialog>
                        </View>
                        <Text>{user.country}</Text>
                    </View>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <View style={{ marginVertical: M }}>

                {/* <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>You are helping with</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>{user.teaching_language}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem> */}

                <ListItem>
                    <ListItem.Content style={{ paddingBottom: M }}>
                        <ListItem.Title>About yourself</ListItem.Title>
                        <Avatar.Accessory
                            size={23}
                            onPress={() => {
                                setDescriptionVisible(!descriptionVisible)
                            }} />
                        <Dialog
                            isVisible={descriptionVisible}
                            onBackdropPress={() => setDescriptionVisible(!descriptionVisible)}
                            overlayStyle={{ backgroundColor: '#ffffff' }}
                        >

                            <TextInput
                                autoFocus={true}
                                placeholder="Share about your Job or studies, hobbies, future goals and personal interests"

                                multiline={true}
                                numberOfLines={8}
                                style={{ padding: sizes.XS }}
                                onChangeText={value => setIntroduction(value)}
                            />
                            <Dialog.Actions>
                                <Dialog.Button title="Upload description" onPress={async () => {
                                    const data: any = await updateUser({ description: introduction }, updateUserEndpoint);
                                    logIn(data.updatedUser)
                                    setDescriptionVisible(false)
                                }} />
                            </Dialog.Actions>
                        </Dialog>
                        {user.description ?
                            <ListItem.Subtitle style={{ marginTop: 5 }}>{user.description}</ListItem.Subtitle>
                            : <ListItem.Subtitle style={{ color: '#ff6666', marginTop: 5 }}>
                                To practice by having good conversations, write a good self introduction 😊

                            </ListItem.Subtitle>


                        }
                    </ListItem.Content>
                </ListItem>
                <Divider />
            </View>
            <ListItem>
                <ListItem.Content style={{ paddingVertical: S }}>
                    <ListItem.Title>Personal details:</ListItem.Title>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Email: <Text style={{ color: '#666666' }}>{user.email}</Text> </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Nationality: <Text style={{ color: '#666666' }}>{user.nationality}</Text></ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Native Language: <Text style={{ color: '#666666' }}>{user.native_language}</Text></ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>You are learning: {user.learning_language}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <Button
                size="md"
                type="outline"
                onPress={() => setOverlayVisible(!overlayVisible)}
                titleStyle={{ color: 'red' }}
                buttonStyle={{ borderColor: 'red', marginVertical: sizes.M, margin: 'auto', backgroundColor: '#ffffff' }}
            >Delete your profile</Button>
            <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)}
                overlayStyle={{ backgroundColor: 'white', padding: sizes.M }}>
                <Text style={{ marginBottom: sizes.M }} >
                    ⚠️ Warning: This action is irreversible!
                </Text>
                <Text style={{ marginBottom: sizes.M }} >

                    If you want to proceed, type <Text style={{ fontWeight: 'bold' }}>&apos;&nbsp;{confirmationSentence}&nbsp;&apos; </Text> in the input below:
                </Text>
                <Input
                    autoFocus={true}
                    placeholder="Type here"
                    value={confirmationInput}
                    onChangeText={(text) => {
                        setConfirmationInput(text);
                        if (confirmationSentence === confirmationInput.toLocaleLowerCase()) {
                            setInputError(undefined)
                        }
                    }}
                    errorStyle={{ color: 'red' }}
                    onBlur={() => {
                        if (confirmationSentence !== confirmationInput.toLocaleLowerCase()) {
                            setInputError(`Type the word: '${confirmationSentence}' in the input above`)
                        } else {
                            setInputError(undefined)
                        }
                    }}
                    errorMessage={inputError}
                    style={{
                        paddingHorizontal: sizes.XS
                    }}
                    containerStyle={{
                        marginBottom: sizes.M,
                    }}
                />
                <View style={{ display: 'flex', gap: sizes.M, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                    <Button
                        type="outline"
                        icon={
                            <Icon
                                name="close"
                                type="material-icons"
                                color="rgb(32, 137, 220)"
                                size={25}
                            // iconStyle={}
                            />
                        }
                        // title="Try again"
                        onPress={() => {
                            setOverlayVisible(!overlayVisible);
                            setInputError(undefined);
                            setConfirmationInput('')
                        }}
                        buttonStyle={{ width: 'auto', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                    />

                    <Button
                        title="Delete account"
                        buttonStyle={{ backgroundColor: 'red' }}
                        titleStyle={{ color: 'white' }}
                        onPress={() => handleDeleteAccount()}

                    />
                </View>
            </Overlay>
        </ScrollView>
    )
}

export default Dashboard;
