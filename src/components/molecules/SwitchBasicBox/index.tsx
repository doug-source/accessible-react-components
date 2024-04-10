import { ComponentPropsWithoutRef } from 'react';
import { WebTarget } from 'styled-components';
import { SwitchBasicBox_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof SwitchBasicBox_>;

type SwitchBasicBoxProps = Omit<StyleProps, '$focusable'> & {
    as?: void | WebTarget;
    focusable: StyleProps['$focusable'];
};

export const SwitchBasicBox = ({
    as,
    focusable,
    children,
    ...remain
}: SwitchBasicBoxProps) => (
    <SwitchBasicBox_ {...remain} as={as} $focusable={focusable}>
        {children}
    </SwitchBasicBox_>
);
