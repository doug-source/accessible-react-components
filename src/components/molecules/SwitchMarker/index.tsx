import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursor } from '../../atoms/SwitchCursor';
import { SwitchMarker_ } from './style';

type SwitchMarkerStyleProps = ComponentPropsWithoutRef<typeof SwitchMarker_>;
type SwitchCursorStyleProps = ComponentPropsWithoutRef<typeof SwitchCursor>;

type SwitchMarkerProps = {
    checked: SwitchCursorStyleProps['checked'];
    padding?: SwitchMarkerStyleProps['$padding'];
    height?: SwitchMarkerStyleProps['$height'];
    borderWidth?: SwitchMarkerStyleProps['$borderWidth'];
} & ComponentPropsWithoutRef<'div'>;

export const SwitchMarker = ({
    className,
    checked,
    padding = '0.125rem',
    height = '0.75rem',
    borderWidth = '0.125rem',
    ...remain
}: SwitchMarkerProps) => {
    return (
        <SwitchMarker_
            className={classNames('switch', className)}
            $padding={padding}
            $height={height}
            $borderWidth={borderWidth}
            {...remain}
        >
            <SwitchCursor
                parentPadding={padding}
                size={height}
                checked={checked}
            />
        </SwitchMarker_>
    );
};
