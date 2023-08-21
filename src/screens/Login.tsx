import { Button, Card, Icon, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { sizes } from "../styles/variables/measures";


const Login = () => {
    return (
        <ScrollView style={{
            marginHorizontal: sizes.S
        }}>
            <Card containerStyle={{
                maxWidth: 420,
                marginHorizontal: 'auto',
                marginVertical: sizes.L,
            }}>
                <Card.Title h3>Start learning</Card.Title>
                <Card.Divider />
                {/* <Card.Image
                    style={{ padding: 0 }}
                    source={{
                        uri:
                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    }}
                /> */}
                <View style={{
                    marginVertical: sizes.M,
                }}>
                    <Input
                        placeholder='Email'
                        errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID ERROR HERE'
                        style={{
                            paddingHorizontal: sizes.XS
                        }}
                        containerStyle={{
                            marginBottom: sizes.M,
                        }}
                    />

                    <Input
                        placeholder='Password'
                        errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID ERROR HERE'
                        style={{
                            paddingHorizontal: sizes.XS
                        }}
                    />
                </View>
                <Text style={{ marginBottom: sizes.M }}>
                    The idea with React Native Elements is more about component
                    structure than actual design.
                </Text>
                <Button
                    // icon={
                    //     <Icon
                    //         name="code"
                    //         color="#ffffff"
                    //         iconStyle={{ marginRight: 10 }}
                    //     />
                    // }
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Log in"
                />
            </Card>
        </ScrollView>



    )
}
export default Login

