import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Arrow } from '../../../../atoms/Arrow';
import styles from './MenuBtn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type MenuBtnProps = Omit<BtnProps, 'aria-expanded' | 'children'> & {
    'aria-expanded'?: BtnProps['aria-expanded'];
    children: BtnProps['children'];
};

export const MenuBtn = forwardRef<HTMLButtonElement, MenuBtnProps>(
    function MenuBtnInner(
        {
            className,
            'aria-expanded': ariaExpanded,
            children,
            ...remain
        }: MenuBtnProps,
        ref
    ) {
        return (
            <button
                {...remain}
                aria-expanded={ariaExpanded}
                className={classNames(className, styles.menuBtn)}
                type="button"
                ref={ref}
            >
                <span className={styles.content}>{children}</span>
                <Arrow
                    title="arrow"
                    className={styles.icon}
                    direction={ariaExpanded ? 'top' : 'bottom'}
                    type="complete"
                />
            </button>
        );
    }
);
