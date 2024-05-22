import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './MenuItem.module.scss';
import { MenuItem } from './index';

describe('<MenuItem /> component', () => {
    test('renders correctly', () => {
        render(
            <ul>
                <MenuItem listRefFn={() => {}}>list item content</MenuItem>
            </ul>
        );
        const $el = screen.getByText('list item content');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menuItem);
    });
    test('renders with and no identifier correctly', () => {
        const { rerender } = render(
            <ul>
                <MenuItem listRefFn={() => {}}>list item content</MenuItem>
            </ul>
        );
        const $el = screen.getByText('list item content');
        expect($el).not.toHaveAttribute('id');
        rerender(
            <ul>
                <MenuItem identified listRefFn={() => {}}>
                    list item content
                </MenuItem>
            </ul>
        );
        expect($el).toHaveAttribute('id');
    });
});
