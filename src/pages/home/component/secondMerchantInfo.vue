<!--
 * @Desc: 
 * @Date: 2020-05-30 21:04:19
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-11 19:55:10
--> 
<template>
  <div class="smi">
    <div
      style="right: 20px; top: 15px; z-index: 99;"
      class="position-absolute cursor-pointer"
      @click="handlerGoToMore"
    >更多</div>
    <a-table
      class="mt20x"
      :columns="columns"
      :dataSource="tabledata"
      :scroll="{ x: 545, y: 310 }"
      :pagination="pagination"
      :loading="loading"
      size="small"
      rowKey="_index"
    >
      <span slot="merchantName" slot-scope="text, record">
        <a-tooltip v-if="record.merchantName.length>6" placement="topLeft">
          <template slot="title">
            <div
              v-html="record.merchantName"
              :style="`max-width: 120px; word-break:break-all;`"
            ></div>
          </template>
          <span class="text-over1">{{record.merchantName}}</span>
        </a-tooltip>
        <span v-else class="text-over1">{{record.merchantName}}</span>
        <!-- <span class="text-over1">{{ record.merchantName }}</span> -->
      </span>
      <span slot="parentName" slot-scope="text, record">
        <span class="text-over1" v-if="record.parentName">{{ record.parentName }}</span>
        <span v-else>未返回</span>
      </span>
      <span slot="createTime" slot-scope="text, record">
        <span>{{ moment(record.createTime).format("MMM Do") }}</span>
      </span>
      <span slot="childAmount" slot-scope="text, record">
        <span v-if="record.childMaxAmount">
          <span>{{record.childAmount}}/{{record.childMaxAmount}}</span>
        </span>
        <span v-else>未返回</span>
      </span>
      <span slot="status" slot-scope="text, record">
        <span
          v-if="record.statusDescription == '即将过期'"
          class="panda-dot panda-dot-yellow line-height-40px mr5x"
        ></span>
        <span
          v-if="record.statusDescription == '有效'"
          class="panda-dot panda-dot-green line-height-40px mr5x"
        ></span>
        <span
          v-if="record.statusDescription == '已过期'"
          class="panda-dot panda-dot-red line-height-40px mr5x"
        ></span>
        <span :class="record.statusDescription == '未上传'?'panda-text-red cursor-pointer': ''">
          <span
            v-if="record.statusDescription == '未上传'"
            class="panda-dot panda-dot-red line-height-40px mr5x"
            @click="handleUpdateKey(record)"
          ></span>
          <span
            v-if="record.statusDescription == '未上传'"
            @click="handleUpdateKey(record)"
          >{{record.statusDescription}}</span>
          <span v-else>{{record.statusDescription}}</span>
        </span>
      </span>
      <span slot="merchantAdmin" slot-scope="text, record, index">
        <span v-if="record.merchantAdmin">
          <a-tooltip v-if="getStrLength(record.merchantAdmin)>7" placement="topLeft">
            <template slot="title">
              <div
                v-html="record.merchantAdmin"
                :style="`max-width: 120px; word-break:break-all;`"
              ></div>
            </template>
            <span class="text-over-admin">{{record.merchantAdmin}}</span>
          </a-tooltip>
        </span>
        <span v-else class="panda-text-red cursor-pointer" @click="handleEdit(record,index)">未设置</span>
      </span>
    </a-table>
    <!-- 设置管理员弹窗 -->
    <q-dialog v-model="setMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @closeDialogSetShow="handleCloseDialogSet"></dialog-set>
    </q-dialog>
  </div>
</template>

<script>
import { api_home } from "src/api/index.js";
import { getStrLength } from 'src/util/module/common.js'
import { secondMerchantInfoConfig } from "src/pages/home/config/secondMerchantInfo.js";
import dialogSet from "src/pages/home/component/dialogSet.vue";
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  components: {
    dialogSet
  },
  data() {
    return {
      columns: secondMerchantInfoConfig,
      tabledata: [],
      loading: false,
      showDialogObj: "",
      setMerchantShow: false
    };
  },
  created() {
    this.initMerchantMonthList();
  },
  methods: {
    getStrLength,
    handlerGoToMore() {
      this.$router.push({
        name: "secondary"
      });
    },
    // 本月入驻商户信息
    async initMerchantMonthList() {
      this.loading = true;
      let res = await api_home.get_admin_merchant_queryCurrentMonthMerchantList(
        {}
      );
      this.loading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let { data } = res.data;
        this.tabledata = this.rebuildTabledataToNeeded(data);
      } else {
        this.tabledata = [];
      }
    },
    rebuildTabledataToNeeded(arr) {
      if (Array.isArray(arr) && arr.length >= 0) {
        arr.map((item, index) => {
          item._index = index + 1;
        });
        return arr;
      }
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.setMerchantShow = false;
      this.initMerchantMonthList();
    },
    //未设置管理员 设置管理员
    handleEdit(record, index) {
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 350px !important;
  min-height: 350px !important;
}
>>>.ant-empty-normal {
  margin: 102px 0 !important;
}
.text-over1{
  display inline-block;
  max-width 100px;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}
.text-over-admin {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
  display: inline-block;
  white-space: nowrap;
}
</style>