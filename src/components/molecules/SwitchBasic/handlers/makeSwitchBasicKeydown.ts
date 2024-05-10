import { makeKeydownHandler } from '../../../../lib/handlers/keyDown';

export const makeSwitchBasicKeydownHandler = (action: () => void) => {
    return makeKeydownHandler([
        [
            /Enter|\s/,
            () => {
                action();
                return true;
            },
        ],
    ]);
};
