import { ComponentPropsWithoutRef } from 'react';

type CalendarRowProps = ComponentPropsWithoutRef<'tr'> & {
    show: boolean;
};

export const CalendarRow = ({
    show,
    className,
    children,
    ...remain
}: CalendarRowProps) => {
    if (!show) {
        return null;
    }
    return (
        <tr {...remain} className={className}>
            {children}
        </tr>
    );
};
