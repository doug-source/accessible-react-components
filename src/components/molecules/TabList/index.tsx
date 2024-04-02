import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { TabListBtn } from '../../atoms/TabListBtn';
import { TabListBtnText } from '../../atoms/TabListBtnText';
import { TabList_ } from './style';

type TabListBtnTextProps = ComponentPropsWithoutRef<typeof TabListBtnText>;
type StyledProps = Omit<
    ComponentPropsWithoutRef<typeof TabList_>,
    'onClick' | '$borderBottomWidth'
>;

type TabListProps = {
    tabSelected: number;
    titles: string[];
    order: number;
    onClick?: (itemIndex: number) => void;
    paddingBlockBtnText?: TabListBtnTextProps['paddingBlock'];
    borderBottomWidth?: TabListBtnTextProps['borderBottomWidth'];
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
                {...remain}
            >
                {titles.map((title, i) => (
                    <TabListBtn
                        key={title}
                        id={`tab-${i + 1}`}
                        aria-selected={tabSelected === i ? 'true' : 'false'}
                        aria-controls={`tabpanel-${i + 1}`}
                        tabIndex={i === tabSelected ? undefined : -1}
                        onClick={() => onClick && onClick(i)}
                    >
                        <TabListBtnText
                            className="focus"
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
