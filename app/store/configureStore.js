import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

export default function configureStore() {
    var history = createHistory();
    console.log(history)
  const store = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger({collapsed:true})),
    applyMiddleware(routerMiddleware( history ))

  )(createStore)(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').rootReducer
      store.replaceReducer(nextRootReducer)
    });
  }
  console.log(history)

  return store
}
