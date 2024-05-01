import classNames from 'classnames';
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { useCollapse, useUnique } from '../../context/hooks';
import { Header } from '../Header';
import { Panel } from '../Panel';
import styles from './Item.module.scss';

type DivProps = ComponentPropsWithoutRef<'div'>;

type ItemProps = Omit<DivProps, 'onClick'> & {
    headerContent: NonNullable<ReactNode>;
    panelContent: NonNullable<ReactNode>;
    expandedList: string[];
    onClick: (headerId: string) => void;
    keepPanelRole: ComponentPropsWithoutRef<typeof Panel>['keepRole'];
};

const Item = ({
    headerContent,
    panelContent,
    expandedList,
    onClick,
    keepPanelRole,
    ...remain
}: ItemProps) => {
    const headerId = useId();
    const panelId = useId();
    const unique = useUnique();
    const collapse = useCollapse();
    return (
        <div {...remain} className={styles.item}>
            <Header
                id={headerId}
                aria-controls={panelId}
                aria-expanded={expandedList.includes(headerId)}
                aria-disabled={
                    unique && !collapse
                        ? expandedList.includes(headerId)
                        : undefined
                }
                onClick={() => onClick(headerId)}
            >
                {headerContent}
            </Header>
            <Panel
                className={classNames(
                    !expandedList.includes(headerId) && styles.collapsed
                )}
                id={panelId}
                aria-labelledby={headerId}
                keepRole={keepPanelRole}
                hidden={!expandedList.includes(headerId)}
            >
                {panelContent}
            </Panel>
        </div>
    );
};

export { Item };
