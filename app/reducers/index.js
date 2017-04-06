import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import app from './app';
import source from './source';

const rootReducer = combineReducers({
    app,
    source,
    route: routerReducer
});

export default rootReducer
