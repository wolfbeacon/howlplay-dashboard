import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './pages/Homepage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Homepage />, document.getElementById('root'));
registerServiceWorker();
