import { ComponentPropsWithoutRef } from 'react';
import { Alert_ } from './style';

type AlertProps = ComponentPropsWithoutRef<typeof Alert_>;

export const Alert = ({ children, ...remain }: AlertProps) => (
    <Alert_ {...remain} role="alert">
        {children}
    </Alert_>
);
