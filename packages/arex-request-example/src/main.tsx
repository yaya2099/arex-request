import './userWorker';
import 'antd/dist/reset.css';
import './helpers/adapter';
import 'allotment/dist/style.css';
import './assets/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);