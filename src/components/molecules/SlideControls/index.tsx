import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { BtnPlayPause } from '../../atoms/BtnPlayPause';
import styles from './SlideControls.module.scss';

type BtnPlayPauseProps = ComponentPropsWithoutRef<typeof BtnPlayPause>;

type DivProps = ComponentPropsWithoutRef<'div'>;

type SlideControlsProps = Omit<DivProps, 'children'> & {
    children: NonNullable<DivProps['children']>;
    controlOut: boolean;
    onPlayChange: BtnPlayPauseProps['onChange'];
    denyAuto: boolean;
    initialPlay: BtnPlayPauseProps['initial'];
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
}: SlideControlsProps) => (
    <div {...remain} className={classNames(className, styles.controls)}>
        {!denyAuto && (
            <BtnPlayPause
                className={classNames(
                    styles.btnPlayPause,
                    controlOut && styles.controlOut
                )}
                aria-label={`${
                    autoPlay ? 'Stop' : 'Start'
                } automatic slide show`}
                onChange={onPlayChange}
                initial={initialPlay}
            />
        )}
        {children}
    </div>
);

SlideControls.styles = styles;

export { SlideControls };
