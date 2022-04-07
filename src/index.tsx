import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import App from './App';
import getLibrary from './utils/library';

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root')
);
