import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './LinkSpan.module.scss';
import { LinkSpan } from './index';

const makeParams = (replaceFn?: ReturnType<typeof jest.fn>) => {
    const locationMocked = {
        href: window.location.href,
        replace(href: string) {
            this.href = href;
            replaceFn && replaceFn(href);
        },
    };
    const href = 'http://link-test.com';
    return { href, locationMocked } as unknown as {
        href: string;
        locationMocked: typeof window.location;
    };
};

type ElementProps = ComponentPropsWithoutRef<typeof LinkSpan>;
type Props = Omit<ElementProps, 'href'> & Partial<Pick<ElementProps, 'href'>>;

const buildComponent = ({
    href = 'http://test.com',
    children = 'some content',
    location = window.location,
}: Props = {}) => {
    return (
        <LinkSpan href={href} location={location}>
            {children}
        </LinkSpan>
    );
};

describe('<LinkSpan /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('some content');
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveClass(styles.linkSpan);
    });
    test('runs calling click event handler correctly', async () => {
        const replaceFn = jest.fn();
        const { href, locationMocked } = makeParams(replaceFn);
        render(buildComponent({ href, location: locationMocked }));
        const $el = screen.getByRole('link');
        const user = userEvent.setup();
        await user.click($el);
        expect(replaceFn).toHaveBeenCalledWith(href);
    });
    test('runs calling keyboard event handler correctly', async () => {
        const replaceFn = jest.fn();
        const { href, locationMocked } = makeParams(replaceFn);
        render(buildComponent({ href, location: locationMocked }));
        const $el = screen.getByRole('link');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{ArrowRight}');
        expect(replaceFn).not.toHaveBeenCalled();
        await user.keyboard('{Enter}');
        expect(replaceFn).toHaveBeenCalledWith(href);
    });
});
