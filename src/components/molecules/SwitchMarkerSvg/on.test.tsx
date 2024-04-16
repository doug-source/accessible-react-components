import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import stylesFromCursor from '../../atoms/SwitchCursorSvg/SwitchCursorSvg.module.scss';
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
        expect($el).toBeInTheDocument();
    });
    test('renders children with ariaChecked equal false correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-to-test');
        const offChild = within($el).getByLabelText('cursor off');
        const mixedChild = within($el).getByLabelText('cursor mixed');
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toHaveClass(stylesFromCursor.show);
        expect(offChild).not.toHaveClass(stylesFromCursor.hide);
        expect(mixedChild).toHaveClass(stylesFromCursor.hide);
        expect(mixedChild).not.toHaveClass(stylesFromCursor.show);
        expect(onChild).toHaveClass(stylesFromCursor.hide);
        expect(onChild).not.toHaveClass(stylesFromCursor.show);
    });
    test('renders children with ariaChecked equal true correctly', () => {
        render(buildComponent({ 'aria-checked': true }));
        const $el = screen.getByTestId('element-to-test');
        const offChild = within($el).getByLabelText('cursor off');
        const mixedChild = within($el).getByLabelText('cursor mixed');
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toHaveClass(stylesFromCursor.hide);
        expect(offChild).not.toHaveClass(stylesFromCursor.show);
        expect(mixedChild).toHaveClass(stylesFromCursor.hide);
        expect(mixedChild).not.toHaveClass(stylesFromCursor.show);
        expect(onChild).toHaveClass(stylesFromCursor.show);
        expect(onChild).not.toHaveClass(stylesFromCursor.hide);
    });
    test('renders children with ariaChecked equal mixed correctly', () => {
        render(buildComponent({ 'aria-checked': 'mixed' }));
        const $el = screen.getByTestId('element-to-test');
        const offChild = within($el).getByLabelText('cursor off');
        const mixedChild = within($el).getByLabelText('cursor mixed');
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toHaveClass(stylesFromCursor.hide);
        expect(offChild).not.toHaveClass(stylesFromCursor.show);
        expect(mixedChild).toHaveClass(stylesFromCursor.show);
        expect(mixedChild).not.toHaveClass(stylesFromCursor.hide);
        expect(onChild).toHaveClass(stylesFromCursor.hide);
        expect(onChild).not.toHaveClass(stylesFromCursor.show);
    });
});
