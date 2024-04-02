import { ComponentPropsWithoutRef } from 'react';
import { TabTitle_ } from './style';

type StyledProps = ComponentPropsWithoutRef<typeof TabTitle_>;

type TabTitleProps = {
    order: number;
} & StyledProps;

export const TabTitle = ({ order, ...remain }: TabTitleProps) => {
    return <TabTitle_ id={`tablist-${order}`} aria-hidden="true" {...remain} />;
};
