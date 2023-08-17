import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { IconLibraryT } from '../../types';



export const useCustomTabIcon = (library: IconLibraryT, name: string, size = 25, color = '#8e8e8f', focusedColor = '#007aff') => {

    const Icon = library === 'MaterialIcons' ? MaterialIcons : Entypo;

    return ({ focused }: { focused: boolean }) => (
        <Icon name={name} size={size} color={focused ? focusedColor : color} />
    );
};

