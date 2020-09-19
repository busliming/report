<!--
 * @Desc: 
 * @Date: 2020-05-14 11:18:40
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-11 17:44:11
 -->
<template>
  <div>
    <Edit v-if="get_user_info.agentLevel === 0" />
    <ChannelEdit v-else-if="get_user_info.agentLevel === 1" />
    <SecondEdit v-else />
  </div>
</template>

<script>
// 直营商户编辑资料
const Edit = () => import(/* webpackChunkName: "account" */ 'src/pages/account/basic/component/edit.vue')
// 渠道商户编辑资料
const ChannelEdit = () => import(/* webpackChunkName: "account" */ 'src/pages/account/basic/component/channelEdit.vue')
// 二级商户编辑资料
const SecondEdit = () => import(/* webpackChunkName: "account" */ 'src/pages/account/basic/component/secondEdit.vue')
import { mapGetters } from 'vuex'
export default {
  components: {
    Edit,
    ChannelEdit,
    SecondEdit
  },
  computed: {
    ...mapGetters(['get_user_info'])
  }
}
</script>