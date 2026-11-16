import React, { useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as scNS from 'styled-components';

// Verifica se o ref passado via spread {...inputProps} é aplicado ao <input> em React 19
const App = () => {
  const refRef = useRef<HTMLInputElement | null>(null);
  const inputProps = {
    id: 'email',
    name: 'email',
    ref: (el: HTMLInputElement | null) => {
      console.log('REF chamado com:', el ? 'ELEMENTO' : 'null');
      (window as any).__refCalled = true;
    },
  };
  return <input {...inputProps} className="input" />;
};

// não usamos renderToStaticMarkup para refs; só exportamos
export default App;
