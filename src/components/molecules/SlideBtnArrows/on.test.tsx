import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from './SlideBtnArrows.module.scss';
import { SlideBtnArrows } from './index';

const ariaControls = 'other-controlled';
const list = ['one', 'two', 'three'];

describe('<SlideBtnArrows /> component', () => {
    test('renders correctly', () => {
        render(
            <SlideBtnArrows
                aria-controls={ariaControls}
                list={list}
                selected={-1}
                setSelected={() => {}}
                data-testid="element-test"
            />
        );
        const $el = screen.getByTestId('element-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.boxArrows);
        expect($el.firstChild).toHaveAttribute('aria-controls', ariaControls);
        expect($el.lastChild).toHaveAttribute('aria-controls', ariaControls);
    });
    test('renders with properties selected and setSelected correctly', async () => {
        const setSelected = jest.fn();
        const { rerender } = render(
            <SlideBtnArrows
                aria-controls={ariaControls}
                list={list}
                selected={1}
                setSelected={setSelected}
                data-testid="element-test"
            />
        );
        const $el = screen.getByTestId('element-test');
        const user = userEvent.setup();
        const [$previous, $next] = Array.from($el.children);
        await user.click($previous);
        expect(setSelected).toHaveBeenCalledWith(0);
        rerender(
            <SlideBtnArrows
                aria-controls={ariaControls}
                list={list}
                selected={1}
                setSelected={setSelected}
                data-testid="element-test"
            />
        );
        await user.click($next);
        expect(setSelected).toHaveBeenCalledWith(2);
    });
});
