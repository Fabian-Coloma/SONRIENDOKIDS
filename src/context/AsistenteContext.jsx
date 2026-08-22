import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AsistenteContext = createContext(null);

export function AsistenteProvider({ children }) {
  const [datosFormulario, setDatosFormulario] = useState({});

  return (
    <AsistenteContext.Provider value={{ datosFormulario, setDatosFormulario }}>
      {children}
    </AsistenteContext.Provider>
  );
}