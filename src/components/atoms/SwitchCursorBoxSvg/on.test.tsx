import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SwitchCursorBoxSvg } from './index';

function buildComponent() {
    return (
        <svg>
            <SwitchCursorBoxSvg data-testid="element-to-test" />
        </svg>
    );
}

describe('<SwitchCursorBoxSvg /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toBeInTheDocument();
    });
    test('renders with style rules correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveAttribute('x', '0.0625rem');
        expect($el).toHaveAttribute('y', '0.0625rem');
        expect($el).toHaveAttribute('rx', '0.25rem');
        expect($el).toHaveClass('switchCursorBoxSvg');
    });
});
