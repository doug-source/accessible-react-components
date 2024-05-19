import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

type SlidesBoxProps = ComponentPropsWithoutRef<'div'>;

export const SlidesBox = ({
    className,
    children,
    'aria-live': ariaLive,
    ...remain
}: SlidesBoxProps) => (
    <div {...remain} className={classNames(className)} aria-live={ariaLive}>
        {children}
    </div>
);
