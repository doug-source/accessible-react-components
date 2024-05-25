import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ComboListItem.module.scss';
import { ComboListItem } from './index';

describe('<ComboListItem /> component', () => {
    test('renders correctly', () => {
        render(
            <ul>
                <ComboListItem>ItemText one</ComboListItem>
            </ul>
        );
        const $item = screen.getByRole('option');
        expect($item).toBeInTheDocument();
        expect($item).toHaveClass(styles.item);
    });
});
