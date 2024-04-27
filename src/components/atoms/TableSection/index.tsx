import React, { ComponentPropsWithoutRef } from 'react';

type Sections = 'thead' | 'tbody' | 'tfoot';

type TableSectionProps<T extends Sections> = ComponentPropsWithoutRef<T> & {
    type: T;
};

export const TableSection = <T extends Sections>({
    type,
    className,
    children,
    ...remain
}: TableSectionProps<T>) => {
    return React.createElement(
        type,
        {
            ...remain,
            className,
        },
        children
    );
};
