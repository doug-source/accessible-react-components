import { ComponentPropsWithoutRef } from 'react';

type TabIndexResetProps = ComponentPropsWithoutRef<'div'>;

export const TabIndexReset = ({ children, ...remain }: TabIndexResetProps) => (
    <div {...remain} tabIndex={0}>
        {children}
    </div>
);
