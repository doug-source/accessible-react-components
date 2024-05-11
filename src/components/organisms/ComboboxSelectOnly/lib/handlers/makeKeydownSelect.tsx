import { MutableRefObject, ReactNode } from 'react';
import { scrollTo, triggerScrollTo } from '..';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import runtimeSearch from '../../../../../utils/RuntimeSearch';
import { LabelDefault } from '../../components/LabelDefault';

const definePageIndex = (
    { key }: { key: string },
    currentIndex: number,
    optionsLength: number
) => {
    if (key === 'PageUp') {
        return Math.max(0, currentIndex - makeKeydownSelect.pageSize);
    }
    return Math.min(
        optionsLength - 1,
        currentIndex + makeKeydownSelect.pageSize
    );
};

const makeKeydownSelect = <T,>(
    itemName: string,
    focused: T | null,
    setFocused: (value: T | null) => void,
    setSelected: (value: T | null) => void,
    comboMenuRef: MutableRefObject<HTMLDivElement | null>,
    optionListRef: MutableRefObject<(HTMLDivElement | null)[]>,
    options: Array<{ label: string; value: T }>,
    openCallback: () => boolean,
    chooseFocusedCallback: () => boolean,
    expanded: boolean,
    setExpanded: (value: boolean) => void,
    setShowActiveOpt: (value: boolean) => void,
    setLabelSelected: (value: ReactNode) => void
) => {
    return makeKeydownHandler([
        [
            '{typing}',
            (evt) => {
                if (!expanded) {
                    openCallback();
                }
                const startIndex = options.findIndex(
                    (opt) => opt.value === focused
                );
                const searchIndex = runtimeSearch.searchIndex(
                    options.map((opt) => opt.label),
                    evt.key,
                    startIndex
                );
                if (searchIndex > -1) {
                    setFocused(options[searchIndex].value);

                    const { current: comboMenu } = comboMenuRef;
                    if (comboMenu) {
                        setTimeout(() => {
                            triggerScrollTo(
                                optionListRef,
                                comboMenu,
                                searchIndex
                            );
                        }, 50);
                    }
                }
                return true;
            },
        ],
        [
            /^Enter|\s$/,
            () => {
                if (!expanded) {
                    return openCallback();
                }
                return chooseFocusedCallback();
            },
        ],
        [
            /^Escape|Esc$/,
            () => {
                if (!expanded) {
                    setLabelSelected(<LabelDefault itemName={itemName} />);
                    setFocused(null);
                    setSelected(null);
                }
                setExpanded(false);
                setShowActiveOpt(false);
                return true;
            },
        ],
        [
            'ArrowUp',
            (evt) => {
                if (!expanded) {
                    return openCallback();
                }
                const index = options.findIndex(
                    (opt) => opt && opt.value === focused
                );
                if (evt.altKey) {
                    return chooseFocusedCallback();
                }
                const { current: comboMenu } = comboMenuRef;
                if (index > 0 && comboMenu) {
                    const newIndex = index - 1;
                    const option = options[newIndex];
                    setFocused(option.value);
                    scrollTo(optionListRef, comboMenu, newIndex);
                }
                return true;
            },
        ],
        [
            'ArrowDown',
            () => {
                if (!expanded) {
                    return openCallback();
                }
                const index = options.findIndex(
                    (opt) => opt && opt.value === focused
                );
                const { current: comboMenu } = comboMenuRef;
                if (index < options.length - 1 && comboMenu) {
                    const newIndex = index + 1;
                    const option = options[newIndex];
                    setFocused(option.value);
                    scrollTo(optionListRef, comboMenu, newIndex);
                }
                return true;
            },
        ],
        [
            /^Home|End$/,
            (evt) => {
                if (!expanded) {
                    openCallback();
                }
                const newIndex = evt.key === 'Home' ? 0 : options.length - 1;
                const option = options[newIndex];
                option && setFocused(option.value);

                const { current: comboMenu } = comboMenuRef;
                if (comboMenu) {
                    setTimeout(() => {
                        triggerScrollTo(optionListRef, comboMenu, newIndex);
                    }, 50);
                }
                return true;
            },
        ],
        [
            /^PageUp|PageDown$/,
            (evt) => {
                if (!expanded) {
                    return false;
                }
                const currentIndex = options.findIndex(
                    (opt) => opt.value === focused
                );
                const newIndex = definePageIndex(
                    evt,
                    currentIndex,
                    options.length
                );
                const option = options[newIndex];
                option && setFocused(option.value);

                const { current: comboMenu } = comboMenuRef;
                if (comboMenu) {
                    setTimeout(() => {
                        triggerScrollTo(optionListRef, comboMenu, newIndex);
                    }, 50);
                }
                return true;
            },
        ],
    ]);
};

makeKeydownSelect.pageSize = 7;

export { makeKeydownSelect };
