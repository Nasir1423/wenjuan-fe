import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './user';
import componentsReducer, { ComponentsStateType } from './components';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});
