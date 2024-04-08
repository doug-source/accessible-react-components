import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursor_ } from './style';

type SwitchCursorStyleProps = ComponentPropsWithoutRef<typeof SwitchCursor_>;

type SwitchCursorProps = {
    className?: string;
    size: SwitchCursorStyleProps['$size'];
    parentPadding: SwitchCursorStyleProps['$parentPadding'];
    checked: SwitchCursorStyleProps['$checked'];
} & ComponentPropsWithoutRef<'div'>;

export const SwitchCursor = ({
    className,
    size,
    parentPadding,
    checked,
    ...remain
}: SwitchCursorProps) => (
    <SwitchCursor_
        className={className}
        $size={size}
        $parentPadding={parentPadding}
        $checked={checked}
        {...remain}
    />
);
