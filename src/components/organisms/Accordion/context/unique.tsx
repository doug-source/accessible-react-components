import { ReactNode, createContext } from 'react';

type UniqueProps = {
    children: ReactNode;
    value: boolean;
};

export const UniqueContext = createContext<UniqueProps['value']>(false);

export const UniqueWrapper = ({ value, children }: UniqueProps) => (
    <UniqueContext.Provider value={value}>{children}</UniqueContext.Provider>
);
