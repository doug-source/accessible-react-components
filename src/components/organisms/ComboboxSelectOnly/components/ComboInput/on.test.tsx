import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboInput.module.scss';
import { ComboInput } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ComboInput>;
type keys = 'listboxId' | 'labelId';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    listboxId = 'fooListbox',
    labelId = 'barLabel',
    children = 'contentFinal',
}: Props = {}) => (
    <ComboInput listboxId={listboxId} labelId={labelId}>
        {children}
    </ComboInput>
);

describe('<ComboInput /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('contentFinal');
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('role', 'combobox');
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveAttribute('aria-controls', 'fooListbox');
        expect($el).toHaveAttribute('aria-labelledby', 'barLabel');
        expect($el).toHaveAttribute('aria-haspopup', 'listbox');
        expect($el).toHaveClass(styles.comboInput);
        expect($el).toHaveTextContent('contentFinal');
    });
});
