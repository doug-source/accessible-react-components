import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Link.module.scss';
import { makeGoHandler, makeKeyDownHandler } from './lib';

type LinkProps = ComponentPropsWithoutRef<'span'> & {
    href: NonNullable<ComponentPropsWithoutRef<'a'>['href']>;
    location?: typeof window.location;
};

export const Link = ({
    href,
    className,
    children,
    location = window.location,
    ...remain
}: LinkProps) => {
    const go = makeGoHandler(location, href);
    return (
        <span
            {...remain}
            className={classNames(className, styles.link)}
            role="link"
            tabIndex={0}
            onClick={go}
            onKeyDown={makeKeyDownHandler(go)}
        >
            {children}
        </span>
    );
};
