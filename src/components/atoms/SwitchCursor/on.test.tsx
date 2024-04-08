import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchCursor } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchCursor>;
type keys = 'size' | 'parentPadding' | 'checked';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    size = '0.75rem',
    parentPadding = '0.125rem',
    checked = false,
}: Props = {}) => {
    return render(
        <SwitchCursor
            size={size}
            parentPadding={parentPadding}
            checked={checked}
            data-testid="switch-cursor"
        />
    );
};

describe('<SwitchCursor /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByTestId('switch-cursor');
        expect($el).toBeVisible();
    });
    test('renders $size propery correctly', () => {
        const { rerender } = buildComponent();
        const $el = screen.getByTestId('switch-cursor');
        expect($el).toHaveStyleRule('width', '0.75rem');
        expect($el).toHaveStyleRule('height', '0.75rem');
        const newSize = '1.5rem';
        rerender(
            <SwitchCursor
                size={newSize}
                parentPadding="0.125rem"
                checked={false}
            />
        );
        expect($el).toHaveStyleRule('width', newSize);
        expect($el).toHaveStyleRule('height', newSize);
    });
    test('renders $parentPadding property correctly', () => {
        const { rerender } = buildComponent();
        const $el = screen.getByTestId('switch-cursor');
        expect($el).toHaveStyleRule('left', 'calc(0.125rem)');
        const newParentPadding = '0.25rem';
        rerender(
            <SwitchCursor
                size="0.75rem"
                parentPadding={newParentPadding}
                checked={false}
            />
        );
        expect($el).toHaveStyleRule('left', `calc(${newParentPadding})`);
    });
    test('render $checked property correctly', () => {
        const { rerender } = buildComponent();
        const $el = screen.getByTestId('switch-cursor');
        expect($el).toHaveStyleRule('left', 'calc(0.125rem)');
        const size = '0.75rem';
        const parentPadding = '0.125rem';
        rerender(
            <SwitchCursor
                size={size}
                parentPadding={parentPadding}
                checked={true}
            />
        );
        expect($el).toHaveStyleRule(
            'left',
            `calc(100% - ${size} - ${parentPadding})`
        );
    });
});
