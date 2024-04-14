import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { AlertDialogHeading } from './index';

describe('<AlertDialogHeading /> component', () => {
    test('renders correctly', () => {
        render(
            <AlertDialogHeading id="heading-title">title</AlertDialogHeading>
        );
        const $el = screen.getByText('title');
        expect($el).toBeVisible();
        expect($el).toHaveTextContent('title');
        expect($el).toHaveStyleRule('text-align', 'center');
        expect($el).toHaveStyleRule('font-size', '140%');
        expect($el).toHaveAttribute('id', 'heading-title');
    });
});
