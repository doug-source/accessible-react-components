import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { SlideItemBox } from '../../atoms/SlideItemBox';
import { SlideItems } from './index';

const createRef = (list: (HTMLDivElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLDivElement | null)[]>(list));
};

const makeItems = () => [
    { imgSrc: 'src-1', imgAlt: 'alt-1', caption: 'cation-1' },
    { imgSrc: 'src-2', imgAlt: 'alt-2', caption: 'cation-2' },
    { imgSrc: 'src-3', imgAlt: 'alt-3', caption: 'cation-3' },
];

type ElementProps = ComponentPropsWithoutRef<typeof SlideItems>;
type keys = 'items' | 'selected' | 'listRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    items = [],
    selected = -1,
    listRef = createRef().result.current,
}: Props = {}) => (
    <SlideItems
        items={items}
        selected={selected}
        listRef={listRef}
        data-testid="test-element"
    />
);

describe('<SlideItems /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
    });
    test('renders items correctly', () => {
        const items = makeItems();
        const hookRef = createRef();
        render(
            buildComponent({
                items,
                listRef: hookRef.result.current,
            })
        );
        const $el = screen.getByTestId('test-element');
        const tabpanelList = within($el).getAllByRole('tabpanel');
        expect(tabpanelList).toHaveLength(3);
        expect(hookRef.result.current.current).toHaveLength(3);
    });
    test('renders with selected property passed correctly', () => {
        const items: ComponentPropsWithoutRef<typeof SlideItems>['items'] =
            makeItems();
        items[items.length - 1].imgAlt = undefined;
        const hookRef = createRef();
        const { rerender } = render(
            buildComponent({
                items,
                listRef: hookRef.result.current,
            })
        );
        const $el = screen.getByTestId('test-element');
        const tabpanelList = within($el).getAllByRole('tabpanel');
        tabpanelList.forEach(($tabpanel) =>
            expect($tabpanel).not.toHaveClass(SlideItemBox.styles.show)
        );
        rerender(
            buildComponent({
                items,
                listRef: hookRef.result.current,
                selected: 1,
            })
        );
        expect(tabpanelList[0]).not.toHaveClass(SlideItemBox.styles.show);
        expect(tabpanelList[1]).toHaveClass(SlideItemBox.styles.show);
        expect(tabpanelList[2]).not.toHaveClass(SlideItemBox.styles.show);
        expect(within(tabpanelList[1]).getByRole('img')).toHaveAttribute(
            'alt',
            'alt-2'
        );
        expect(within(tabpanelList[2]).getByRole('img')).toHaveAttribute(
            'alt',
            'image-3'
        );
    });
});
