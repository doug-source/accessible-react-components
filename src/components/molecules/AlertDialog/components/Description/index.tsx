import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Description.module.scss';

type DescriptionProps = ComponentPropsWithoutRef<'div'>;

export const Description = ({
    children,
    className,
    ...remain
}: DescriptionProps) => (
    <div {...remain} className={classNames(className, styles.description)}>
        <p>{children}</p>
    </div>
);
