import classNames from 'classnames';
import { ComponentPropsWithoutRef, KeyboardEvent, forwardRef } from 'react';
import styles from './BtnDiv.module.scss';

type BtnDivProps = ComponentPropsWithoutRef<'div'> & {
    onActivate?: (evt: KeyboardEvent<HTMLDivElement>) => void;
};

export const BtnDiv = forwardRef<HTMLDivElement, BtnDivProps>(
    function BtnDivInner(
        { className, children, onActivate, onKeyDown, ...remain }: BtnDivProps,
        ref
    ) {
        return (
            <div
                {...remain}
                ref={ref}
                className={classNames(className, styles.btnDiv)}
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
            </div>
        );
    }
);
