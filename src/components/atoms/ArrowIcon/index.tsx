import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import ArrowSVG from '../../../assets/arrow.svg?react';
import styles from './ArrowIcon.module.scss';

type ArrowIconProps = ComponentPropsWithoutRef<'svg'> & {
    noEvents?: boolean;
};

export const ArrowIcon = ({
    className,
    noEvents = false,
    ...remain
}: ArrowIconProps) => (
    <ArrowSVG
        {...remain}
        className={classNames(className, noEvents && styles.noEvents)}
    />
);
