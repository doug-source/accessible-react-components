import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import itemStyles from '../Item/Item.module.scss';
import { ItemList } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ItemList>;
type Props = Omit<ElementProps, 'itemList'> &
    Partial<Pick<ElementProps, 'itemList'>>;

const buildComponent = ({ itemList = [] }: Props = {}) => (
    <ItemList itemList={itemList} />
);

const itemList: Props['itemList'] = [['Title', <div>Content</div>]];

describe('<ItemList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent({ itemList }));
        const { parentElement: $wrapper } = screen.getByRole('heading', {
            level: 3,
        });
        expect($wrapper).toBeInTheDocument();
        expect($wrapper?.tagName).toBe('DIV');
        expect($wrapper).toHaveClass(itemStyles.item);
    });
    test("renders clicking in Item's heading correctly", async () => {
        render(buildComponent({ itemList }));
        const $el = screen.getByRole('heading', { level: 3 });
        const user = userEvent.setup();
        await user.click($el);
        expect(within($el).getByRole('button')).toHaveAttribute(
            'aria-expanded',
            'true'
        );
    });
});
