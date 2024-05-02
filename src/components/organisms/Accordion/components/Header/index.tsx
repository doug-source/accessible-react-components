import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Header.module.scss';

type HeadingProps = ComponentPropsWithoutRef<'h3'>;

type HeaderProps = Omit<
    HeadingProps,
    'id' | 'aria-controls' | 'aria-expanded'
> & {
    id: NonNullable<HeadingProps['id']>;
    'aria-controls': NonNullable<HeadingProps['aria-controls']>;
    'aria-expanded': NonNullable<HeadingProps['aria-expanded']>;
    btnRefFn?: (btn: HTMLButtonElement | null) => void;
};

const Header = ({
    id,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-disabled': ariaDisabled,
    btnRefFn,
    className,
    children,
    ...remain
}: HeaderProps) => (
    <h3 {...remain} className={classNames(className, styles.header)}>
        <button
            id={id}
            type="button"
            ref={(btn) => btnRefFn && btnRefFn(btn)}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            aria-disabled={ariaDisabled}
            className={styles.btn}
        >
            <span className={styles.title}>
                {children}
                <span className={styles.icon}></span>
            </span>
        </button>
    </h3>
);

export { Header };
