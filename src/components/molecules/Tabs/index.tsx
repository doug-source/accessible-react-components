import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { TabTitle } from '../../atoms/TabTitle';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { useKeydown } from './lib/hooks';

let orderCache = 1;

type TabListProps = ComponentPropsWithoutRef<typeof TabList>;
type TabPanelProps = ComponentPropsWithoutRef<typeof TabPanel>;

type TabsProps = {
    // h3 tag is a terminal-block element. Just text contents!
    title: string;

    titles: TabListProps['titles'];
    children: TabPanelProps['children'];
    manual?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const Tabs = ({
    title,
    titles,
    children,
    manual = false,
}: TabsProps) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [order] = useState(orderCache++);
    const ref = useRef<HTMLDivElement>(null);

    useKeydown(ref, manual);

    return (
        <div className="tabs" title="tabs">
            <TabTitle order={order}>{title}</TabTitle>
            <TabList
                ref={ref}
                className="manual"
                tabSelected={tabSelected}
                titles={titles}
                onClick={(i) => setTabSelected(i)}
                order={order}
                paddingBlockBtnText="0.5rem"
                borderBottomWidth="0.25rem"
            />
            <TabPanel tabSelected={tabSelected}>{children}</TabPanel>
        </div>
    );
};
