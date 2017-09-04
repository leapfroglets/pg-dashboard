import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';
import registerServiceWorker from './app/registerServiceWorker';
import Router from './app/router';

ReactDOM.render(<Router/>, document.getElementById('root'));
registerServiceWorker();
