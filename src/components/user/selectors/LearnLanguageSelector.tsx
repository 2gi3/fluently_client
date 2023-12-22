import React from 'react'
import { Button } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native"
import { sizes } from "../../../styles/variables/measures";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateNewUserField } from "../../../redux/slices/newUserSlice";
import styles from './styles';
import { globalStyles } from '../../../styles';

const LearnLanguageSelector = () => {
    const learningLanguage = useSelector((state: RootState) => state.newUser.newUser.learning_language);
    const dispatch = useDispatch();


    return (
        <View style={{ padding: sizes.XS, marginBottom: sizes.S, marginTop: sizes.XS }}>
            <Text style={[styles.selectorTitle, globalStyles.elementTitle]}>
                Which language are you learning?
            </Text>
            <View style={{ display: 'flex', gap: sizes.S, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: sizes.XS }}>
                <Button
                    type={learningLanguage === 'Thai' ? 'solid' : 'outline'}
                    title="Thai"
                    onPress={() => {
                        dispatch(updateNewUserField({ key: 'learning_language', value: 'Thai' }));

                    }}
                    buttonStyle={{ width: 78 }}

                />

                <Button
                    type={learningLanguage === 'English' ? 'solid' : 'outline'}
                    title="English"
                    onPress={() => {
                        dispatch(updateNewUserField({ key: 'learning_language', value: 'English' }));
                    }}
                    buttonStyle={{ width: 78 }}


                />
            </View>
        </View>
    )
}

export default LearnLanguageSelector