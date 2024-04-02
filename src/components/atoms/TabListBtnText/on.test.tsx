import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabListBtnText } from './index';

type BtnTextProps = ComponentPropsWithoutRef<typeof TabListBtnText>;
type keys = 'children' | 'paddingBlock' | 'borderBottomWidth';
type Props = Omit<BtnTextProps, keys> & Partial<Pick<BtnTextProps, keys>>;

const buildComponent = ({
    selected,
    className = 'some class',
    children = 'some content',
    paddingBlock = '0.25rem',
    borderBottomWidth = '0.25rem',
}: Props = {}) => {
    return render(
        <TabListBtnText
            paddingBlock={paddingBlock}
            selected={selected}
            className={className}
            borderBottomWidth={borderBottomWidth}
        >
            {children}
        </TabListBtnText>
    );
};

describe('<TabListBtnText /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $btn = screen.getByText('some content');
        expect($btn).toBeVisible();
    });
    test('changes the style when selected prop changes', () => {
        const { rerender } = buildComponent();
        const $btn = screen.getByText('some content');
        expect($btn).toHaveStyleRule('border-bottom-color', 'transparent');
        expect($btn).toHaveStyleRule('font-weight', 'normal');
        const props = {
            selected: true,
            paddingBlock: '0.25rem',
            borderBottomWidth: '0.25rem',
        };
        rerender(<TabListBtnText {...props}>some content</TabListBtnText>);
        expect($btn).toHaveStyleRule('border-bottom-color', '#000');
        expect($btn).toHaveStyleRule('font-weight', '700');
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
