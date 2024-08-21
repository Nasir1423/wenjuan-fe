import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './user';
import componentsReducer, { ComponentsStateType } from './components';
import pageInfoReducer, { PageInfoStateType } from './pageInfo';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
  pageInfo: PageInfoStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
});
