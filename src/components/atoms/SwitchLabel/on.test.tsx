import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SwitchLabel } from './index';

describe('<SwitchLabel /> component', () => {
    test('renders correctly', () => {
        const label = 'label content';
        render(<SwitchLabel label={label} />);
        const $el = screen.getByText(label);
        expect($el).toHaveTextContent(label);
    });
    test('renders no label correctly', () => {
        const testid = 'label-here';
        render(<SwitchLabel data-testid={testid} />);
        const $el = screen.queryByTestId(testid);
        expect($el).not.toBeInTheDocument();
    });
    test('renders no className correctly', () => {
        render(<SwitchLabel label="label content" />);
        const $el = screen.getByText('label content');
        expect($el.className.split(' ')).toHaveLength(1);
    });
    test('renders with className property passed correctly', () => {
        const className = 'AnotherClass';
        render(<SwitchLabel label="label content" className={className} />);
        const $el = screen.getByText('label content');
        expect($el.className.split(' ')).toHaveLength(2);
        expect($el).toHaveClass(className);
    });
});
