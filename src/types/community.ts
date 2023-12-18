import { UserT } from "./user";

export interface PostT {
    id?: number
    userId: string | number
    title: string;
    body: string | null;
    image: string | null | undefined;
    type: 'question' | 'moment';
    topic: string | null;
    status?: 'open' | 'closed' | null
    created_at?: Date
    user?: Pick<UserT, 'name' | 'image'>;
}

export interface PostCardPropsT {
    post: PostT;
}
