import axios from 'axios';
import { getUserInfotype } from '../hooks/useUserInfo';

const getUserInfo = (type: getUserInfotype) => {
    let data = localStorage.getItem(type)
    if (data) {
        return JSON.parse(data)
    }
}

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_PATH, // 替换为你的API基础URL
    // baseURL: "http://localhost:3001",
    headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': "multipart/form-data",
        // 'Authorization': `Bearer ${token}`
        // 其他需要的头部信息
    }
});

// 请求拦截器
// apiClient.interceptors.request.use(config => {
//     // 从localStorage或者sessionStorage中获取token
//     const token = getUserInfo('token')

//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// 封装GET请求
export const get = async (url: string, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
};

// 封装POST请求
export const post = async (url: string, data: unknown, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
};

// 封装del请求
export const del = async (url: string, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
};

// 封装PATCH请求
export const patch = async (url: string, data: unknown, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
};