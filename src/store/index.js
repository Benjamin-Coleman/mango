import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers:


export default function configureStore(initialState = {}) {
    const rootReducer = combineReducers({
    });

    const store = createStore(
        rootReducer,
        initialState
    );

    return store;
};