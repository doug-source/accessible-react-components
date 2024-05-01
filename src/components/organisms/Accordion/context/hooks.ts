import { useContext } from 'react';
import { CollapseContext } from './collapse';
import { UniqueContext } from './unique';

export const useCollapse = () => useContext(CollapseContext);

export const useUnique = () => useContext(UniqueContext);
