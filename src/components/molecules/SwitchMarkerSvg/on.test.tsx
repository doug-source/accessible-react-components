import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchMarkerSvg } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchMarkerSvg>;

const buildComponent = ({
    'aria-checked': ariaChecked = false,
}: ElementProps = {}) => {
    return (
        <SwitchMarkerSvg
            aria-checked={ariaChecked}
            data-testid="element-to-test"
        />
    );
};

describe('<SwitchMarkerSvg /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toBeVisible();
    });
    test('renders css rules correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveStyleRule('width', '3.5rem');
        expect($el).toHaveStyleRule('height', '1.5rem');
        expect($el).toHaveStyleRule('position', 'relative');
    });
    test('renders children correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        const offChild = within($el).getByLabelText('cursor off');
        const mixedChild = within($el).getByLabelText('cursor mixed');
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toBeVisible();
        expect(mixedChild).not.toBeVisible();
        expect(onChild).not.toBeVisible();
        rerender(buildComponent({ 'aria-checked': 'true' }));
        expect(offChild).not.toBeVisible();
        expect(mixedChild).not.toBeVisible();
        expect(onChild).toBeVisible();
        rerender(buildComponent({ 'aria-checked': 'mixed' }));
        expect(offChild).not.toBeVisible();
        expect(mixedChild).toBeVisible();
        expect(onChild).not.toBeVisible();
    });
});
