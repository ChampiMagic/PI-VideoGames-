import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__, window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export default store;
