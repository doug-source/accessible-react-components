import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import styles from './TableGrid.module.scss';
import { TableGrid } from './index';

describe('<TableGrid /> component', () => {
    test('renders correctly', () => {
        render(<TableGrid data-testid="key-test" />);
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.tableGrid);
    });
    test('renders children correctly', () => {
        render(
            <TableGrid data-testid="key-test">
                <tbody>
                    <tr>
                        <td data-testid="key-test-child">content</td>
                    </tr>
                </tbody>
            </TableGrid>
        );
        const $child = within(screen.getByTestId('key-test')).getByTestId(
            'key-test-child'
        );
        expect($child).toBeInTheDocument();
        expect($child).toHaveTextContent('content');
    });
});
