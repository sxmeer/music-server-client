import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataLayer } from './context/DataLayer';
import reducer, { initialState } from './context/reducer';
import { BrowserRouter } from 'react-router-dom';

const app =
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataLayer>
  </React.StrictMode>
ReactDOM.render(
  app,
  document.getElementById('root')
);
