import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './user';

export type StateType = {
  user: UserStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
