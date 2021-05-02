import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const rootPersistConfig = {
    key: 'root-spacex-dashboard',
    storage
};

export const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
