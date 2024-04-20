import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { CalendarRow } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof CalendarRow>;
type Props = Omit<ElementProps, 'show'> &
    Partial<Pick<ElementProps, 'show'>> & {
        cellContent?: string;
    };

const buildComponent = ({
    cellContent = 'content',
    show = true,
}: Props = {}) => {
    return (
        <table>
            <tbody>
                <CalendarRow show={show} data-testid="key-test">
                    <td>{cellContent}</td>
                </CalendarRow>
            </tbody>
        </table>
    );
};

describe('<CalendarRow /> component', () => {
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
