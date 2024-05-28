import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboGridWrapper.module.scss';

type ComboWrapperProps = ComponentPropsWithoutRef<'div'>;

export const ComboGridWrapper = ({
    className,
    children,
    ...remain
}: ComboWrapperProps) => (
    <div {...remain} className={classNames(className, styles.wrapper)}>
        {children}
    </div>
);
