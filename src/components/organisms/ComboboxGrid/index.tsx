import { useId, useRef, useState } from 'react';
import { filterByStart } from '../../../lib';
import { ComboGridBox } from '../../atoms/ComboGridBox';
import { ComboGridInput } from '../../atoms/ComboGridInput';
import { ComboGridWrapper } from '../../atoms/ComboGridWrapper';
import { Label } from '../../atoms/Label';
import styles from './ComboboxGrid.module.scss';
import { ComboGridList } from './components/ComboGridList';

type DataItem = [text: string, desc: string];

type ComboboxGridProps = {
    items: Array<DataItem>;
    label?: string;
    onChange?: (value: DataItem | null) => void;
};

export const ComboboxGrid = ({ label, items, onChange }: ComboboxGridProps) => {
    const labelId = useId();
    const inputId = useId();
    const gridId = useId();
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(-1);
    const [showItems, setShowItems] = useState(false);
    const listFiltered = filterByStart(items, (item) => item[0], text);
    const expanded = text.trim().length > 0 && listFiltered.length > 0;
    const cellListRef = useRef<Array<HTMLDivElement | null>>([]);
    const [cellBoolean, setCellBoolean] = useState(false);

    return (
        <>
            <Label className={styles.textLabel} htmlFor={inputId}>
                {label}
            </Label>
            <ComboGridWrapper>
                <ComboGridInput
                    id={inputId}
                    aria-controls={gridId}
                    expanded={expanded && showItems}
                    setFocused={setFocused}
                    items={listFiltered}
                    focused={focused}
                    value={text}
                    onChange={(evt) => setText(evt.target.value)}
                    text={text}
                    setShowItems={setShowItems}
                    onSelection={(item) => {
                        const selection = item?.[0] ?? '';
                        setText(selection);
                        onChange && onChange(item);
                    }}
                    cellListRef={cellListRef}
                    cellBoolean={cellBoolean}
                    setCellBoolean={setCellBoolean}
                />
                <ComboGridBox labelId={label ? labelId : undefined}>
                    <ComboGridList
                        items={
                            text.trim().length > 0 && showItems
                                ? listFiltered
                                : []
                        }
                        focused={focused}
                        cellListRef={cellListRef}
                        cellBoolean={cellBoolean}
                    />
                </ComboGridBox>
            </ComboGridWrapper>
        </>
    );
};
