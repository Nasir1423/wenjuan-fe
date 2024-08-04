/**
 * @description 提供三个 API，分别用于保存、获取和移除存储在 LocalStorage 中的用户数据
 */
const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

type UserInfoType = {
  username: string;
  password: string;
};

export const accessUser = (): UserInfoType => {
  return {
    username: localStorage.getItem(USERNAME_KEY) || '',
    password: localStorage.getItem(PASSWORD_KEY) || '',
  };
};

export const rememberUser = (userInfo: UserInfoType) => {
  localStorage.setItem(USERNAME_KEY, userInfo.username);
  localStorage.setItem(PASSWORD_KEY, userInfo.password);
};

export const forgetUser = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};
