import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { BtnAudio } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof BtnAudio>;

const buildComponent = (props: ElementProps = {}) => <BtnAudio {...props} />;

describe('<BtnAudio /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('Mute');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('Mute');
    });
});
