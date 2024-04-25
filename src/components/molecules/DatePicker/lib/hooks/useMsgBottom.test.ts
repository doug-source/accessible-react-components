import { renderHook } from '@testing-library/react';
import { useMsgBottom } from './useMsgBottom';

const runHook = (text: string) => {
    const { result, rerender } = renderHook(
        ({ show }) => {
            const [msg] = useMsgBottom(text, show);
            return msg;
        },
        {
            initialProps: {
                show: false,
            },
        }
    );
    return { result, rerender };
};

describe('useMsgBottom hook', () => {
    test('runs correctly', () => {
        const text = 'Cursor keys can navigate dates';
        const { result, rerender } = runHook(text);
        expect(typeof result.current).toBe('string');
        expect(result.current).toHaveLength(0);
        rerender({ show: true });
        expect(typeof result.current).toBe('string');
        expect(result.current).toBe(text);
    });
});
