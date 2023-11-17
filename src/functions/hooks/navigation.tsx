import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { IconLibraryT } from '../../types';
import colors from '../../styles/variables/colors';



export const useCustomTabIcon = (library: IconLibraryT, name: string, size = 25,) => {

    const Icon = library === 'MaterialIcons' ? MaterialIcons : Entypo;

    return ({ focused }: { focused: boolean }) => (
        <Icon name={focused ? name : `${name}-outline`} size={size} color={colors.secondaryFont} />
    );
};

