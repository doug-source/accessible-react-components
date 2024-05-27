import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ComboGridCell.module.scss';
import { ComboGridCell } from './index';

describe('<ComboGridCell /> component', () => {
    test('renders correctly', () => {
        render(
            <ComboGridCell data-testid="test-component">content</ComboGridCell>
        );
        const $el = screen.getByTestId('test-component');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.cell);
        expect($el).toHaveTextContent('content');
    });
});
