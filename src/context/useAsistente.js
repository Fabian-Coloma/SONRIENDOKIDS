import { useContext } from 'react';
import { AsistenteContext } from './AsistenteContext';

export function useAsistente() {
  return useContext(AsistenteContext);
}