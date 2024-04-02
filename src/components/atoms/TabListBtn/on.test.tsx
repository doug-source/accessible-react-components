import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabListBtn } from './index';

type BtnProps = ComponentPropsWithoutRef<typeof TabListBtn>;
type OptionalProps =
    | 'children'
    | 'tabIndex'
    | 'aria-controls'
    | 'aria-selected';
type BtnUsedProps = Omit<BtnProps, OptionalProps>;

type Props = {
    tabIndex?: BtnProps['tabIndex'];
    children?: string;
    'aria-controls'?: string;
    'aria-selected'?: boolean | 'true' | 'false';
} & BtnUsedProps;

const buildComponent = ({
    id,
    className,
    tabIndex = 0,
    children = 'something',
    'aria-controls': ariaControls = 'some-element',
    'aria-selected': ariaSelected = 'true',
    onClick,
}: Props = {}) => {
    return render(
        <TabListBtn
            id={id}
            className={className}
            tabIndex={tabIndex}
            aria-controls={ariaControls}
            aria-selected={ariaSelected}
            onClick={onClick}
        >
            {children}
        </TabListBtn>
    );
};

const expectAttrs = (
    element: HTMLElement,
    args: Record<string, string | number | undefined>
) => {
    Object.entries(args).forEach(([attr, value]) =>
        expect(element).toHaveAttribute(attr, value)
    );
};

describe('<TabListBtn /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $btn = screen.getByText('something');
        expect($btn).toBeVisible();
    });
    test('renders with properties passed', () => {
        const props: Props = {
            id: 'foo',
            className: 'bar',
            tabIndex: 1,
            children: 'another thing',
            'aria-controls': 'otherComponent',
            'aria-selected': false,
        };
        buildComponent(props);
        const $btn = screen.getByRole('tab');
        expect($btn).toHaveTextContent(props.children ?? '');
        expect($btn).toHaveClass(props.className ?? '');
        expectAttrs($btn, {
            'aria-controls': props['aria-controls'],
            'aria-selected': `${props['aria-selected']}`,
            id: props.id,
            tabIndex: `${props.tabIndex}`,
        });
    });
    test('triggers the onclick event handler attached', async () => {
        const onClick = jest.fn();
        buildComponent({ onClick });
        const $btn = screen.getByText('something');
        const user = userEvent.setup();
        await user.click($btn);
        expect(onClick).toHaveBeenCalled();
    });
});
