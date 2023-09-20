// AuthInput.js
import React, { useState } from 'react';
import { Input, Text } from "@rneui/base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthInputProps } from '../../types/user';
import { sizes } from '../../styles/variables/measures';

const AuthInput = ({
  autoFocus = false,
  placeholder,
  value,
  onChangeText,
  onBlur,
  errorMessage,
  secureTextEntry,
}: AuthInputProps) => {
  const [hideText, setHideText] = useState(true);

  return (
    <>
      <Input
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={{
          paddingHorizontal: sizes.XS
        }}
        errorStyle={{ color: 'red', display: errorMessage ? 'flex' : 'none', maxWidth: 220, margin: 'auto', marginTop: sizes.S }}
        errorMessage={errorMessage}
        secureTextEntry={secureTextEntry ? hideText : false}
        containerStyle={{
          marginBottom: sizes.M
        }}
      // rightIcon={secureTextEntry && (
      //   <MaterialCommunityIcons
      //     onPress={() => setHideText(!hideText)}
      //     name={hideText ? "eye-outline" : "eye-off-outline"}
      //     size={24}
      //     color={'#8e8e8f'}
      //     style={{ marginLeft: 8 }}
      //   />
      // )}
      />
    </>
  );
};

export default AuthInput;
