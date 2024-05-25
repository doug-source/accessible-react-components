import { MutableRefObject } from 'react';
import { ComboListItem } from '../ComboListItem';

type ComboListProps = {
    items: string[];
    itemsRef: MutableRefObject<(HTMLLIElement | null)[]>;
    selected: number;
    setSelected: (value: number) => void;
    onChange: (value: string) => void;
};

export const ComboList = ({
    items,
    itemsRef,
    selected,
    setSelected,
    onChange,
}: ComboListProps) => (
    <>
        {items.map((item, i) => (
            <ComboListItem
                key={item}
                ref={(el) => {
                    itemsRef.current[i] = el;
                }}
                aria-selected={selected === i ? true : undefined}
                onClick={() => {
                    onChange(items[selected]);
                    setSelected(-1);
                }}
                onMouseOver={(evt) => {
                    setSelected(i);
                    evt.stopPropagation();
                    evt.preventDefault();
                }}
            >
                {item}
            </ComboListItem>
        ))}
    </>
);
