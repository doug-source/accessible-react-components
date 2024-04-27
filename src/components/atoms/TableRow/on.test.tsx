import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { TableRow } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableRow>;
type Props = Omit<ElementProps, 'show'> &
    Partial<Pick<ElementProps, 'show'>> & {
        cellContent?: string;
    };

const buildComponent = ({
    cellContent = 'content',
    show = true,
}: Props = {}) => (
    <table>
        <tbody>
            <TableRow show={show} data-testid="key-test">
                <td>{cellContent}</td>
            </TableRow>
        </tbody>
    </table>
);

describe('<TableRow /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
    });
    test('renders no content correctly', () => {
        render(buildComponent({ show: false }));
        expect(screen.queryByTestId('key-test')).not.toBeInTheDocument();
    });
    test('renders the content passed correctly', () => {
        const text = 'other content';
        render(buildComponent({ cellContent: text }));
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(text);
    });
});
