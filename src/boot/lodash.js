/*
 * @Desc: 
 * @Date: 2020-05-13 16:33:09
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-13 15:42:17
 */ 
// import something here
// import lodash from 'lodash';
const lodash = require('src/statics/js/lodash.min.js')

// leave the export, even if you don't use it
export default async  ({ Vue }) => {
    // app, router, store,
    // something to do
    Vue.prototype.$lodash = lodash;
    // router.beforeEach((to, from, next) => {
    //   //现在您需要在这里添加验证逻辑，比如调用一个API
    // })
}