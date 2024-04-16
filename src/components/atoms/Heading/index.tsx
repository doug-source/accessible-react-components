import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Heading.module.scss';

type HeadingProps = Omit<ComponentPropsWithoutRef<'h2'>, 'children'> & {
    children: string;
};

export const Heading = ({ children, className, ...remain }: HeadingProps) => (
    <h2 {...remain} className={classNames(className, styles.heading)}>
        {children}
    </h2>
);
