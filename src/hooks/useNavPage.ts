import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import { useEffect } from 'react';
import { HOME_PATHNAME, LOGIN_PATHNAME, MANAGE_LIST_PATHNAME, REGISTER_PATHNAME } from '@/router';

/**
 * 自定义 Hook 用于根据用户的认证状态处理页面导航。
 *
 * @description
 * 此 Hook 使用用户的认证状态和当前 URL 路径名来确定是否需要将用户重定向到其他页面。
 * 如果用户的数据仍在加载中，则不执行任何操作。数据加载完毕后：
 * - 如果用户已认证，且当前处于登录或注册页面，则重定向到管理列表页面。
 * - 如果用户未认证，且不在登录、注册或主页页面，则重定向到登录页面。
 *
 * @param {boolean} isUserDataLoading - 表示用户数据是否仍在加载中。
 * @returns {void}
 */
export default function useNavPage(isUserDataLoading: boolean): void {
  const { username } = useGetUserInfo(); // Hook 获取当前用户信息
  const { pathname } = useLocation(); // Hook 获取当前 URL 路径名
  const nav = useNavigate(); // Hook 用于编程式导航到不同页面

  useEffect(() => {
    if (isUserDataLoading) return; // 如果用户数据仍在加载中，则不执行任何操作

    if (username) {
      // 如果用户已认证且当前处于登录或注册页面，则重定向到管理列表页面
      if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) nav(MANAGE_LIST_PATHNAME);
    } else {
      // 如果用户未认证且不在登录、注册或主页页面，则重定向到登录页面
      if (![LOGIN_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME].includes(pathname))
        nav(LOGIN_PATHNAME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserDataLoading, username, pathname]);
}
