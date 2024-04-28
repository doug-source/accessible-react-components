import { KeyboardEvent } from 'react';
import { makeHideHandlers } from './makeHide';

const makeEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

describe('makeHideHandlers function', () => {
    test('runs with output correctly', () => {
        const output = makeHideHandlers(() => {});
        expect(typeof output.hideCallback).toBe('function');
        expect(typeof output.escKeyDownHandler).toBe('function');
    });
    test('runs executing the hideCallback function correctly', () => {
        const setShowCalendar = jest.fn();
        const output = makeHideHandlers(setShowCalendar);
        expect(output.hideCallback()).toBe(true);
        expect(setShowCalendar).toHaveBeenCalled();
    });
    test('runs executing the hideCallback function correctly', () => {
        const setShowCalendar = jest.fn();
        const output = makeHideHandlers(setShowCalendar);
        let event = makeEvent('ArrowRight');
        output.escKeyDownHandler(event);
        expect(setShowCalendar).not.toHaveBeenCalled();
        event = makeEvent('Esc');
        output.escKeyDownHandler(event);
        expect(setShowCalendar).toHaveBeenCalledTimes(1);
        event = makeEvent('Escape');
        output.escKeyDownHandler(event);
        expect(setShowCalendar).toHaveBeenCalledTimes(2);
    });
});
