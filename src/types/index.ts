import { UserT } from "./user";

export type RootStackParamList = {
    Chat: UserT
    Chats: undefined
    Home: undefined
    Students: undefined
    'Log in': undefined
    Profile: undefined
};

export type IconLibraryT = 'Entypo' | 'MaterialIcons';

export interface StatusState {
    loggedIn: boolean;
    connected: boolean;
}
