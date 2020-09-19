/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: \panda-bc数据源相关报表系统\src\api\module\data\index.js
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_7;
let prefix1 = process.env.API_PREFIX_8;
// let prefix1 = process.env.API_PREFIX_6;

// 体种查询
export const get_bc_order_getSportList = (params, url = "/bc/order/getSportList") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });

//用户投注统计
export const query_userbetlist_byTime = (
  params,
  url = "/admin/userReport/queryUserBetListByTime"
  ) => axios.post(`${prefix}${url}`, params );

//注单查询统计接口
export const post_bc_order_getStatistics = (
  params,
  url = "/bc/order/getStatistics"
) => axios.post(`${prefix1}${url}`, params);

//赛事报表统计接口
export const post_bc_order_getMatchStatistics = (
  params,
  url = "/bc/match/getMatchStatistics"
) => axios.post(`${prefix1}${url}`, params);

//注单投注统计
export const query_userorderlist = (
  params,
  // url = "/admin/userReport/queryUserOrderList"
  url = "/admin/userReport/queryTicketList"
  ) => axios.post(`${prefix}${url}`, params );

//注单查询 -- 注单查询
export const post_bc_order_queryTicketList = (
  params,
  // url = "/admin/userReport/queryUserOrderList"
  url = "/bc/order/queryTicketList"
  ) => axios.post(`${prefix1}${url}`, params );


//商户注单统计接口
export const query_merchantlist = (params, url = "/admin/merchantReport/merchantList") =>
  axios.post(`${prefix}${url}`, params);
  
//用户投注统计信息--投注用户管理详情
export const get_admin_userReport_getUserInfo = (params, url = "/admin/userReport/getUserInfo") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//用户信息  10711
export const get_order_user_detail = (params, url = "/order/user/detail") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });


//赛事投注统计
export const post_admin_match_queryMatchStatisticList = (params, url = "/admin/match/queryMatchStatisticList") =>
  axios.post(`${prefix}${url}`, params);

//赛事投注统计
export const post_bc_match_queryPlayStatisticList = (params, url = "/bc/match/queryMatchStatisticList") =>
  axios.post(`${prefix1}${url}`, params);

//投注用户管理 用户详情
export const get_admin_player_getPlayerOrderDetail = (params, url = "/admin/player/getPlayerOrderDetail") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//投注用户管理 用户详情 盈利率
export const get_admin_player_profit = (params, url = "/admin/player/profit") =>
axios.get(`${prefix}${url}`, { params: { ...params } });

//投注用户管理 最近12个月的统计
export const get_admin_player_orderMonth = (params, url = "/admin/player/orderMonth") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//投注用户管理 某月的统计
export const get_admin_player_orderMonthDays = (params, url = "/admin/player/orderMonthDays") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//玩法列表
export const post_admin_userReport_queryHotPlayName = (params, url = "/admin/userReport/queryHotPlayName") =>
  axios.post(`${prefix}${url}`, params);


// 商户联想
export const post_admin_merchantReport_queryMerchantList = (params, url = "/admin/merchantReport/queryMerchantList") =>
  axios.post(`${prefix}${url}`, params);




//用户投注管理查询(port:10711)]
export const post_order_user_queryUserBetList = (
  params,
  url = "/order/user/queryUserBetList"
) => axios.post(`${prefix}${url}`, params);

