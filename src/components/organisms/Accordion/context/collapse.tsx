import { ReactNode, createContext } from 'react';

type CollapseProps = {
    children: ReactNode;
    value: boolean;
};

export const CollapseContext = createContext<CollapseProps['value']>(false);

export const CollapseWrapper = ({ value, children }: CollapseProps) => (
    <CollapseContext.Provider value={value}>
        {children}
    </CollapseContext.Provider>
);
