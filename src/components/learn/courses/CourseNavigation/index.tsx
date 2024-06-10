import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '@rneui/themed';
import { UnitT } from '../../../../types/learning';
import { UserT } from '../../../../types/user';
import { sizes } from '../../../../styles/variables/measures';
import colors from '../../../../styles/variables/colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../../types/navigation';

interface CourseNavigationProps {
    units: UnitT[] | null;
    courseCreator: string;
    user: UserT;
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({
    units,
    courseCreator,
    user
}) => {
    const route = useRoute<RouteProp<RootStackParamList, 'Course'>>()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const courseId = route.params?.courseId
    const courseTitle = route.params?.courseTitle

    return (
        <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.S, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            {courseCreator !== user.id && <Icon
                name='compass'
                type="font-awesome"
                style={{ marginRight: sizes.XS }}
            />}
            {units && units.length > 0 ?
                units.map(unit => (
                    unit.lessons && unit.lessons.length > 0 ?
                        <View style={{
                            marginRight: sizes.XS,
                            alignItems: 'center',
                        }}>
                            <View key={unit.title} style={{ marginRight: sizes.XS, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                                {unit.lessons.map((lesson, index) => (
                                    <View key={index} style={{ width: 6, height: 10, backgroundColor: colors.confirmation, marginBottom: -2 }} />
                                ))}
                            </View>
                            {courseCreator === user.id && route.params && (
                                <Button
                                    key={unit.title}
                                    buttonStyle={{ padding: 0 }}
                                    title={'+ lessons'}
                                    titleStyle={{ color: colors.tertiary, fontSize: 14 }}
                                    type='clear'
                                    onPress={() => navigation.navigate('Create-lesson', {
                                        courseID: courseId,
                                        unitID: unit.id,
                                        unitTitle: unit.title
                                    })} />
                            )}
                        </View>
                        :
                        <View style={{
                            marginRight: sizes.XS,
                            paddingVertical: 4,
                            alignItems: 'center',
                            backgroundColor: colors.secondary,
                            borderRadius: sizes.XS
                        }}>
                            <Text style={{ fontSize: 12, color: colors.secondaryFont }}>{unit.title}</Text>
                            {courseCreator === user.id && route.params && (
                                <Button
                                    key={unit.title}
                                    buttonStyle={{ padding: 0 }}
                                    title={'+ lessons'}
                                    titleStyle={{ color: colors.tertiary, fontSize: 14 }}
                                    type='clear'
                                    onPress={() => navigation.navigate('Create-lesson', {
                                        courseID: courseId,
                                        unitID: unit.id,
                                        unitTitle: unit.title
                                    })} />
                            )}
                        </View>
                ))
                :
                <View style={{ marginHorizontal: sizes.M, marginVertical: sizes.M, flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                    {route.params && courseCreator === user.id && <Button
                        iconRight
                        title="Create a unit"
                        onPress={() => navigation.navigate('Create-courseUnit', {
                            courseId: courseId,
                            courseTitle: courseTitle,
                        })}
                    />}
                </View>
            }
            {route.params && courseCreator === user.id ? <Button
                iconRight
                title="+ unit"
                onPress={() => navigation.navigate('Create-courseUnit', {
                    courseId: courseId,
                    courseTitle: courseTitle,

                })}
            />
                :
                <Icon
                    name='flag'
                    type="font-awesome"

                />
            }
        </View>
    );
};

export default CourseNavigation;
