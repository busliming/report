/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-14 14:33:53
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_7;
let prefix1 = process.env.API_PREFIX_7;


//商户分布信息//
export const get_manage_merchant_queryAgentCount = (
  params,
  url = "/manage/merchant/queryAgentCount"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


//本月二级商户投注金额增速排行
export const post_admin_merchantReport_amountGrowthRateTop10 = (
  params,
  url = "/admin/merchantReport/amountGrowthRateTop10"
) => axios.post(`${prefix}${url}`, params );


//本月入驻商户信息
export const get_admin_merchant_queryCurrentMonthMerchantList = (
  params,
  url = "/admin/merchant/queryCurrentMonthMerchantList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });
  
// 商户投注前10
export const get_admin_merchantReport_amountGrowthRateTop10 = (
  params,
  url = "/admin/merchantReport/amountGrowthRateTop10"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

// 用户投注前10
export const get_admin_userReport_queryPlayerTop10 = (
  params,
  url = "/admin/userReport/queryPlayerTop10"
) => axios.get(`${prefix}${url}`, { params: { ...params } });



//今日投注信息// 716
export const post_report_home_queryBetToday = (
  params,
  url = "/admin/home/queryBetToday"
) => axios.post(`${prefix1}${url}`, params, {type: 1});

//今日用户信息// 716
export const post_report_home_queryUserToday = (
  params,
  url = "/admin/home/queryUserToday"
) => axios.post(`${prefix1}${url}`, params, {type: 1});

//今日投注金额 TOP10赛事// 716
export const post_report_home_matchTop10 = (
  params,
  url = "/admin/home/matchTop10"
) => axios.post(`${prefix1}${url}`, params, {type: 1});


//本月商户投注金额排行// 716
export const post_report_home_merchantOrderTop10 = (
  params,
  url = "/admin/merchantReport/merchantOrderTop10"
) => axios.post(`${prefix1}${url}`, params, {type: 1});

//14天投注金额趋势// 716
export const post_report_home_userOrderDay14 = (
  params,
  url = "/admin/home/userOrderDay14"
) => axios.post(`${prefix1}${url}`, params, {type: 1});

//14天投注用户趋势// 716
export const post_report_home_userDay14 = (
  params,
  url = "/admin/home/userDay14"
) => axios.post(`${prefix1}${url}`, params, {type: 1});


// 公告信息
export const post_admin_noticeNew_getHomeNews = (
  params,
  url = "/admin/noticeNew/getHomeNews"
) => axios.post(`${prefix1}${url}`, params, {type: 1});


// 后台用户自己修改密码
export const post_admin_user_editPwd = (
  params,
  url = "/admin/user/editPwd"
) => axios.post(`${prefix1}${url}`, params);





















