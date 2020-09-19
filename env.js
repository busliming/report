/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-31 17:44:27
 */
let current_env = "local_local";

/**
 * 个人 连 后台人员电脑 开发 联调时  使用 local-local 环境
 *  修改这个文件
 * ./zenv/module/local-local.js
 * 此文件 不上传 ，大家就不会冲突
 * 其他配置文件不用动
 *
 * 其他环境 修复线上BUG 一键切换 用 ，平时开发情况下也用不到
 *
 * 切换环境需要 在 终端 ctrl + c 结束 当前项目  再  quasar  dev  运行 一遍
 * 原因： 对象是引用类型地址没变，框架 并没有深度监听引入对象的变化。
 *
 *
 * 修改人: @jinnian
 * 注释时间: 2019-11-22 17:48:40
 */

//  个人   开发环境
 current_env= 'local_local'
// 局域网  开发环境
//  current_env= 'local_dev'
// 局域网  测试环境
// current_env = "local_test";
// 局域网  预发布环境
//  current_env= 'local_pre'
// 阿里云  开发环境
//  current_env= 'remote_dev'
// 阿里云  测试环境
// current_env = "remote_test";
// 阿里云  预发布
//  current_env= 'remote_pre'

module.exports = current_env;
