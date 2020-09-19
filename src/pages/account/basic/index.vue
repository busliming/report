<!--
 * @Desc: 
 * @Date: 2020-05-13 16:58:41
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-20 22:09:53
--> 
<template>
  <div>
    <Look v-if="get_user_info.agentLevel === 0" />
    <ChannelLook v-else-if="get_user_info.agentLevel === 1" />
    <SecondLook v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 直营商户查看基本资料
const Look = () => import('src/pages/account/basic/component/look.vue')
// 渠道商户查看基本资料
const ChannelLook = () => import('src/pages/account/basic/component/channelLook.vue')
// 渠道商户查看基本资料
const SecondLook = () => import('src/pages/account/basic/component/secondLook.vue')
export default {
  components: {
    Look,
    ChannelLook,
    SecondLook
  },
  computed: {
    ...mapGetters(['get_user_info'])
  }
}
</script>