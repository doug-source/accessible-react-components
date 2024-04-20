import React, { ComponentPropsWithoutRef } from 'react';

type Sections = 'thead' | 'tbody' | 'tfoot';

type CalendarTableSectionProps<T extends Sections> =
    ComponentPropsWithoutRef<T> & {
        type: T;
    };

export const CalendarTableSection = <T extends Sections>({
    type,
    className,
    children,
    ...remain
}: CalendarTableSectionProps<T>) => {
    return React.createElement(
        type,
        {
            ...remain,
            className,
        },
        children
    );
};
