import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconLibraryT } from '../../types';
import colors from '../../styles/variables/colors';



export const useCustomTabIcon = (library: IconLibraryT, name: string, size = 25,) => {

    // const Icon = library === 'MaterialIcons' ? MaterialIcons : Entypo;

    let Icon;

    switch (library) {
        case 'MaterialIcons':
            Icon = MaterialIcons;
            break;
        case 'Entypo':
            Icon = Entypo;
            break;
        case 'Ionicons':
            Icon = Ionicons;
            break;
        default:
            Icon = Entypo;
        // throw new Error(`Unsupported icon library: ${library}`);
    }

    return ({ focused }: { focused: boolean }) => (
        <Icon name={focused ? name : `${name}-outline`} size={size} color={colors.secondaryFont} />
    );
};

