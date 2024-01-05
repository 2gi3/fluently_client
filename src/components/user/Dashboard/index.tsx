import { Avatar, Button, Card, Dialog, Divider, Icon, Input, ListItem, Overlay, Text, } from "@rneui/themed"
import { Image, ScrollView, TextInput, View } from "react-native"
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { UpdatedUserResponse, UserT } from "../../../types/user";
import { sizes } from "../../../styles/variables/measures";
import React, { useEffect, useState } from "react";
import { useLogIn, useLogOut } from "../../../functions/hooks/user";
import { updateUser } from "../../../functions/user";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from "expo-image-manipulator";
import AuthInput from "./../Authentication/AuthInput";
import { studentName } from "../../../regex";
import colors from "../../../styles/variables/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import LocationSelector from "../selectors/LocationSelector";
import { useManageSavedPosts } from "../../../functions/hooks/community";


const Dashboard = ({ user }: { user: UserT }) => {
    const { secondary } = colors
    const socketUrl = useSelector((state: RootState) => state.status.socketUrl)
    const dispatch = useDispatch();
    const logIn = useLogIn()
    const logOut = useLogOut();
    const { XS, S, M, L, XL } = sizes
    const { savedPosts } = useManageSavedPosts()
    const [overlayVisible, setOverlayVisible] = useState(false);
    const confirmationSentence: string = 'delete'
    const [confirmationInput, setConfirmationInput] = useState('')
    const [inputError, setInputError] = useState<string | undefined>()
    const [visible, setVisible] = useState(false);
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [nameVisible, setNameVisible] = useState(false);

    const [image, setImage] = useState<string | undefined>();
    const [displeyNameErrors, setDispleyNameErrors] = useState(false)

    const [introduction, setIntroduction] = useState<string | null>()
    const [name, setName] = useState<string>('')
    const baseUrl = process.env.SERVER_URL
    const updateUserEndpoint = `${baseUrl}/api/user/${user.id}`


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


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
        const accessToken = await AsyncStorage.getItem('speaky-access-token')

        if (confirmationSentence === confirmationInput.trim().toLocaleLowerCase()) {
            try {
                const response = await fetch(`${baseUrl}/api/user/${user.id}`, {
                    method: 'DELETE',
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': JSON.parse(accessToken!),

                    }
                });

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
    }

    useEffect(() => {
        if (user.image) {
            setImage(user.image)
        } else {
            setImage('https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp')
        }

    }, [socketUrl])
    useEffect(() => {
        console.log({ 's.p.': savedPosts })
    }, [savedPosts])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Card> */}
            <View style={styles.content}>
                <View style={{ margin: 'auto' }}>

                    <Avatar
                        size={sizes.XL}
                        rounded
                        source={{ uri: image }}
                        title="Hi"
                        containerStyle={styles.avatarContainer}
                    >
                        <Avatar.Accessory
                            onPress={() => {
                                pickImage();
                            }}
                            size={23}
                        />
                    </Avatar>

                    {visible && (
                        <Button
                            title="Confirm new picture"
                            onPress={async () => {
                                const data = await updateUser({ image: image }, updateUserEndpoint);
                                user['image'] = data.image;
                                logIn(user);
                                setVisible(false);
                            }}
                            containerStyle={styles.buttonContainer}
                        />
                    )}
                    <View style={{ marginTop: sizes.S, marginBottom: 0 }}>
                        <Card.Title h3 >{user.name}</Card.Title>
                        <Avatar.Accessory size={18} style={{ marginBottom: sizes.S }} onPress={() => setNameVisible(!nameVisible)} />
                        <Dialog isVisible={nameVisible} onBackdropPress={() => setNameVisible(!nameVisible)} overlayStyle={styles.dialogOverlay}>
                            <AuthInput
                                autoFocus={true}
                                placeholder="Name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                                onBlur={() => setDispleyNameErrors(true)}
                                errorMessage={!displeyNameErrors || studentName.test(name) || name === '' ? undefined : 'The name can be either Thai or English, minimum 2 and maximum 20 characters'}
                            />
                            <Dialog.Actions>
                                <Dialog.Button
                                    title="Upload name"
                                    onPress={async () => {
                                        const data: UpdatedUserResponse = await updateUser({ name: name }, updateUserEndpoint);
                                        console.log({ data });
                                        logIn(data.updatedUser);
                                        setNameVisible(false);
                                    }}
                                />
                            </Dialog.Actions>
                        </Dialog>
                    </View>
                    {user.country ? <Text>{user.country}</Text>
                        : <Text>Share the name of your city</Text>}
                    <LocationSelector userId={user.id!} />


                </View>
            </View>
            {/* </Card> */}

            <View style={styles.content}>
                <ListItem>
                    <ListItem.Content style={{ paddingBottom: sizes.M }}>
                        <Card.Title h4>About yourself</Card.Title>
                        <Avatar.Accessory size={23} onPress={() => setDescriptionVisible(!descriptionVisible)} />
                        <Dialog isVisible={descriptionVisible} onBackdropPress={() => setDescriptionVisible(!descriptionVisible)} overlayStyle={{ backgroundColor: secondary }}>
                            <TextInput
                                autoFocus={true}
                                placeholder="Share about your Job or studies, hobbies, future goals and personal interests"
                                multiline={true}
                                numberOfLines={8}
                                style={{ padding: sizes.XS }}
                                onChangeText={(value) => setIntroduction(value)}
                            />
                            <Dialog.Actions>
                                <Dialog.Button
                                    title="Upload description"
                                    onPress={async () => {
                                        const data: UpdatedUserResponse = await updateUser({ description: introduction }, updateUserEndpoint);
                                        logIn(data.updatedUser);
                                        setDescriptionVisible(false);
                                    }}
                                />
                            </Dialog.Actions>
                        </Dialog>
                        {user.description ? (
                            <ListItem.Subtitle style={styles.descriptionSubtitle}>{user.description}</ListItem.Subtitle>
                        ) : (
                            <ListItem.Subtitle style={{ color: colors.danger, marginTop: sizes.M }}>
                                Good self introductions facilitate good conversations 😊
                            </ListItem.Subtitle>
                        )}
                    </ListItem.Content>
                </ListItem>
                <Divider />
            </View>
            <View>
                <ListItem.Content style={styles.content}>
                    <ListItem.Title>Personal details:</ListItem.Title>
                    <ListItem.Subtitle style={styles.personalDetailsSubtitle}>
                        Email: <Text style={{ color: '#666666' }}>{user.email}</Text>{' '}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.personalDetailsSubtitle}>
                        Nationality: <Text style={{ color: '#666666' }}>{user.nationality}</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.personalDetailsSubtitle}>
                        Native Language: <Text style={{ color: '#666666' }}>{user.native_language}</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.personalDetailsSubtitle}>You are learning: {user.learning_language}</ListItem.Subtitle>
                </ListItem.Content>
            </View>
            <View style={styles.content}>

                <Button
                    size="md"
                    type="outline"
                    onPress={() => setOverlayVisible(!overlayVisible)}
                    titleStyle={{ color: 'red' }}
                    buttonStyle={styles.deleteButton}
                    containerStyle={{ margin: 'auto' }}
                >
                    Delete your profile
                </Button>
            </View>
            <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)} overlayStyle={styles.overlayContainer}>
                <Text style={styles.overlayText}>⚠️ Warning: This action is irreversible!</Text>
                <Text style={styles.overlayText}>
                    If you want to proceed, type <Text style={{ fontWeight: 'bold' }}>&apos;&nbsp;{confirmationSentence}&nbsp;&apos; </Text> in the input below:
                </Text>
                <Input
                    autoFocus={true}
                    placeholder="Type here"
                    value={confirmationInput}
                    onChangeText={(text) => {
                        setConfirmationInput(text);
                        if (confirmationSentence === confirmationInput.toLocaleLowerCase()) {
                            setInputError(undefined);
                        }
                    }}
                    errorStyle={{ color: colors.danger }}
                    onBlur={() => {
                        if (confirmationSentence !== confirmationInput.toLocaleLowerCase()) {
                            setInputError(`Type the word: '${confirmationSentence}' in the input above`);
                        } else {
                            setInputError(undefined);
                        }
                    }}
                    errorMessage={inputError}
                    style={styles.overlayInput}
                    containerStyle={{
                        marginBottom: sizes.M,
                    }}
                />
                <View style={styles.overlayButtonContainer}>
                    <Button
                        type="outline"
                        icon={<Icon name="close" type="material-icons" color={colors.tertiary} size={25} />}
                        onPress={() => {
                            setOverlayVisible(!overlayVisible);
                            setInputError(undefined);
                            setConfirmationInput('');
                        }}
                        buttonStyle={styles.closeButton}
                    />
                    <Button title="Delete account" buttonStyle={styles.deleteAccountButton} titleStyle={{ color: colors.secondary }} onPress={() => handleDeleteAccount()} />
                </View>
            </Overlay>
        </ScrollView>
    )
}

export default Dashboard;
