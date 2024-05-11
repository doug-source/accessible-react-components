import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Arrow } from '../../../../atoms/Arrow';
import styles from './MenuBtn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type MenuBtnProps = Omit<
    BtnProps,
    'aria-expanded' | 'aria-controls' | 'children'
> & {
    'aria-expanded': NonNullable<BtnProps['aria-expanded']>;
    'aria-controls': NonNullable<BtnProps['aria-controls']>;
    children: BtnProps['children'];
};

export const MenuBtn = forwardRef<HTMLButtonElement, MenuBtnProps>(
    function MenuBtnInner(
        {
            className,
            'aria-expanded': ariaExpanded,
            'aria-controls': ariaControls,
            children,
            ...remain
        }: MenuBtnProps,
        ref
    ) {
        return (
            <button
                {...remain}
                aria-controls={ariaControls}
                aria-haspopup="true"
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
