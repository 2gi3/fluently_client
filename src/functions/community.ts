import { PostT } from "../types/community";

export const getIconForPostType = (postType: PostT['type']) => {
    let icon: string;

    if (postType === 'open-question') {
        icon = 'question';
    } else if (postType === 'closed-question') {
        icon = 'check';
    } else if (postType === 'post') {
        icon = 'camera';
    } else {
        icon = 'emotsmile';
    }

    return icon;
};
