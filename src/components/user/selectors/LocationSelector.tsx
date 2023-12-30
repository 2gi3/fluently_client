import React, { useState } from 'react'
import { Button, Dialog, Text } from "@rneui/themed"
import { View, ActivityIndicator } from "react-native"
import { useLogIn } from '../../../functions/hooks/user'
import { updateUser } from '../../../functions/user'
import { UpdatedUserResponse } from '../../../types/user'
import * as Location from 'expo-location'
import colors from '../../../styles/variables/colors'
import { sizes } from '../../../styles/variables/measures'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/userSlice'



const LocationSelector = ({ userId }: { userId: string | number }) => {
    const dispatch = useDispatch()
    const baseUrl = process.env.SERVER_URL

    const updateUserEndpoint = `${baseUrl}/api/user/${userId}`



    const [dialogVisible, setDialogVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);


    const fetchLocationData = async () => {
        try {
            setLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            // @ts-ignore
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            const data = await res.json();

            // Extract city and country from the response
            if (data && data.name && data.sys && data.sys.country) {
                setCity(data.name);
                setCountry(data.sys.country);
                console.log({
                    city: data.name,
                    country: data.sys.country
                })
                return `${data.name}, ${data.sys.country}`
            }
        } catch {
            setError('Could not fetch location');
        } finally {
            setLoading(false);
        }
    }

    return (
        loading ? <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: sizes.L }}>
            <ActivityIndicator size="large" color={colors.tertiary} />
        </View> :
            <View style={{ marginTop: sizes.XS }}>
                {/* <Text>Share the name of</Text>
                <Text>Your City</Text> */}
                <Dialog
                    isVisible={dialogVisible}
                    onBackdropPress={() => setDialogVisible(!dialogVisible)}
                    overlayStyle={{
                        backgroundColor: colors.secondary,
                        width: 'auto',
                    }}>
                    <View style={{
                        marginBottom: sizes.S
                    }}>
                        <Text>
                            We only detect the name of your city when you update it
                        </Text>
                    </View>
                    <Dialog.Actions>

                        <Dialog.Button
                            type='solid'
                            title="Update city"
                            containerStyle={{
                                marginLeft: sizes.S
                            }}
                            onPress={async () => {
                                const country = await fetchLocationData();
                                const data = await updateUser({ country }, updateUserEndpoint);
                                console.log({ user: data })
                                await AsyncStorage.setItem('@user', JSON.stringify(data.updatedUser));
                                dispatch(setUser(data.updatedUser))
                                setDialogVisible(!dialogVisible)
                            }}
                        />
                        <Dialog.Button
                            type='clear'
                            title="Cancel"
                            titleStyle={{
                                color: colors.danger
                            }}
                            onPress={async () => {
                                setDialogVisible(!dialogVisible)
                            }}
                        />
                    </Dialog.Actions>
                </Dialog>
                <Button
                    type='outline'
                    title="Update location"
                    onPress={() => setDialogVisible(!dialogVisible)}
                >

                </Button>
            </View>

    )
}
export default LocationSelector