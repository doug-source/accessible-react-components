import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchBasicBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchBasicBox>;
type Props = Omit<ElementProps, 'focusable'> &
    Partial<Pick<ElementProps, 'focusable'>>;

const buildComponent = ({
    children,
    focusable = true,
    ...remain
}: Props = {}) => {
    return render(
        <SwitchBasicBox focusable={focusable} {...remain}>
            {children}
        </SwitchBasicBox>
    );
};

describe('<SwitchBasicBox /> component', () => {
    test('renders correctly', () => {
        const children = 'Some content';
        buildComponent({ children });
        const $el = screen.getByText(children);
        expect($el).toBeVisible();
    });
    test('renders with css rules passed correctly', () => {
        const children = 'Some content';
        buildComponent({ children });
        const $el = screen.getByText(children);
        expect($el).toHaveStyleRule('cursor', 'pointer');
        expect($el).toHaveStyleRule('padding', '0.25rem');
        expect($el).toHaveStyleRule('border-width', '0.125rem');
        expect($el).toHaveStyleRule('border-style', 'solid');
        expect($el).toHaveStyleRule('border-color', 'transparent');
        expect($el).toHaveStyleRule('display', 'inline-flex');
        expect($el).toHaveStyleRule('align-items', 'center');
    });
    test('renders with focusable property correctly', () => {
        const children = 'Some content';
        buildComponent({ children });
        const $el = screen.getByText(children);
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
    test('renders no focusable property correctly', () => {
        const children = 'Some content';
        buildComponent({ children, focusable: false });
        const $el = screen.getByText(children);
        expect($el).toHaveStyleRule('border-color', '#005a9c', {
            modifier: '&.focus',
        });
        expect($el).toHaveStyleRule('outline', 'none', {
            modifier: '&.focus',
        });
    });
});
