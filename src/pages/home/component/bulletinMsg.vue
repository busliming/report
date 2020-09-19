<!--
 * @Desc: 
 * @Date: 2020-05-30 18:04:52
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-18 14:21:33
--> 
<template>
  <div class="msg">
    <a-radio-group
      v-model="msgTab"
      style="right: 100px; top: 10px; z-index: 99"
      class="position-absolute"
    >
      <a-radio-button value="0">公告</a-radio-button>
      <a-radio-button value="1">消息</a-radio-button>
    </a-radio-group>
    <div
      style="right: 20px; top: 15px; z-index: 99;"
      class="position-absolute cursor-pointer"
      @click="handlerGoToMore"
    >更多</div>
    <a-table
      class="mt20x"
      :columns="msgColumns"
      :dataSource="msgData"
      :scroll="{ x: scrollX, y: 310 }"
      :pagination="pagination"
      :loading="tableLoading"
      size="small"
      rowKey="_index"
    >
      <span slot="bulletinTitle" slot-scope="text, record">
        <!-- <span v-if="record">【活动公告】{{record.title}}</span> -->
        <div
          class="flex items-center text-center justify-start cursor-pointer"
          v-if="record"
          @click="handleClick(record)"
        >
          <div>
            <my-icon v-if="record.isTag == 1" type="p-icon-biaoji" class="mr5x"></my-icon>
            <span v-else class="mr5x no-show">11</span>
          </div>
          <div
            class="text-over-130"
          >{{record.headType === 1? '【活动公告】': '【赛事取消公告】'}} {{record.title}}</div>
          <div>
            <my-icon
              v-if="record.isUpload === 1"
              type="p-icon-fujian"
              class="ml10x text-panda-text-4"
            ></my-icon>
          </div>
        </div>
      </span>
      <span slot="messageTitle" slot-scope="text, record">
        <span class="cursor-pointer" @click="handleClick(record)">【系统消息】{{record.title}}</span>
      </span>
    </a-table>
    <!-- 查看活动详情弹窗 -->
    <q-dialog v-model="dialogDetailShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-detail :detailObj="showDialogObj" @closeDialog="handleCloseDialog"></dialog-detail>
    </q-dialog>
    <!-- 更新证书弹窗 -->
    <q-dialog v-model="eidtKeyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-edit :detailObj="showDialogObj" @closeDialog="handleCloseDialog"></dialog-edit>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_home, api_message } from "src/api/index.js";
import { bulletinMsgConfig } from "src/pages/home/config/bulletinMsg.js"; //公告tab
import { bulletinMessageConfig } from "src/pages/home/config/bulletinMessage.js"; // 消息tab
import { bulletinMsgChannelConfig } from "src/pages/home/config/bulletinMsgChannel.js"; // 直营和二级商户  公告tab
import { bulletinMessageChannelConfig } from "src/pages/home/config/bulletinMessageChannel.js"; // 直营和二级商户  消息tab
import dialogDetail from "src/pages/message/bulletin/component/dialogDetail.vue";
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      msgTab: "0",
      msgData: [],
      tableLoading: false,
      dialogDetailShow: false,
      eidtKeyShow: false,
      showDialogObj: {}
    };
  },
  components: {
    dialogDetail,
    dialogEdit
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    msgColumns() {
      // return this.get_user_info.agentLevel !== 1 && this.msgTab === '0'
      //   ? bulletinMsgChannelConfig
      //   : bulletinMsgConfig;
      if (this.get_user_info.agentLevel === 1) {
        // 第二行的公告信息
        if (this.msgTab === "0") {
          //公告
          return bulletinMsgConfig;
        } else {
          // 消息
          return bulletinMessageConfig;
        }
      } else {
        // 第三行的公告信息
        if (this.msgTab === "0") {
          //公告
          return bulletinMsgChannelConfig;
        } else {
          // 消息
          return bulletinMessageChannelConfig;
        }
      }
    },
    scrollX() {
      return this.get_user_info.agentLevel !== 1 ? 470 : 670;
    }
  },
  created() {
    this.initMsgData();
  },
  watch: {
    msgTab(val) {
      if (val === "0") {
        this.msgData = this.msgs;
      } else {
        this.msgData = this.bulletins;
      }
    }
  },
  methods: {
     async handleClick(record) {
      // this.showDialogObj = { ...record };
      // this.msgTab === '0'? this.dialogDetailShow = true: this.eidtKeyShow = true;
      if(this.msgTab === '0'){
        this.showDialogObj = {...record};
        this.dialogDetailShow = true;
      }else{
        let params = {
          id: record.id
        };
        let res = await api_message.post_admin_noticeNew_newsDetail(params);
        let { code, data } = res.data;
        if (code == "0000000") {
          this.showDialogObj = {...data.children};
          this.eidtKeyShow = true;
        }
      }
    },
    handleCloseDialog() {
      this.msgTab === '0'? this.dialogDetailShow = false: this.eidtKeyShow = false;
      // this.initMsgData();
    },
    async initMsgData() {
      this.tableLoading = true;
      let res = await api_home.post_admin_noticeNew_getHomeNews({});
      this.tableLoading = false;
      if (res.data.code === "0000000") {
        this.msgs = this.computedNeedData(res.data.data.notice) || []; // 公告
        this.msgData = this.msgs;
        console.warn(this.msgData);
        this.bulletins = this.computedNeedData(res.data.data.news) || []; // 消息
      }
    },
    computedNeedData(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
      });
      return arr;
    },
    // 路由跳转
    handlerGoToMore() {
      let name = this.msgTab === "0" ? "bulletin" : "mymessage";
      this.$router.push({
        name
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-empty-normal {
  margin: 89px 0 !important;
}

.text-over-130 {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  white-space: nowrap;
}
</style>