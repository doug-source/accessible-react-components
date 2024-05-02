import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import { parseBooleanish } from '../../../lib';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarkerSvg } from '../../atoms/SwitchMarkerSvg';
import styles from './SwitchBtn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type StyleProps = Omit<BtnProps, 'aria-checked'> & {
    label?: ComponentPropsWithoutRef<typeof SwitchLabel>['label'];
    'aria-checked'?: ComponentPropsWithoutRef<
        typeof SwitchMarkerSvg
    >['aria-checked'];
};

export const SwitchBtn = ({
    'aria-checked': ariaChecked = false,
    label,
    className,
    ...remain
}: StyleProps) => {
    const [ariaCheckedState, setAriaCheckedState] = useState(ariaChecked);
    return (
        <button
            {...remain}
            className={classNames(className, styles.switchBtn)}
            role="switch"
            type="button"
            aria-checked={ariaCheckedState}
            onClick={() => {
                setAriaCheckedState(!parseBooleanish(ariaCheckedState));
            }}
        >
            <SwitchLabel label={label} />
            <SwitchMarkerSvg aria-checked={ariaCheckedState} />
        </button>
    );
};
