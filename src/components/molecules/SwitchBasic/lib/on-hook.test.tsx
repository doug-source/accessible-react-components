import { render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useRef, useState } from 'react';
import { useToogleAriaChecked } from './hooks';

function setup(jsx: ReactNode) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

describe('useToogleAriaChecked hook', () => {
    test('runs when the ref keeps null', async () => {
        const { user } = setup(<></>);
        const {
            result: { current },
        } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            const [ariaChecked, setAriaChecked] = useState<boolean>(false);
            return useToogleAriaChecked(ref, ariaChecked, setAriaChecked);
        });
        const $active = document.activeElement;
        current();
        await user.keyboard('{Enter}');
        expect(document.activeElement).toBe($active);
    });
});
