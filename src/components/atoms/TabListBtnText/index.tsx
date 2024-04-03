import { ComponentPropsWithoutRef } from 'react';
import { TabListBtnText_ as BtnText_ } from './style';

type BtnTextProps = ComponentPropsWithoutRef<typeof BtnText_>;

type TabListBtnTextProps = {
    selected?: BtnTextProps['$selected'];
    paddingBlock: BtnTextProps['$paddingBlock'];
    borderBottomWidth: BtnTextProps['$borderBottomWidth'];
    orientation: BtnTextProps['$orientation'];
} & Omit<
    BtnTextProps,
    '$selected' | '$paddingBlock' | '$borderBottomWidth' | '$orientation'
>;

export const TabListBtnText = ({
    selected,
    paddingBlock,
    borderBottomWidth,
    orientation,
    ...remain
}: TabListBtnTextProps) => {
    return (
        <BtnText_
            $paddingBlock={paddingBlock}
            $borderBottomWidth={borderBottomWidth}
            $selected={selected}
            $orientation={orientation}
            {...remain}
        />
    );
};
