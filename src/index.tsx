import 'shared/styles/index.scss';

import React from 'react';

import ReactDOM from 'react-dom/client';

import '@fontsource/montserrat';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
