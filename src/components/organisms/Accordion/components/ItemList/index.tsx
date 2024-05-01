import { ComponentPropsWithoutRef, useState } from 'react';
import { useCollapse, useUnique } from '../../context/hooks';
import { Item } from '../Item';
import { makeNewExpandedList } from './lib/newCollapse';

type ItemProps = ComponentPropsWithoutRef<typeof Item>;

type ItemListProps = {
    itemList: Array<[ItemProps['headerContent'], ItemProps['panelContent']]>;
};

const ItemList = ({ itemList }: ItemListProps) => {
    const [expandedList, setExpandedList] = useState<string[]>([]);
    const unique = useUnique();
    const collapse = useCollapse();
    return (
        <>
            {itemList.map(([$headerContent, $panelContent], i) => (
                <Item
                    key={i}
                    expandedList={expandedList}
                    headerContent={$headerContent}
                    panelContent={$panelContent}
                    keepPanelRole={unique || itemList.length <= 6}
                    onClick={(headerId) => {
                        setExpandedList(
                            makeNewExpandedList(
                                headerId,
                                expandedList,
                                unique,
                                collapse
                            )
                        );
                    }}
                />
            ))}
        </>
    );
};

export { ItemList };
