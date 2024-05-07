import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Opt.module.scss';

type OptProps = ComponentPropsWithoutRef<'div'> & {
    optRefFn?: (el: HTMLDivElement | null) => void;
};

const Opt = ({ className, children, optRefFn, ...remain }: OptProps) => (
    <div
        {...remain}
        className={classNames(className, styles.opt)}
        ref={(el) => optRefFn && optRefFn(el)}
        role="option"
    >
        {children}
    </div>
);

Opt.styles = styles;

export { Opt };
