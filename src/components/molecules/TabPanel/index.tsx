import classNames from 'classnames';
import { Children, ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './TabPanel.module.scss';

type TabPanelProps = {
    tabSelected: number;
    children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const TabPanel = ({
    tabSelected,
    className,
    children,
    ...remain
}: TabPanelProps) => {
    return (
        <>
            {Children.map(children, (child, i) => {
                if (i !== tabSelected) {
                    return null;
                }
                return (
                    <div
                        {...remain}
                        className={classNames(className, styles.tabPanel)}
                        key={i}
                        id={`tabpanel-${i + 1}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${i + 1}`}
                    >
                        {child}
                    </div>
                );
            })}
        </>
    );
};
