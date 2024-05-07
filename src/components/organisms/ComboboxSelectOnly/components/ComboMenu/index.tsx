import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './ComboMenu.module.scss';

type ComboMenuProps = ComponentPropsWithoutRef<'div'> & {
    listboxId: string;
    labelId: string;
};

type ComboMenuComponent = ReturnType<
    typeof forwardRef<HTMLDivElement, ComboMenuProps>
> & {
    styles: CSSModuleClasses;
};

const ComboMenu: ComboMenuComponent = Object.assign(
    forwardRef<HTMLDivElement, ComboMenuProps>(function ComboMenuInner(
        { labelId, listboxId, className, children, ...remain }: ComboMenuProps,
        ref
    ) {
        return (
            <div
                {...remain}
                ref={ref}
                className={classNames(ComboMenu.styles.comboMenu, className)}
                role="listbox"
                id={listboxId}
                aria-labelledby={labelId}
                tabIndex={-1}
            >
                {children}
            </div>
        );
    }),
    { styles }
);

export { ComboMenu };
