import { ComponentPropsWithoutRef } from 'react';
import { parseBooleanish } from '../../../../lib';
import styles from '../SwitchCursorSvg.module.scss';

export const defineTypeClass = (type: 'on' | 'off') => {
    if (type === 'on') {
        return styles.on;
    }
    return styles.off;
};

type Booleanish = NonNullable<ComponentPropsWithoutRef<'rect'>['aria-hidden']>;

export const defineVisibilityByAriaHidden = (val?: Booleanish) => {
    if (!parseBooleanish(val)) {
        return styles.show;
    }
    return styles.hide;
};
