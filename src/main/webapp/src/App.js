import React from 'react';
import store from './redux/store.js';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import Dashboard from './dashboard/Dashboard';

function App() {
    return (
        <Provider store={store}>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
            <Dashboard/>
        </Provider>
    );
}

export default App;
