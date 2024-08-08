import { StateType } from '@/store';
import { ComponentsStateType } from '@/store/components';
import { useSelector } from 'react-redux';

/**
 * @description 获取 Redux 中的 components 状态，包括 { componentList }
 * @returns {ComponentsStateType} 当前问卷的所有组件信息构成的数组
 */
export default function useGetComponentsData(): ComponentsStateType {
  const componnetsState = useSelector<StateType>(state => state.components) as ComponentsStateType;
  return componnetsState;
}
