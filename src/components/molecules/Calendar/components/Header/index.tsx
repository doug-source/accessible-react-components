import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Header.module.scss';

type HeaderProps = ComponentPropsWithoutRef<'div'>;

export const Header = ({ className, children, ...remain }: HeaderProps) => (
    <div {...remain} className={classNames(className, styles.header)}>
        {children}
    </div>
);
