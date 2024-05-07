import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Arrow.module.scss';

type ArrowProps = ComponentPropsWithoutRef<'span'> & {
    direction: 'top' | 'right' | 'bottom' | 'left';
    type: 'complete' | 'bordered';
};

const Arrow = ({ className, type, direction, ...remain }: ArrowProps) => (
    <span
        {...remain}
        className={classNames(
            Arrow.styles.arrow,
            className,
            Arrow.styles[type],
            Arrow.styles[direction]
        )}
    ></span>
);

Arrow.styles = styles;

export { Arrow };
