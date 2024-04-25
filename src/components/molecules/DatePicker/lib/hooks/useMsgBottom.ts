import { useEffect, useState } from 'react';

export const useMsgBottom = (text: string, show?: boolean) => {
    const [msg, setMsg] = useState('');
    useEffect(() => {
        // const text = 'Cursor keys can navigate dates';
        setMsg(show ? text : '');
    }, [show, text]);
    return [msg] as const;
};
