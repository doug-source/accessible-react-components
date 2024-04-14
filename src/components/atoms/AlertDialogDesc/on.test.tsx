import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogDesc } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof AlertDialogDesc>;

const buildComponent = ({
    children = 'The text description',
    ...remain
}: ElementProps = {}) => (
    <AlertDialogDesc {...remain} data-testid="dialog-desc">
        {children}
    </AlertDialogDesc>
);

describe('<AlertDialogDesc /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const { parentElement: $el } = screen.getByText('The text description');
        expect($el).toBeVisible();
    });
    test('uses the description correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('dialog-desc');
        expect(within($el).getByText('The text description')).toBeVisible();
    });
    test('renders with children prop passed', () => {
        render(
            buildComponent({
                children: 'Another content',
            })
        );
        const $el = screen.getByTestId('dialog-desc');
        expect(within($el).getByText('Another content')).toBeVisible();
    });
    test('renders with style passed', () => {
        render(buildComponent());
        const { parentElement: $el } = screen.getByText('The text description');
        expect($el).toHaveStyleRule('padding', '0.625rem 1.25rem');
    });
});
