import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabPanel } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TabPanel>;
type keys = 'tabSelected' | 'padding' | 'children';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    tabSelected = 0,
    padding = '0',
    children = 'some text',
}: Props = {}) => {
    return render(
        <TabPanel tabSelected={tabSelected} padding={padding}>
            {children}
        </TabPanel>
    );
};

describe('<TabPanel /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByRole('tabpanel');
        expect($el).toBeVisible();
    });
    test('renders only one child correctly', () => {
        render(
            <TabPanel tabSelected={0} padding="0">
                <div aria-label="1th panel">First row</div>
                <div aria-label="2nd panel">Second row</div>
            </TabPanel>
        );
        const $el = screen.getByRole('tabpanel');
        expect(within($el).getByLabelText('1th panel')).toBeVisible();
        expect(
            within($el).queryByLabelText('2nd panel')
        ).not.toBeInTheDocument();
    });
});
