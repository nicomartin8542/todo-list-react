import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './spinner.css';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//TODO: hacer esto mas adelente
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
