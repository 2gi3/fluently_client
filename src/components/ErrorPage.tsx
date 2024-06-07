import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, Pressable, ScrollView, ActivityIndicator, ImageBackground } from "react-native"
import { Button, Text, Tile } from '@rneui/themed'
import { sizes } from '../styles/variables/measures'
import colors from '../styles/variables/colors'


const ErrorPage = ({ message, onPress }: { message?: string, onPress: () => {} }) => {
    useEffect(() => {
        console.log({ message })
    }, [message])
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Tile
                containerStyle={{ flex: 1, marginTop: sizes.S, maxWidth: sizes.XXL, minHeight: 220 }}
                imageContainerStyle={{ padding: sizes.S }}
                imageSrc={{
                    uri: '../../../../assets/images/error.png'
                }}

            />
            <View style={{ flex: 1, maxWidth: sizes.XXL, paddingHorizontal: sizes.S }}>
                {message ? (
                    <Text style={{ lineHeight: 20, color: colors.danger, fontSize: 16, fontWeight: '500' }} >{message}</Text>

                ) : (
                    <Text style={{ lineHeight: 20, color: colors.danger, fontSize: 16, fontWeight: '500' }} >There seems to be a problem.</Text>

                )}
                <Text style={{ lineHeight: 20, color: colors.danger, fontSize: 16, fontWeight: '500' }} >Please try again later.</Text>
                <Button
                    title="Retry"
                    onPress={onPress}
                    containerStyle={{ marginVertical: sizes.S, }}
                    titleStyle={{
                        color: colors.primaryFont,
                    }} />
            </View>
        </SafeAreaView>
    )
}

export default ErrorPage