import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import app from './app';
import source from './source';
import search from './search';
import add from './add';

const rootReducer = combineReducers({
    app,
    source,
    search,
    add,
    route: routerReducer
});

export default rootReducer
