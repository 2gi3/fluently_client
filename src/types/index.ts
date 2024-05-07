import { UserT } from "./user";

export type IconLibraryT = 'Entypo' | 'MaterialIcons' | 'Ionicons';

export interface StatusState {
    loggedIn: boolean;
    connected: boolean;
    socketUrl: string | null;
}

export interface ApiResponseHeadersT {
    headers: {
        get: (key: string) => string | null;
    };
    json: () => Promise<{ refreshToken?: string }>;

}