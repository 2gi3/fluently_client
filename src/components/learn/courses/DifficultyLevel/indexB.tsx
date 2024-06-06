import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import colors from '../../../../styles/variables/colors'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'



const DifficultyLevel = ({ level }: { level: number }) => {
    const levels = [1, 2, 3, 4, 5, 6]

    const renderItem = (item: number) => (
        <View
        // style={[item <= level ? style.solidBar : style.outlinedBar, { height: item * 2 }]}
        >
        </View>
    )

    return (

        <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Text style={{ marginRight: 4 }}>Level aaa:</Text>
            {/* <FlatList
                data={levels}
                renderItem={renderItem}
                keyExtractor={(item, i) => `${item}-${i}`}
            /> */}
            {/* <View style={style.solidBar}> </View>
            <View style={{ width: 4, height: 4, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
            <View style={{ width: 4, height: 6, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
            <View style={{ width: 4, height: 8, backgroundColor: colors.secondaryFont, marginBottom: -2 }}> </View>
            <View style={style.outlinedBar}> </View>
            <View style={{ width: 4, height: 12, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View> */}
        </View>
    )
}

const style = StyleSheet.create({
    solidBar: { width: 4, backgroundColor: colors.secondaryFont, marginBottom: -2 },
    outlinedBar: { width: 4, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }

})

export default DifficultyLevel



