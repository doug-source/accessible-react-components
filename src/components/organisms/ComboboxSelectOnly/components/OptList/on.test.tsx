import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { Opt } from '../Opt';
import { OptList } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof OptList>;
type keys = 'options' | 'selected' | 'focused' | 'onChange' | 'optionListRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const runHook = () => {
    return renderHook(() => useRef<(HTMLDivElement | null)[]>([]));
};

const detashHook = (output: ReturnType<typeof runHook>) => {
    return output.result.current;
};

const buildComponent = ({
    options = [{ label: 'Label One', value: 'Value One' }],
    selected = 'Another',
    focused = 'Another',
    onChange = () => {},
    optionListRef = detashHook(runHook()),
}: Props = {}) => (
    <div>
        <OptList
            selected={selected}
            focused={focused}
            options={options}
            onChange={onChange}
            optionListRef={optionListRef}
        />
    </div>
);

describe('<OptList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const children = screen.getAllByText(/Label/);
        children.forEach(($el) => expect($el).toBeInTheDocument());
    });
    test('renders with optionListRef populated correctly', () => {
        const hookRef = runHook();
        render(
            buildComponent({
                options: [
                    { label: 'Label One', value: 'Value One' },
                    { label: 'Label Two', value: 'Value Two' },
                ],
                optionListRef: hookRef.result.current,
            })
        );
        const children = screen.getAllByText(/Label/);
        expect(children).toHaveLength(2);
        children.forEach(($child, i) => {
            expect(hookRef.result.current.current[i]).toBe($child);
        });
    });
    test('renders with id attributes correctly', () => {
        const options = [
            { label: 'Label One', value: 'Value One' },
            { label: 'Label Two', value: 'Value Two' },
        ];
        render(
            buildComponent({ options, optionListRef: detashHook(runHook()) })
        );
        screen.getAllByText(/Label/).forEach(($child, i) => {
            expect($child).toHaveAttribute('id', `${options[i].label}-${i}`);
        });
    });
    test('render calling click event handler correctly', async () => {
        const onChange = jest.fn();
        render(
            buildComponent({
                options: [
                    { label: 'Label One', value: 'Value One' },
                    { label: 'Label Two', value: 'Value Two' },
                ],
                optionListRef: detashHook(runHook()),
                onChange,
            })
        );
        const children = screen.getAllByText(/Label/);
        const user = userEvent.setup();
        await user.click(children[0]);
        expect(onChange).toHaveBeenCalledWith('Value One', 'Label One-0');
    });

    test('renders with focused, selected and onChange properties correctly', () => {
        render(
            buildComponent({
                options: [
                    { label: 'Label One', value: 'Value One' },
                    { label: 'Label Two', value: 'Value Two' },
                ],
                optionListRef: detashHook(runHook()),
                focused: 'Value Two',
                selected: 'Value Two',
            })
        );
        const children = screen.getAllByText(/Label/);
        expect(children[0]).not.toHaveClass(Opt.styles.focused);
        expect(children[0]).toHaveAttribute('aria-selected', 'false');
        expect(children[1]).toHaveClass(Opt.styles.focused);
        expect(children[1]).toHaveAttribute('aria-selected', 'true');
    });
});
