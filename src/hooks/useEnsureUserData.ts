import { getUserInfoService } from '@/service/user';
import { loginReducer, UserStateType } from '@/store/user';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useGetUserInfo from './useGetUserInfo';
import { getToken } from '@/utils/userTokenStorage';

/**
 * @description 确保 Redux 中已存储用户信息，否则尝试获取用户信息。
 */
export default function useEnsureUserData() {
  const dispatch = useDispatch();
  const { run: loadUserData, loading: isUserDataLoading } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      dispatch(loginReducer(res as UserStateType));
    },
  });
  const { username } = useGetUserInfo(); // 从 Redux 中获取用户信息，根据是否存在决定是否请求用户数据
  useEffect(() => {
    if (!getToken()) return;
    if (!username) {
      loadUserData();
    }
  }, [loadUserData, username]);
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
