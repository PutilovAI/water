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

import App from './pages/App';

import './assets/style/main.styl';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={App}/>
                <Route path="/home" render={() => <div>Home</div>}/>

            </div>
        </ConnectedRouter>
    </Provider>,

    document.getElementById('root'));
