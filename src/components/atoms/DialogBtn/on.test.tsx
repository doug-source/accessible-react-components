import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertDialogBtn } from './index';

describe('<AlertDialogBtn /> component', () => {
    test('renders correctly', () => {
        render(<AlertDialogBtn id="this-btn">Ok</AlertDialogBtn>);
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
    });
    test('applies the props passed to component', () => {
        const id = 'this-btn';
        render(<AlertDialogBtn id={id}>Ok</AlertDialogBtn>);
        const $btn = screen.getByRole('button');
        expect($btn).toHaveTextContent('Ok');
        expect($btn).toHaveAttribute('id', id);
    });
    test('triggers the click event handler', async () => {
        const onClick = jest.fn();
        render(
            <AlertDialogBtn id="this-btn" onClick={onClick}>
                Ok
            </AlertDialogBtn>
        );
        const $btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($btn);
        expect(onClick).toHaveBeenCalled();
    });
});
