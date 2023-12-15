export interface PostT {
    title: string;
    body: string;
    type: 'open-question' | 'closed-question' | 'post';
    label: string
}

export interface PostCardPropsT {
    post: PostT;
}
