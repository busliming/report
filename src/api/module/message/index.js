/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-28 11:11:30
 */
import axios from "src/api/common/axioswarpper.js";

let prefix1 = process.env.API_PREFIX_7;


//跑马灯消息
export const post_admin_noticeNew_getLightNews = (params={}, url = "/admin/noticeNew/getLightNews") =>
  axios.post(`${prefix1}${url}`, params, {type: 1});

//公告栏列表
export const post_admin_noticeNew_notice = (params, url = "/admin/noticeNew/notice") =>
  axios.post(`${prefix1}${url}`, params, {type: 1});

//公告栏详情
export const post_admin_noticeNew_noticeDetail = (params, url = "/admin/noticeNew/noticeDetail") =>
  axios.post(`${prefix1}${url}`, params, {type: 1});

//我的消息列表
export const post_admin_noticeNew_news = (params, url = "/admin/noticeNew/news") =>
  axios.post(`${prefix1}${url}`, params, {type: 1});


//我的消息列表详情查看
export const post_admin_noticeNew_newsDetail = (params, url = "/admin/noticeNew/newsDetail") =>
  axios.post(`${prefix1}${url}`, params, {type: 1});


//公告类型
export const post_admin_noticeNew_noticeType = (params, url = "/admin/noticeNew/noticeType") =>
  axios.post(`${prefix1}${url}`, params);