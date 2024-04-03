import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
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
}: Props = {}) => {
    return render(
        <TabList
            tabSelected={tabSelected}
            titles={titles}
            order={order}
            orientation={orientation}
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
    test('renders changing properties correctly', () => {
        const { rerender } = buildComponent();
        const $el = screen.getByRole('tablist');
        expect($el).toHaveStyleRule('flex-direction', 'row');
        expect($el).toHaveStyleRule('justify-content', 'normal');
        expect($el).toHaveAttribute('aria-labelledby', `tablist-1`);
        expect($el).toHaveStyleRule('display', 'block', {
            modifier: '&::after',
        });
        expect($el).toHaveStyleRule('height', 'calc(0.25rem / 2)', {
            modifier: '&::after',
        });
        expect($el).toHaveStyleRule(
            'transform',
            'translateY(calc(-0.25rem * 0.25))',
            {
                modifier: '&::after',
            }
        );
        rerender(
            <TabList
                tabSelected={0}
                titles={['Tab-1', 'Tab-2']}
                order={2}
                orientation="vertical"
                borderBottomWidth="0.5rem"
            />
        );
        expect($el).toHaveStyleRule('flex-direction', 'column');
        expect($el).toHaveStyleRule('justify-content', 'space-evenly');
        expect($el).toHaveAttribute('aria-labelledby', `tablist-2`);
        expect($el).toHaveStyleRule('display', 'none', {
            modifier: '&::after',
        });
        expect($el).toHaveStyleRule('height', 'calc(0.5rem / 2)', {
            modifier: '&::after',
        });
        expect($el).toHaveStyleRule(
            'transform',
            'translateY(calc(-0.5rem * 0.25))',
            {
                modifier: '&::after',
            }
        );
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
