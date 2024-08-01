/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { message } from 'antd';
import { getToken } from '@/utils/userTokenStorage';

const instance = axios.create({
  timeout: 1000 * 10, // 指定请求超时的毫秒数（10000 毫秒，即 10 秒）
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers['Authorization'] = `Bearer ${getToken()}`; // JWT 固定格式
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 该函数会在 HTTP 响应状态码在 2xx 范围内时被触发
    // 对响应数据进行处理
    const resData: ResType = response.data || {};
    const { errno, data, msg = '来自于 axios 响应拦截器的未知错误' } = resData;

    /* 表示相应的操作失败 */
    if (errno !== 0) {
      message.error(msg); // 显示错误消息
      throw new Error(msg); // 抛出错误，阻止后续操作
    }
    return data as any; // 返回响应数据的 data 部分
  },
  function (error) {
    // 该函数会在 HTTP 响应状态码超出 2xx 范围时被触发
    // 对响应错误进行处理
    return Promise.reject(error); // 返回一个被拒绝的 Promise，并传递错误信息
  }
);

// 定义响应数据的类型
export type ResType = {
  errno: number; // 错误码，0 表示成功，非 0 表示失败
  data?: ResDataType; // 可选的数据字段，包含实际响应的数据
  msg?: string; // 可选的消息字段，包含错误或提示信息
};

// 定义实际响应数据的类型
export type ResDataType = {
  [key: string]: any; // 任意数量的字符串属性
};

export default instance;
