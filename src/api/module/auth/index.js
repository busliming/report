/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: \panda-bc数据源相关报表系统\src\api\module\auth\index.js
 */

import axios from "src/api/common/axioswarpper.js";

const BASE = process.env.API_PREFIX_8;

// 用户列表
export const post_admin_user_list = (
    params,
    url = "/bc/user/list"
) => axios.post(`${BASE}${url}`, params, { type: 1 });

// 角色所有
export const post_admin_role_getAll = (
    params,
    url = "/bc/role/getAll"
) => axios.post(`${BASE}${url}`, params, { type: 1 });

// 用户添加
export const post_admin_user_add = (
    params,
    url = "/bc/user/add"
) => axios.post(`${BASE}${url}`, params);

// 修改用户
export const post_admin_user_editPost = (
    params,
    url = "/bc/user/editPost"
) => axios.post(`${BASE}${url}`, params);

// 删除用户
export const post_admin_user_delete = (
    params,
    url = "/bc/user/delete"
) => axios.post(`${BASE}${url}`, params, { type: 1 });



//----------  角色管理模块  -----------//
// 用户列表
export const post_admin_role_list = (
    params,
    url = "/admin/role/list"
) => axios.post(`${BASE}${url}`, params, { type: 1 });


// 菜单所有
export const post_admin_menu_getAll = (
    params,
    url = "/admin/menu/getAll"
) => axios.post(`${BASE}${url}`, params, { type: 1 });

// 角色所拥有的菜单
export const post_admin_menu_getMenuByRoleId = (
    params,
    url = "/admin/role/getMenuByRoleId"
) => axios.post(`${BASE}${url}`, params, { type: 1 });


// 角色分配菜单
export const post_admin_role_addRoleMenu = (
    params,
    url = "/admin/role/addRoleMenu"
) => axios.post(`${BASE}${url}`, params);


// 创建角色
export const post_admin_role_add = (
    params,
    url = "/admin/role/add"
) => axios.post(`${BASE}${url}`, params);

// 修改角色
export const post_admin_role_editPost = (
    params,
    url = "/admin/role/editPost"
) => axios.post(`${BASE}${url}`, params);

// 删除角色
export const post_admin_role_delete = (
    params,
    url = "/admin/role/delete"
) => axios.post(`${BASE}${url}`, params,  { type: 1 });


// 权限根据菜单获取权限列表
export const post_admin_menu_getPermissionByMenuIds = (
    params,
    url = "/admin/menu/getPermissionByMenuIds"
) => axios.post(`${BASE}${url}`, params, { type: 1 });


// 获取所有权限列表
export const post_admin_permission_getAll = (
    params,
    url = "/admin/permission/getAll"
) => axios.post(`${BASE}${url}`, params, { type: 1 });
