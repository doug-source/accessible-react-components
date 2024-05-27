import { swapIndex } from '../../../../../lib';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';

export const makeInputKeyDownHandler = <T>(
    expanded: boolean,
    focused: number,
    setFocused: (value: number) => void,
    cellBoolean: boolean,
    setCellBoolean: (value: boolean) => void,
    items: T[],
    text: string,
    onSelection: (value: T | null) => void,
    setShowItems: (value: boolean) => void
) => {
    return makeKeydownHandler([
        [
            /ArrowRight|ArrowLeft/,
            (evt) => {
                if (focused === -1) {
                    return false;
                }
                if (evt.key === 'ArrowRight' && cellBoolean) {
                    setFocused(swapIndex(items, focused + 1));
                }
                if (evt.key === 'ArrowLeft' && !cellBoolean) {
                    setFocused(swapIndex(items, focused - 1));
                }
                setCellBoolean(!cellBoolean);
                return true;
            },
        ],
        [
            /ArrowDown|ArrowUp/,
            (evt) => {
                if (!expanded) {
                    return false;
                }
                if (focused === -1) {
                    setCellBoolean(false);
                }
                setFocused(
                    swapIndex(
                        items,
                        evt.key === 'ArrowDown' ? focused + 1 : focused - 1
                    )
                );
                return true;
            },
        ],
        [
            'Escape',
            () => {
                if (!expanded && text.trim()) {
                    onSelection(null);
                }
                setFocused(-1);
                setShowItems(false);
                setCellBoolean(false);
                return true;
            },
        ],
        [
            'Enter',
            () => {
                onSelection(items[focused]);
                setFocused(-1);
                setShowItems(false);
                return true;
            },
        ],
        [
            /^Home|End$/,
            () => {
                setFocused(-1);
                return false;
            },
        ],
        [
            /^{typing}|Backspace$/,
            () => {
                setShowItems(true);
                return false;
            },
        ],
    ]);
};
