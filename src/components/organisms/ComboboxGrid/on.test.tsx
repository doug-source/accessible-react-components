import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComboboxGrid } from './index';

describe('<ComboboxGrid /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <ComboboxGrid items={[['fooText', 'fooDesc']]} label="MyLabel" />
        );
        const $label = screen.getByText('MyLabel');
        expect($label).toBeInTheDocument();
        const $wrapper = $label.nextElementSibling;
        expect($wrapper).toBeInTheDocument();
        rerender(<ComboboxGrid items={[['fooText', 'fooDesc']]} />);
        expect($wrapper).toBeInTheDocument();
        expect($wrapper?.previousElementSibling).not.toBeInTheDocument();
    });
});
