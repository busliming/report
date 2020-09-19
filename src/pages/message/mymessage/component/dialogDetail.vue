<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-19 20:28:22
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding position-relative">
        <div class="row fs14 bg-panda-dialog text-panda-text-7 pr10x pb10x">
          <div class="row pl20x mt10x fw_600">消息详情</div>
          <q-space></q-space>
          <q-btn
            class="position-absolute text-panda-dialog-close"
            style="right:20px; top:5px;"
            flat
            dense
            icon="close"
            v-close-popup
            @click="handleSave"
          />
        </div>
      </q-card-section>
      <div class="content">
        <div class="top text-center mt20x pb30x">
          <div class="title text-panda-text-7 fw_600">
            【系统消息】 <span>{{currentNew.title}}</span>
          </div>
          <div class="title text-panda-text-4 fs12 mt5x">
            <span>
              <a-icon type="clock-circle" />
            </span>
            <span class="ml10x">{{moment(currentNew.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
            <span class="ml20x">
              <my-icon type="p-icon-chakan" style="font-size: 14px;"></my-icon>
            </span>
            <span class="ml10x">{{currentNew.visitNumber}}次</span>
          </div>
        </div>
        <div class="middle text-panda-text-7 mb30x">
          <div class="line-height-20px">尊敬的用户：</div>
          <div class="line-height-30px">
            <!-- 亚博体育的证书还有三天到期，点击<a class="text-panda-text-2">此处</a
            >更新证书 -->
            <span v-html="currentNew.context" @click.prevent="handleUpdateKey"></span>
          </div>
          <div class="line-height-20px mt30x flex">
            <q-space></q-space>
            <div class="text-right text-panda-text-4">
              <div>Panda</div>
              <div>{{moment(currentNew.sendTime).format('LL')}}</div>
            </div>
          </div>
        </div>
        <div class="footer mt20x pb20x position-fixed flex justify-center">
          <q-btn
            class="panda-btn-primary-dense bg-primary"
            style="width:65px;height:32px; "
            @click="handleSave"
            label="确定"
            v-close-popup
          />
          <q-btn
            class="panda-btn-white border-1px ml20x"
            style="width:65px;height:32px; "
            @click="handleDelete(currentNew.id)"
            label="删除"
            v-close-popup
          />
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { api_message } from "src/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      currentNew: {}
    };
  },
  props: {
    detailObj: ""
  },
  created() {
    this.initNewsDetail();
  },
  methods: {
    ...mapActions(['set_data']),
    moment,
    handleUpdateKey(){ 
      // console.warn(111)
      if(this.currentNew.type === 1){
        // 新注册商户
        this.handleSave();
        this.$router.push({name: 'basic'});
        
      }else{
        // 商户key是否过期信息
        this.handleSave();
        this.$router.push({name: 'mykey'});
      }
      this.set_data(this.currentNew.children)
    },
    async initNewsDetail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_message.post_admin_noticeNew_newsDetail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentNew = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 保存按钮
    handleSave() {
      this.$emit('lookNew')
    },
    //删除消息
    handleDelete(id){
      this.$emit('deleteNew', id)
    }
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 86%;
  margin: 0 auto;
}
a{
  text-decoration: underline
}
</style>
