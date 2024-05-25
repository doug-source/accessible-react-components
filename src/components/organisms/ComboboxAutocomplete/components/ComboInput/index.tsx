import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboInput.module.scss';
import { makeInputKeydownHandler } from './lib/handlers/makeInputKeydownHandler';

type InputProps = ComponentPropsWithoutRef<'input'>;

type ComboInputProps = Omit<InputProps, 'onChange' | 'aria-autocomplete'> & {
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    selected: number;
    setSelected: (value: number) => void;
    items: string[];
    value: string;
    onChange: (value: string) => void;
    'aria-autocomplete'?: 'none' | 'list';
};

export const ComboInput = ({
    className,
    expanded,
    setExpanded,
    selected,
    setSelected,
    items,
    onChange,
    'aria-autocomplete': ariaAutoComplete = 'none',
    ...remain
}: ComboInputProps) => (
    <input
        {...remain}
        type="text"
        aria-autocomplete={ariaAutoComplete}
        aria-expanded={expanded}
        tabIndex={0}
        className={classNames(
            className,
            styles.combo,
            selected === -1 && styles.focused
        )}
        onChange={(evt) => onChange(evt.target.value)}
        onKeyDown={makeInputKeydownHandler(
            expanded,
            setExpanded,
            selected,
            setSelected,
            onChange,
            items
        )}
    />
);
