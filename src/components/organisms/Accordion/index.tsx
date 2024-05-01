import classNames from 'classnames';
import { Children, ComponentPropsWithoutRef } from 'react';
import styles from './Accordion.module.scss';
import { ItemList } from './components/ItemList';
import { CollapseWrapper } from './context/collapse';
import { UniqueWrapper } from './context/unique';

type ItemListProps = ComponentPropsWithoutRef<typeof ItemList>;

type AccordionProps = {
    headerList: Array<ItemListProps['itemList'][number][0]>;
    unique: boolean;
    collapse: boolean;
} & ComponentPropsWithoutRef<'div'>;

const Accordion = ({
    headerList,
    children,
    className,
    unique,
    collapse,
    ...remain
}: AccordionProps) => {
    const sizeLower = Math.min(Children.count(children), headerList.length);
    const childrenArray = Children.toArray(children).slice(0, sizeLower);
    return (
        <UniqueWrapper value={unique}>
            <CollapseWrapper value={collapse}>
                <div
                    {...remain}
                    className={classNames(styles.accordion, className)}
                >
                    <ItemList
                        itemList={headerList
                            .slice(0, sizeLower)
                            .map(($header, i) => [$header, childrenArray[i]])}
                    />
                </div>
            </CollapseWrapper>
        </UniqueWrapper>
    );
};

export { Accordion };
