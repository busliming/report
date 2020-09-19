/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 20:09:24
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_7;
let prefix1 = process.env.API_PREFIX_8;

//上传LOG图片
export const put_manage_merchant_img_upload = (
    params,
    url = "/bc/merchant/img/upload"
  ) => axios.post(`${prefix1}${url}`, params);


//上传附件//
export const post_manage_merchant_file_upload = (
  params,
  url = "/admin/merchant/file/upload"
) => axios.post(`${prefix}${url}`, params);


//附件下载//
export const get_manage_merchant_file_download = (
  params,
  url = "/admin/merchant/file/download"
) => axios.get(`${prefix}${url}`, { params: { ...params } });



//赛种列表//
export const get_merchant_sport_list = (
    params,
    url = "/merchant/sport/list"
  ) => axios.get(`${prefix}${url}`, { params: { ...params } });



















