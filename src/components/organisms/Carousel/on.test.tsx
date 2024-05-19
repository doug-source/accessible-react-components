import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import styles from './Carousel.module.scss';
import { Carousel } from './index';

const makeItems = () => [
    { imgSrc: 'src-1', imgAlt: 'alt-1', caption: 'cation-1' },
    { imgSrc: 'src-2', imgAlt: 'alt-2', caption: 'cation-2' },
    { imgSrc: 'src-3', imgAlt: 'alt-3', caption: 'cation-3' },
];

const defineWindowMatchMedia = () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};

describe('<Carousel /> component', () => {
    beforeAll(() => {
        defineWindowMatchMedia();
    });
    test('renders correctly', () => {
        render(
            <Carousel
                items={[]}
                aria-label="foo-label"
                data-testid="test-element"
            />
        );
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.box);
    });
    test('renders with controlOut property passed correctly', () => {
        render(
            <Carousel
                items={[]}
                aria-label="foo-label"
                controlOut
                data-testid="test-element"
            />
        );
        const $el = screen.getByTestId('test-element');
        expect($el.firstChild).toHaveClass(Carousel.styles.controlOut);
    });
    test('renders with timer property passed correctly', () => {
        const items = makeItems();
        const { rerender } = render(
            <Carousel
                items={items}
                aria-label="foo-label"
                timer={1000}
                initialPlay
                data-testid="test-element"
            />
        );
        const $el = screen.getByTestId('test-element');
        const btnList = within($el).getAllByRole('tab');
        expect(btnList[0]).toHaveAttribute('aria-selected', 'true');
        waitFor(() => {
            expect(btnList[1]).toHaveAttribute('aria-selected', 'true');
        });
        rerender(
            <Carousel
                items={[]}
                aria-label="foo-label"
                data-testid="test-element"
            />
        );
    });
    test('renders with denyAuto property passed correctly', () => {
        const { rerender } = render(
            <Carousel
                items={[]}
                aria-label="foo-label"
                data-testid="test-element"
            />
        );
        const $el = screen.getByTestId('test-element');
        expect($el.firstChild?.childNodes).toHaveLength(2);
        rerender(
            <Carousel
                items={[]}
                aria-label="foo-label"
                denyAuto
                data-testid="test-element"
            />
        );
        expect($el.firstChild?.childNodes).toHaveLength(1);
    });
});
