import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import {thunk} from "redux-thunk"; // Correct import statement
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userreducer'] // specify which reducer you want to persist
};

const rootReducer = combineReducers({
  userreducer: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
