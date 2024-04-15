import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DialogBox } from './index';

describe('<DialogBox /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        const { rerender } = render(<DialogBox>{text}</DialogBox>);
        const $el = screen.getByText(text);
        expect($el).not.toBeVisible();
        rerender(<DialogBox show>{text}</DialogBox>);
        expect($el).toBeVisible();
    });
});
