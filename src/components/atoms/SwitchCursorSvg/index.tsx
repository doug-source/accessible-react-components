import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchCursorSvg.module.scss';
import { defineTypeClass, defineVisibilityByAriaHidden } from './lib';

type SwitchCursorSvgProps = ComponentPropsWithoutRef<'rect'> & {
    type: 'on' | 'off' | 'mixed';
};

export const SwitchCursorSvg = ({
    type,
    className,
    'aria-hidden': ariaHidden,
    ...remain
}: SwitchCursorSvgProps) => {
    const typeClass = defineTypeClass(type);
    const visibility = defineVisibilityByAriaHidden(ariaHidden);
    return (
        <rect
            {...remain}
            className={classNames(
                className,
                styles.switchCursorSvg,
                typeClass,
                visibility
            )}
            x="0.25rem"
            y="0.25rem"
            rx="0.25rem"
            aria-hidden={ariaHidden}
        />
    );
};
