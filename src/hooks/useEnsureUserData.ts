import { getUserInfoService } from '@/service/user';
import { loginReducer, UserStateType } from '@/store/user';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useGetUserInfo from './useGetUserInfo';
import { getToken } from '@/utils/userTokenStorage';

/**
 * @description 确保 Redux 中已存储用户信息，否则尝试获取用户信息。
 */
export default function useEnsureUserData() {
  const dispatch = useDispatch();
  const { run: loadUserData, loading: isRequestLoading } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      dispatch(loginReducer(res as UserStateType));
    },
  });

  const { username } = useGetUserInfo();
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setIsUserDataLoading(false); // 没有 token 时直接设置为不加载
      return;
    }

    if (!username) {
      loadUserData();
    } else {
      setIsUserDataLoading(false); // 已有用户信息时不加载
    }
  }, [loadUserData, username]);

  useEffect(() => {
    if (!isRequestLoading && username) {
      setIsUserDataLoading(false); // 请求完成后更新加载状态
    }
  }, [isRequestLoading, username]);

  return isUserDataLoading;
}

/* 
  注：关于 useEnsureUserData 和 useGetUserInfo 的使用时机
  1. useEnsureUserData 用于确保 Redux 中已经存在用户数据，或在没有时完成用户数据的请求。
  2. useGetUserInfo 用于从 Redux 中获取用户数据。
  3. 使用场景：
    - useEnsureUserData 在页面加载时执行，可以在顶级的 Layout 组件中执行（例如 MainLayout、QuestionLayout），确保用户数据已被请求。
    - useGetUserInfo 在需要使用用户信息的组件中执行，例如 UserInfo 组件等。
*/
