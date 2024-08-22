import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  selectAdjacentComponent,
} from '@/store/components';
import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';

/**
 * @description 画布页面的快捷键操作绑定
 */
function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // backspace | delete 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    isActionPermitted() && dispatch(deleteSelectedComponent());
  });
  // ctrl + c 复制组件（meta + c 是 macos 复制快捷键）
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    isActionPermitted() && dispatch(copySelectedComponent());
  });
  // ctrl + v 粘贴组件（meta + v 是 macos 粘贴快捷键）
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    isActionPermitted() && dispatch(pasteCopiedComponent());
  });
  // uparrow 选中上一个组件
  useKeyPress(['uparrow'], () => {
    isActionPermitted() && dispatch(selectAdjacentComponent({ direction: 'up' }));
  });
  // downarrow 选中下一个组件
  useKeyPress(['downarrow'], () => {
    isActionPermitted() && dispatch(selectAdjacentComponent({ direction: 'down' }));
  });
  // 撤销
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    isActionPermitted() && dispatch(ActionCreators.undo());
  });
  // 重做
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    isActionPermitted() && dispatch(ActionCreators.redo());
  });
}

/**
 * @description 辅助函数，用于确认当前位置是否允许快捷操作 ==> 焦点不在可编辑的元素上
 */
function isActionPermitted(): boolean {
  const activeElem = document.activeElement;
  if (!activeElem) return true; // activeElem === null 时，允许快捷操作
  return !(
    activeElem.tagName === 'INPUT' ||
    activeElem.tagName === 'TEXTAREA' ||
    (activeElem as HTMLElement).isContentEditable
  );
}

export default useBindCanvasKeyPress;
