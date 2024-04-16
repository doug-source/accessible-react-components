import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import stylesBackdrop from '../Backdrop/Backdrop.module.scss';
import stylesBox from '../DialogBox/DialogBox.module.scss';
import { Dialog } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Dialog>;
type keys = 'aria-label' | 'heading';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    'aria-label': ariaLabel = 'a dialog heading',
    heading = 'a dialog title',
    show = true,
    children,
}: Props = {}) => {
    return (
        <Dialog aria-label={ariaLabel} heading={heading} show={show}>
            {children}
        </Dialog>
    );
};

describe('<Dialog /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('dialog');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(stylesBox.show);
        const $backdrop = $el.parentElement;
        expect($backdrop).toBeInTheDocument();
        expect($backdrop).toHaveClass(stylesBackdrop.show);
        rerender(buildComponent({ show: false }));
        expect($el).toHaveClass(stylesBox.hide);
        expect($backdrop).toHaveClass(stylesBackdrop.hide);
    });
    test('renders the heading correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('a dialog title');
        expect($el).toBeInTheDocument();
    });
    test('renders the children correctly', () => {
        render(buildComponent({ children: 'more content' }));
        const $el = screen.getByText('more content');
        expect($el).toBeInTheDocument();
    });
});
