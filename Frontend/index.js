import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//browserrouter
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes';

import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer'





ReactDOM.render(
  < BrowserRouter >
    <StateProvider initialState={initialState} reducer={reducer}>
      <Routes></Routes>
    </StateProvider>

  </BrowserRouter >,
  document.getElementById('root')
);

