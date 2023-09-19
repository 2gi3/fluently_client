import { ListItem } from "@rneui/base";
import { worldLanguages } from "../data/worldLanguages"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateNewUserField } from "../redux/slices/newUserSlice";
import { sizes } from "../styles/variables/measures";
import { RootState } from "../redux/store";
import { View, Text } from "react-native"



const LanguagePicker = () => {
  const newUser = useSelector((state: RootState) => state.newUser.newUser);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);


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
            <ListItem.Title style={{ color: '#86939e', fontSize: 18 }}>Native Language</ListItem.Title>
          </ListItem.Content>
          {newUser.native_language && (
            <View style={{ paddingHorizontal: sizes.XS }} >
              <Text style={{ color: 'blakc', fontSize: 14 }}>
                {newUser.native_language}
              </Text>
            </View>
          )}
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {worldLanguages.map((language: string, i: number) => {

        return (<>
          <ListItem key={i}
            bottomDivider
            onPress={() => {
              dispatch(updateNewUserField({ key: 'native_language', value: language }));
              setExpanded(!expanded);
            }} >
            <ListItem.Content>
              <ListItem.Title>{language}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </>
        )

      })}


    </ListItem.Accordion>
  )
}

export default LanguagePicker