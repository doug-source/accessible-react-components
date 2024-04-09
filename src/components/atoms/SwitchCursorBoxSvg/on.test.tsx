import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
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
        expect($el).toBeVisible();
    });
    test('renders with style rules correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveStyleRule('fill-opacity', '0');
        expect($el).toHaveStyleRule('stroke-width', '0.125rem');
        expect($el).toHaveStyleRule('stroke', 'currentcolor');
        expect($el).toHaveStyleRule('width', 'calc(100% - 0.125rem)');
        expect($el).toHaveStyleRule('height', 'calc(100% - 0.125rem)');
        expect($el).toHaveStyleRule('position', 'absolute');
    });
    test('renders with SVG attributes correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveAttribute('x', '0.0625rem');
        expect($el).toHaveAttribute('y', '0.0625rem');
        expect($el).toHaveAttribute('rx', '0.25rem');
    });
});
