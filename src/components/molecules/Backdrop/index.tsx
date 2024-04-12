import { ComponentPropsWithoutRef } from 'react';
import { Backdrop_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof Backdrop_>;

type BackdropProps = Omit<StyleProps, '$show'> & {
    show?: StyleProps['$show'];
    children: NonNullable<StyleProps['children']>;
};

export const Backdrop = ({
    children,
    show = false,
    ...remain
}: BackdropProps) => (
    <Backdrop_ $show={show} {...remain}>
        {children}
    </Backdrop_>
);
