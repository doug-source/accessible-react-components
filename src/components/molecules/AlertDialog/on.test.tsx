import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { AlertDialog } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof AlertDialog>;
type keys = 'heading' | 'description';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    show = false,
    heading = 'One heading',
    description = 'One description',
    children = 'One content',
    onClose,
}: Props = {}) => {
    return (
        <AlertDialog
            onClose={onClose}
            show={show}
            heading={heading}
            description={description}
        >
            {children}
        </AlertDialog>
    );
};

describe('<AlertDialog /> component', () => {
    test('renders correctly', () => {
        render(buildComponent({ show: true }));
        const $heading = screen.getByText('One heading');
        expect($heading).toBeVisible();
        const $box = $heading.parentElement;
        expect($box).toBeVisible();
        const $description = within($box!).getByText('One description');
        expect($description).toBeVisible();
        const $children = within($box!).getByText('One content');
        expect($children).toBeVisible();
        const $el = $box?.parentElement;
        expect($el).toBeVisible();
    });
});
