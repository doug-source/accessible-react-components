import classNames from 'classnames';
import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { orientationAxis } from '../../../types/css-props';
import { TitleHidden } from '../../atoms/TitleHidden';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import styles from './Tabs.module.scss';
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
    orientation?: orientationAxis;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const Tabs = ({
    className,
    title,
    titles,
    children,
    // Define if the tabs must be focused on arrows keyboard pressing
    manual = false,
    orientation = 'horizontal',
}: TabsProps) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [order] = useState(orderCache++);
    const ref = useRef<HTMLDivElement>(null);

    useKeydown(ref, orientation, manual);

    return (
        <div
            className={classNames(
                className,
                styles.tabs,
                orientation === 'vertical' ? styles.vertical : null
            )}
            title="tabs"
        >
            <TitleHidden id={`tablist-${order}`}>{title}</TitleHidden>
            <TabList
                ref={ref}
                className="manual"
                tabSelected={tabSelected}
                titles={titles}
                onClick={(i) => setTabSelected(i)}
                order={order}
                orientation={orientation}
            />
            <TabPanel tabSelected={tabSelected}>{children}</TabPanel>
        </div>
    );
};
