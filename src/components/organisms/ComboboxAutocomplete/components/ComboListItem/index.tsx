import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    ForwardedRef,
    forwardRef,
    useId,
} from 'react';
import styles from './ComboListItem.module.scss';

type ComboListItemProps = ComponentPropsWithoutRef<'li'>;

const ComboListItemInner = (
    { className, children, ...remain }: ComboListItemProps,
    ref: ForwardedRef<HTMLLIElement | null>
) => {
    const idItem = useId();
    return (
        <li
            {...remain}
            id={idItem}
            className={classNames(styles.item, className)}
            ref={ref}
            role="option"
        >
            {children}
        </li>
    );
};

export const ComboListItem = forwardRef<HTMLLIElement, ComboListItemProps>(
    ComboListItemInner
);
