import { Avatar, Button, Divider, Icon, Input, ListItem, Overlay, Text, color } from "@rneui/base"
import { ScrollView, View } from "react-native"
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';
import { UserT } from "../../types/user";
import { sizes } from "../../styles/variables/measures";
import { useState } from "react";
import { useLogOut } from "../../functions/hooks/user";

const Dashboard = ({ user }: { user: UserT }) => {
    // const user = useSelector((state: RootState) => state.user.user);
    const logOut = useLogOut();
    const { XS, S, M, L, XL } = sizes

    const [overlayVisible, setOverlayVisible] = useState(false);
    const confirmationSentence: string = 'delete'
    const [confirmationInput, setConfirmationInput] = useState('')
    const [inputError, setInputError] = useState<string | undefined>()


    const handleDeleteAccount = async () => {
        if (confirmationSentence === confirmationInput.trim().toLocaleLowerCase()) {
            console.log(user.id)
            try {
                const response = await fetch(`http://192.168.43.235:3000/api/user/${user.id}`, {
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

    return (
        <ScrollView>
            <ListItem>
                <ListItem.Content style={{
                    alignItems: 'center',
                    paddingVertical: M
                }}>
                    <Avatar
                        size={XL}
                        rounded
                        source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                        title="Bj"
                        containerStyle={{ backgroundColor: 'grey' }}
                    >
                        <Avatar.Accessory size={23} />
                    </Avatar>
                    <View>
                        <Text h3 style={{ marginTop: S }}>{user.name}</Text>
                        <Text>{user.country}</Text>
                    </View>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <View style={{ marginVertical: M }}>
                <ListItem >
                    <ListItem.Content style={{ paddingTop: M }}>
                        <ListItem.Title>You are learning</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>{user.learning_language}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>


                {/* <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>You are helping with</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>{user.teaching_language}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem> */}

                <ListItem>
                    <ListItem.Content style={{ paddingBottom: M }}>
                        <ListItem.Title>About yourself</ListItem.Title>
                        <Avatar.Accessory size={23} />
                        {user.description ?
                            <ListItem.Subtitle style={{ marginTop: 5 }}>{user.description}</ListItem.Subtitle>
                            : <ListItem.Subtitle style={{ color: '#666666', marginTop: 5 }}>Tell us about yourself, how can you help people improve their language, and how would you like to be helped</ListItem.Subtitle>

                        }
                    </ListItem.Content>
                </ListItem>
                <Divider />
            </View>
            <ListItem>
                <ListItem.Content style={{ paddingVertical: M }}>
                    <ListItem.Title>Personal details:</ListItem.Title>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Email: <Text style={{ color: '#666666' }}>{user.email}</Text> </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Nationality: <Text style={{ color: '#666666' }}>{user.nationality}</Text></ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Native Language: <Text style={{ color: '#666666' }}>{user.native_language}</Text></ListItem.Subtitle>
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
