<!--
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 22:09:33
 -->
<template>
   <a-locale-provider :locale="locale">
    <div id="q-app"> 
      <router-view />
    </div>
   </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enGB from 'ant-design-vue/lib/locale-provider/en_GB';
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      locale: zhCN,
    }
  },
  computed: {
    is_zs(){
      return this.$q.sessionStorage.getItem('language') === 'zs'? true: false;
    }
  },
  created(){
    // alert(1)
    this.initUser();
    this.init_language();
    // console.log(this.locale,this.is_zs,'国际化')
    
  },
  methods: {
    ...mapActions(['set_user_info','set_token']),
    initUser(){
      let value = this.$q.sessionStorage.getItem('userInfo');
      let token = this.$q.sessionStorage.getItem('token');
      value && this.set_user_info(value);
      token && this.set_token(token);
    },
    init_language(){
      !this.$q.sessionStorage.getItem('language') && this.$q.sessionStorage.set('language','zs')
      this.locale=  this.is_zs? zhCN: enGB;
    }
  }
}
</script>
<style lang="stylus" scoped>
#q-app{
  width: 100%;
  height: 100%;
}
>>>.ant-table-thead > tr > th{
  color: #3C4551;
  font-weight: bold;
  background #fff;
}
>>>.ant-table-tbody > tr > td{
  color: #3C4551;
}
// >>>.ant-message{
//   z-index: 9999
// }
</style>
