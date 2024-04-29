import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './LinkSpan.module.scss';
import { makeGoHandler, makeKeyDownHandler } from './lib';

type LinkSpanProps = ComponentPropsWithoutRef<'span'> & {
    href: NonNullable<ComponentPropsWithoutRef<'a'>['href']>;
    location?: typeof window.location;
};

export const LinkSpan = ({
    href,
    className,
    children,
    location = window.location,
    ...remain
}: LinkSpanProps) => {
    const go = makeGoHandler(location, href);
    return (
        <span
            {...remain}
            className={classNames(className, styles.linkSpan)}
            role="link"
            tabIndex={0}
            onClick={go}
            onKeyDown={makeKeyDownHandler(go)}
        >
            {children}
        </span>
    );
};
