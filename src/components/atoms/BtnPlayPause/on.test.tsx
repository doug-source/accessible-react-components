import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from './BtnPlayPause.module.scss';
import { BtnPlayPause } from './index';

describe('<BtnPlayPause /> component', () => {
    test('renders correctly', () => {
        render(<BtnPlayPause initial={false} />);
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass(styles.btnPlayPause);
    });
    test('renders clicking at button correctly', async () => {
        const onChange = jest.fn();
        render(<BtnPlayPause initial={false} onChange={onChange} />);
        const $btn = screen.getByRole('button');
        const [$rectBack, $playSvg, $pauseSvg] = Array.from(
            $btn.children,
            (el) => el as HTMLElement
        );
        expect($rectBack).toHaveClass(styles.rectBack);
        expect($playSvg).toHaveClass(styles.playOrPause);
        expect($pauseSvg).toHaveClass(styles.playOrPause);
        expect($playSvg).not.toHaveClass('hidden');
        expect($pauseSvg).toHaveClass('hidden');
        const user = userEvent.setup();
        await user.click($btn);
        expect($playSvg).toHaveClass('hidden');
        expect($pauseSvg).not.toHaveClass('hidden');
    });
});
