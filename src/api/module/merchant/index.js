/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-14 18:07:32
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;
let prefix1 = process.env.API_PREFIX_3;
// let url_prefix =  process.env.API_PREFIX_URL_PREFIX+"/login";

// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: { ...params } })

//商户列表
export const get_manage_merchant_list = (
  params,
  url = "/manage/merchant/list"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//用户投注管理查询(port:10711)]
export const post_order_user_queryUserBetList = (
  params,
  url = "/order/user/queryUserBetList"
) => axios.post(`${prefix1}${url}`, params);

//生成管理员密码
export const get_manage_merchant_getPassword = (
  params,
  url = "/manage/merchant/getPassword"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//查询key列表
export const get_manage_merchant_queryKeyList = (
  params,
  url = "/manage/merchant/queryKeyList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//生成KEY
export const get_manage_merchant_generateKey = (
  params,
  url = "/manage/merchant/generateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//设置管理员
export const post_manage_merchant_admin_create = (
  params,
  url = "/manage/merchant/admin/create"
) => axios.post(`${prefix}${url}`, params, { type: 1 });

//商户详情
export const get_manage_merchant_byid = (params, url = "/manage/merchant") =>
  axios.get(`${prefix}${url}/${params.id}`);

//修改商户
export const post_manage_merchant_update = (
  params,
  url = "/manage/merchant/update"
) => axios.post(`${prefix}${url}`, params);

//增加商户
export const post_manage_merchant_create = (
  params,
  url = "/manage/merchant/create"
) => axios.post(`${prefix}${url}`, params);

//修改管理员密码
export const post_manage_merchant_password_updates = (
  params,
  url = "/manage/merchant/password/update"
) => axios.post(`${prefix}${url}`, params, { type: 5 });

//修改商户状态
export const get_manage_merchant_updateMerchantStatus = (
  params,
  url = "/manage/merchant/updateMerchantStatus"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//修改KEY
export const get_manage_merchant_updateKey = (
  params,
  url = "/manage/merchant/updateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });
