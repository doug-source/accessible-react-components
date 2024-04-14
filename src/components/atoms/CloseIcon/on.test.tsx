import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { CloseIcon } from './index';

describe('<CloseIcon /> component', () => {
    test('renders correctly', () => {
        render(<CloseIcon />);
        const $el = screen.getByLabelText('close dialog');
        expect($el).toBeVisible();
        expect($el).toHaveAttribute('aria-label');
    });
});
