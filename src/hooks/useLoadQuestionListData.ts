import { useRequest } from 'ahooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '@/service/question';
import { MANAGE_STAR_PATHNAME, MANAGE_TRASH_PATHNAME } from '@/router';

/**
 * @description 根据查询字符串，获取指定的问卷列表。注：随着查询字符串的变化，会持续获取到最新的问卷列表。
 * @return 即 useRequest 的返回值，可解构出 data、error、loading 等参数
 */
function useLoadQuestionListData() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  /* 页面加载和依赖更新时，useRequest 会执行获取问卷列表数据 */
  return useRequest(
    async () => {
      const keywords = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
      return await getQuestionListService({
        keywords,
        isDeleted: pathname === MANAGE_TRASH_PATHNAME,
        isStar: pathname === MANAGE_STAR_PATHNAME,
        page,
        pageSize,
      });
    },
    { refreshDeps: [searchParams] }
  );
}

export default useLoadQuestionListData;

export const LIST_PAGE_SIZE = 10;
export const LIST_SEARCH_PARAM_KEY = 'keyword';
export const LIST_PAGE_PARAM_KEY = 'page';
export const LIST_PAGE_SIZE_PARAM_KEY = 'pageSize';
