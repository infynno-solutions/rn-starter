import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {persistStore} from 'redux-persist'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, middleware)

const persistor = persistStore(store)

export {store, persistor}
