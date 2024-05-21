import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ActMenuBox.module.scss';
import { MenuBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof MenuBox>;
type Props = Omit<ElementProps, 'expanded'> &
    Partial<Pick<ElementProps, 'expanded'>>;

const buildComponent = ({ expanded = false, children }: Props = {}) => (
    <MenuBox expanded={expanded}>{children}</MenuBox>
);

describe('<MenuBox /> component', () => {
    test('renders falsy expanded correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('menu');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menuBox);
        expect($el).toHaveClass(styles.hide);
    });
    test('renders truthy expanded correctly', () => {
        render(buildComponent({ expanded: true }));
        const $el = screen.getByRole('menu');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.show);
    });
});
