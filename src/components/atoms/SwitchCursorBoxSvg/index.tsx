import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorBoxSvg_ } from './style';

type SwitchCursorBoxSvgProps = ComponentPropsWithoutRef<
    typeof SwitchCursorBoxSvg_
>;

export const SwitchCursorBoxSvg = (props: SwitchCursorBoxSvgProps) => {
    return (
        <SwitchCursorBoxSvg_
            className="container"
            x="0.0625rem"
            y="0.0625rem"
            rx="0.25rem"
            {...props}
        />
    );
};
