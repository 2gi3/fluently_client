export interface NewUserT {
    email: string | null;
    password: string | null;
    name: string | null;
    age: number | null;
    gender: Gender | null;
    nationality: string;
    country: string | null;
    native_language: string | null;
    teaching_language: string | null;
    learning_language: string | null;

}

export interface UserT extends NewUserT {
    id: number | string;
    image?: string | null;
    description?: string | null;
    banned?: boolean | null;
}

export interface UserStateT {
    user: UserT
    // {
    //     id: number | null;
    //     email: string | null;
    //     password: string | null;
    //     name: string | null;
    //     age: number | null;
    //     gender: Gender | null;
    //     nationality: string | null;
    //     country: string | null;
    //     native_language: string | null;
    //     teaching_language: string | null;
    //     learning_language: string | null;
    //     image: string | null;
    //     description: string | null;
    //     banned: boolean | null;
    // }
}


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface AuthInputProps {
    autoFocus?: boolean
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    errorMessage?: string | undefined;
    secureTextEntry?: boolean;
}