import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './user';
import componentsReducer, { ComponentsStateType } from './components';
import pageInfoReducer, { PageInfoStateType } from './pageInfo';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/reset',
        'components/changeSelectedId',
        'components/selectAdjacentComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
