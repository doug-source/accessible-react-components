import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { CollapseWrapper } from '../../context/collapse';
import { UniqueWrapper } from '../../context/unique';
import styles from './Item.module.scss';
import { Item } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Item>;
type keys =
    | 'headerContent'
    | 'panelContent'
    | 'expandedList'
    | 'onClick'
    | 'keepPanelRole';
type Props = Omit<ElementProps, keys> &
    Partial<Pick<ElementProps, keys>> & {
        unique?: boolean;
        collapse?: boolean;
    };

const buildComponent = ({
    headerContent = <span>header text</span>,
    panelContent = <div>panel text</div>,
    expandedList = [],
    onClick = () => {},
    keepPanelRole = true,
    unique = true,
    collapse = true,
    ...remain
}: Props = {}) => (
    <CollapseWrapper value={collapse}>
        <UniqueWrapper value={unique}>
            <Item
                {...remain}
                headerContent={headerContent}
                panelContent={panelContent}
                expandedList={expandedList}
                onClick={onClick}
                keepPanelRole={keepPanelRole}
            />
        </UniqueWrapper>
    </CollapseWrapper>
);

describe('<Item /> component', () => {
    test('renders correctly', () => {
        render(buildComponent({ title: 'this item' }));
        const $el = screen.getByTitle('this item');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.item);
        const $header = within($el).getByRole('heading', { level: 3 });
        expect($header).toBeInTheDocument();
        const $panel = within($el).getByRole('region', { hidden: true });
        expect($panel).toBeInTheDocument();
    });
    test('renders calling click event handler correctly', async () => {
        let headerId: string | null = null;
        const mockFn = jest.fn();
        const expandedList: string[] = [];
        const onClick = (newHeaderId: string) => {
            mockFn();
            expandedList.push(newHeaderId);
            headerId = newHeaderId;
        };
        const { rerender } = render(
            buildComponent({ title: 'this item', expandedList, onClick })
        );
        const $el = screen.getByTitle('this item');
        const $header = within($el).getByRole('heading', { level: 3 });
        const $btn = within($header).getByRole('button');
        expect($btn).toHaveAttribute('aria-expanded', 'false');
        expect($btn).not.toHaveAttribute('aria-disabled');
        const $panel = within($el).getByRole('region', { hidden: true });
        expect($panel).toHaveClass(styles.collapsed);
        expect($panel).toHaveAttribute('hidden');
        const user = userEvent.setup();
        await user.click($header);
        rerender(
            buildComponent({
                title: 'this item',
                expandedList,
                onClick,
                collapse: false,
            })
        );
        expect($btn).toHaveAttribute('aria-disabled', 'true');
        expect(mockFn).toHaveBeenCalled();
        expect($btn).toHaveAttribute('aria-expanded', 'true');
        expect($panel).not.toHaveClass(styles.collapsed);
        expect($panel).not.toHaveAttribute('hidden');
        expect($panel).toHaveAttribute('aria-labelledby', headerId);
        expect(screen.getByText('panel text')).toBeInTheDocument();
    });
});
