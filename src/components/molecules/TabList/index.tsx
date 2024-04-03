import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { TabListBtn } from '../../atoms/TabListBtn';
import { TabListBtnText } from '../../atoms/TabListBtnText';
import { TabList_ } from './style';

type TabListBtnTextProps = ComponentPropsWithoutRef<typeof TabListBtnText>;
type TabListStyledProps = ComponentPropsWithoutRef<typeof TabList_>;
type StyledProps = Omit<
    TabListStyledProps,
    'onClick' | '$borderBottomWidth' | '$orientation'
>;

type TabListProps = {
    tabSelected: number;
    titles: string[];
    order: number;
    onClick?: (itemIndex: number) => void;
    paddingBlockBtnText?: TabListBtnTextProps['paddingBlock'];
    borderBottomWidth?: TabListBtnTextProps['borderBottomWidth'];
    orientation: TabListStyledProps['$orientation'];
} & StyledProps;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
    function TabListInner(
        {
            tabSelected,
            titles,
            order,
            onClick,
            paddingBlockBtnText = '0.5rem',
            borderBottomWidth = '0.25rem',
            orientation,
            ...remain
        }: TabListProps,
        ref
    ) {
        if (titles.length === 0) {
            return null;
        }
        return (
            <TabList_
                ref={ref}
                role="tablist"
                aria-labelledby={`tablist-${order}`}
                $borderBottomWidth={borderBottomWidth}
                $orientation={orientation}
                {...remain}
            >
                {titles.map((title, i) => (
                    <TabListBtn
                        key={title}
                        id={`tab-${i + 1}`}
                        aria-selected={tabSelected === i ? 'true' : 'false'}
                        aria-controls={`tabpanel-${i + 1}`}
                        tabIndex={i === tabSelected ? undefined : -1}
                        orientation={orientation}
                        onClick={() => onClick && onClick(i)}
                    >
                        <TabListBtnText
                            className="focus"
                            orientation={orientation}
                            selected={tabSelected === i}
                            paddingBlock={paddingBlockBtnText}
                            borderBottomWidth={borderBottomWidth}
                        >
                            {title}
                        </TabListBtnText>
                    </TabListBtn>
                ))}
            </TabList_>
        );
    }
);
