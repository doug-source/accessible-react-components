import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './TableHead.module.scss';
import { TableHead } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableHead>;
type Props = Omit<ElementProps, 'weekdays'> &
    Partial<Pick<ElementProps, 'weekdays'>>;

const buildComponent = ({
    weekdays = [
        ['sun', 'Sunday'],
        ['mon', 'Monday'],
    ],
    title = 'weekdays',
    ...remain
}: Props = {}) => (
    <table>
        <TableHead {...remain} title={title} weekdays={weekdays} />
    </table>
);

describe('<TableHead /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('weekdays');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.weekdays);
    });
    test('renders weekdays correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTitle('weekdays');
        expect(within($el).getByText('sun')).toBeInTheDocument();
        expect(within($el).getByText('mon')).toBeInTheDocument();
        expect(within($el).queryByText('tue')).not.toBeInTheDocument();
        rerender(
            buildComponent({
                weekdays: [
                    ['mon', 'Monday'],
                    ['tue', 'Tuesday'],
                ],
            })
        );
        expect(within($el).queryByText('sun')).not.toBeInTheDocument();
        expect(within($el).getByText('mon')).toBeInTheDocument();
        expect(within($el).getByText('tue')).toBeInTheDocument();
    });
});
