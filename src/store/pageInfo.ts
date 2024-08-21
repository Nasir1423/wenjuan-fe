import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

export type PageInfoStateType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (_prevState: PageInfoStateType, action: PayloadAction<PageInfoStateType>) => {
      return action.payload;
    },
    changeTitle: produce(
      (draft: PageInfoStateType, action: PayloadAction<{ newTitle: string }>) => {
        draft.title = action.payload.newTitle;
      }
    ),
  },
});

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
