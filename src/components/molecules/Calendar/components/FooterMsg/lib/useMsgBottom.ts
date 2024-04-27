import { ReactNode, useEffect, useState } from 'react';

export const useMsgBottom = (content: ReactNode, show?: boolean) => {
    const [msg, setMsg] = useState<ReactNode>('');
    useEffect(() => {
        // const text = 'Cursor keys can navigate dates';
        setMsg(show ? content : '');
    }, [show, content]);
    return [msg] as const;
};
