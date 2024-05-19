import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './BtnRounded.module.scss';
import { BtnRounded } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof BtnRounded>;

const buildComponent = ({ parentFocused = false }: ElementProps = {}) => (
    <BtnRounded parentFocused={parentFocused} />
);

describe('<BtnRounded /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.btnRounded);
        expect($el).not.toHaveClass(styles.parentFocused);
        rerender(buildComponent({ parentFocused: true }));
        expect($el).toHaveClass(styles.parentFocused);
    });
});
