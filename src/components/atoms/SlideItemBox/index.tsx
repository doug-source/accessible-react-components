import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    ForwardedRef,
    forwardRef,
    useId,
} from 'react';
import styles from './SlideItemBox.module.scss';

type SlideItemBoxProps = ComponentPropsWithoutRef<'div'> & {
    show: boolean;
    pos: number;
    size: number;
};

const SlideItemBoxInner = (
    { show, className, children, pos, size, ...remain }: SlideItemBoxProps,
    ref: ForwardedRef<HTMLDivElement>
) => {
    const id = useId();
    return (
        <div
            {...remain}
            ref={ref}
            id={id}
            role="tabpanel"
            className={classNames(
                className,
                styles.slideItemBox,
                show && styles.show
            )}
            aria-roledescription="slide"
            aria-label={`${pos} of ${size}`}
        >
            {children}
        </div>
    );
};

export const SlideItemBox = Object.assign(
    forwardRef<HTMLDivElement, SlideItemBoxProps>(SlideItemBoxInner),
    { styles }
);
