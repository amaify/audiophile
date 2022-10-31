import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/addItemToCart";
import itemCountReducer from "./reducers/IncOrDecrementCount";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage: storage,
	blacklist: ["itemCount"],
};

const rootReducers = combineReducers({
	cart: cartReducer,
	itemCount: itemCountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;