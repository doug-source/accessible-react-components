export const isBooleanishFalsy = (val?: boolean | 'true' | 'false') => {
    return typeof val === 'undefined' || val === 'false' || val === false;
};

export const makeBooleanHandle = (
    oldValue: boolean,
    onChange: (newValue: boolean) => void
) => {
    return () => onChange(!oldValue);
};

export const parseBooleanish = (
    val?: Parameters<typeof isBooleanishFalsy>[number]
) => {
    return !isBooleanishFalsy(val);
};

export const firstUpperCase = (str: string) => {
    const strVal = str.trim();
    return strVal.charAt(0).toUpperCase() + strVal.slice(1);
};

export const swapIndex = <T>(list: T[], index: number) => {
    return ((index % list.length) + list.length) % list.length;
};

export const isReducedMotion = (windowObject = window) => {
    const output = windowObject.matchMedia('(prefers-reduced-motion: reduce)');
    if (output && typeof output?.matches === 'undefined') {
        return true;
    }
    return Boolean(output.matches);
};

export const filterByStart = <T>(
    haystack: T[],
    pointer: (item: T) => string,
    needle: string
) => {
    return haystack.filter((item) =>
        pointer(item).toLocaleLowerCase().startsWith(needle.toLocaleLowerCase())
    );
};
