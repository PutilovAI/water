import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Route, Switch } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

import configureStore from './store/configureStore'
const store = configureStore()

import __main from './layouts/__main';
import App from './layouts/App';
import PageMain from './pages/PageMain';
import PageSearch from './pages/PageSearch';
import PageSource from './pages/PageSource';
import PageAdd from './pages/PageAdd';

import './assets/style/main.styl';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="wrapper__inner">
                <Switch>
                    <__main exact path='/' component={PageMain}/>
                    <__main path='/search' component={PageSearch}/>
                    <__main exact path='/source' component={PageSearch}/>
                    <__main strict path='/source/:id' component={PageSource}/>
                    <__main path='/add' component={PageAdd}/>
                </Switch>
            </div>

        </ConnectedRouter>
    </Provider>,

    document.getElementById('root'));
