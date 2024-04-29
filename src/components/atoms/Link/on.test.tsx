import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from './Link.module.scss';
import { Link } from './index';

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

describe('<Link /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <Link type="span" href="http://test.com">
                some content
            </Link>
        );
        let $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('some content');
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveClass(styles.link);
        rerender(
            <Link type="img" href="http://test.com" alt="alternative text" />
        );
        $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
        expect($el).not.toHaveTextContent('some content');
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveClass(styles.link);
        expect($el).toHaveAttribute('alt', 'alternative text');
    });
    test('runs calling click event handler correctly', async () => {
        const replaceFn = jest.fn();
        const { href, locationMocked } = makeParams(replaceFn);
        render(
            <Link type="span" href={href} location={locationMocked}>
                some content
            </Link>
        );
        const $el = screen.getByRole('link');
        const user = userEvent.setup();
        await user.click($el);
        expect(replaceFn).toHaveBeenCalledWith(href);
    });
    test('runs calling keyboard event handler correctly', async () => {
        const replaceFn = jest.fn();
        const { href, locationMocked } = makeParams(replaceFn);
        render(
            <Link type="span" href={href} location={locationMocked}>
                some content
            </Link>
        );
        const $el = screen.getByRole('link');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{ArrowRight}');
        expect(replaceFn).not.toHaveBeenCalled();
        await user.keyboard('{Enter}');
        expect(replaceFn).toHaveBeenCalledWith(href);
    });
});
