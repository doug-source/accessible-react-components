import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';

export const makeHideHandlers = (setShowCalendar: (show: boolean) => void) => {
    const hideCallback = () => {
        setShowCalendar(false);
        return true;
    };
    const escKeyDownHandler = makeKeydownHandler([
        [/^Escape|Esc$/, () => hideCallback()],
    ]);
    return { hideCallback, escKeyDownHandler };
};
