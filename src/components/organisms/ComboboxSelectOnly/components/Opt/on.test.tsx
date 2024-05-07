import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Opt } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Opt>;
type Props = Omit<ElementProps, 'optRefFn'> &
    Partial<Pick<ElementProps, 'optRefFn'>>;

const buildComponent = ({
    optRefFn = () => {},
    children = 'contentFinal',
}: Props = {}) => <Opt optRefFn={optRefFn}>{children}</Opt>;

describe('<Opt /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('contentFinal');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(Opt.styles.opt);
        expect($el).toHaveAttribute('role', 'option');
    });

    type OptRefFn = NonNullable<
        ComponentPropsWithoutRef<typeof Opt>['optRefFn']
    >;

    test('renders with optRefFn correctly', () => {
        const jestFn = jest.fn();
        const optRefFn: OptRefFn = (el) => {
            jestFn(el);
        };
        render(buildComponent({ optRefFn }));
        const $el = screen.getByText('contentFinal');
        expect(jestFn).toHaveBeenCalledWith($el);
    });
});
