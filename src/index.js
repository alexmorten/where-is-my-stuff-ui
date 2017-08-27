import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import RouteController from './RouteController';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouteController />, document.getElementById('root'));
registerServiceWorker();
