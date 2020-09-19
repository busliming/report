/*
 * @Desc: 
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-10 11:09:04
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_8;

// 登录
export const post_bc_auth_login = (
    params,
    url = "/bc/auth/login"
) => axios.post(`${prefix}${url}`, params);


// 退出
export const getLogout = (
    params,
    url = "/logout"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });


// 修改密码
export const postChangePwd = (
    params,
    url = "/updatePassword"
) => axios.post(`${prefix}${url_prefix}${url}`, params);

// 修改密码
export const postSetPwd = (
    params,
    url = "/setPassword"
) => axios.post(`${prefix}${url_prefix}${url}`, params);


// 账号码有效校验
export const postValidCode = (
    params,
    url = "/validCode"
) => axios.post(`${prefix}${url_prefix}${url}`, params);

// 有效校验码
export const sendCode = (
    params,
    url = "/email/sendCode"
) => axios.post(`${prefix}${url_prefix1}${url}`, params);

// 子后台进行切换
export const getSetApp = (
    params,
    url = "/setApp"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });