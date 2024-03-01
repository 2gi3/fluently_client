import React from 'react'
import { View, ViewStyle } from "react-native";
import { useLogOut } from "../../../functions/hooks/user";
import { Button } from "@rneui/themed";
import colors from '../../../styles/variables/colors';

const LogoutButton = ({ style }: { style?: ViewStyle }) => {
    const logOut = useLogOut();

    const handleLogout = () => {
        logOut();
    };

    return (
        <View style={style}>
            <Button type="outline" title="Logout" onPress={handleLogout} titleStyle={{
                color: colors.primaryFont,
            }} />
        </View>
    );
};

export default LogoutButton;
