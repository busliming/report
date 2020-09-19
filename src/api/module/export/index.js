/*
 * @Desc:
 * @Date: 2020-02-08 20:48:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 15:19:28
 */
import axios from "src/api/common/axioswarpper.js";

let prefix1 = axios.prototype.HTTP_ROOT_DOMAIN + '/'+ process.env.API_PREFIX_8
let prefix3 = axios.prototype.HTTP_ROOT_DOMAIN + '/'+ process.env.API_PREFIX_4
export const post_excel_export = (params, which) => {
  console.log(
    "=====================================ALAIR============================================"
  );
  console.log(params,which);
  console.log(process.env);
  let prefix = "";
  if (!which) {
    prefix = prefix3;
  } else if (which) {
    prefix = prefix1;
  }

  let urlp = `${prefix}${params.url}?`;
  let keys = Object.keys(params);
  keys.map(x => {
    if (x != "url") {
      if (params[x]) {
        urlp += `${x}=${params[x]}&`;
      }
      if (params[x] === 0) {
        urlp += `${x}=${params[x]}&`;
      }
    }
  });
  urlp = urlp.substring(0, urlp.length - 1);
  console.log(keys);
  console.log(urlp);
  console.log(
    "=====================================ALAIR============================================"
  );
  // return false
  console.log(urlp)
  window.open(urlp, "_self");
  // window.open('http://172.18.178.165:10711/report/merchantFileExport?pageNum=1&pageSize=50&dateType=day&filter=1', "_self");
};
