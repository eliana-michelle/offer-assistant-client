import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import sessions from './app/reducers/sessionsReducer';


export default createStore(
  combineReducers({
    sessions,
    form: formReducer
  }),
  compose(
    applyMiddleware(thunk)
  )
);
