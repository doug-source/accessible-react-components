import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Description } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Description>;

const buildComponent = ({
    children = 'The text description',
    ...remain
}: ElementProps = {}) => (
    <Description {...remain} data-testid="dialog-desc">
        {children}
    </Description>
);

describe('<AlertDialogDesc /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const { parentElement: $el } = screen.getByText('The text description');
        expect($el).toBeInTheDocument();
    });
    test('uses the description correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('dialog-desc');
        expect(
            within($el).getByText('The text description')
        ).toBeInTheDocument();
    });
    test('renders with children prop passed', () => {
        render(
            buildComponent({
                children: 'Another content',
            })
        );
        const $el = screen.getByTestId('dialog-desc');
        expect(within($el).getByText('Another content')).toBeInTheDocument();
    });
});
