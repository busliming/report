import axios from 'src/api/common/axioswarpper.js'
console.log( " -------------process.env.----------------------");
console.log(process.env);

// let prefix = process.env.DEV?process.env.API_PREFIX_FILE_REAL:`${location.host}/${process.env.API_PREFIX_FILE}`
let prefix = process.env.DEV?process.env.API_PREFIX_FILE_REAL:`/${process.env.API_PREFIX_FILE}`
export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: { ...params } })

export const get_fastdfs_download_file = (params, url = "/fastdfs/download/file") => axios.get(`${prefix}${url}`, { params: { ...params } })
export const get_fastdfs_download_image = (params, url = "/fastdfs/download/image") => axios.get(`${prefix}${url}`, { params: { ...params } })
export const get_fastdfs_get_token = (params, url = "/fastdfs/get/token") => axios.get(`${prefix}${url}`, { params: { ...params } })
export const post_fastdfs_upload_file = (params, url = "/fastdfs/upload/file") => axios.post(`${prefix}${url}`, params,{type:3})