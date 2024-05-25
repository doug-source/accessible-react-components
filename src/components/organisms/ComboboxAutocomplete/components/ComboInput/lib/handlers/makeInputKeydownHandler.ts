import { swapIndex } from '../../../../../../../lib';
import { makeKeydownHandler } from '../../../../../../../lib/handlers/keyDown';

export const makeInputKeydownHandler = (
    expanded: boolean,
    setExpanded: (value: boolean) => void,
    selected: number,
    setSelected: (value: number) => void,
    onChange: (value: string) => void,
    items: string[]
) => {
    return makeKeydownHandler([
        [
            'Enter',
            () => {
                if (!expanded || selected === -1) {
                    return false;
                }
                onChange(items[selected]);
                setSelected(-1);
                setExpanded(false);
                return true;
            },
        ],
        [
            /^ArrowDown|ArrowUp$/,
            (evt) => {
                if (!expanded) {
                    setExpanded(true);
                    if (evt.key === 'ArrowDown' && evt.altKey) {
                        return true;
                    }
                }
                console.log('FOOOOOOOOOOOOOOO');

                setSelected(
                    swapIndex(
                        items,
                        evt.key === 'ArrowDown' ? selected + 1 : selected - 1
                    )
                );

                return true;
            },
        ],
        [
            'Escape',
            () => {
                setSelected(-1);
                setExpanded(false);
                return true;
            },
        ],
        [
            /^{typing}|\s$/,
            () => {
                if (!expanded) {
                    setExpanded(true);
                }

                setSelected(-1);
                return false;
            },
        ],
    ]);
};
