import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { CloseIcon } from './index';

describe('<CloseIcon /> component', () => {
    test('renders correctly', () => {
        render(<CloseIcon data-testid="icon" />);
        const $el = screen.getByTestId('icon');
        expect($el).toBeVisible();
    });
});
