import { applyMiddleware, createStore, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export default function configureStore(onComplete: ?() => void) {
  const reducers = require('../modules');
  const store = autoRehydrate()(createStoreWithMiddleware)(combineReducers({ ...reducers }));
  persistStore(store, { storage: AsyncStorage }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
