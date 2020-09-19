/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24
 * @Description: 处理各个环境的log显示
 * @FilePath: /panda-bc数据源相关报表系统/src/mixins/common/logomixin.js
 */

import local_dev from 'src/assets/logo/local_dev.svg'
import local_dev_en from 'src/assets/logo/local_dev_en.svg'
import local_test from 'src/assets/logo/local_test.svg'
import local_test_en from 'src/assets/logo/local_test_en.svg'
import idc_pre from 'src/assets/logo/idc_pre.svg'
import idc_pre_en from 'src/assets/logo/idc_pre_en.svg'
import idc_lspre from 'src/assets/logo/idc_lspre.svg'
import idc_lspre_en from 'src/assets/logo/idc_lspre_en.svg'
import idc_online from 'src/assets/logo/idc_online.svg'
import idc_online_en from 'src/assets/logo/idc_online_en.svg'
import online from 'src/assets/logo/online.svg'
export default {
  data() {
    return {
      logo: online
    }
  },
  computed: {
    is_zs(){
      return this.$q.sessionStorage.getItem('language') === 'zs'? true: false;
    }
  },
  methods: {
    /**
     * @description 根据不同环境的变量显示代表不同环境标识的logo
     * @return {undefined} undefined
     */
    initLogo() {
      switch (process.env.FRONT_WEB_ENV) {
        case 'local_dev':
          this.logo = this.is_zs? local_dev: local_dev_en;
          break;
        case 'local_test':
          this.logo = this.is_zs? local_test: local_test_en;
          break;
        case 'idc_pre':
          this.logo = this.is_zs? idc_pre: idc_lspre_en;
          break;
        case 'idc_lspre':
          this.logo = this.is_zs? idc_lspre: idc_lspre_en;
          break;
        case 'idc_online':
          this.logo = this.is_zs? idc_online: idc_online_en;
          break;
        default:
          this.logo = online;
          break;
      }
    }
  },
}