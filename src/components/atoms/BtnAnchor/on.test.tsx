import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './BtnAnchor.module.scss';
import { BtnAnchor } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof BtnAnchor>;
type keys = 'onActivate';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({ onActivate = () => {}, ...remain }: Props = {}) => (
    <BtnAnchor {...remain} onActivate={onActivate} />
);

describe('<BtnAnchor /> component', () => {
    test('renders correctly', () => {
        const props = { 'data-testid': 'element-test', children: 'Foo' };
        render(buildComponent(props));
        const $el = screen.getByTestId(props['data-testid']);
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveClass(styles.btnAnchor);
        expect($el).toHaveTextContent('Foo');
    });
    test('renders calling keydown event correctly', async () => {
        const onActivate = jest.fn();
        const onKeyDownRemain = jest.fn();
        const props = {
            'data-testid': 'element-test',
            children: 'Foo',
            onActivate,
            onKeyDown: onKeyDownRemain,
        };
        render(buildComponent(props));
        const $el = screen.getByTestId(props['data-testid']);
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(onActivate).toHaveBeenCalledTimes(1);
        expect(onKeyDownRemain).not.toHaveBeenCalled();
        await user.keyboard(' ');
        expect(onActivate).toHaveBeenCalledTimes(2);
        expect(onKeyDownRemain).not.toHaveBeenCalled();
        await user.keyboard('a');
        expect(onActivate).toHaveBeenCalledTimes(2);
        expect(onKeyDownRemain).toHaveBeenCalled();
    });
});
