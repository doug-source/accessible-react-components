import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import ArrowExtended from '../../../assets/arrow-extended.svg?react';
import { swapIndex } from '../../../lib';
import { BtnRectangle } from '../../atoms/BtnRectangle';
import styles from './SlideBtnArrows.module.scss';

type DivProps = ComponentPropsWithoutRef<'div'>;

type SlideBtnArrowsProps<T> = Omit<DivProps, 'aria-controls'> & {
    'aria-controls': NonNullable<DivProps['aria-controls']>;
    list: T[];
    selected: number;
    setSelected: (value: number) => void;
};

export const SlideBtnArrows = <T,>({
    className,
    'aria-controls': ariaControls,
    list,
    selected,
    setSelected,
    ...remain
}: SlideBtnArrowsProps<T>) => {
    return (
        <div {...remain} className={classNames(className, styles.box)}>
            <BtnRectangle
                aria-controls={ariaControls}
                aria-label="Previous Slide"
                onClick={() => setSelected(swapIndex(list, selected - 1))}
            >
                <ArrowExtended
                    className={classNames(styles.arrow, styles.reverse)}
                />
            </BtnRectangle>
            <BtnRectangle
                aria-controls={ariaControls}
                aria-label="Next Slide"
                onClick={() => setSelected(swapIndex(list, selected + 1))}
            >
                <ArrowExtended className={styles.arrow} />
            </BtnRectangle>
        </div>
    );
};
