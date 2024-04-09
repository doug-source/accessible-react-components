import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorSvg_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof SwitchCursorSvg_>;

type SwitchCursorSvgProps = Omit<StyleProps, '$show' | '$type'> & {
    type: StyleProps['$type'];
};

export const SwitchCursorSvg = ({
    type,
    'aria-hidden': ariaHidden,
    ...remain
}: SwitchCursorSvgProps) => {
    return (
        <SwitchCursorSvg_
            {...remain}
            x="0.25rem"
            y="0.25rem"
            rx="0.25rem"
            $type={type}
            aria-hidden={ariaHidden}
        />
    );
};
