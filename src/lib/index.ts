export const isBooleanishFalsy = (val?: boolean | 'true' | 'false') => {
    return typeof val === 'undefined' || val === 'false' || val === false;
};
