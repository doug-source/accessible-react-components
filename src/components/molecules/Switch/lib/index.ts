import { KeyboardEventHandler } from 'react';

type KeyboardHandler = KeyboardEventHandler<HTMLDivElement>;

export const makeKeydownHandler = (action: () => void): KeyboardHandler => {
    return (evt) => {
        let flag = false;
        switch (evt.key) {
            case ' ':
            case 'Enter': {
                flag = true;
                action();
                break;
            }
        }
        if (flag) {
            evt.preventDefault();
        }
    };
};
