import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchMarker.module.scss';
import { SwitchMarker } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchMarker>;

const buildComponent = ({ className }: ElementProps = {}) => (
    <SwitchMarker className={className} data-testid="switch-marker" />
);

describe('<SwitchMarker /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('switch-marker');
        expect($el).toBeInTheDocument();
    });
    test('renders with className passed correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('switch-marker');
        expect($el).toHaveClass(styles.switchMarker);
        rerender(buildComponent({ className: 'first-classname' }));
        expect($el).toHaveClass(styles.switchMarker);
        expect($el).toHaveClass('first-classname');
        rerender(buildComponent({ className: 'second-classname' }));
        expect($el).toHaveClass(styles.switchMarker);
        expect($el).not.toHaveClass('first-classname');
        expect($el).toHaveClass('second-classname');
    });
});
