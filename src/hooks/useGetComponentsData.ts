import { ComponentType } from '@/components/QuestionComponents';
import { StateType } from '@/store';
import { ComponentsStateType } from '@/store/components';
import { useSelector } from 'react-redux';

type ResType = {
  selectedId: string;
  componentList: ComponentType[];
  selectedComponent: ComponentType | undefined;
  copiedComponent: ComponentType | null;
  pastLength: number;
  futureLength: number;
};

/**
 * @description 获取 Redux 中的 components 状态及衍生数据，包括 { componentList, selectedId, selectedComponent }
 * @returns {ComponentsStateType} 当前问卷的所有组件信息构成的数组
 */
export default function useGetComponentsData(): ResType {
  const {
    componentList,
    selectedId,
    copiedComponent = null,
  } = useSelector<StateType>(state => state.components.present) as ComponentsStateType;
  const pastLength = useSelector<StateType>(state => state.components.past.length) as number;
  const futureLength = useSelector<StateType>(state => state.components.future.length) as number;
  const selectedComponent = componentList.find(component => component.fe_id === selectedId);
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
    pastLength,
    futureLength,
  };
}
