import {
  Action,
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import gtSlice from './gt/gt.slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state: any, action: Action<string>) => {
  if (action.type === 'RESET_STATE') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  gt: gtSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const restoreReduxState = createAction('RESET_STATE');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
