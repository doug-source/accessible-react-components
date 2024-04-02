import { ComponentPropsWithoutRef } from 'react';
import { TabListBtn_ } from './style';

type BtnProps = ComponentPropsWithoutRef<typeof TabListBtn_>;

type TabListBtnProps = {
    'aria-selected': BtnProps['aria-selected'];
    'aria-controls': BtnProps['aria-controls'];
    tabIndex: BtnProps['tabIndex'];
} & BtnProps;

export const TabListBtn = ({
    id,
    tabIndex,
    'aria-selected': ariaSelected,
    'aria-controls': ariaControls,
    onClick,
    ...remain
}: TabListBtnProps) => {
    return (
        <TabListBtn_
            id={id}
            type="button"
            role="tab"
            aria-selected={ariaSelected}
            aria-controls={ariaControls}
            tabIndex={tabIndex}
            onClick={onClick}
            {...remain}
        />
    );
};
