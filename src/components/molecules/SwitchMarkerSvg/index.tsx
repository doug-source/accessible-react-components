import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorBoxSvg } from '../../atoms/SwitchCursorBoxSvg';
import { SwitchCursorSvg } from '../../atoms/SwitchCursorSvg';
import styles from './SwitchMarkerSvg.module.scss';
import { isAriaCheckedFalsy } from './lib';

type SwitchMarkerSvgProps = ComponentPropsWithoutRef<'svg'>;

export const SwitchMarkerSvg = ({
    'aria-checked': ariaChecked,
    className,
    ...remain
}: SwitchMarkerSvgProps) => {
    return (
        <svg
            {...remain}
            className={classNames(className, styles.switchMarkerSvg)}
            xmlns="http://www.w3.org/2000/svg"
        >
            <SwitchCursorBoxSvg />
            <SwitchCursorSvg
                type="off"
                className="off"
                aria-label="cursor off"
                aria-hidden={
                    ariaChecked === 'mixed' || !isAriaCheckedFalsy(ariaChecked)
                }
            />
            <SwitchCursorSvg
                type="mixed"
                className="mixed"
                aria-label="cursor mixed"
                aria-hidden={ariaChecked !== 'mixed'}
            />
            <SwitchCursorSvg
                className="on"
                type="on"
                aria-label="cursor on"
                aria-hidden={
                    ariaChecked === 'mixed' || isAriaCheckedFalsy(ariaChecked)
                }
            />
        </svg>
    );
};
