import { ComponentType } from '@/components/QuestionComponents';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 状态类型 */
export type ComponentsStateType = {
  componentList: ComponentType[];
};

/* 初始状态 */
const INIT_STATE: ComponentsStateType = { componentList: [] };

/* 修改状态的 action、reducer */
const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    reset: (_prevState: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
  },
});

/* 导出 actions */
export const { reset } = componentsSlice.actions;

/* 导出 reducer */
export default componentsSlice.reducer;
