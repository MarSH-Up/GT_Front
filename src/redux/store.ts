import {
  Action,
  combineReducers,
  configureStore,
  createAction
} from '@reduxjs/toolkit';
import gtReducer from './gt/gt.slice';

export const rootReducer = (state: any, action: Action<string>) => {
    if (action.type === 'RESET_STATE') {
      return appReducer(undefined, action);
    }
  
    return appReducer(state, action);
  };
  
const appReducer = combineReducers({
    gt: gtReducer
  });

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
  });
  

export const restoreReduxState = createAction('RESET_STATE');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

