import { filterByStart } from '../../../../lib';
import { ComboboxType } from '../types';

export const defineItems = (
    type: ComboboxType,
    haystack: string[],
    needle: string
) => {
    if (type === 'list' || type === 'both') {
        return filterByStart(haystack, (item) => item, needle);
    }
    return haystack;
};
