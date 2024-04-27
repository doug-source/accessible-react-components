import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { BtnDefault } from '../../../../atoms/BtnDefault';
import styles from './Btn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

export const Btn = ({ className, children, ...remain }: BtnProps) => (
    <BtnDefault {...remain} className={classNames(className, styles.btn)}>
        {children}
    </BtnDefault>
);
