import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '@/service/question';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '@/store/components';
/**
 * @description 获取指定 id 的问卷信息
 * @returns 即 useRequest 的返回值，可解构出 data、error、loading 等参数
 */
function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const {
    data,
    loading,
    run: loadData,
  } = useRequest(
    async () => {
      if (!id) throw new Error('不存在用户 id');
      return await getQuestionService(id);
    },
    { manual: true }
  );

  // 只要 id 变化，就要重新加载数据
  useEffect(() => {
    loadData();
  }, [id, loadData]);

  // 只要 data 变化，就将数据保存在 Redux Store 中
  useEffect(() => {
    if (!data) return;
    const { componentList = [] } = data;
    let selectedId = '';
    componentList.length > 0 && (selectedId = componentList[0].fe_id); // 设置默认选中第一个组件
    dispatch(reset({ componentList, selectedId }));
  }, [data, dispatch]);

  return { loading };
}

export default useLoadQuestionData;
