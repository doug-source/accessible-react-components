// import { ReactNode, useEffect, useRef, useState } from "react";
import { ReactNode, useEffect, useRef, useState } from 'react';
import { LabelDefault } from '../../components/LabelDefault';

export const useOptionListRef = <T,>(itemList: T[]) => {
    const listRef = useRef<Array<HTMLDivElement | null>>([]);
    useEffect(() => {
        listRef.current = listRef.current.slice(0, itemList.length);
    }, [itemList]);
    return listRef;
};

export const useReferences = <T,>(itemList: T[]) => {
    const comboMenuRef = useRef<HTMLDivElement | null>(null);
    const optionListRef = useOptionListRef(itemList);
    return [comboMenuRef, optionListRef] as const;
};

export const useStates = <T,>(itemName: string) => {
    const [focused, setFocused] = useState<T | null>(null);
    const [selected, setSelected] = useState<T | null>(null);
    const [labelSelected, setLabelSelected] = useState<ReactNode>(
        <LabelDefault itemName={itemName} />
    );
    const [expanded, setExpanded] = useState(false);
    const [activeOpt, setActiveOpt] = useState<string | null>(null);
    const [showActiveOpt, setShowActiveOpt] = useState(false);
    return {
        focused,
        setFocused,
        selected,
        setSelected,
        labelSelected,
        setLabelSelected,
        expanded,
        setExpanded,
        activeOpt,
        setActiveOpt,
        showActiveOpt,
        setShowActiveOpt,
    };
};
