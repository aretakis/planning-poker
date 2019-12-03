import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import pollReducer from './reducers/pollReducer';

const initialState = {};
let store;

if (window.navigator.userAgent.includes('Chrome')) {
    store = createStore(
        pollReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    store = createStore(
        pollReducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
}

export default store;