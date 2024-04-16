import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { orientationAxis } from '../../../types/css-props';
import { TabListBtn } from '../../atoms/TabListBtn';
import { TabListBtnText } from '../../atoms/TabListBtnText';
import styles from './TabList.module.scss';

type TabListProps = {
    tabSelected: number;
    titles: string[];
    order: number;
    onClick?: (itemIndex: number) => void;
    orientation: orientationAxis;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
    function TabListInner(
        {
            className,
            tabSelected,
            titles,
            order,
            onClick,
            orientation,
            ...remain
        }: TabListProps,
        ref
    ) {
        if (titles.length === 0) {
            return null;
        }
        return (
            <div
                {...remain}
                className={classNames(
                    className,
                    styles.tabList,
                    orientation === 'vertical' ? styles.vertical : null
                )}
                ref={ref}
                role="tablist"
                aria-labelledby={`tablist-${order}`}
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
                        >
                            {title}
                        </TabListBtnText>
                    </TabListBtn>
                ))}
            </div>
        );
    }
);
