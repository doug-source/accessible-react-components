import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchBasicBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchBasicBox>;

const buildComponent = ({ children, ...remain }: ElementProps = {}) => {
    return render(<SwitchBasicBox {...remain}>{children}</SwitchBasicBox>);
};

describe('<SwitchBasicBox /> component', () => {
    test('renders correctly', () => {
        const children = 'Some content';
        buildComponent({ children });
        const $el = screen.getByText(children);
        expect($el).toBeInTheDocument();
    });
});
