import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithoutRef<'div'>;

export const Box = ({ className, children, ...remain }: BoxProps) => (
    <div {...remain} className={classNames(className, styles.box)}>
        {children}
    </div>
);
