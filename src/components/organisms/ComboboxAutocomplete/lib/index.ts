import { ComboboxType } from '../types';

export const filterByStart = (haystack: string[], needle: string) => {
    return haystack.filter((item) =>
        item.toLocaleLowerCase().startsWith(needle.toLocaleLowerCase())
    );
};

export const defineItems = (
    type: ComboboxType,
    haystack: string[],
    needle: string
) => {
    if (type === 'list' || type === 'both') {
        return filterByStart(haystack, needle);
    }
    return haystack;
};
