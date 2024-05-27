import classNames from 'classnames';
import { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import styles from './ComboGridInput.module.scss';
import { makeInputKeyDownHandler } from './lib/handlers/makeInputKeydownHandler';
import { useActiveDescendant } from './lib/hooks/useActiveDescendant';

type ComboInputProps<T> = ComponentPropsWithoutRef<'input'> & {
    expanded: boolean;
    focused: number;
    setFocused: (value: number) => void;
    items: Array<T>;
    text: string;
    setShowItems: (value: boolean) => void;
    onSelection: (value: T | null) => void;
    cellListRef: MutableRefObject<(HTMLDivElement | null)[]>;
    cellBoolean: boolean;
    setCellBoolean: (value: boolean) => void;
};

export const ComboGridInput = <T,>({
    className,
    expanded,
    focused,
    setFocused,
    items,
    text,
    setShowItems,
    onSelection,
    cellListRef,
    cellBoolean,
    setCellBoolean,
    ...remain
}: ComboInputProps<T>) => {
    const [activeDescendant] = useActiveDescendant(
        focused,
        cellBoolean,
        cellListRef
    );

    return (
        <input
            {...remain}
            type="text"
            role="combobox"
            aria-haspopup="grid"
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-activedescendant={activeDescendant}
            className={classNames(className, styles.comboInput)}
            onKeyDown={makeInputKeyDownHandler(
                expanded,
                focused,
                setFocused,
                cellBoolean,
                setCellBoolean,
                items,
                text,
                onSelection,
                setShowItems
            )}
        />
    );
};
