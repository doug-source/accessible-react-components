import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ActMenuBox.module.scss';
import { ActMenuBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ActMenuBox>;
type Props = Omit<ElementProps, 'expanded'> &
    Partial<Pick<ElementProps, 'expanded'>>;

const buildComponent = ({ expanded = false, children }: Props = {}) => (
    <ActMenuBox expanded={expanded}>{children}</ActMenuBox>
);

describe('<ActMenuBox /> component', () => {
    test('renders falsy expanded correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('menu');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.actMenuBox);
        expect($el).toHaveClass(styles.hide);
    });
    test('renders truthy expanded correctly', () => {
        render(buildComponent({ expanded: true }));
        const $el = screen.getByRole('menu');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.show);
    });
});
