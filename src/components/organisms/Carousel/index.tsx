import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useRef, useState } from 'react';
import { isReducedMotion } from '../../../lib';
import { SlideBtnArrows } from '../../molecules/SlideBtnArrows';
import { SlideBtnTabList } from '../../molecules/SlideBtnTabList';
import { SlideControls } from '../../molecules/SlideControls';
import { SlideItems } from '../../molecules/SlideItems';
import styles from './Carousel.module.scss';
import { useAutomaticSlide } from './lib/hooks/useAutomaticSlide';

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
    tabbed?: boolean;
};

const Carousel = ({
    className,
    items,
    'aria-label': ariaLabel,
    controlOut = false,
    timer = 3000, // miliseconds
    denyAuto = false,
    initialPlay = false,
    tabbed = false,
    ...remain
}: CarouselProps) => {
    const [selected, setSelected] = useState(0);
    const [automatic, setAutomatic] = useState(
        initialPlay && !isReducedMotion()
    );
    const itemBoxListRef = useRef<Array<HTMLDivElement | null>>([]);
    useAutomaticSlide(automatic, selected, setSelected, items, timer);

    const slideItemsId = useId();
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
                {tabbed && (
                    <SlideBtnTabList
                        list={items}
                        selected={selected}
                        setSelected={setSelected}
                        itemBoxListRef={itemBoxListRef}
                    />
                )}
                {!tabbed && (
                    <SlideBtnArrows
                        aria-controls={slideItemsId}
                        list={items}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
            </SlideControls>
            <SlideItems
                id={slideItemsId}
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
