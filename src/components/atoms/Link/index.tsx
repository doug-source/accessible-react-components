import classNames from 'classnames';
import { ComponentPropsWithoutRef, createElement } from 'react';
import styles from './Link.module.scss';
import { makeGoHandler, makeLinkKeyDownHandler } from './lib';

type W = 'span' | 'img';

type LinkProps<T extends W> = ComponentPropsWithoutRef<T> & {
    location?: typeof window.location;
    href: NonNullable<ComponentPropsWithoutRef<'a'>['href']>;
    type: T;
};

type ImgProps = Omit<
    ComponentPropsWithoutRef<'img'>,
    'src' | 'alt' | 'children'
> & {
    alt: string;
} & Omit<LinkProps<'img'>, 'children'>;

export const Link = <T extends W>({
    href,
    className,
    type,
    location = window.location,
    ...remain
}: T extends 'img' ? ImgProps : LinkProps<T>) => {
    const go = makeGoHandler(location, href);
    return createElement(type, {
        ...remain,
        className: classNames(className, styles.link),
        role: 'link',
        tabIndex: 0,
        onClick: go,
        onKeyDown: makeLinkKeyDownHandler(go),
    });
};
