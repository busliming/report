<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="账户中心" />
        <q-breadcrumbs-el label="二级商户管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="row no-left append-handle-btn-input ml20x">
            <div class="w-240">
                <a-input
                v-model.trim="searchForm.merchantName"
                placeholder="请输入商户名称"
                @keydown.enter="handleSearch"
                autocomplete="off"
                allowClear
              >
                <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
              </a-input>
            </div>
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
        :scroll="{ x: 1600, y: 615 }"
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
          <!-- <span class="text-over-120 cursor-pointer" @click="handleCopy(record.merchantName, '商户名称')">{{ record.merchantName }}</span> -->
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
            :str_all="('<div>'+record.merchantName +'</div>')"
            :defaultplace="'topLeft'"
            :str='record.merchantName'
            :col_width="100"
          ></table-cell-ellipsis-ant>
        </span>
        <span slot="secondMerchantNum" slot-scope="text, record">
          <span>Lv{{ record.secondMerchantNum }} ++</span>
        </span>
        <span slot="childAmount" slot-scope="text, record">
          <span>
            {{ record.childAmount }}
            <span v-if="record.childMaxAmount">/</span>
            {{ record.childMaxAmount }}
          </span>
        </span>
        <span slot="level" slot-scope="text, record">
          <span>Lv{{ record.level }}</span>
        </span>
        <span slot="email" slot-scope="text, record">
          <span class="text-over-180">{{ record.email }}</span>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="text-over-150">
            <span
              v-if="record.contact && record.contact.indexOf(',') > 0"
            >{{ record.contact.slice(0, record.contact.indexOf(",")) }}</span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div style="max-width: 160px;">
            <span
              v-if="record.phone && record.phone.indexOf(',') > 0"
            >{{ record.phone.slice(0, record.phone.indexOf(",")) }}</span>
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
          >启用</q-btn>
          <q-btn class="panda-btn-grey" v-else @click="handleUpdateStatus(record)">禁用</q-btn>
        </span>
        <a slot="action" slot-scope="text, record, index" class="flex justify-between ml20x mr20x">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">编辑商户</div>
            </template>
            <q-icon @click.native="handleEdit(record, index)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看商户</div>
            </template>
            <q-icon @click.native="handleLook(record)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">设置超级管理员</div>
            </template>
            <q-icon @click.native="handleSet(record,index)" class="panda-icon panda-icon-shezhi-guanliyuan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </a>
      </a-table>
    </div>
    <!-- 查看商户弹窗 -->
    <q-dialog v-model="lookMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-look :detailObj="showDialogObj"></dialog-look>
    </q-dialog>
    <!-- 设置管理员弹窗 -->
    <q-dialog v-model="setMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @closeDialogSetShow="handleCloseDialogSet"></dialog-set>
    </q-dialog>
    <!-- 切换商户状态弹窗 -->
    <q-dialog v-model="toggleStatusShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-toggle @handleConfirm="handleConfirm"></dialog-toggle>
    </q-dialog>
    <!-- 新建和编辑二级商户 -->
    <q-dialog v-model="setShow" persistent transition-show="scale" transition-hide="scale">
     <dialog-set-merchant :isUpdate="isUpdate" :detailObj="showDialogObj" @closeDialogSetMerchantShow="handleCloseDialogSetMerchant"></dialog-set-merchant>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 560px;
  min-height: 560px;
}

>>>.ant-empty-normal {
  margin: 284px 0;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;
  display: inline-block;
  white-space: nowrap;
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
import { api_merchant, api_account } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { secondMerchantConfig } from "src/pages/account/secondary/config/secondMerchant.js";
import dialogLook from "src/pages/account/secondary/component/dialogLook.vue";
import dialogSet from "src/pages/account/secondary/component/dialogSet.vue";
import dialogSetMerchant from "src/pages/account/secondary/component/dialogSetMerchant.vue";
import dialogToggle from "src/pages/account/secondary/component/dialogToggle.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import { handleCopy } from "src/util/module/common.js";

// import { getAutoParams } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  components: {
    dialogLook,
    dialogSet,
    dialogToggle,
    tableCellEllipsisAnt,
    dialogSetMerchant
  },
  data() {
    return {
      tabledata: [],
      columns: secondMerchantConfig,
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
      btnName: "+ 新建二级商户",
      lookMerchantShow: false, // 查看商户弹窗阀值
      setMerchantShow: false, // 设置管理员弹窗阀值
      toggleStatusShow: false, // 切换商户状态弹窗阀值
      updateMerchantShow: false, // 修改商户弹窗阀值
      showDialogObj: {},
      show_right_detail_obj: "",
      scroll_area_height: "",
      currentRecord: "",
      setShow: false, //商户新建/编辑弹窗阀值
      isUpdate: false //是否是编辑
    };
  },
  created() {
    // this.initSessionParams();
    this.initTableData();
  },
  destroyed() {
    this.$q.sessionStorage.remove("params");
  },
  computed: {
    ...mapGetters(["get_data"])
  },
  methods: {
    handleCopy,
    // 解决新建商户和编辑商户参数回旋的问题！！！
    initSessionParams() {
      // 解决首页路由跳转
      let editOrUpdate = this.$q.sessionStorage.getItem("params");
      if (editOrUpdate) {
        let { pageNum, pageSize, merchantName } = editOrUpdate;
        this.pagination.current = pageNum * 1;
        this.pagination.pageSize = pageSize * 1;
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
      api_account.get_admin_merchant_merchantList(params).then(res => {
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
        }else{
          this.tabledata = [];
          code !== '0400403' && this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let { agentLevel, sort, orderBy, status } = this.pagination;
      let { merchantName } = this.searchForm;
      let params = {
        // agentLevel,
        merchantName, //商户名称，可模糊搜索
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
        sort,
        orderBy,
        status
      };
      console.log(this.pagination.current, this.pagination.pageSize, "第一次");
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 新建二级商户按钮
    handleNewMerchant() {
      this.isUpdate = false;
      this.setShow = true;
      // this.$router.push({
      //   name: "secondary_add"
      // });
    },
    // 编辑
    handleEdit(record, index) {
      let name = "secondary_update";
      this.showDialogObj = { ...record };
      this.isUpdate = true;
      this.setShow = true;
    },
    handleCloseDialogSetMerchant(val){
      if(val){
        this.setShow = false;
        this.initTableData();
      }else{
        this.setShow = false;
      }
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
      let res = await api_account.get_admin_merchant_updateMerchantStatus(
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
