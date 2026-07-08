import { createContext } from 'react';
import type { ModalContextType } from './types';

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
