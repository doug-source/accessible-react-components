import { render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useToogleAriaChecked } from './hooks';

function setup(jsx: ReactNode) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

describe('useToogleAriaChecked hook', () => {
    test('runs correctly', async () => {
        const { user } = setup(<></>);
        const onChange = jest.fn();
        const {
            result: { current },
        } = renderHook(() => {
            const [ariaChecked, setAriaChecked] = useState<boolean>(false);
            return useToogleAriaChecked(ariaChecked, setAriaChecked, onChange);
        });
        const $active = document.activeElement;
        act(() => {
            current();
        });
        await user.keyboard('{Enter}');
        expect(document.activeElement).toBe($active);
        expect(onChange).toHaveBeenCalled();
    });
});
