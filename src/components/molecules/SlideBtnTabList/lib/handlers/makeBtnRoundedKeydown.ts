import { MutableRefObject } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';

export const makeBtnRoundedKeydownHandler = <T>(
    setSelected: (value: number) => void,
    list: T[],
    btnListRef: MutableRefObject<(HTMLButtonElement | null)[]>,
    i: number
) => {
    return makeKeydownHandler([
        [
            /^Home|End$/,
            (evt) => {
                setSelected(evt.key === 'Home' ? 0 : list.length - 1);
                return true;
            },
        ],
        [
            /^ArrowLeft$/,
            () => {
                const index = i - 1;
                const newIndex = index < 0 ? list.length - 1 : index;

                const $btn = btnListRef.current[newIndex];
                $btn?.focus();
                setSelected(newIndex);
                return true;
            },
        ],
        [
            /^ArrowRight$/,
            () => {
                const index = i + 1;
                const newIndex = index > list.length - 1 ? 0 : index;

                const $btn = btnListRef.current[newIndex];
                $btn?.focus();
                setSelected(newIndex);
                return true;
            },
        ],
    ]);
};
