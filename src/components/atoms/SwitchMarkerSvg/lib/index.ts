import { HTMLAttributes } from 'react';
import { isBooleanishFalsy } from '../../../../lib';

type AriaCheckedScheme = HTMLAttributes<HTMLButtonElement>['aria-checked'];

export const isAriaCheckedFalsy = (ariaChecked: AriaCheckedScheme) => {
    if (ariaChecked === 'mixed') {
        return false;
    }
    return isBooleanishFalsy(ariaChecked);
};
