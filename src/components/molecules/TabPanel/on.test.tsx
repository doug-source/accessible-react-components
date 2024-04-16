import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import styles from './TabPanel.module.scss';
import { TabPanel } from './index';

describe('<TabPanel /> component', () => {
    test('renders correctly', () => {
        render(<TabPanel tabSelected={0}>some text</TabPanel>);
        const $el = screen.getByRole('tabpanel');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.tabPanel);
    });
    test('renders only one child correctly', () => {
        render(
            <TabPanel tabSelected={0}>
                <div aria-label="1th panel">First row</div>
                <div aria-label="2nd panel">Second row</div>
            </TabPanel>
        );
        const $el = screen.getByRole('tabpanel');
        expect(within($el).getByLabelText('1th panel')).toBeInTheDocument();
        expect(
            within($el).queryByLabelText('2nd panel')
        ).not.toBeInTheDocument();
    });
});
