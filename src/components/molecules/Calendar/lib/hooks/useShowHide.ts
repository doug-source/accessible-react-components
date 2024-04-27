import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';

export const useShowHide = (setShowCalendar: (show: boolean) => void) => {
    const showCallback = () => {
        setShowCalendar(true);
        return true;
    };
    const hideCallback = () => {
        setShowCalendar(false);
        return true;
    };
    const escKeyDownHandler = makeKeydownHandler([
        ['Esc', () => hideCallback()],
        ['Escape', () => hideCallback()],
    ]);
    return { showCallback, hideCallback, escKeyDownHandler };
};
