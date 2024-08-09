import { ComponentType } from '@/components/QuestionComponents';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { PropsType } from '@/components/QuestionComponents';
import { message } from 'antd';
/* 状态类型 */
export type ComponentsStateType = {
  selectedId: string;
  componentList: ComponentType[];
};

/* 初始状态 */
const INIT_STATE: ComponentsStateType = {
  selectedId: '', // 记录用户选中的组件 id
  componentList: [], // 记录当前页面的所有组件信息
};

/* 修改状态的 action、reducer */
const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件（可以通过调用，保存 AJAX 加载过来的数据）
    reset: (_prevState: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    // 修改 selectedId（使用 Immer）
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    // 将指定组件信息添加到 componentList 状态中（如果不存在 selectedId，则插入到列表最后；如果存在 selectedId，则插入到对应的组件信息后边）
    insertComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentType>) => {
      const { selectedId, componentList } = draft; // 当前选中的组件 id
      const newComponent = action.payload; // 新的组件信息

      if (selectedId) {
        /* 插入到指定位置 */
        const index = draft.componentList.findIndex(component => component.fe_id === selectedId);
        componentList.splice(index + 1, 0, newComponent);
      } else {
        /* 插入到列表最后 */
        draft.componentList.push(newComponent);
      }

      draft.selectedId = newComponent.fe_id;
    }),
    // 修改 componentList 中当前选中的组件的信息
    updateSelectedComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<PropsType>) => {
        const props = action.payload;
        const { selectedId, componentList } = draft;

        if (!selectedId)
          message.error('错误：不存在 selectedId 却出发了 updateSelectedComponent 动作');
        else {
          const selectedComponent = componentList.find(component => component.fe_id === selectedId);
          if (!selectedComponent) message.error(`错误：不存在 fe_id 为 ${selectedId} 的组件`);
          else selectedComponent.props = props;
        }
      }
    ),
  },
});

/* 导出 actions */
export const { reset, changeSelectedId, insertComponent, updateSelectedComponent } =
  componentsSlice.actions;

/* 导出 reducer */
export default componentsSlice.reducer;
