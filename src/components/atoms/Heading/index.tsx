import { ComponentPropsWithoutRef } from 'react';
import { Heading_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof Heading_>;

type HeadingProps = Omit<StyleProps, 'children'> & {
    children: string;
};

export const Heading = ({ children, ...remain }: HeadingProps) => (
    <Heading_ {...remain}>{children}</Heading_>
);
