import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里添加用户 token
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage 中
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 提取数据
    const { data } = response;
    return data;
  },
  (error) => {
    // 处理响应错误
    console.error('响应错误:', error);
    if (error.response) {
      // 服务器返回了错误状态码
      const { status } = error.response;
      switch (status) {
        case 401:
          // 处理未授权错误，例如跳转到登录页面
          console.log('未授权，请重新登录');
          break;
        case 404:
          console.log('请求的资源不存在');
          break;
        case 500:
          console.log('服务器内部错误');
          break;
        default:
          console.log(`请求失败，状态码: ${status}`);
      }
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      console.log('没有收到服务器响应');
    } else {
      // 在设置请求时发生错误
      console.log('请求设置出错:', error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
