import { ComponentType } from '@/components/QuestionComponents';
import { StateType } from '@/store';
import { ComponentsStateType } from '@/store/components';
import { useSelector } from 'react-redux';

type ResType = {
  selectedId: string;
  componentList: ComponentType[];
  selectedComponent: ComponentType | undefined;
};

/**
 * @description 获取 Redux 中的 components 状态及衍生数据，包括 { componentList, selectedId, selectedComponent }
 * @returns {ComponentsStateType} 当前问卷的所有组件信息构成的数组
 */
export default function useGetComponentsData(): ResType {
  const { componentList, selectedId } = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType;
  const selectedComponent = componentList.find(component => component.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent };
}
