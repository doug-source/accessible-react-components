import { ComponentPropsWithoutRef } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'>;

export const Label = ({ className, children, ...remain }: LabelProps) => {
    if (!children) {
        return null;
    }
    return (
        <label {...remain} className={className}>
            {children}
        </label>
    );
};
