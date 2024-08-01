import instance, { ResDataType } from './ajax';

export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info';
  return await instance.get(url);
}

export async function registerUserService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/api/user/register';
  return await instance.post(url, { username, password, nickname });
}

export async function loginUserService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login';
  return await instance.post(url, { username, password });
}
