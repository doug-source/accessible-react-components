import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './TabListBtnText.module.scss';
import { TabListBtnText } from './index';

type BtnTextProps = ComponentPropsWithoutRef<typeof TabListBtnText>;
type keys = 'children' | 'orientation';
type Props = Omit<BtnTextProps, keys> & Partial<Pick<BtnTextProps, keys>>;

const buildComponent = ({
    selected,
    className = 'some class',
    children = 'some content',
    orientation = 'horizontal',
}: Props = {}) => {
    return (
        <TabListBtnText
            selected={selected}
            className={className}
            orientation={orientation}
        >
            {children}
        </TabListBtnText>
    );
};

describe('<TabListBtnText /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $btn = screen.getByText('some content');
        expect($btn).toBeInTheDocument();
    });
    test('changes the style when selected prop changes', () => {
        const { rerender } = render(buildComponent());
        const $btn = screen.getByText('some content');
        // horizontal and not selected
        expect($btn).toHaveClass(styles.tabListBtnText);
        expect($btn).toHaveClass(styles.horizontal);
        expect($btn).not.toHaveClass(styles.vertical);
        expect($btn).not.toHaveClass(styles.selected);
        // vertical and not selected
        rerender(buildComponent({ orientation: 'vertical' }));
        expect($btn).toHaveClass(styles.tabListBtnText);
        expect($btn).toHaveClass(styles.vertical);
        expect($btn).not.toHaveClass(styles.horizontal);
        // horizontal and selected
        rerender(buildComponent({ selected: true }));
        expect($btn).toHaveClass(styles.selected);
    });
    test('uses the remain properties passed', () => {
        const prop = {
            paddingBlock: '0.25rem',
            className: 'another-class',
            children: 'another content',
        };
        render(buildComponent(prop));
        const $btn = screen.getByText(prop.children);
        expect($btn).toHaveClass(prop.className);
        expect($btn).toHaveClass(styles.tabListBtnText);
    });
});
