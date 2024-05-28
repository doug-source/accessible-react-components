import classNames from 'classnames';
import { MutableRefObject } from 'react';
import { ComboGridRow } from '../../../../molecules/ComboGridRow';
import styles from './ComboGridList.module.scss';

type ComboGridListProps = {
    items: Array<[text: string, desc: string]>;
    focused: number;
    cellListRef: MutableRefObject<(HTMLDivElement | null)[]>;
    cellBoolean: boolean;
};

export const ComboGridList = ({
    items,
    focused,
    cellListRef,
    cellBoolean,
}: ComboGridListProps) => (
    <>
        {items.map(([text, desc], i) => (
            <ComboGridRow
                key={text}
                className={classNames(focused === i && styles.focused)}
                cellBoolean={cellBoolean}
                cellListRef={cellListRef}
                text={text}
                desc={desc}
                focused={focused}
                index={i}
            />
        ))}
    </>
);
