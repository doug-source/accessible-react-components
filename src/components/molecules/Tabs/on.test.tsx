import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Tabs } from './index';

function buildComponent() {
    render(
        <Tabs title="main title" titles={['tab-1', 'tab-2']}>
            <div>Text 1</div>
            <div>Text 2</div>
        </Tabs>
    );
}

describe('<Tabs /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByTitle('tabs');
        expect($el).toBeVisible();
    });
    test('renders each internal component correctly', () => {
        buildComponent();
        const $el = screen.getByTitle('tabs');
        expect($el).toBeVisible();
        (($heading: HTMLElement) => {
            expect($heading).toBeInTheDocument();
            expect($heading).not.toBeVisible();
        })(within($el).getByRole('heading', { level: 3, hidden: true }));
        expect(within($el).getByRole('tablist')).toBeVisible();
        const panels = within($el).getAllByRole('tabpanel');
        panels.forEach(($panel, i) => {
            expect($panel).toBeVisible();
            expect($panel).toHaveAttribute('id', `tabpanel-${i + 1}`);
        });
    });
    test('changes the active tab after user click', async () => {
        buildComponent();
        const tabs = screen.getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
        const user = userEvent.setup();
        await user.click(tabs[1]);
        expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
});
