import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchBtn>;

const buildComponent = ({
    label,
    'aria-checked': ariaChecked,
}: ElementProps = {}) => {
    return <SwitchBtn label={label} aria-checked={ariaChecked} />;
};

describe('<SwitchBtn /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el).toBeVisible();
    });
    test('renders with label property passed correctly', () => {
        const label = 'Lunch:';
        const { rerender } = render(buildComponent({ label }));
        const $el = screen.getByRole('switch');
        expect(within($el).getByText(label)).toBeVisible();
        rerender(buildComponent());
        expect(within($el).queryByText(label)).not.toBeInTheDocument();
    });
    test('renders with css properties correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el).toHaveStyleRule('color', 'currentColor');
        expect($el).toHaveStyleRule('background-color', 'transparent');
        expect($el).toHaveStyleRule('cursor', 'pointer');
        expect($el).toHaveStyleRule('padding', '0.25rem');
        expect($el).toHaveStyleRule('border-width', '0.125rem');
        expect($el).toHaveStyleRule('border-style', 'solid');
        expect($el).toHaveStyleRule('border-color', 'transparent');
        expect($el).toHaveStyleRule('margin', '0');
        expect($el).toHaveStyleRule('display', 'inline-flex');
        expect($el).toHaveStyleRule('align-items', 'flex-end');

        expect($el).toHaveStyleRule('border-color', '#005a9c', {
            modifier: '&:focus',
        });
        expect($el).toHaveStyleRule('outline', 'none', {
            modifier: '&:focus',
        });
        expect($el).toHaveStyleRule('border-color', '#005a9c', {
            modifier: '&:hover',
        });
        expect($el).toHaveStyleRule('outline', 'none', {
            modifier: '&:hover',
        });
    });
});
