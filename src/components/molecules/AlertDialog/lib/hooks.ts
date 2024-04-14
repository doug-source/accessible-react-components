import { useCallback, useEffect } from 'react';

export type KeydownHandler = Parameters<
    typeof document.addEventListener<'keydown'>
>[1];

export const useKeydownHandler = (onClose: () => void): KeydownHandler => {
    return useCallback(
        (evt) => {
            let flag = false;
            switch (evt.key) {
                case 'Escape': {
                    flag = true;
                    onClose && onClose();
                }
            }
            if (flag) {
                evt.preventDefault();
            }
        },
        [onClose]
    );
};

export const useKeydownBinding = (
    onClose: Parameters<typeof useKeydownHandler>[0]
) => {
    const keydownHandler = useKeydownHandler(onClose);
    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [keydownHandler]);
};
