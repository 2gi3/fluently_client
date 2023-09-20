export interface NewUserT {
    email: string;
    password: string;
    name: string;
    age: number | null;
    gender: Gender | null;
    nationality: string;
    country: string;
    native_language: string;
    teaching_language: string;
    learning_language: string;

}

export interface UserT extends NewUserT {
    id: number;
    image?: string | null;
    description?: string | null;
    banned?: boolean | null;
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