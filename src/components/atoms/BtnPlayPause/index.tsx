import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    ForwardedRef,
    forwardRef,
    useState,
} from 'react';
import PauseSvg from '../../../assets/pause.svg?react';
import PlaySvg from '../../../assets/play.svg?react';
import { makeBooleanHandle } from '../../../lib';
import styles from './BtnPlayPause.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

type BtnPlayPauseProps = Omit<BtnProps, 'onChange'> & {
    onChange?: (value: boolean) => void;
    initial: boolean;
};

const BtnPlayPauseInner = (
    { className, onChange, initial, ...remain }: BtnPlayPauseProps,
    ref: ForwardedRef<HTMLButtonElement>
) => {
    const [pause, setPause] = useState(initial);
    return (
        <button
            {...remain}
            ref={ref}
            type="button"
            className={classNames(styles.btnPlayPause, className)}
            onClick={makeBooleanHandle(pause, (newValue: boolean) => {
                setPause(newValue);
                onChange && onChange(newValue);
            })}
        >
            <div className={styles.rectBack}></div>

            <PlaySvg
                className={classNames(styles.playOrPause, pause && 'hidden')}
            />
            <PauseSvg
                className={classNames(styles.playOrPause, !pause && 'hidden')}
            />
        </button>
    );
};

export const BtnPlayPause = forwardRef<HTMLButtonElement, BtnPlayPauseProps>(
    BtnPlayPauseInner
);
