import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useAutomaticSlide } from './useAutomaticSlide';

const makeDefaults = () => {
    const automatic = false;
    const selected = -1;
    const setSelected = jest.fn();
    const list: string[] = [];
    const timer = -1;
    return { automatic, selected, setSelected, list, timer };
};

const runHook = (defaults: ReturnType<typeof makeDefaults>) => {
    const initialProps = defaults;
    return renderHook(
        ({ automatic, list, selected, setSelected, timer }) => {
            useAutomaticSlide(automatic, selected, setSelected, list, timer);
        },
        { initialProps }
    );
};

describe('useAutomaticSlide hook', () => {
    test('runs correctly', async () => {
        const defaults = makeDefaults();
        const hookRef = runHook(defaults);
        expect(defaults.setSelected).not.toHaveBeenCalled();
        defaults.automatic = true;
        defaults.timer = 500;
        defaults.selected = 0;
        defaults.list = ['first', 'second', 'third'];
        hookRef.rerender(defaults);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(defaults.setSelected).toHaveBeenCalledWith(1);
        defaults.automatic = false;
        await new Promise((resolve) => setTimeout(resolve, 500));
    });
});
