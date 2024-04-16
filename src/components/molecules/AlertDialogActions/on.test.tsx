import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AlertDialogActions } from './index';

describe('<AlertDialogActions /> component', () => {
    test('renders correctly', () => {
        render(
            <AlertDialogActions data-testid="container">
                content
            </AlertDialogActions>
        );
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveClass('alertDialogActions');
    });
});
