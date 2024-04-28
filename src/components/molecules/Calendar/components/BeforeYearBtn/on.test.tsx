import '@testing-library/jest-dom';
import {
    act,
    render,
    renderHook,
    screen,
    within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { BeforeYearBtn } from './index';

const runHook = () => {
    return renderHook(() => useRef<HTMLButtonElement | null>(null));
};

const detashRef = (ref: ReturnType<typeof runHook>) => ref.result.current;

const createBtn = (text: string) => {
    const $button = document.createElement('button');
    $button.innerHTML = text;
    return $button;
};

type ElementProps = ComponentPropsWithoutRef<typeof BeforeYearBtn>;
type keys = 'label' | 'btnHandler' | 'okBtnRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    btnHandler = { year: () => true },
    children = 'content',
    label = 'a label',
    okBtnRef = detashRef(runHook()),
}: Props = {}) => {
    return (
        <BeforeYearBtn
            okBtnRef={okBtnRef}
            btnHandler={btnHandler}
            label={label}
        >
            {children}
        </BeforeYearBtn>
    );
};

describe('<BeforeYearBtn /> component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
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
    test('runs calling btnHandler by Enter keydown event correctly', async () => {
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
    test('runs calling btnHandler by Tab keydown event correctly', async () => {
        const hookRef = runHook();
        render(buildComponent({ okBtnRef: hookRef.result.current }));
        const $el = screen.getByText('content');
        const $okButton = createBtn('Before Year');
        const $otherButton = createBtn('other button');
        document.body.append($otherButton, $okButton);
        act(() => {
            hookRef.result.current.current = $okButton;
        });
        const user = userEvent.setup();
        $el.focus();
        await user.keyboard('{Tab>}{/Tab}');
        expect($okButton).not.toHaveFocus();
    });
    test('runs calling btnHandler by Shift+Tab keydown event correctly', async () => {
        const hookRef = runHook();
        render(buildComponent({ okBtnRef: hookRef.result.current }));
        const $el = screen.getByText('content');
        const $okButton = createBtn('Before Year');
        const $otherButton = createBtn('other button');
        document.body.append($otherButton, $okButton);
        act(() => {
            hookRef.result.current.current = $okButton;
        });
        const user = userEvent.setup();
        $el.focus();
        await user.keyboard('{Shift>}{Tab>}{/Tab}{/Shift}');
        expect($okButton).toHaveFocus();
    });
});
