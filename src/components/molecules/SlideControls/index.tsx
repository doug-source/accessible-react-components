import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import PauseSvg from '../../../assets/pause.svg?react';
import PlaySvg from '../../../assets/play.svg?react';
import { makeBooleanHandle } from '../../../lib';
import { BtnRectangle } from '../../atoms/BtnRectangle';
import styles from './SlideControls.module.scss';

type DivProps = ComponentPropsWithoutRef<'div'>;

type SlideControlsProps = Omit<DivProps, 'children'> & {
    children: NonNullable<DivProps['children']>;
    controlOut: boolean;
    onPlayChange: (value: boolean) => void;
    denyAuto: boolean;
    initialPlay: boolean;
    autoPlay: boolean;
};

const SlideControls = ({
    controlOut,
    className,
    children,
    onPlayChange,
    denyAuto,
    initialPlay,
    autoPlay,
    ...remain
}: SlideControlsProps) => {
    const [pause, setPause] = useState(initialPlay);
    return (
        <div {...remain} className={classNames(className, styles.controls)}>
            {!denyAuto && (
                <BtnRectangle
                    className={classNames(
                        styles.btnPlayPause,
                        controlOut && styles.controlOut
                    )}
                    aria-label={`${
                        autoPlay ? 'Stop' : 'Start'
                    } automatic slide show`}
                    onClick={makeBooleanHandle(pause, (newValue: boolean) => {
                        setPause(newValue);
                        onPlayChange && onPlayChange(newValue);
                    })}
                >
                    <PlaySvg
                        className={classNames(
                            styles.playOrPause,
                            pause && 'hidden'
                        )}
                    />
                    <PauseSvg
                        className={classNames(
                            styles.playOrPause,
                            !pause && 'hidden'
                        )}
                    />
                </BtnRectangle>
            )}
            {children}
        </div>
    );
};

SlideControls.styles = styles;

export { SlideControls };
