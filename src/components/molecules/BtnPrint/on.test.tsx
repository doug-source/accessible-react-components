import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { BtnPrint } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof BtnPrint>;

const buildComponent = (props: ElementProps = {}) => <BtnPrint {...props} />;

describe('<BtnPrint /> component', () => {
    beforeAll(() => {
        window.print = jest.fn();
    });
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('Print Page');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('Print Page');
    });
    test('renders calling window.print correctly', async () => {
        render(buildComponent());
        const $el = screen.getByText('Print Page');
        const user = userEvent.setup();
        await user.click($el);
        expect(window.print).toHaveBeenCalledTimes(1);
        $el.focus();
        await user.keyboard('{Enter}');
        expect(window.print).toHaveBeenCalledTimes(2);
    });
});
