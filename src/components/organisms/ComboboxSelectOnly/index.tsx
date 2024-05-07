import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './ComboboxSelectOnly.module.scss';
import { ComboInput } from './components/ComboInput';
import { ComboMenu } from './components/ComboMenu';
import { OptList } from './components/OptList';
import { makeCallbacks } from './lib';
import { makeKeydownSelect } from './lib/handlers/makeKeydownSelect';
import { useReferences, useStates } from './lib/hooks/useOptionListRef';

type DivProps = ComponentPropsWithoutRef<'div'>;

type ComboboxSelectOnlyProps<T> = Omit<DivProps, 'onChange'> & {
    itemName: string;
    options: Array<{ label: string; value: T }>;
    onChange?: (value: T | null) => void;
    sameLine?: boolean;
};

export const ComboboxSelectOnly = <T,>({
    className,
    itemName,
    options,
    onChange,
    sameLine = false,
    ...remain
}: ComboboxSelectOnlyProps<T>) => {
    const labelId = useId();
    const listboxId = useId();
    const [comboMenuRef, optionListRef] = useReferences(options);
    const {
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
    } = useStates<T>(itemName);
    const [openCallback, chooseFocusedCallback] = makeCallbacks(
        selected,
        focused,
        options,
        setFocused,
        setSelected,
        setExpanded,
        setShowActiveOpt,
        setLabelSelected
    );

    return (
        <div
            {...remain}
            className={classNames(
                className,
                styles.box,
                sameLine && styles.sameline
            )}
        >
            <div id={labelId} className={styles.comboLabel}>
                Favorite Fruit
            </div>
            <ComboInput
                listboxId={listboxId}
                labelId={labelId}
                aria-expanded={expanded}
                onClick={openCallback}
                onKeyDown={makeKeydownSelect(
                    itemName,
                    focused,
                    setFocused,
                    setSelected,
                    comboMenuRef,
                    optionListRef,
                    options,
                    openCallback,
                    chooseFocusedCallback,
                    expanded,
                    setExpanded,
                    setShowActiveOpt,
                    setLabelSelected
                )}
            >
                {labelSelected}
            </ComboInput>
            <ComboMenu
                ref={comboMenuRef}
                className={classNames(expanded && ComboMenu.styles.open)}
                listboxId={listboxId}
                labelId={labelId}
                aria-activedescendant={showActiveOpt ? activeOpt ?? '' : ''}
            >
                <OptList
                    options={options}
                    selected={selected}
                    focused={focused}
                    optionListRef={optionListRef}
                    onChange={(value, activeOption) => {
                        setSelected(value);
                        setExpanded(false);
                        setActiveOpt(activeOption);
                        setShowActiveOpt(false);
                        setLabelSelected(
                            options.find((opt) => opt.value === value)?.label
                        );
                        onChange && onChange(value);
                    }}
                />
            </ComboMenu>
        </div>
    );
};
