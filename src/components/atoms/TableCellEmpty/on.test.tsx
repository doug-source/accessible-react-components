import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarEmptyCell.module.scss';
import { TableCellEmpty } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableCellEmpty>;
type Props = Omit<ElementProps, 'type'> & Partial<Pick<ElementProps, 'type'>>;

const buildComponent = ({ type = 'td', children = 'content' }: Props = {}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <TableCellEmpty type={type} data-testid="key-test">
                        {children}
                    </TableCellEmpty>
                </tr>
            </tbody>
        </table>
    );
};

describe('<CalendarEmptyCell /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.ghost);
    });
    test('renders with HTMLTableCellElement instance correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInstanceOf(HTMLTableCellElement);
        rerender(buildComponent({ type: 'td' }));
        expect($el).toBeInstanceOf(HTMLTableCellElement);
    });
});
