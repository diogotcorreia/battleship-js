import Immutable from 'immutable';
import { compose, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export default function configureStore() {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          serialize: {
            immutable: Immutable,
          },
        })
      : compose;
  return createStore(rootReducer, composeEnhancers());
}
