import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { Tabs } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Tabs>;
type keys = 'title' | 'titles' | 'children';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    title = 'main title',
    titles = ['tab-1', 'tab-2'],
    ...remain
}: Props = {}) => (
    <Tabs title={title} titles={titles} {...remain}>
        <div>Text 1</div>
        <div>Text 2</div>
    </Tabs>
);

describe('<Tabs /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('tabs');
        expect($el).toBeVisible();
    });
    test('renders each internal component correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('tabs');
        expect($el).toBeVisible();
        const $heading = within($el).getByRole('heading', {
            level: 3,
            hidden: true,
        });
        expect($heading).toBeInTheDocument();
        expect($heading).not.toBeVisible();
        expect(within($el).getByRole('tablist')).toBeVisible();
        const panels = within($el).getAllByRole('tabpanel');
        panels.forEach(($panel, i) => {
            expect($panel).toBeVisible();
            expect($panel).toHaveAttribute('id', `tabpanel-${i + 1}`);
        });
    });
    test('renders when orientation property changes correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTitle('tabs');
        expect($el).toHaveStyleRule('flex-direction', 'column');
        rerender(buildComponent({ orientation: 'vertical' }));
        expect($el).toHaveStyleRule('flex-direction', 'row');
    });
    test('changes the active tab after user click', async () => {
        render(buildComponent());
        const tabs = screen.getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
        const user = userEvent.setup();
        await user.click(tabs[1]);
        expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
});
