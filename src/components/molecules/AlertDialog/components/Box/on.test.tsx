import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef, useId } from 'react';
import { Box } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Box>;
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
        <Box show={show} headingId={headingId} descriptionId={descriptionId}>
            {children}
        </Box>
    );
};

describe('<AlertDialogBox /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('alertdialog', { hidden: true });
        expect($el).toBeInTheDocument();
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
        expect(within($el).getByText('content')).toBeInTheDocument();
    });
});
