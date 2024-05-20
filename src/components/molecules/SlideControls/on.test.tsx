import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { BtnRectangle } from '../../atoms/BtnRectangle';
import styles from './SlideControls.module.scss';
import { SlideControls } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SlideControls>;
type keys =
    | 'children'
    | 'controlOut'
    | 'onPlayChange'
    | 'denyAuto'
    | 'initialPlay'
    | 'autoPlay';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    children = 'content',
    controlOut = false,
    onPlayChange = () => {},
    denyAuto = false,
    initialPlay = false,
    autoPlay = false,
}: Props = {}) => (
    <SlideControls
        controlOut={controlOut}
        onPlayChange={onPlayChange}
        denyAuto={denyAuto}
        initialPlay={initialPlay}
        autoPlay={autoPlay}
        data-testid="test-element"
    >
        {children}
    </SlideControls>
);

describe('<SlideControls /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.controls);
        expect(within($el).getByRole('button')).toHaveClass(
            styles.btnPlayPause
        );
        rerender(buildComponent({ children: <></>, denyAuto: true }));
        expect($el).toBeEmptyDOMElement();
    });
    test('renders with controlOut property correctly', () => {
        const { rerender } = render(buildComponent({ controlOut: true }));
        const $el = screen.getByTestId('test-element');
        const $btnPlayPause = within($el).getByRole('button');
        expect($btnPlayPause).toHaveClass(styles.controlOut);
        expect($btnPlayPause).toHaveAttribute(
            'aria-label',
            'Start automatic slide show'
        );
        rerender(buildComponent({ controlOut: true, autoPlay: true }));
        expect($btnPlayPause).toHaveAttribute(
            'aria-label',
            'Stop automatic slide show'
        );
    });
    test('renders clicking at button correctly', async () => {
        const onPlayChange = jest.fn();
        render(buildComponent({ onPlayChange }));
        const $el = screen.getByTestId('test-element');
        const $btnStartPause = within($el).getByRole('button', {
            name: 'Start automatic slide show',
        });
        const [$rectBack, $playSvg, $pauseSvg] = Array.from(
            $btnStartPause.children,
            (el) => el as HTMLElement
        );
        expect($rectBack).toHaveClass(BtnRectangle.styles.rectBack);
        expect($playSvg).toHaveClass(styles.playOrPause);
        expect($pauseSvg).toHaveClass(styles.playOrPause);
        expect($playSvg).not.toHaveClass('hidden');
        expect($pauseSvg).toHaveClass('hidden');
        const user = userEvent.setup();
        await user.click($btnStartPause);
        expect($playSvg).toHaveClass('hidden');
        expect($pauseSvg).not.toHaveClass('hidden');
        expect(onPlayChange).toHaveBeenCalledWith(true);
    });
});
