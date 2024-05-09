import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { globalStyles } from '../../../styles'
import { Icon, Text } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../../styles/variables/colors'
import { sizes } from '../../../styles/variables/measures'
import MarkdownDisplay from '../../../components/learn/courses/MarkdownEditor'

const CoursePage = () => {
    const route = useRoute()
    const navigation = useNavigation()

    useEffect(() => {
        console.log({ par: route.params })
        //@ts-ignore
        navigation.setOptions({ title: route.params?.courseTitle, headerTitleAlign: 'center' })

    }, [])
    return (<ScrollView>
        <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.S, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Icon
                name='compass'
                type="font-awesome"
                style={{ marginRight: sizes.XS }}
            />
            <View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
            <View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
            <View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
            <View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
            <View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
            <Icon
                name='flag'
                type="font-awesome"
                style={{ marginLeft: sizes.XS }}

            />
        </View>
        <View style={globalStyles.container}>
            <View style={{}}>
                <Text>
                    {
                        //@ts-ignore
                        route.params?.courseSubheading
                    }
                </Text>
                <View style={{ marginTop: sizes.S, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                    <Text style={{ marginRight: 4 }}>Level:</Text>
                    <View style={{ width: 4, height: 4, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                    <View style={{ width: 4, height: 6, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                    <View style={{ width: 4, height: 8, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
                    <View style={{ width: 4, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
                    <View style={{ width: 4, height: 12, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
                </View>
                <View style={{ marginVertical: sizes.S, backgroundColor: '#cacaca', height: 180, width: 'auto' }}>              </View>
                <MarkdownDisplay />
            </View>
        </View >
        <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.S }}>
            <Text>
                {
                    //@ts-ignore
                    route.params?.courseGoalsMD
                }
            </Text>
        </View>
        <View style={globalStyles.container}>
            <Text style={{ padding: sizes.S, backgroundColor: colors.warning }}>
                {
                    //@ts-ignore
                    route.params?.courseRequirementsMD
                }
            </Text>
        </View>

    </ScrollView>

    )
}

export default CoursePage