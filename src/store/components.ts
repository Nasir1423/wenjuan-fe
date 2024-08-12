import { ComponentType } from '@/components/QuestionComponents';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { PropsType } from '@/components/QuestionComponents';
import { message } from 'antd';

export type ComponentsStateType = {
  selectedId: string;
  componentList: ComponentType[];
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '', // 记录用户选中的组件 id
  componentList: [], // 记录当前页面的所有组件信息
};

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    /**
     * 重置 components 状态数据，可以用于保存 AJAX 加载过来的数据
     */
    reset: (_prevState: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    /**
     * 修改 components 状态的 selectedId
     */
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    /**
     * 添加新的组件信息到 components 状态的 componentList 中
     *
     * 注意：
     *  - 如果不存在 selectedId 字段，则将新的组件插入到 componentList 列表最后
     *  - 否则，将新的组件插入到 componentList 中的 fe_id = selectId 对应的组件信息后
     *  - 除此之外，需要设置 selectedId 的值为新加入的组件的 fe_id
     */
    insertComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentType>) => {
      const { selectedId, componentList } = draft;
      const newComponent = action.payload;

      // 1. 插入新组件
      if (selectedId) {
        /* 插入到指定位置 */
        const index = draft.componentList.findIndex(component => component.fe_id === selectedId);
        if (index === -1) {
          message.error(`错误：不存在 fe_id 为 ${selectedId} 的组件`);
          return draft;
        }
        componentList.splice(index + 1, 0, newComponent);
      } else {
        /* 插入到列表最后 */
        draft.componentList.push(newComponent);
      }

      // 2. 设置 selectedId
      draft.selectedId = newComponent.fe_id;
    }),
    /**
     * 修改 components 状态的 componentList 中 fe_id = selectedId 的组件的 props 参数
     */
    updateSelectedComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<PropsType>) => {
        const { selectedId, componentList } = draft;
        const props = action.payload;

        if (!selectedId) {
          message.error('错误：不存在 selectedId 却触发了 updateSelectedComponent 动作');
          return draft;
        }

        // 修改 fe_id = selectedId 的组件的 props 参数
        const selectedComponent = componentList.find(component => component.fe_id === selectedId);
        if (!selectedComponent) {
          message.error(`错误：不存在 fe_id 为 ${selectedId} 的组件`);
          return draft;
        }
        selectedComponent.props = props;
      }
    ),
    /**
     * 删除 components 状态的 componentList 中 fe_id = selectedId 的组件
     */
    deleteSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      let newSelectedId: string = ''; // 删除当前选中的组件后，要选中的新组件的 id

      // selectedId 不存在 ==> 不进行删除操作
      if (!selectedId) return draft;

      // selectedId 对应的组件不存在 ==> 不进行删除操作
      const index = componentList.findIndex(component => component.fe_id === selectedId);
      if (index === -1) {
        message.error(`错误：不存在 fe_id 为 ${selectedId} 的组件`);
        return draft;
      }

      // selectId 存在 & selectedId 对应的组件存在 ==> 进行删除操作
      componentList.splice(index, 1);

      // 删除组件后，要选中的新的组件的 selectedId
      if (componentList.length <= 0)
        // 删除的组件是组件列表的唯一一个组件，因此不选中
        newSelectedId = '';
      else if (componentList.length === index)
        // 删除的组件是组价列表的最后一个组件，因此选中最新的组件列表的最后一个组件
        newSelectedId = componentList[componentList.length - 1].fe_id;
      else {
        // 删除的组件是组件列表中指定位置的组件，因此选中原列表中被删除组件的下一个组件
        newSelectedId = componentList[index].fe_id;
      }

      draft.selectedId = newSelectedId;
    }),
    /**
     * 更新 components 状态的 componentList 中 fe_id = id 的组件的 isHidden 参数，从而控制其可见性
     */
    toggleSelectedComponentVisibility: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ id: string; isHidden: boolean }>) => {
        const { componentList } = draft;
        const { isHidden, id } = action.payload;
        let newSelectedId = '';

        const filteredComponentList = componentList.filter(component => !component.isHidden);

        const index = filteredComponentList.findIndex(component => component.fe_id === id);
        if (index === -1) return draft;

        // 隐藏指定 id 组件
        filteredComponentList[index].isHidden = isHidden;

        // 更新 isHidden 后，要选中的新的组件的 selectedId（注意要过滤被隐藏的数据数据）

        if (filteredComponentList.length <= 0) newSelectedId = '';
        else if (filteredComponentList.length === index)
          newSelectedId = filteredComponentList[filteredComponentList.length - 1].fe_id;
        else newSelectedId = filteredComponentList[index].fe_id;

        draft.selectedId = newSelectedId;
      }
    ),
  },
});

/* 导出 actions */
export const {
  reset,
  changeSelectedId,
  insertComponent,
  updateSelectedComponent,
  deleteSelectedComponent,
  toggleSelectedComponentVisibility,
} = componentsSlice.actions;

/* 导出 reducer */
export default componentsSlice.reducer;
