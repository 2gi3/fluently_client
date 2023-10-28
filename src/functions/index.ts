export const replaceHttpWithWs = (inputString: string): string => {
    const pattern = /^(http|https)\:\/\//;
    const result = inputString.replace(pattern, 'ws:');
    return result;
}