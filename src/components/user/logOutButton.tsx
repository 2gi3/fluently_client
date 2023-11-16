import React from 'react'
import { View, ViewStyle } from "react-native";
import { useLogOut } from "../../functions/hooks/user";
import { Button } from "@rneui/base";

const LogoutButton = ({ style }: { style?: ViewStyle }) => {
    const logOut = useLogOut();

    const handleLogout = () => {
        logOut();
    };

    return (
        <View style={style}>
            <Button type="outline" title="Logout" onPress={handleLogout} titleStyle={{
                color: '#666666',
            }} />
        </View>
    );
};

export default LogoutButton;
