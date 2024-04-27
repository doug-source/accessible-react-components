import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { TableCell } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableCell>;
type Props = Omit<ElementProps, 'type'> & Partial<Pick<ElementProps, 'type'>>;

const buildComponent = ({ type = 'th', children = 'content' }: Props = {}) => (
    <table>
        <tbody>
            <tr>
                <TableCell type={type} data-testid="key-test">
                    {children}
                </TableCell>
            </tr>
        </tbody>
    </table>
);

describe('<TableCell /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
    });
    test('renders with HTMLTableCellElement instance correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInstanceOf(HTMLTableCellElement);
        rerender(buildComponent({ type: 'td' }));
        expect($el).toBeInstanceOf(HTMLTableCellElement);
    });
});
