<!--
 * @Desc: 
 * @Date: 2020-05-13 17:01:52
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-11 17:44:37
 -->
<template>
  <div>
    <Direct v-if="get_user_info.agentLevel === 0" />
    <Channel v-else-if="get_user_info.agentLevel === 1" />
    <Second v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 直营商户证书
const Direct = () => import(/* webpackChunkName: "account" */ 'src/pages/account/mykey/component/direct.vue')
// 渠道商户证书
const Channel = () => import(/* webpackChunkName: "account" */ 'src/pages/account/mykey/component/channel.vue')
// 二级商户证书
const Second = () => import(/* webpackChunkName: "account" */ 'src/pages/account/mykey/component/second.vue')
export default {
  components: {
    Direct,
    Channel,
    Second
  },
  computed: {
    ...mapGetters(['get_user_info'])
  }
}
</script>