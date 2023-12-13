import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Button } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TopTabButtonProps } from '../../../types/navigation';
import { styles } from './styles';

const TopTabButton = ({ onPress, label, iconName, disabled = false, isLoading = false }: TopTabButtonProps) => {
    if (isLoading) {
        return (
            <ActivityIndicator style={styles.activityIndicator} />
        )
    } else {
        return (
            <Button
                disabled={disabled}
                type="outline"
                onPress={onPress}
                style={styles.container}
            >
                {label && <Text style={styles.label}>{label}</Text>}
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
