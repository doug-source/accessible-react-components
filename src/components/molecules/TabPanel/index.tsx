import { Children, ComponentPropsWithoutRef, ReactNode } from 'react';
import { TabPanel_ } from './style';

type TabPanelStyleProps_ = ComponentPropsWithoutRef<typeof TabPanel_>;
type TabPanelProps = {
    tabSelected: number;
    children: ReactNode;
    padding?: TabPanelStyleProps_['$padding'];
} & Omit<TabPanelStyleProps_, '$padding' | 'children'>;

export const TabPanel = ({
    tabSelected,
    children,
    padding = 0,
    ...remain
}: TabPanelProps) => {
    return (
        <>
            {Children.map(children, (child, i) => {
                if (i !== tabSelected) {
                    return null;
                }
                return (
                    <TabPanel_
                        key={i}
                        id={`tabpanel-${i + 1}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${i + 1}`}
                        $padding={padding}
                        {...remain}
                    >
                        {child}
                    </TabPanel_>
                );
            })}
        </>
    );
};
