import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Backdrop.module.scss';

type StyleProps = ComponentPropsWithoutRef<'div'>;

type BackdropProps = Omit<StyleProps, 'children'> & {
    show?: boolean;
    children: NonNullable<StyleProps['children']>;
};

export const Backdrop = ({
    className,
    children,
    show = false,
    ...remain
}: BackdropProps) => {
    const classNameInner = show ? styles.show : styles.hide;
    return (
        <div
            {...remain}
            className={classNames(className, styles.backdrop, classNameInner)}
        >
            {children}
        </div>
    );
};
