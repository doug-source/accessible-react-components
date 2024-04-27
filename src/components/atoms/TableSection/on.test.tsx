import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { TableSection } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableSection>;
type Props = Omit<ElementProps, 'type'> &
    Partial<Pick<ElementProps, 'type'>> & {
        cellContent?: string;
    };

const buildComponent = ({
    type = 'thead',
    cellContent = 'content',
}: Props = {}) => {
    return (
        <table>
            <TableSection type={type} data-testid="key-test">
                <tr>
                    <td>{cellContent}</td>
                </tr>
            </TableSection>
        </table>
    );
};

describe('<TableSection /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        let $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        rerender(buildComponent({ type: 'tbody' }));
        $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        rerender(buildComponent({ type: 'tfoot' }));
        $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
    });
});
