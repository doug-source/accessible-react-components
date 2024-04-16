import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { orientationAxis } from '../../../types/css-props';
import styles from './TabListBtn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type TabListBtnProps = {
    'aria-selected': BtnProps['aria-selected'];
    'aria-controls': BtnProps['aria-controls'];
    tabIndex: BtnProps['tabIndex'];
    orientation: orientationAxis;
} & BtnProps;

export const TabListBtn = ({
    id,
    tabIndex,
    'aria-selected': ariaSelected,
    'aria-controls': ariaControls,
    orientation,
    onClick,
    className,
    ...remain
}: TabListBtnProps) => {
    const classNameInner = orientation === 'vertical' ? styles.vertical : null;
    return (
        <button
            {...remain}
            className={classNames(className, styles.tabListBtn, classNameInner)}
            id={id}
            type="button"
            role="tab"
            aria-selected={ariaSelected}
            aria-controls={ariaControls}
            tabIndex={tabIndex}
            onClick={onClick}
        />
    );
};
