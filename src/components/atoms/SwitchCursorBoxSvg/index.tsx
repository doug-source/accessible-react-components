import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchCursorBoxSvg.module.scss';

type SwitchCursorBoxSvgProps = ComponentPropsWithoutRef<'rect'>;

export const SwitchCursorBoxSvg = ({
    className,
    ...remain
}: SwitchCursorBoxSvgProps) => {
    return (
        <rect
            {...remain}
            className={classNames(className, styles.switchCursorBoxSvg)}
            x="0.0625rem"
            y="0.0625rem"
            rx="0.25rem"
        />
    );
};
