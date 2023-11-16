import { ListItem } from "@rneui/base";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateNewUserField } from "../../redux/slices/newUserSlice";
import { sizes } from "../../styles/variables/measures";
import { RootState } from "../../redux/store";
import { View, Text } from "react-native"
import { worldNationalities } from "../../data/worldNationalities";
import { Input } from "@rneui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const NationalityPicker = () => {
    const newUser = useSelector((state: RootState) => state.newUser.newUser);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const [src, setSrc] = useState("");



    return (
        <ListItem.Accordion
            containerStyle={{
                margin: 10,
                marginBottom: sizes.M,
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(134, 147, 158)',
                borderStyle: 'solid',
                paddingHorizontal: 0,
                padding: sizes.XS
            }}
            content={
                <>
                    <ListItem.Content
                        style={{ paddingHorizontal: sizes.XS }}
                    >
                        <ListItem.Title style={{ color: '#86939e', fontSize: 18 }}>Nationality</ListItem.Title>
                    </ListItem.Content>
                    {newUser.nationality && (
                        <View style={{ paddingHorizontal: sizes.XS }} >
                            <Text style={{ color: 'blakc', fontSize: 14 }}>
                                {newUser.nationality}
                            </Text>
                        </View>
                    )}
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
                setSrc('')
            }}
        >
            {
                expanded && (
                    <Input
                        placeholder="filter"
                        autoFocus={expanded}
                        value={src}
                        onChangeText={(text) => setSrc(text)}
                        errorStyle={{ color: 'red' }}
                        // errorMessage='ENTER A VALID ERROR HERE'
                        style={{
                            paddingHorizontal: sizes.XS,
                        }}
                        inputContainerStyle={{ borderWidth: 1, borderTopWidth: 0 }}
                        containerStyle={{
                            marginTop: -sizes.M,
                        }}
                    // rightIcon={(
                    //     <MaterialCommunityIcons
                    //         name="text-search"
                    //         size={24}
                    //         color={'#8e8e8f'}
                    //         style={{ marginLeft: 8 }}
                    //     />
                    // )}
                    />
                )
            }
            {worldNationalities.filter((nationality) => {
                if (src === "") {
                    return nationality;
                } else if (nationality.toLowerCase().includes(src.toLocaleLowerCase())) {
                    return nationality;
                }
            }).map((nationality: string, i: number) => {

                return (<>
                    <ListItem key={i}
                        bottomDivider
                        onPress={() => {
                            dispatch(updateNewUserField({ key: 'nationality', value: nationality }));
                            setExpanded(!expanded);
                        }} >
                        <ListItem.Content>
                            <ListItem.Title>{nationality}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </>
                )

            })}


        </ListItem.Accordion>
    )
}

export default NationalityPicker