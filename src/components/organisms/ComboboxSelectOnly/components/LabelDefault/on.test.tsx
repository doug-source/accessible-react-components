import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { LabelDefault } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof LabelDefault>;
type keys = 'itemName';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({ itemName = 'item-text' }: Props = {}) => (
    <LabelDefault itemName={itemName} />
);

describe('<LabelDefault /> component', () => {
    test('renders correctly', () => {
        const text = 'item-text';
        render(buildComponent());
        const $first = screen.getByText(/Choose\sthe/i, { exact: false });
        expect($first).toBeInTheDocument();
        const $second = screen.getByText(text);
        expect($second).toBeInTheDocument();
    });
});
