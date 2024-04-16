import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { orientationAxis } from '../../../types/css-props';
import styles from './TabListBtnText.module.scss';

type TabListBtnTextProps = {
    selected?: boolean;
    orientation: orientationAxis;
} & ComponentPropsWithoutRef<'span'>;

export const TabListBtnText = ({
    selected,
    orientation,
    className,
    ...remain
}: TabListBtnTextProps) => {
    const orientationClass =
        orientation === 'horizontal' ? styles.horizontal : styles.vertical;
    const selectClass = selected ? styles.selected : null;

    return (
        <span
            className={classNames(
                className,
                styles.tabListBtnText,
                orientationClass,
                selectClass
            )}
            {...remain}
        />
    );
};
