import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { globalStyles } from '../../../styles'
import { Button, Icon, Text } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../../styles/variables/colors'
import { sizes } from '../../../styles/variables/measures'
import MarkdownDisplay from '../../../components/learn/courses/MarkdownEditor'
import { UnitT } from '../../../types/learning'

const CourseIntroduction = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [units, setUnits] = useState<UnitT[] | null>(null)


    useEffect(() => {

        //@ts-ignore
        navigation.setOptions({ title: route.params?.courseTitle, headerTitleAlign: 'center' })
        //@ts-ignore

        if (route.params && route.params.units) {
            //@ts-ignore
            const units: any[] = route.params.units.map(unit => ({
                title: unit.title,
                lessons: unit.lessons.map(lesson => lesson.title)
            }))
            setUnits(units)
        }

    }, [route.params])

    return (<ScrollView>
        {units ?
            <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.S, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                <Icon
                    name='compass'
                    type="font-awesome"
                    style={{ marginRight: sizes.XS }}
                />
                {
                    units.map(
                        unit => {
                            return (
                                <View key={unit.title} style={{ marginRight: sizes.XS, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>


                                    {unit.lessons.map((lesson, index) => (
                                        <View key={index} style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }} />
                                    ))}

                                </View>
                            )
                        }
                    )
                }
                <Icon
                    name='flag'
                    type="font-awesome"

                />
            </View>
            :
            <View>
                <Text>
                    Add some units to your course
                </Text>
            </View>
        }
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
                {/* <MarkdownDisplay /> */}
                <View
                // style={{ position: 'relative', marginHorizontal: sizes.M, marginTop: sizes.S, marginBottom: sizes.M }}
                >
                    <Text style={{ fontWeight: 'bold', marginTop: sizes.M, marginBottom: sizes.XS }}>
                        Goals:
                    </Text>
                    <Text>
                        {
                            //@ts-ignore
                            route.params?.courseGoalsMD
                        }
                    </Text>
                </View>
                <View style={{ position: 'relative', marginTop: sizes.M, backgroundColor: colors.warning, padding: sizes.S }}>

                    <Text style={{ position: 'absolute', top: -8, left: 0, fontWeight: 'bold' }}>Prerequisites:</Text>
                    <Text >

                        {
                            //@ts-ignore
                            route.params?.courseRequirementsMD
                        }
                    </Text>
                    <Icon
                        name='warning'
                        type="font-awesome"
                        size={16}
                        style={{ marginLeft: 'auto', marginBottom: 0, zIndex: 2 }}
                    />
                </View>
            </View>
        </View >

        <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.M, flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
            <Button
                iconRight
                // buttonStyle={styles.buttonStylePrimary}
                title="Start Now"
                onPress={async () => {
                    console.log('98709')
                }}
            />
        </View>

    </ScrollView>

    )
}

export default CourseIntroduction




{/* <View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View>
<View style={{ width: 6, height: 10, backgroundColor: colors.primaryLight, borderColor: colors.primaryFont, borderStyle: 'solid', borderWidth: 1, marginBottom: -2 }}> </View> */}
