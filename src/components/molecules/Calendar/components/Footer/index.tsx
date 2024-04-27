import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Footer.module.scss';

type FooterProps = ComponentPropsWithoutRef<'div'>;

export const Footer = ({ className, children, ...remain }: FooterProps) => (
    <div {...remain} className={classNames(className, styles.footer)}>
        {children}
    </div>
);
