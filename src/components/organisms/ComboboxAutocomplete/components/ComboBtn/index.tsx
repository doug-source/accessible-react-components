import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { Arrow } from '../../../../atoms/Arrow';
import styles from './ComboBtn.module.scss';

type ComboBtnProps = ComponentPropsWithoutRef<'button'> & {
    expanded: boolean;
};

export const ComboBtn = ({ className, expanded, ...remain }: ComboBtnProps) => (
    <button
        {...remain}
        type="button"
        className={classNames(className, styles.comboBtn)}
        aria-label="Previous Searches"
        tabIndex={-1}
        aria-expanded={expanded}
    >
        <Arrow
            className={classNames(
                styles.arrowBtn,
                expanded ? styles.arrowUp : styles.arrowDown
            )}
            direction={expanded ? 'top' : 'bottom'}
            type="complete"
        />
    </button>
);
