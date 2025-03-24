import { configureStore, combineReducers } from "@reduxjs/toolkit";
import InterviewSlice  from "./features/interviewSlice";
import { useSelector, TypedUseSelectorHook} from "react-redux";
import  { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

function createPersistStorage(): WebStorage {
   const isServer = typeof window === 'undefined';
   if(isServer) {
    return {
        getItem(){
            return Promise.resolve(null);
        },
        setItem(){
            return Promise.resolve();
        },
        removeItem(){
            return Promise.resolve();
        },
    };
   }
   return createWebStorage('local');
}
const storage = createPersistStorage();

const persistConfig = {
    key: 'rootPersist',
    storage,
}

const rootReducer = combineReducers({interviewSlice: InterviewSlice});
const reduxPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({

    reducer: reduxPersistReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })

    // reducer: {
    //     bookSlice
    // }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;