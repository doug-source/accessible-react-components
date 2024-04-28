import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { AfterYearBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof AfterYearBtn>;
type keys = 'label' | 'btnHandler';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    btnHandler = { year: () => true },
    children = 'content',
    label = 'a label',
}: Props = {}) => {
    return (
        <AfterYearBtn btnHandler={btnHandler} label={label}>
            {children}
        </AfterYearBtn>
    );
};

describe('<AfterYearBtn /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
        const $label = within($el).getByText('a label');
        expect($label).toBeInTheDocument();
        const textLabel = 'another label';
        rerender(buildComponent({ label: textLabel }));
        expect($label).toBeInTheDocument();
        expect($label).toHaveTextContent(textLabel);
    });
    test('runs calling btnHandler by keydown event correctly', async () => {
        const btnHandler = {
            year: jest.fn(),
        };
        render(buildComponent({ btnHandler }));
        const $el = screen.getByText('content');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(btnHandler.year).toHaveBeenCalled();
    });
});
