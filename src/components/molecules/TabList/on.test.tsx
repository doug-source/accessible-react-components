import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './TabList.module.scss';
import { TabList } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TabList>;
type keys = 'tabSelected' | 'titles' | 'order' | 'orientation';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    tabSelected = 0,
    titles = ['Tab-1', 'Tab-2'],
    order = 1,
    orientation = 'horizontal',
    onClick,
    ...remain
}: Props = {}) => (
    <TabList
        tabSelected={tabSelected}
        titles={titles}
        order={order}
        orientation={orientation}
        onClick={onClick}
        {...remain}
    />
);

describe('<TabList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('tablist');
        expect($el).toBeInTheDocument();
    });
    test('renders changing properties correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('tablist');
        expect($el).toHaveClass(styles.tabList);
        expect($el).not.toHaveClass(styles.vertical);
        expect($el).toHaveAttribute('aria-labelledby', 'tablist-1');
        // change properties
        rerender(buildComponent({ order: 2, orientation: 'vertical' }));
        expect($el).toHaveAttribute('aria-labelledby', 'tablist-2');
        expect($el).toHaveClass(styles.tabList);
        expect($el).toHaveClass(styles.vertical);
    });
    test('renders nothing', () => {
        render(buildComponent({ titles: [] }));
        expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
    test('triggers the onclick event handler attached', async () => {
        const onClick = jest.fn();
        render(buildComponent({ onClick }));
        const $el = screen.getByRole('tablist');
        const tabs = within($el).getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
        const user = userEvent.setup();
        await user.click(tabs[1]);
        expect(onClick).toHaveBeenCalled();
    });
});
