import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import ArrowsSVG from '../../../assets/arrows.svg?react';
import styles from './ArrowsIcon.module.scss';

type ArrowsIconProps = ComponentPropsWithoutRef<'svg'> & {
    noEvents?: boolean;
};

export const ArrowsIcon = ({
    className,
    noEvents,
    ...remain
}: ArrowsIconProps) => (
    <ArrowsSVG
        {...remain}
        className={classNames(className, noEvents && styles.noEvents)}
    />
);
