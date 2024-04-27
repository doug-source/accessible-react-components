import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './HeaderBtns.module.scss';

type HeaderBtnsProps = ComponentPropsWithoutRef<'div'>;

export const HeaderBtns = ({
    className,
    children,
    ...remain
}: HeaderBtnsProps) => (
    <div {...remain} className={classNames(className, styles.headerBtns)}>
        {children}
    </div>
);
