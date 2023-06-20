import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store/configureStore'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));
