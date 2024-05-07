import { MutableRefObject } from 'react';

export const isReducedMotion = (windowObject = window) => {
    const output = windowObject.matchMedia('(prefers-reduced-motion: reduce)');
    if (output && !Object.hasOwnProperty.call(output, 'matches')) {
        return true;
    }
    return Boolean(output.matches);
};

export const defineScrollTop = (
    comboMenu: HTMLDivElement,
    opt: HTMLDivElement
) => {
    const { offsetHeight: parentOffsetHeight, scrollTop } = comboMenu;
    const { offsetHeight, offsetTop } = opt;

    if (offsetTop < scrollTop) {
        return offsetTop;
    }
    if (offsetTop + offsetHeight > scrollTop + parentOffsetHeight) {
        return offsetTop - parentOffsetHeight + offsetHeight;
    }
    return scrollTop;
};

export const scrollTo = (
    optionListRef: MutableRefObject<(HTMLDivElement | null)[]>,
    comboMenu: HTMLDivElement,
    index: number
) => {
    const opt = optionListRef.current[index];
    if (!opt) {
        return;
    }
    comboMenu.scrollTo(0, defineScrollTop(comboMenu, opt));
    return true;
};

export const triggerScrollTo = (
    optionListRef: MutableRefObject<(HTMLDivElement | null)[]>,
    comboMenu: HTMLDivElement,
    index: number,
    windowObject = window
) => {
    if (isReducedMotion(windowObject)) {
        return scrollTo(optionListRef, comboMenu, index);
    }
    const opt = optionListRef.current[index];
    if (!opt) {
        return;
    }
    opt.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
    });
    return true;
};

export const makeCallbacks = <T>(
    selected: T,
    focused: T,
    options: Array<{ label: string; value: T }>,
    setFocused: (value: T) => void,
    setSelected: (value: T) => void,
    setExpanded: (value: boolean) => void,
    setShowActiveOpt: (value: boolean) => void,
    setLabelSelected: (value: string | undefined) => void
) => {
    const openCallback = () => {
        setFocused(selected);
        setExpanded(true);
        setShowActiveOpt(true);
        return true;
    };
    const chooseFocusedCallback = () => {
        setSelected(focused);
        setLabelSelected(options.find((opt) => opt.value === focused)?.label);
        setExpanded(false);
        setShowActiveOpt(false);
        return true;
    };
    return [openCallback, chooseFocusedCallback] as const;
};
