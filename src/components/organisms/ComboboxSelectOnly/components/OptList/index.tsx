import classNames from 'classnames';
import { MutableRefObject } from 'react';
import { Opt } from '../Opt';

type OptListProps<T> = {
    options: Array<{ label: string; value: T }>;
    selected: T;
    focused: T;
    onChange: (value: T, activeOption: string) => void;
    optionListRef: MutableRefObject<(HTMLDivElement | null)[]>;
};

export const OptList = <T,>({
    options,
    selected,
    focused,
    onChange,
    optionListRef,
}: OptListProps<T>) => (
    <>
        {options.map(({ label, value }, i) => (
            <Opt
                key={label}
                className={
                    classNames(focused === value && Opt.styles.focused) ||
                    undefined
                }
                id={`${label}-${i}`}
                optRefFn={(el) => {
                    optionListRef.current[i] = el;
                }}
                aria-selected={selected === value && 'true'}
                onClick={() => onChange(value, `${label}-${i}`)}
            >
                {label}
            </Opt>
        ))}
    </>
);
