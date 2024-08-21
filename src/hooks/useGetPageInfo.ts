import { useSelector } from 'react-redux';
import type { StateType } from '@/store';
import type { PageInfoStateType } from '@/store/pageInfo';

/**
 * @description 获取 Redux 中的 pageInfo 状态，包括 { title, desc, js, css }
 * @returns {PageInfoStateType} 页面信息状态对象
 */
export default function useGetPageInfo(): PageInfoStateType {
  const pageInfoState = useSelector<StateType>(state => state.pageInfo) as PageInfoStateType;
  return pageInfoState;
}
