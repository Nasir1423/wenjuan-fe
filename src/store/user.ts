/* 用户状态 user */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 状态类型 */
export type UserStateType = {
  username: string;
  nickname: string;
};

/* 初始状态 */
const INIT_STATE: UserStateType = { username: '', nickname: '' };

/* 修改状态的 action、reducer */
// 使用 createSlice 创建一个 slice，包含了 reducer 逻辑和初始状态
const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    // 使用 createSlice 创建一个 slice，包含了 reducer 逻辑和初始状态
    loginReducer: (_prevState: UserStateType, action: PayloadAction<UserStateType>) =>
      action.payload,
    logoutReducer: () => INIT_STATE,
  },
});

// 导出 actions，以便在组件中触发这些 reducer
export const { loginReducer, logoutReducer } = userSlice.actions;

// 导出 reducer，以便在 store 中进行注册
export default userSlice.reducer;
