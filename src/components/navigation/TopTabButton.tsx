import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sizes } from '../../styles/variables/measures';
import { TopTabButtonProps } from '../../types/navigation';
import colors from '../../styles/variables/colors';

const TopTabButton = ({ onPress, label, iconName, disabled = false, isLoading = false }: TopTabButtonProps) => {
    if (isLoading) {
        return (
            <ActivityIndicator style={{ marginRight: 12 }} />
        )
    } else {
        return (
            <Button
                disabled={disabled}
                type="outline"
                onPress={onPress}
                style={{ marginRight: sizes.S, display: 'flex', alignItems: 'center', backgroundColor: 'transparent', borderColor: colors.tertiary }}
            >
                {label && <Text style={{ marginRight: sizes.XS }}>{label}</Text>}
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={'#8e8e8f'}
                />
            </Button>
        )
    }
};

export default TopTabButton;
