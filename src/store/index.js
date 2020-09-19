/*
 * @Desc: 
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-14 15:58:22
 */
import Vue from "vue";
import Vuex from "vuex";

// style
import windowResize from "src/store/module/style/windowResize.js";

//userInfo
import userInfoStore from 'src/store/module/common/userInfoStore.js'

//token
import tokenStore from 'src/store/module/common/tokenStore.js'

//message 跑马灯跳转
import messageStore from 'src/store/module/marquee/messageStore.js'

//amount 红点是否显示
import amountStore from 'src/store/module/message/amountStore.js'

//data 信息中心 点击链接跳转详情
import dataStore from 'src/store/module/data/dataStore.js'

//home 从首页赛事跳转赛事详情页
import boolStore from 'src/store/module/data/boolStore.js'

Vue.use(Vuex);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      windowResize,
      userInfoStore,
      tokenStore,
      messageStore,
      dataStore,
      amountStore,
      boolStore
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store;
}
