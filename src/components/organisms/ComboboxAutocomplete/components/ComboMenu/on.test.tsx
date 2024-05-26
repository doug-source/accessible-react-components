import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ComboMenu.module.scss';
import { ComboMenu } from './index';

describe('<ComboMenu /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <ComboMenu expanded={true} show>
                <li>Item</li>
            </ComboMenu>
        );
        const $el = screen.getByRole('listbox');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.comboMenu);
        expect($el).not.toHaveClass('hidden');
        rerender(
            <ComboMenu expanded={false} show>
                <li>Item</li>
            </ComboMenu>
        );
        expect($el).toHaveClass('hidden');
    });
    test('renders with show equal false correctly', () => {
        render(
            <ComboMenu expanded={true} show={false}>
                <li>Item</li>
            </ComboMenu>
        );
    });
});
