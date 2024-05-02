import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorBoxSvg } from '../SwitchCursorBoxSvg';
import { SwitchCursorSvg } from '../SwitchCursorSvg';
import styles from './SwitchMarkerSvg.module.scss';
import { isAriaCheckedFalsy } from './lib';

type SvgProps = ComponentPropsWithoutRef<'svg'>;

type SwitchMarkerSvgProps = Omit<SvgProps, 'aria-checked'> & {
    'aria-checked': boolean | 'true' | 'false';
};

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
                aria-hidden={!isAriaCheckedFalsy(ariaChecked)}
            />
            <SwitchCursorSvg
                className="on"
                type="on"
                aria-label="cursor on"
                aria-hidden={isAriaCheckedFalsy(ariaChecked)}
            />
        </svg>
    );
};
