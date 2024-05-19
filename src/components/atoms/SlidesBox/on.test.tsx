import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { SlidesBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SlidesBox>;

const buildComponent = ({
    'aria-live': ariaLive = 'off',
    children,
    ...remain
}: ElementProps = {}) => (
    <SlidesBox {...remain} aria-live={ariaLive} data-testid="test-element">
        {children}
    </SlidesBox>
);

describe('<SlidesBox /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
    });
});
