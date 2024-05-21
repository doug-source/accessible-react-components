import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    MutableRefObject,
    useRef,
    useState,
} from 'react';
import { BtnRounded } from '../../atoms/BtnRounded';
import styles from './SlideBtnTabList.module.scss';
import { makeBtnRoundedKeydownHandler } from './lib/handlers/makeBtnRoundedKeydown';
import { useItemBoxIdList } from './lib/hooks/useItemBoxIdList';

type SlideBtnTabListProps<T> = ComponentPropsWithoutRef<'div'> & {
    list: Array<T>;
    selected: number;
    setSelected: (value: number) => void;
    itemBoxListRef: MutableRefObject<(HTMLDivElement | null)[]>;
};

export const SlideBtnTabList = <T,>({
    className,
    list,
    selected,
    setSelected,
    itemBoxListRef,
    ...remain
}: SlideBtnTabListProps<T>) => {
    const [focused, setFocused] = useState(false);
    const btnListRef = useRef<Array<HTMLButtonElement | null>>([]);
    const [idList] = useItemBoxIdList(itemBoxListRef);

    return (
        <div
            {...remain}
            className={classNames(
                className,
                styles.boxTabs,
                focused && styles.focused
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            <div
                className={classNames(
                    focused && BtnRounded.styles.parentFocused
                )}
                role="tablist"
                aria-label="Slides"
            >
                {list.map((_, i) => (
                    <BtnRounded
                        key={i}
                        role="tab"
                        aria-label={`Slide ${i + 1}`}
                        ref={(el) => {
                            btnListRef.current[i] = el;
                        }}
                        tabIndex={i !== selected ? -1 : undefined}
                        aria-selected={i === selected}
                        parentFocused={focused}
                        aria-controls={idList[i]}
                        onClick={() => setSelected(i)}
                        onKeyDown={makeBtnRoundedKeydownHandler(
                            setSelected,
                            list,
                            btnListRef,
                            i
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
