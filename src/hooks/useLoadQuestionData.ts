import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '@/service/question';
/**
 * @description 获取指定 id 的问卷信息
 * @returns 即 useRequest 的返回值，可解构出 data、error、loading 等参数
 */
function useLoadQuestionData() {
  const { id = '' } = useParams();

  return useRequest(async () => {
    return await getQuestionService(id);
  });
}

export default useLoadQuestionData;
