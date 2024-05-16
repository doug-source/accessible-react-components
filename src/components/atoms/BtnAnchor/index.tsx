import classNames from 'classnames';
import { ComponentPropsWithoutRef, KeyboardEvent, forwardRef } from 'react';
import styles from './BtnAnchor.module.scss';

type BtnAnchorProps = ComponentPropsWithoutRef<'a'> & {
    onActivate?: (evt: KeyboardEvent<HTMLAnchorElement>) => void;
};

export const BtnAnchor = forwardRef<HTMLAnchorElement, BtnAnchorProps>(
    function BtnAnchorInner(
        {
            className,
            children,
            onActivate,
            onKeyDown,
            ...remain
        }: BtnAnchorProps,
        ref
    ) {
        return (
            <a
                {...remain}
                ref={ref}
                className={classNames(className, styles.btnAnchor)}
                tabIndex={0}
                onKeyDown={(evt) => {
                    if (/^Enter|\s$/.test(evt.key)) {
                        onActivate && onActivate(evt);
                        evt.stopPropagation();
                        evt.preventDefault();
                    } else {
                        onKeyDown && onKeyDown(evt);
                    }
                }}
            >
                {children}
            </a>
        );
    }
);
