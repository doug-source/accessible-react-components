import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useState } from 'react';
import { makeBooleanHandle } from '../../../lib';
import { useMenuItemListRefs } from '../../../lib/hooks/useMenuItemListRefs';
import styles from './ComboboxAutocomplete.module.scss';
import { ComboBtn } from './components/ComboBtn';
import { ComboInput } from './components/ComboInput';
import { ComboList } from './components/ComboList';
import { ComboMenu } from './components/ComboMenu';
import { filterByStart } from './lib';

type ComboboxAutocompleteProps = ComponentPropsWithoutRef<'div'> & {
    items: string[];
    label?: string;
    onChange?: ComponentPropsWithoutRef<typeof ComboInput>['onChange'];
    filter?: boolean;
};

export const ComboboxAutocomplete = ({
    className,
    items,
    label,
    onChange,
    filter = false,
    ...remain
}: ComboboxAutocompleteProps) => {
    const [expanded, setExpanded] = useState(false);
    const inputId = useId();
    const listBoxId = useId();
    const [selected, setSelected] = useState(-1);
    const [, itemsRef] = useMenuItemListRefs<unknown, HTMLLIElement>(items);
    const [value, setValue] = useState('');
    const listFiltered = filter ? filterByStart(value, items) : items;
    return (
        <>
            {label && (
                <label className={styles.boxLabel} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <div
                {...remain}
                className={classNames(className, styles.box)}
                onClick={makeBooleanHandle(expanded, setExpanded)}
            >
                <ComboInput
                    id={inputId}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    aria-controls={listBoxId}
                    items={listFiltered}
                    selected={selected}
                    setSelected={setSelected}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        onChange && onChange(newValue);
                    }}
                    aria-activedescendant={itemsRef.current[selected]?.id || ''}
                />
                <ComboBtn expanded={expanded} aria-controls={listBoxId} />
                <ComboMenu expanded={expanded} id={listBoxId}>
                    <ComboList
                        items={listFiltered}
                        itemsRef={itemsRef}
                        selected={selected}
                        setSelected={setSelected}
                        onChange={(newValue) => {
                            setValue(newValue);
                            onChange && onChange(newValue);
                        }}
                    />
                </ComboMenu>
            </div>
        </>
    );
};
