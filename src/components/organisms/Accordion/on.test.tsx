import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Accordion } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Accordion>;
type keys = 'headerList' | 'unique' | 'collapse';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    headerList = ['headerOne', 'headerTwo', 'headerThree'],
    unique = true,
    collapse = true,
    children = (
        <>
            <div>content one</div>
            <div>content two</div>
            <div>content three</div>
        </>
    ),
}: Props = {}) => (
    <Accordion
        headerList={headerList}
        unique={unique}
        collapse={collapse}
        data-testid="element-test"
    >
        {children}
    </Accordion>
);

describe('<Accordion /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('element-test');
        expect($el).toBeInTheDocument();
    });
});
