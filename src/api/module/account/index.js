/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-24 17:25:19
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_7;

//生成管理员密码
export const get_admin_merchant_getPassword = (
  params,
  url = "/admin/merchant/getPassword"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//设置管理员
export const get_admin_merchant_createAdmin = (
  params,
  url = "/admin/merchant/createAdmin"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//修改管理员密码
export const get_admin_merchant_updateAdminPassword = (
  params,
  url = "/admin/merchant/updateAdminPassword"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//查询二级商户列表  
export const get_admin_merchant_merchantList = (
  params,
  url = "/admin/merchant/merchantList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//查询商户详情       基本资料管理
export const get_admin_merchant_getDetail = (
  params,
  url = "/admin/merchant/getDetail"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


//修改商户  基本资料管理
export const post_admin_merchant_update = (
  params,
  url = "/admin/merchant/update"
) => axios.post(`${prefix}${url}`, params);


//二级商户管理 新增二级商户
export const post_admin_merchant_create = (
  params,
  url = "/admin/merchant/create"
) => axios.post(`${prefix}${url}`, params);

//二级商户管理 修改商户状态
export const get_admin_merchant_updateMerchantStatus = (
  params,
  url = "/admin/merchant/updateMerchantStatus"
) => axios.get(`${prefix}${url}`, { params: { ...params } });



// 我的证书
// 获取key信息
export const get_admin_merchant_getKey = (
  params,
  url = "/admin/merchant/getKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


// 生成key
export const get_admin_merchant_generateKey = (
  params,
  url = "/admin/merchant/generateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

// 更新key
export const get_admin_merchant_updateKey = (
  params,
  url = "/admin/merchant/updateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


// 子证书信息列表
export const get_admin_merchant_queryKeyList = (
  params,
  url = "/admin/merchant/queryKeyList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


// 用户投注管理
export const post_admin_userRepor_queryAllUserStatisticList = (
  params,
  url = "/admin/userReport/queryAllUserStatisticList"
) => axios.post(`${prefix}${url}`, params);


// 用户投注管理-投注详情- 账变明显
export const post_admin_userReport_queryUserTransferList = (
  params,
  url = "/admin/userReport/queryUserTransferList"
) => axios.post(`${prefix}${url}`, params);