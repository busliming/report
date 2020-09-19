<!--
 * @Desc: 
 * @Date: 2020-08-11 15:17:24
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-11 17:18:37
-->
<template>
  <div
    style="width: 627px ; height:auto;max-width:627px;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600" >{{isUpdate? '编辑二级商户': '新建二级商户'}}</div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="col-12 bg-panda-bg-6 radius-4 pl20x pr20x"  style="min-height: 700px;">
      <!-- tab选项卡 -->
        <div class="row text-panda-text-dark">
          <a-tabs v-model="activeKey" class="col-12">
            <a-tab-pane key="1" tab="基本信息">
              <user-info-add v-if="!isUpdate" @close='handleColse'></user-info-add>
              <user-info-update v-else @close='handleColse' :id="detailObj.id"></user-info-update>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { api_account } from "src/api/index.js";
import userInfoAdd from 'src/pages/account/secondary/component/userInfoAdd.vue'
import userInfoUpdate from 'src/pages/account/secondary/component/userInfoUpdate.vue'
export default {
  props: {
    isUpdate: '',
    detailObj: ''
  },
  data(){
    return {
      activeKey: '1',
      currentUser: null
    }
  },
  components: {
    userInfoAdd,
    userInfoUpdate
  },
  methods: {
    async initMerchantDetail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_account.get_admin_merchant_getDetail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data || {}
      } else {
        this.$message.error(msg);
      }
    },
    handleColse(val){
      this.$emit('closeDialogSetMerchantShow',val)
    }
  }
}
</script>

<style>

</style>