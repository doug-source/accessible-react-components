import { useEffect } from 'react';

export const useAutomaticSlide = <T>(
    automatic: boolean,
    selected: number,
    setSelected: (value: number) => void,
    list: T[],
    timer: number
) => {
    useEffect(() => {
        let id: Parameters<typeof clearInterval>[number] = -1;
        if (automatic) {
            id = setInterval(() => {
                const newIndex = (selected + 1) % list.length;
                setSelected(newIndex);
            }, timer);
        } else {
            clearInterval(id);
        }
        return () => clearInterval(id);
    }, [automatic, list.length, selected, setSelected, timer]);
};
