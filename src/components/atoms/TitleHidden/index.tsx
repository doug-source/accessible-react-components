import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './TitleHidden.module.scss';

type StyledProps = ComponentPropsWithoutRef<'h3'>;

export const TitleHidden = ({ className, ...remain }: StyledProps) => {
    return (
        <h3 className={classNames(className, styles.titleHidden)} {...remain} />
    );
};
