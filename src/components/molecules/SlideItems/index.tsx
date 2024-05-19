import { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { SlideItemBox } from '../../atoms/SlideItemBox';
import { SlidesBox } from '../../atoms/SlidesBox';
import styles from './SlideItems.module.scss';

type Item = {
    imgSrc: string;
    imgAlt?: string;
    caption: string;
};

type SlideItemsProps = ComponentPropsWithoutRef<'div'> & {
    items: Item[];
    selected: number;
    listRef: MutableRefObject<(HTMLDivElement | null)[]>;
};

export const SlideItems = ({
    items,
    selected,
    listRef,
    ...remain
}: SlideItemsProps) => {
    return (
        <SlidesBox {...remain}>
            {items.map(({ imgSrc, imgAlt, caption }, i) => (
                <SlideItemBox
                    key={imgSrc}
                    show={selected === i}
                    pos={i + 1}
                    size={items.length}
                    ref={(el) => {
                        listRef.current[i] = el;
                    }}
                >
                    <div className={styles.boxImgSlide}>
                        <img src={imgSrc} alt={imgAlt ?? `image-${i + 1}`} />
                    </div>
                    <div className={styles.imgCaptionBox}>
                        <h3>{caption}</h3>
                    </div>
                </SlideItemBox>
            ))}
        </SlidesBox>
    );
};
