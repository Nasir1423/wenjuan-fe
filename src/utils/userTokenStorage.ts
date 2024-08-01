/**
 * @description 提供三个 API，分别用于保存、获取和移除存储在 LocalStorage 中的 Token
 */
const TOKEN_KEY = 'TOKEN';

export const getToken = (): string => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
