import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TitleHidden } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TitleHidden>;

const buildComponent = ({ children = 'A heading text' }: ElementProps = {}) => {
    return render(<TitleHidden>{children}</TitleHidden>);
};

describe('<TitleHidden /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByRole('heading', { level: 3, hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).not.toBeVisible();
        expect($el).toHaveStyleRule('display', 'none');
    });
    test('renders text content passed correctly', () => {
        const props = { children: 'Another text' };
        buildComponent(props);
        const $el = screen.getByRole('heading', { level: 3, hidden: true });
        expect($el).toHaveTextContent(props.children);
    });
});
