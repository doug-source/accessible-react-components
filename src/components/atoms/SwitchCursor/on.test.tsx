import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchCursor.module.scss';
import { SwitchCursor } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchCursor>;
type Props = Omit<ElementProps, 'checked'> &
    Partial<Pick<ElementProps, 'checked'>>;

const buildComponent = ({ checked = false }: Props = {}) => {
    return <SwitchCursor checked={checked} data-testid="switch-cursor" />;
};

describe('<SwitchCursor /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('switch-cursor');
        expect($el).toBeInTheDocument();
    });
    test('render checked property correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('switch-cursor');
        expect($el).not.toHaveClass(styles.checked);
        rerender(buildComponent({ checked: true }));
        expect($el).toHaveClass(styles.checked);
    });
});
