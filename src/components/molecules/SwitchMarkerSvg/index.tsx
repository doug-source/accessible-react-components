import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorBoxSvg } from '../../atoms/SwitchCursorBoxSvg';
import { SwitchCursorSvg } from '../../atoms/SwitchCursorSvg';
import { isAriaCheckedFalsy } from './lib';
import { SwitchMarkerSvg_ } from './style';

type SwitchMarkerSvgProps = ComponentPropsWithoutRef<typeof SwitchMarkerSvg_>;

export const SwitchMarkerSvg = ({
    'aria-checked': ariaChecked,
    ...remain
}: SwitchMarkerSvgProps) => {
    return (
        <SwitchMarkerSvg_ {...remain} xmlns="http://www.w3.org/2000/svg">
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
        </SwitchMarkerSvg_>
    );
};
