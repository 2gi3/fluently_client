import React from 'react'
import { Button } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native"
import { sizes } from "../../../styles/variables/measures";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateNewUserField } from "../../../redux/slices/newUserSlice";
import styles from './styles';
import { globalStyles } from '../../../styles';

const GenderSelector = () => {
    const gender = useSelector((state: RootState) => state.newUser.newUser.gender);
    const dispatch = useDispatch();


    return (
        <View style={{ padding: sizes.XS, marginBottom: sizes.S }}>
            <Text style={[styles.selectorTitle, globalStyles.elementTitle]}>
                What is your gender?
            </Text>
            <View style={{ display: 'flex', gap: sizes.XS, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: sizes.XS }}>
                <Button
                    type={gender === 'female' ? 'solid' : 'outline'}
                    title="Female"
                    onPress={() => {
                        dispatch(updateNewUserField({ key: 'gender', value: 'female' }));

                    }}
                    // size="sm"
                    buttonStyle={{ width: 68 }}

                />
                <Button
                    type={gender === 'other' ? 'solid' : 'outline'}
                    title="Other"
                    onPress={() => {
                        dispatch(updateNewUserField({ key: 'gender', value: 'other' }));

                    }}
                    // size="sm"
                    buttonStyle={{ width: 68 }}

                />

                <Button
                    type={gender === 'male' ? 'solid' : 'outline'}
                    title="Male"
                    onPress={() => {
                        dispatch(updateNewUserField({ key: 'gender', value: 'male' }));
                    }}
                    // size="sm"
                    buttonStyle={{ width: 68 }}


                />
            </View>
        </View>
    )
}

export default GenderSelector