import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

// Reducers:
import { appReducer } from "./appReducer";

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    appReducer
  });

  const enhancers = [applyMiddleware(ReduxThunk)];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(...enhancers)
  );

  return store;
}
