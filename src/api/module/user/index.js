/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:38
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-26 22:09:31
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_7;
let prefix1 = process.env.API_PREFIX_6;
//用户投注统计
export const query_userbetlist_byTime = (
  params,
  url = "/report/user/queryUserBetListByTime"
  ) => axios.post(`${prefix}${url}`, params );

//用户投注统计详情列表
export const query_userorderlist = (
  params,
  url = "/admin/order/queryUserOrderList"
  ) => axios.post(`${prefix}${url}`, params );


//商户注单统计接口
export const query_merchantlist = (params, url = "/report/merchant/merchantList") =>
  axios.post(`${prefix}${url}`, params);
  
//用户信息  10711
export const get_order_user_detail = (params, url = "/order/user/detail") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//注单中心统计接口
export const post_queryStatistics = (
  params,
  url = "/report/order/getStatistics"
) => axios.post(`${prefix}${url}`, params);

// 最近12个月的统计 10716
export const get_order_user_orderMonth = (params, url = "/report/user/orderMonth") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });

// 盈利率
export const get_order_user_profit = (params, url = "/report/user/profit") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });

// 某月的统计
export const get_order_user_orderMonth_days = (params, url = "/order/user/orderMonth/days") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });
