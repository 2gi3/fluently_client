import { Text } from '@rneui/themed'
import React from 'react'
import colors from '../../../../styles/variables/colors'
import { StyleSheet } from 'react-native'
import { FlatList, View } from 'react-native'



const DifficultyLevel = ({ level }: { level: number }) => {
    const levels = [1, 2, 3, 4, 5, 6]

    const renderItem = ({ item }: { item: number }) => (
        <View
            style={[item > level ? style.outlinedBar : style.solidBar, { height: (item * 2) + 2 }]}
        >
        </View>
    )

    return (

        <View
            style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}
        >
            <Text style={{ marginRight: 4 }}>Level:</Text>
            <FlatList
                data={levels}
                renderItem={renderItem}
                keyExtractor={(item, i) => `${item}-${i}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    solidBar: { width: 4, backgroundColor: colors.secondaryFont, marginBottom: -2, marginTop: 'auto', marginRight: 2 },
    outlinedBar: { width: 4, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2, marginTop: 'auto', marginRight: 2 }

})

export default DifficultyLevel



