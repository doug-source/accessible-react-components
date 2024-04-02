import { ComponentPropsWithoutRef } from 'react';
import { TabListBtnText_ as BtnText_ } from './style';

type BtnTextProps = ComponentPropsWithoutRef<typeof BtnText_>;

type TabListBtnTextProps = {
    selected?: BtnTextProps['$selected'];
    paddingBlock: BtnTextProps['$paddingBlock'];
    borderBottomWidth: BtnTextProps['$borderBottomWidth'];
} & Omit<BtnTextProps, '$selected' | '$paddingBlock' | '$borderBottomWidth'>;

export const TabListBtnText = ({
    selected,
    paddingBlock,
    borderBottomWidth,
    ...remain
}: TabListBtnTextProps) => {
    return (
        <BtnText_
            $paddingBlock={paddingBlock}
            $borderBottomWidth={borderBottomWidth}
            $selected={selected}
            {...remain}
        />
    );
};
