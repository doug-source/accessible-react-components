import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import stylesFromCursor from '../../atoms/SwitchCursorSvg/SwitchCursorSvg.module.scss';
import { SwitchMarkerSvg } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchMarkerSvg>;
type Props = Omit<ElementProps, 'aria-checked'> &
    Partial<Pick<ElementProps, 'aria-checked'>>;

const buildComponent = ({
    'aria-checked': ariaChecked = false,
}: Props = {}) => {
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
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toHaveClass(stylesFromCursor.show);
        expect(offChild).not.toHaveClass(stylesFromCursor.hide);
        expect(onChild).toHaveClass(stylesFromCursor.hide);
        expect(onChild).not.toHaveClass(stylesFromCursor.show);
    });
    test('renders children with ariaChecked equal true correctly', () => {
        render(buildComponent({ 'aria-checked': true }));
        const $el = screen.getByTestId('element-to-test');
        const offChild = within($el).getByLabelText('cursor off');
        const onChild = within($el).getByLabelText('cursor on');
        expect(offChild).toHaveClass(stylesFromCursor.hide);
        expect(offChild).not.toHaveClass(stylesFromCursor.show);
        expect(onChild).toHaveClass(stylesFromCursor.show);
        expect(onChild).not.toHaveClass(stylesFromCursor.hide);
    });
});
