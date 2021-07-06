import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.unregister();
