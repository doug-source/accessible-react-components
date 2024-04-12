export const isBooleanishFalsy = (val?: boolean | 'true' | 'false') => {
    return typeof val === 'undefined' || val === 'false' || val === false;
};

export const makeBooleanHandle = (
    oldValue: boolean,
    onChange: (newValue: boolean) => void
) => {
    return () => onChange(!oldValue);
};
