import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursorSvg } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchCursorSvg>;
type Props = Omit<ElementProps, 'type'> & Partial<Pick<ElementProps, 'type'>>;

const buildComponent = ({
    'aria-hidden': ariaHidden = false,
    type = 'on',
}: Props = {}) => {
    return (
        <svg>
            <SwitchCursorSvg
                type={type}
                data-testid="element-to-test"
                aria-hidden={ariaHidden}
            />
        </svg>
    );
};

describe('<SwitchCursorSvg /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toBeVisible();
    });
    test('renders no rect correctly', () => {
        render(buildComponent({ 'aria-hidden': true }));
        const $el = screen.getByTestId('element-to-test');
        expect($el).not.toBeVisible();
    });
    test('renders with transform css rule based on type property correctly', () => {
        const { rerender } = render(buildComponent({ type: 'on' }));
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveStyleRule(
            'transform',
            'translateX(calc(100% - 1rem - 0.5rem))'
        );
        rerender(buildComponent({ type: 'mixed' }));
        expect($el).toHaveStyleRule(
            'transform',
            'translateX(calc((100% - 1rem - 0.5rem) / 2))'
        );
        rerender(buildComponent({ type: 'off' }));
        expect($el).toHaveStyleRule('transform', 'translateX(0)');
    });
});
