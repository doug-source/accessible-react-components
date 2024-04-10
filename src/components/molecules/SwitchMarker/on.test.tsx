import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchMarker } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchMarker>;
type keys = 'checked';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    checked = false,
    className,
    padding,
    height,
    borderWidth,
}: Props = {}) => (
    <SwitchMarker
        checked={checked}
        className={className}
        padding={padding}
        height={height}
        borderWidth={borderWidth}
        data-testid="switch-marker"
    />
);

describe('<SwitchMarker /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('switch-marker');
        expect($el).toBeVisible();
    });
    test('renders with properties passed correctly', () => {
        const beforeProps = {
            padding: '0.125rem',
            borderWidth: '0.125rem',
            height: '0.75rem',
        };
        const { rerender } = render(buildComponent(beforeProps));
        const $el = screen.getByTestId('switch-marker');
        expect($el).toHaveStyleRule('padding', beforeProps.padding);
        expect($el).toHaveStyleRule(
            'height',
            `calc(${beforeProps.height} + ${beforeProps.padding} * 2 + ${beforeProps.borderWidth} * 2)`
        );
        expect($el).toHaveStyleRule('border-width', beforeProps.borderWidth);
        const afterProps = {
            padding: '0.25rem',
            borderWidth: '0.25rem',
            height: '1.5rem',
        };
        rerender(
            buildComponent({
                padding: afterProps.padding,
                height: afterProps.height,
                borderWidth: afterProps.borderWidth,
            })
        );
        expect($el).toHaveStyleRule('padding', afterProps.padding);
        expect($el).toHaveStyleRule('border-width', afterProps.borderWidth);
        expect($el).toHaveStyleRule(
            'height',
            `calc(${afterProps.height} + ${afterProps.padding} * 2 + ${afterProps.borderWidth} * 2)`
        );
    });
    test('renders with className passed correctly', () => {
        const { rerender } = render(
            buildComponent({ className: 'first-classname' })
        );
        const $el = screen.getByTestId('switch-marker');
        expect($el).toHaveClass('first-classname');
        rerender(buildComponent({ className: 'second-classname' }));
        expect($el).toHaveClass('second-classname');
    });
});
