import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef, useId } from 'react';
import { AlertDialogBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof AlertDialogBox>;
type keys = 'headingId' | 'descriptionId' | 'show';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const makeId = () => {
    const {
        result: { current: id },
    } = renderHook(() => useId());
    return id;
};

const buildComponent = ({
    headingId = makeId(),
    descriptionId = makeId(),
    show = false,
    children,
}: Props = {}) => {
    return (
        <AlertDialogBox
            show={show}
            headingId={headingId}
            descriptionId={descriptionId}
        >
            {children}
        </AlertDialogBox>
    );
};

describe('<AlertDialogBox /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('alertdialog', { hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).not.toBeVisible();
        rerender(buildComponent({ show: true }));
        expect($el).toBeVisible();
    });
    test('renders with remain properties passed', () => {
        const props = {
            show: true,
            headingId: makeId(),
            descriptionId: makeId(),
            children: 'content',
        };
        render(buildComponent(props));
        const $el = screen.getByRole('alertdialog');
        expect($el).toHaveAttribute('aria-labelledby', props.headingId);
        expect($el).toHaveAttribute('aria-describedby', props.descriptionId);
        expect(within($el).getByText('content')).toBeVisible();
    });
});
