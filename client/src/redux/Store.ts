import activePageSlice from "@/features/activePage/activePageSlice";
import historySearchSlice from "@/features/historySearch/historySearchSlice";
import keySearchSlice from "@/features/keySearch/keySearchSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["activePage", "keySearch"],
};

export default configureStore({
    reducer: {
        activePageSlice: activePageSlice,
        keySearchSlice: keySearchSlice,
        historySearchSlice: historySearchSlice
    },
});
// auth: authReducer
const rootReducer = combineReducers({
    activePageSlice,
    keySearchSlice,
    historySearchSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export const storePublic = createStore({ auth: authReducer });
