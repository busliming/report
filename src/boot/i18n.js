/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: \panda-bc数据源相关报表系统\src\boot\i18n.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { SessionStorage } from 'quasar'

Vue.use(VueI18n)

let get_language = SessionStorage.getItem('language');

const i18n = new VueI18n({
  locale: get_language || 'zs',
  fallbackLocale: get_language || 'zs',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }

