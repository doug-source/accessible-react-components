import { ComponentPropsWithoutRef, useState } from 'react';
import { useCollapse, useUnique } from '../../context/hooks';
import { Item } from '../Item';
import { makeItemKeyDown } from './lib/handlers/makeItemKeydown';
import { useBtnRefList } from './lib/hooks/useBtnRefList';
import { makeNewExpandedList } from './lib/newCollapse';

type ItemProps = ComponentPropsWithoutRef<typeof Item>;

type ItemListProps = {
    itemList: Array<[ItemProps['headerContent'], ItemProps['panelContent']]>;
};

const ItemList = ({ itemList }: ItemListProps) => {
    const [expandedList, setExpandedList] = useState<string[]>([]);
    const unique = useUnique();
    const collapse = useCollapse();

    const listRef = useBtnRefList(itemList);

    return (
        <>
            {itemList.map(([$headerContent, $panelContent], i) => (
                <Item
                    key={i}
                    btnRefFn={(btn) => {
                        listRef.current[i] = btn;
                    }}
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
                    onKeyDown={makeItemKeyDown(listRef)}
                />
            ))}
        </>
    );
};

export { ItemList };
