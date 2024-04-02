import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabList } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TabList>;
type keys = 'tabSelected' | 'titles' | 'order';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    tabSelected = 0,
    titles = ['Tab-1', 'Tab-2'],
    order = 1,
    onClick,
}: Props = {}) => {
    return render(
        <TabList
            tabSelected={tabSelected}
            titles={titles}
            order={order}
            onClick={onClick}
        />
    );
};

describe('<TabList /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByRole('tablist');
        expect($el).toBeVisible();
    });
    test('renders nothing', () => {
        buildComponent({ titles: [] });
        expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
    test('triggers the onclick event handler attached', async () => {
        const onClick = jest.fn();
        buildComponent({ onClick });
        const $el = screen.getByRole('tablist');
        const tabs = within($el).getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
        const user = userEvent.setup();
        await user.click(tabs[1]);
        expect(onClick).toHaveBeenCalled();
    });
});
