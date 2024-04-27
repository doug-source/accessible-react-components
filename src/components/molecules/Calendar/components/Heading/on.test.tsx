import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './Heading.module.scss';
import { Heading } from './index';

describe('<Heading /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<Heading>{text}</Heading>);
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.heading);
    });
});
