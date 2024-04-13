import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { DialogBtn } from './index';

describe('<DialogBtn /> component', () => {
    test('renders correctly', () => {
        render(<DialogBtn id="this-btn">Ok</DialogBtn>);
        const $btn = screen.getByRole('button');
        expect($btn).toBeVisible();
    });
    test('applies the props passed to component', () => {
        const id = 'this-btn';
        render(<DialogBtn id={id}>Ok</DialogBtn>);
        const $btn = screen.getByRole('button');
        expect($btn).toHaveTextContent('Ok');
        expect($btn).toHaveAttribute('id', id);
    });
    test('triggers the click event handler', async () => {
        const onClick = jest.fn();
        render(
            <DialogBtn id="this-btn" onClick={onClick}>
                Ok
            </DialogBtn>
        );
        const $btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($btn);
        expect(onClick).toHaveBeenCalled();
    });
});
