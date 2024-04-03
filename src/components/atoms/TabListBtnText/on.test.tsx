import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabListBtnText } from './index';

type BtnTextProps = ComponentPropsWithoutRef<typeof TabListBtnText>;
type keys = 'children' | 'paddingBlock' | 'borderBottomWidth' | 'orientation';
type Props = Omit<BtnTextProps, keys> & Partial<Pick<BtnTextProps, keys>>;

const buildComponent = ({
    selected,
    className = 'some class',
    children = 'some content',
    paddingBlock = '0.25rem',
    borderBottomWidth = '0.25rem',
    orientation = 'horizontal',
}: Props = {}) => {
    return render(
        <TabListBtnText
            paddingBlock={paddingBlock}
            selected={selected}
            className={className}
            borderBottomWidth={borderBottomWidth}
            orientation={orientation}
        >
            {children}
        </TabListBtnText>
    );
};

function testRerender(
    {
        orientation = 'horizontal',
        borderWidth = '0.25rem',
        borderColor = 'transparent',
        fontWeight = 'normal',
        selected = false,
    }: {
        borderWidth?: string;
        orientation?: BtnTextProps['orientation'];
        borderColor?: 'transparent' | '#000';
        fontWeight?: '700' | 'normal';
        selected?: boolean;
    } = {},
    rerender: (ui: React.ReactNode) => void,
    $btn: HTMLElement
) {
    rerender(
        <TabListBtnText
            orientation={orientation}
            borderBottomWidth={borderWidth}
            paddingBlock="0.25rem"
            selected={selected}
        >
            some content
        </TabListBtnText>
    );
    const borderWidthKey = orientation === 'horizontal' ? 'bottom' : 'left';

    expect($btn).toHaveStyleRule(`border-${borderWidthKey}-width`, borderWidth);
    expect($btn).toHaveStyleRule(`border-${borderWidthKey}-color`, borderColor);
    expect($btn).toHaveStyleRule('font-weight', fontWeight);
}

describe('<TabListBtnText /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $btn = screen.getByText('some content');
        expect($btn).toBeVisible();
    });
    test('changes the style when selected prop changes', () => {
        const { rerender } = buildComponent();
        const $btn = screen.getByText('some content');
        // horizontal and not selected
        expect($btn).toHaveStyleRule('border-bottom-width', '0.25rem');
        expect($btn).toHaveStyleRule('border-bottom-color', 'transparent');
        expect($btn).toHaveStyleRule('font-weight', 'normal');
        // just border-width change
        testRerender(
            {
                borderWidth: '0.5rem',
            },
            rerender,
            $btn
        );
        // horizontal and selected
        testRerender(
            {
                selected: true,
                borderColor: '#000',
                fontWeight: '700',
            },
            rerender,
            $btn
        );
        // vertical and not selected
        testRerender(
            {
                orientation: 'vertical',
                borderColor: 'transparent',
                fontWeight: 'normal',
            },
            rerender,
            $btn
        );
        // vertical and selected
        testRerender(
            {
                selected: true,
                orientation: 'vertical',
                borderColor: '#000',
                fontWeight: '700',
            },
            rerender,
            $btn
        );
    });
    test('uses the remain properties passed', () => {
        const prop = {
            paddingBlock: '0.25rem',
            className: 'another-class',
            children: 'another content',
        };
        buildComponent(prop);
        const $btn = screen.getByText(prop.children);
        expect($btn).toHaveStyleRule('padding', `${prop.paddingBlock} 0.75rem`);
        expect($btn).toHaveClass(prop.className);
    });
});
