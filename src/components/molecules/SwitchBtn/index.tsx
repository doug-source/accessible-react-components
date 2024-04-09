import { ComponentPropsWithoutRef, HTMLAttributes, useState } from 'react';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarkerSvg } from '../SwitchMarkerSvg';
import { SwitchBtn_ } from './style';

type StyleProps = ComponentPropsWithoutRef<'button'> & {
    label?: ComponentPropsWithoutRef<typeof SwitchLabel>['label'];
};

type AriaCheckedScheme = HTMLAttributes<HTMLButtonElement>['aria-checked'];

export const SwitchBtn = ({
    'aria-checked': ariaChecked = false,
    label,
    ...remain
}: StyleProps) => {
    const [ariaCheckedState, setAriaCheckedState] =
        useState<AriaCheckedScheme>(ariaChecked);
    return (
        <SwitchBtn_
            {...remain}
            role="switch"
            type="button"
            aria-checked={ariaCheckedState}
            onClick={() => setAriaCheckedState(!ariaCheckedState)}
        >
            <SwitchLabel label={label} />
            <SwitchMarkerSvg aria-checked={ariaCheckedState} />
        </SwitchBtn_>
    );
};
