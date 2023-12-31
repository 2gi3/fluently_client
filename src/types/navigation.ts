import { UserT } from "./user";

export type RootStackParamList = {
    Chat: UserT
    Chats: undefined
    Home: undefined
    Students: undefined
    'Login': undefined
    Student: undefined
    Profile: undefined
    'Profile/Login': undefined
    Community: undefined
    'Create-post': undefined
    Post: undefined
};

export interface TopTabButtonProps {
    onPress: () => void;
    label?: string;
    iconName: string;
    disabled?: boolean
    isLoading?: boolean
    type?: "outline" | "solid"
}