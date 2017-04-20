import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import app from './app';
import source from './source';
import search from './search';

const rootReducer = combineReducers({
    app,
    source,
    search,
    route: routerReducer
});

export default rootReducer
