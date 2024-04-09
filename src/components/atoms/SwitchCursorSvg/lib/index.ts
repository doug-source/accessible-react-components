export const calcTranslateX = (type: 'on' | 'off' | 'mixed') => {
    if (type === 'on') {
        return 'calc(100% - 1rem - 0.5rem)';
    }
    if (type === 'mixed') {
        return 'calc((100% - 1rem - 0.5rem) / 2)';
    }
    return '0';
};
