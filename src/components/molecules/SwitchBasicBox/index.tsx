import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchBasicBox.module.scss';

type SwitchBasicBoxProps = ComponentPropsWithoutRef<'div'>;

export const SwitchBasicBox = ({
    className,
    children,
    ...remain
}: SwitchBasicBoxProps) => (
    <div {...remain} className={classNames(className, styles.switchBasicBox)}>
        {children}
    </div>
);
