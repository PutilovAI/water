import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

import configureStore from './store/configureStore'
const store = configureStore()

import PageMain from './pages/PageMain';
import PageSearch from './pages/PageSearch';
import PageSource from './pages/PageSource';

import './assets/style/main.styl';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={PageMain}/>
                <Route path='/search' component={PageSearch}/>
                <Route exact path='/source' component={PageSearch}/>
                <Route strict path='/source/:id' component={PageSource}/>


            </div>
        </ConnectedRouter>
    </Provider>,

    document.getElementById('root'));
