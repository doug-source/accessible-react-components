import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './FooterMsg.module.scss';
import { useMsgBottom } from './lib/useMsgBottom';

type FooterMsgProps = ComponentPropsWithoutRef<'span'> & {
    showMsg?: boolean;
};

export const FooterMsg = ({
    className,
    children,
    showMsg,
    ...remain
}: FooterMsgProps) => {
    const [msg] = useMsgBottom(children, showMsg);
    return (
        <span {...remain} className={classNames(className, styles.footerMsg)}>
            {msg}
        </span>
    );
};
