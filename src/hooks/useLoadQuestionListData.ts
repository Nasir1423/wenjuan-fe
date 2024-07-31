import { useRequest } from 'ahooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '@/service/question';

/**
 * @description 根据 URL 的 keyword 参数，获取指定的问卷列表
 * @retutn 即 useRequest 的返回值，可解构出 data、error、loading 等参数
 */
function useLoadQuestionListData() {
  const [searchParams] = useSearchParams();
  const pageType = getPageType(useLocation().pathname);

  /* 页面加载和依赖更新时，useRequest 会执行获取问卷列表数据 */
  return useRequest(
    async () => {
      const keywords = searchParams.get('keywords') || '';
      return await getQuestionListService({
        keywords,
        isStar: pageType === 'star',
        isDeleted: pageType === 'trash',
      });
    },
    { refreshDeps: [searchParams] }
  );
}

export default useLoadQuestionListData;

function getPageType(pathname: string): 'normal' | 'star' | 'trash' | '' {
  if (pathname.endsWith('list')) return 'normal';
  else if (pathname.endsWith('star')) return 'star';
  else if (pathname.endsWith('trash')) return 'trash';
  else return '';
}
