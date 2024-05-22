import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Arrow } from '../Arrow';
import styles from './MenuArrowBtn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type MenuArrowBtnProps = Omit<
    BtnProps,
    'aria-expanded' | 'aria-controls' | 'children'
> & {
    'aria-expanded': NonNullable<BtnProps['aria-expanded']>;
    'aria-controls': NonNullable<BtnProps['aria-controls']>;
    children: BtnProps['children'];
};

export const MenuArrowBtn = forwardRef<HTMLButtonElement, MenuArrowBtnProps>(
    function MenuArrowBtnInner(
        {
            className,
            'aria-expanded': ariaExpanded,
            'aria-controls': ariaControls,
            children,
            ...remain
        }: MenuArrowBtnProps,
        ref
    ) {
        return (
            <button
                {...remain}
                aria-controls={ariaControls}
                aria-haspopup="true"
                aria-expanded={ariaExpanded}
                className={classNames(className, styles.menuArrowBtn)}
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
