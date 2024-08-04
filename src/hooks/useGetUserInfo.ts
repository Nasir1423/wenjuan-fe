import { useSelector } from 'react-redux';
import { StateType } from '@/store';
import { UserStateType } from '@/store/user';

/**
 * @description 获取 Redux 中 user 状态，包括 { username, password }
 * @returns {UserStateType} 用户状态对象
 */
export default function useGetUserInfo(): UserStateType {
  const userState = useSelector<StateType>(state => state.user) as UserStateType;
  return userState;
}
