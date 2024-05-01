import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Panel.module.scss';

type DivProps = ComponentPropsWithoutRef<'div'>;

type PanelProps = Omit<DivProps, 'id' | 'aria-labelledby' | 'children'> & {
    id: NonNullable<DivProps['id']>;
    'aria-labelledby': NonNullable<DivProps['aria-labelledby']>;
    children: NonNullable<DivProps['children']>;
    keepRole: boolean;
};

const Panel = ({
    id,
    'aria-labelledby': ariaLabelledBy,
    className,
    children,
    keepRole,
    ...remain
}: PanelProps) => (
    <div
        {...remain}
        id={id}
        aria-labelledby={ariaLabelledBy}
        role={keepRole ? 'region' : undefined}
        className={classNames(styles.panel, className)}
    >
        {children}
    </div>
);

export { Panel };
