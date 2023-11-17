import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sizes } from '../../styles/variables/measures';
import { TopTabButtonProps } from '../../types/navigation';

const TopTabButton = ({ onPress, label, iconName, disabled = false }: TopTabButtonProps) => {
    return (
        <Button
            disabled={disabled}
            type="outline"
            onPress={onPress}
            style={{ marginRight: sizes.S, display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}
        >
            {label && <Text style={{ marginRight: sizes.XS }}>{label}</Text>}
            <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={'#8e8e8f'}
            />
        </Button>
    );
};

export default TopTabButton;
