import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarkerSvg } from '../../atoms/SwitchMarkerSvg';
import styles from './SwitchBtn.module.scss';

type StyleProps = ComponentPropsWithoutRef<'button'> & {
    label?: ComponentPropsWithoutRef<typeof SwitchLabel>['label'];
};

export const SwitchBtn = ({
    'aria-checked': ariaChecked = false,
    label,
    className,
    ...remain
}: StyleProps) => {
    const [ariaCheckedState, setAriaCheckedState] =
        useState<StyleProps['aria-checked']>(ariaChecked);
    return (
        <button
            {...remain}
            className={classNames(className, styles.switchBtn)}
            role="switch"
            type="button"
            aria-checked={ariaCheckedState}
            onClick={() => setAriaCheckedState(!ariaCheckedState)}
        >
            <SwitchLabel label={label} />
            <SwitchMarkerSvg aria-checked={ariaCheckedState} />
        </button>
    );
};
