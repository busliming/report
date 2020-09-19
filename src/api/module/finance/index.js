/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Rank
 * @LastEditTime: 2020-07-07 11:53:38
 */
import axios from "src/api/common/axioswarpper.js";

let prefix1 = process.env.API_PREFIX_7;

//财务-清算管理列表// 716
export const post_report_financeMonth_queryFinanceMonthList = (
  params,
  url = "/admin/financeMonth/queryFinanceMonthList"
) => axios.post(`${prefix1}${url}`, params);

//财务-清算管理-电子账单// 716
export const post_report_financeMonth_queryFinanceMonthDetail = (
  params,
  url = "/admin/financeMonth/queryFinanceMonthDetail"
) => axios.post(`${prefix1}${url}`, params, {type: 5});

//财务-清算管理-费率修改记录// 716
export const post_report_financeMonth_getFinanceOperateRecordList = (
  params,
  url = "/admin/financeMonth/getFinanceOperateRecordList"
) => axios.post(`${prefix1}${url}`, params,{type: 1});

//财务-清算管理-电子账单-update// 716
export const post_report_financeMonth_updateFinanceMonthDetail = (
  params,
  url = "/admin/financeMonth/updateFinanceMonthDetail"
) => axios.post(`${prefix1}${url}`, params);

//财务-日对账单// 716
export const post_report_financeMonth_queryFinanceDay = (
  params,
  url = "/admin/financeMonth/queryFinanceDay"
) => axios.post(`${prefix1}${url}`, params);

// 财务-日对账单-总计 // 713
export const post_report_financeMonth_queryFinanceDayTotal = (
  params,
  url = "/admin/financeMonth/queryFinanceDayTotal"
) => axios.post(`${prefix1}${url}`, params);

//财务-清算管理二级-总计 716
export const post_report_financeMonth_queryFinanceMonthCount = (
  params,
  url = "/admin/financeMonth/queryFinanceMonthCount"
) => axios.post(`${prefix1}${url}`, params);


















