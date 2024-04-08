import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { TitleHidden } from '../../atoms/TitleHidden';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { useKeydown } from './lib/hooks';
import { Tabs_ } from './style';

let orderCache = 1;

type TabListProps = ComponentPropsWithoutRef<typeof TabList>;
type TabPanelProps = ComponentPropsWithoutRef<typeof TabPanel>;
type TabsStyledProps = ComponentPropsWithoutRef<typeof Tabs_>;

type TabsProps = {
    // h3 tag is a terminal-block element. Just text contents!
    title: string;

    titles: TabListProps['titles'];
    children: TabPanelProps['children'];
    manual?: boolean;
    orientation?: TabsStyledProps['$orientation'];
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const Tabs = ({
    title,
    titles,
    children,
    manual = false,
    orientation = 'horizontal',
}: TabsProps) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [order] = useState(orderCache++);
    const ref = useRef<HTMLDivElement>(null);

    useKeydown(ref, orientation, manual);

    return (
        <Tabs_ className="tabs" title="tabs" $orientation={orientation}>
            <TitleHidden id={`tablist-${order}`}>{title}</TitleHidden>
            <TabList
                ref={ref}
                className="manual"
                tabSelected={tabSelected}
                titles={titles}
                onClick={(i) => setTabSelected(i)}
                order={order}
                paddingBlockBtnText="0.5rem"
                borderBottomWidth="0.25rem"
                orientation={orientation}
            />
            <TabPanel tabSelected={tabSelected}>{children}</TabPanel>
        </Tabs_>
    );
};
