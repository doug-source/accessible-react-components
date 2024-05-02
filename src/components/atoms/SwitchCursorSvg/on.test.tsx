import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchCursorSvg.module.scss';
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
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('aria-hidden', 'false');
        expect($el).toHaveClass(styles.show);
    });
    test('renders in hidden way correctly', () => {
        render(buildComponent({ 'aria-hidden': true }));
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveAttribute('aria-hidden', 'true');
        expect($el).toHaveClass(styles.hide);
    });
    test('renders based on type property correctly', () => {
        const { rerender } = render(buildComponent({ type: 'on' }));
        const $el = screen.getByTestId('element-to-test');
        expect($el).toHaveClass(styles.on);
        rerender(buildComponent({ type: 'off' }));
        expect($el).toHaveClass(styles.off);
    });
});
