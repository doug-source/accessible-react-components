import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import CloseIcon_ from '../../../assets/close.svg?react';
import styles from './CloseIcon.module.scss';

type CloseIconProps = ComponentPropsWithoutRef<'svg'>;

export const CloseIcon = ({ className, ...remain }: CloseIconProps) => (
    <CloseIcon_
        {...remain}
        aria-label="close dialog"
        className={classNames(className, styles.closeIcon)}
    />
);
