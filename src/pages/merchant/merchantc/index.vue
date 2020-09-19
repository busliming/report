<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs
        separator=">"
        active-color="whiddte"
        class="text-panda-text-4"
      >
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="商户管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div
      class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 mall border-radius-4px pt20x pb20x pl20x shadow-3"
    >
      <a-radio-group v-model="pagination.agentLevel">
        <a-radio-button value="0">直营商户</a-radio-button>
        <a-radio-button value="1">渠道商户</a-radio-button>
        <a-radio-button value="2">二级商户</a-radio-button>
      </a-radio-group>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="row no-left append-handle-btn-input">
            <q-input
              style=" width:240px;"
              outlined
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-30px ml20x"
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              @keydown.enter="handleSearch"
              clearable
            >
              <template v-slot:prepend>
                <span class="panda-icon panda-icon-cha-zhao fs15"></span>
              </template>
            </q-input>
            <q-input
              style=" width:240px;"
              outlined
              dense
              v-if="pagination.agentLevel === '2'"
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-30px ml40x"
              v-model.trim="searchForm.parentName"
              placeholder="请输入渠道商户名称"
              @keydown.enter="handleSearch"
              clearable
            >
              <template v-slot:prepend>
                <span class="panda-icon panda-icon-cha-zhao fs15"></span>
              </template>
            </q-input>
            <q-btn
              class="panda-btn-primary-dense bg-primary ml40x"
              style="width:60px;height:30px; "
              label="搜索"
              @click="handleSearch"
            />
          </div>
          <q-space />
          <div>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:110px;height:30px; font-size: 12px;"
              :label="btnName"
              @click="handleNewMerchant"
            />
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 524 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <span slot="merchantCode" slot-scope="text">
          <span>{{ text }}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record">
          <span class="text-over-120">{{ record.merchantName }}</span>
        </span>
        <span slot="secondMerchantNum" slot-scope="text, record">
          <span>Lv{{ record.secondMerchantNum }} ++</span>
        </span>
        <span slot="childAmount" slot-scope="text, record">
          <span
            >{{ record.childAmount }}<span v-if="record.childMaxAmount">/</span
            >{{ record.childMaxAmount }}</span
          >
        </span>
        <span slot="level" slot-scope="text, record">
          <span>Lv{{ record.level }}</span>
        </span>
        <span slot="email" slot-scope="text, record">
          <span class="text-over-180">{{ record.email }}</span>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="text-over-150">
            <span v-if="record.contact && record.contact.indexOf(',') > 0">
              {{ record.contact.slice(0, record.contact.indexOf(",")) }}
            </span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div style="max-width: 160px;">
            <span v-if="record.phone && record.phone.indexOf(',') > 0">
              {{ record.phone.slice(0, record.phone.indexOf(",")) }}
            </span>
            <span v-else>{{ record.phone }}</span>
          </div>
        </span>
        <span slot="merchantAdmin" slot-scope="text, record">
          <span class="text-over-160">{{ record.merchantAdmin }}</span>
        </span>
        <span slot="enabled" slot-scope="text, record">
          <q-btn
            class="panda-btn-green"
            v-if="record.status == 1"
            @click="handleUpdateStatus(record)"
            >启用</q-btn
          >
          <q-btn
            class="panda-btn-grey"
            v-else
            @click="handleUpdateStatus(record)"
            >禁用</q-btn
          >
        </span>
        <a slot="action" slot-scope="text, record, index" class="flex justify-between ml10x mr10x">
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            @click.native="handleEdit(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>编辑</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"
            @click.native="handleLook(record)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>查看</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-shezhi-guanliyuan panda-icon-hover fs20"
            @click.native="handleSet(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>设置超级管理员</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            v-if="record.agentLevel == '1' && record.childAmount != record.childMaxAmount"
            class="panda-icon panda-icon-panda-icon-shezhi-erji panda-icon-hover fs20"
            @click.native="handleSetSecondMerchant(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>设置二级商户</span>
            </q-tooltip>
          </q-icon>
          <q-icon v-else  class="panda-icon panda-icon-panda-icon-shezhi-erji panda-icon-hover fs20 no-show" >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>设置二级商户</span>
            </q-tooltip>
          </q-icon>
        </a>
      </a-table>
      <!-- <directlyTable :tabledata="tabledata" :pagination="pagination" @sorterForTable="sorterForTable"></directlyTable> -->
    </div>
    <!-- 查看商户弹窗 -->
    <q-dialog
      v-model="lookMerchantShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-look :detailObj="showDialogObj"></dialog-look>
    </q-dialog>
    <!-- 设置管理员弹窗 -->
    <q-dialog
      v-model="setMerchantShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-set
        :detailObj="showDialogObj"
        @closeDialogSetShow="handleCloseDialogSet"
      ></dialog-set>
    </q-dialog>
    <!-- 切换商户状态弹窗 -->
    <q-dialog
      v-model="toggleStatusShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-toggle @handleConfirm="handleConfirm"></dialog-toggle>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 560px;
  min-height: 560px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}

.text-over-120 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
  display: block;
}

.text-over-180 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  white-space: nowrap;
  display: block;
}

.text-over-150 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  white-space: nowrap;
}

.text-over-160 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 105px;
  white-space: nowrap;
  display: block;
}

.no-left >>> .q-field__append {
  border-left: none;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 10%;
}

>>>.ant-select {
  font-size: 12px;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { directlyMerchantConfig } from "src/pages/merchant/merchantc/config/directlyMerchant.js";
import { secondMerchantConfig } from "src/pages/merchant/merchantc/config/secondMerchant.js";

import { channelMerchantConfig } from "src/pages/merchant/merchantc/config/channelMerchant.js";
import dialogLook from "src/pages/merchant/merchantc/component/dialogLook.vue";
import dialogSet from "src/pages/merchant/merchantc/component/dialogSet.vue";
import dialogToggle from "src/pages/merchant/merchantc/component/dialogToggle.vue";

// import { getAutoParams } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  components: {
    dialogLook,
    dialogSet,
    dialogToggle
  },
  data() {
    return {
      tabledata: [],
      columns: directlyMerchantConfig,
      tabledata_loading: false,
      searchForm: {
        merchantName: "",
        parentName: ""
      },
      merchantStatusList: [
        // { value: "", label: "全部" },
        { value: 1, label: "启用" },
        { value: 0, label: "禁用" }
      ],
      btnName: "+ 新建直营商户",
      lookMerchantShow: false, // 查看商户弹窗阀值
      setMerchantShow: false, // 设置管理员弹窗阀值
      toggleStatusShow: false, // 切换商户状态弹窗阀值
      updateMerchantShow: false, // 修改商户弹窗阀值
      showDialogObj: {},
      show_right_detail_obj: "",
      scroll_area_height: "",
      currentRecord: ""
    };
  },
  created() {
    this.initSessionParams();
  },
  destroyed() {
    this.$q.sessionStorage.remove("params");
  },
  computed: {
    ...mapGetters(['get_data'])
  },
  watch: {
    "pagination.agentLevel"(val) {
      this.handleFunction(val)
    }
  },
  methods: {
    // 解决新建商户和编辑商户参数回旋的问题！！！
    initSessionParams() {
      // 解决由首页跳进来表格不动态配置问题
      this.handleFunction(this.pagination.agentLevel);
      // 解决有我的信息跳转详情
      if(this.get_data){
        this.searchForm.merchantName = this.get_data.merchantName;
        this.pagination.agentLevel = String(this.get_data.agentLevel);
        this.handleLook(this.get_data)
      }
      // 解决首页路由跳转
      let editOrUpdate = this.$q.sessionStorage.getItem("params");
      if (editOrUpdate) {
        let { pageNum, pageSize, merchantName, agentLevel } = editOrUpdate;
        this.pagination.current = pageNum * 1;
        this.pagination.pageSize = pageSize * 1;
        this.pagination.agentLevel = agentLevel;
        if (merchantName || this.pagination.current === 1) {
          this.searchForm.merchantName = merchantName;
          this.initTableData();
        }
      } else {
        this.initTableData();
      }
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.get_manage_merchant_list(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata, "tabledata");
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          msg && this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let { agentLevel, sort, orderBy, status } = this.pagination;
      let { merchantName, parentName } = this.searchForm;
      let params = {
        agentLevel,
        merchantName, //商户名称，可模糊搜索
        parentName, //渠道商名称，可模糊搜索
        // status: 1,//商户状态 、1.启用、2.禁用 搜索条件，不传默认查全部
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
        sort,
        orderBy,
        status
      };
      console.log(this.pagination.current, this.pagination.pageSize, "第一次");
      return params;
    },
    handleFunction(val){
      if (val === "2") {
        this.columns = secondMerchantConfig;
        this.btnName = "+ 新建二级商户";
      } else if (val === "1") {
        this.columns = channelMerchantConfig;
        this.btnName = "+ 新建渠道商户";
      } else {
        this.columns = directlyMerchantConfig;
        this.btnName = "+ 新建直营商户";
      }
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 新建商户按钮
    handleNewMerchant() {
      let name = "";
      if (this.pagination.agentLevel === "1") {
        name = "merchantc_channel_edit";
      } else if (this.pagination.agentLevel === "2") {
        name = "merchantc_second_edit";
      } else {
        name = "merchantc_edit";
      }
      this.$router.push({
        name,
        query: {
          agentLevel: this.pagination.agentLevel,
          merchantName: this.searchForm.merchantName,
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current
        }
      });
    },
    // 编辑
    handleEdit(record, index) {
      let name = "";
      if (this.pagination.agentLevel === "1") {
        name = "merchantc_channel_update";
      } else if (this.pagination.agentLevel === "2") {
        name = "merchantc_second_update";
      } else {
        name = "merchantc_update";
      }
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.$router.push({
        name,
        query: {
          id: record.id,
          agentLevel: this.pagination.agentLevel,
          merchantName: this.searchForm.merchantName,
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current
        }
      });
    },
    // 查看
    handleLook(record) {
      this.showDialogObj = { ...record };
      this.lookMerchantShow = true;
    },
    // 设置管理员
    handleSet(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
    },
    // 设置二级商户
    handleSetSecondMerchant(record, index) {
      console.table(record.childConnectMode)
      let {transferMode,url,callbackUrl,merchantName,id,childConnectMode} = record
      if(record.childConnectMode ===2 ){
        let channelToSecond = {id,merchantName,transferMode,url,callbackUrl,childConnectMode}
        this.$q.sessionStorage.set('channelToSecond',channelToSecond);
      }else{
        let channelToSecond = {id,merchantName,childConnectMode}
        this.$q.sessionStorage.set('channelToSecond',channelToSecond);
      }
      this.$router.push({
        name: "merchantc_second_edit",
        query: {
          agentLevel: this.pagination.agentLevel,
          merchantName: this.searchForm.merchantName,
          channelName: record.merchantName,
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current,
          id: record.id
        }
      });
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.setMerchantShow = false;
      this.initTableData();
    },
    // 修改商户状态
    handleUpdateStatus(record) {
      console.log(record.status);
      this.currentRecord = record;
      this.toggleStatusShow = true;
    },
    //确认按钮
    async handleConfirm() {
      let params = {
        merchantCode: this.currentRecord.merchantCode,
        status: this.currentRecord.status == 1 ? 0 : 1
      };
      let res = await api_merchant.get_manage_merchant_updateMerchantStatus(
        params
      );
      let { code, msg } = res.data;
      if (code == "0000000") {
        if (this.currentRecord.status == 0) {
          this.$message.success("启用" + msg);
        } else {
          this.$message.error("禁用" + msg);
        }
      }
      this.$set(
        this.currentRecord,
        "status",
        this.currentRecord.status == 1 ? 0 : 1
      );
    }
  }
};
</script>
