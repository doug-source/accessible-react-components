import classNames from 'classnames';
import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { isReducedMotion } from '../../../lib';
import { SlideBtnTabList } from '../../molecules/SlideBtnTabList';
import { SlideControls } from '../../molecules/SlideControls';
import { SlideItems } from '../../molecules/SlideItems';
import styles from './Carousel.module.scss';

type SlideControlsProps = ComponentPropsWithoutRef<typeof SlideControls>;

type SlideItemsProps = ComponentPropsWithoutRef<typeof SlideItems>;

type SectionProps = ComponentPropsWithoutRef<'section'>;

type CarouselProps = Omit<SectionProps, 'aria-label'> & {
    className?: string;
    items: SlideItemsProps['items'];
    'aria-label': NonNullable<SectionProps['aria-label']>;
    controlOut?: boolean;
    timer?: number;
    denyAuto?: SlideControlsProps['denyAuto'];
    initialPlay?: SlideControlsProps['initialPlay'];
};

const Carousel = ({
    className,
    items,
    'aria-label': ariaLabel,
    controlOut = false,
    timer = 3000, // miliseconds
    denyAuto = false,
    initialPlay = false,
    ...remain
}: CarouselProps) => {
    const [selected, setSelected] = useState(0);
    const [automatic, setAutomatic] = useState(
        initialPlay && !isReducedMotion()
    );
    const itemBoxListRef = useRef<Array<HTMLDivElement | null>>([]);
    return (
        <section
            {...remain}
            className={classNames(className, styles.box)}
            aria-roledescription="carousel"
            aria-label={ariaLabel}
        >
            <SlideControls
                className={classNames(
                    styles.controls,
                    controlOut && styles.controlOut
                )}
                controlOut={controlOut}
                onPlayChange={setAutomatic}
                denyAuto={denyAuto}
                initialPlay={initialPlay && !isReducedMotion()}
                autoPlay={automatic}
            >
                <SlideBtnTabList
                    list={items}
                    selected={selected}
                    setSelected={setSelected}
                    automatic={automatic}
                    timer={timer}
                    itemBoxListRef={itemBoxListRef}
                />
            </SlideControls>
            <SlideItems
                items={items}
                selected={selected}
                aria-live={automatic ? 'off' : 'polite'}
                listRef={itemBoxListRef}
            />
        </section>
    );
};

Carousel.styles = styles;

export { Carousel };
