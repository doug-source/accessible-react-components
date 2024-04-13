import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { AlertDialogActions } from './index';

describe('<AlertDialogActions /> component', () => {
    test('renders correctly', () => {
        render(
            <AlertDialogActions data-testid="container">
                content
            </AlertDialogActions>
        );
        const $el = screen.getByTestId('container');
        expect($el).toBeVisible();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveStyleRule('text-align', 'right');
        expect($el).toHaveStyleRule('padding', '0 1.25rem 1.25rem');
    });
});
