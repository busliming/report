<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-08 10:15:21
 -->
<template>
  <div
    style="width: 1300px ; max-height: 500px; max-width:1300px;overflow:hidden;"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">子证书信息</div>
          <q-space></q-space>
          <q-btn
            flat
            dense
            icon="close"
            v-close-popup
            class="text-panda-dialog-close"
          />
        </div>
      </q-card-section>
      <div class="append-handle-btn-input pl30x row  mt20x">
        <div class="w-240">
          <a-input
          v-model="searchForm.merchantName"
          placeholder="请输入商户名称"
          autocomplete="off"
          @keydown.enter="handleSearch"
          allowClear
        >
          <my-icon
            slot="prefix"
            type="p-icon-chazhao"
            class="panda-text-1 fs15"
          />
        </a-input>
        </div>
        <a-button style="height: 30px; line-height: 30px;" class="ml30x" type="primary" @click="handleSearch">搜索</a-button>
      </div>
      <!-- <q-card-section> -->
      <a-table
        class="mt20x pb10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1280, y: 300 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="small"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <span class="text-over-130">{{ record.merchantName }}</span>
        </span>
        <span slot="parentName" slot-scope="text, record">
          <span class="text-over-100">{{ record.parentName }}</span>
        </span>
        <span slot="startTime" slot-scope="text, record">
          <span>{{ record.startTime }} 至 {{ record.endTime }}</span>
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
          <span>{{ record.statusDescription }}</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <q-icon
            class="panda-icon panda-icon-fu-zhi-key panda-icon-hover fs18"
            @click.native="handleCopy(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>复制证书</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            v-if="detailObj.childConnectMode == 1"
            @click.native="handleEdit(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>更新证书</span>
            </q-tooltip>
          </q-icon>
        </a>
      </a-table>
      <!-- 更新证书弹窗 -->
      <q-dialog
        v-model="eidtKeyShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-edit
          :detailObj="showDialogObj"
          @closeDialogSetShow="handleCloseDialogSet"
        ></dialog-edit>
      </q-dialog>
      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import { subConfig } from "src/pages/merchant/key/config/subConfig.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import sortertablemixin from "src/mixins/module/sortertablemixin.js";
import submixin from "src/pages/merchant/key/mixin/index.js";
export default {
  mixins: [commonmixin, sortertablemixin, submixin],
  props: {
    detailObj: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      tabledata: [],
      columns: subConfig,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      }
    };
  },

  created() {
    this.initTableData();
  },
  watch: {},
  methods: {
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant
        .get_manage_merchant_queryKeyList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == "0000000") {
            let currentPage = this.$lodash.get(res, "data.data.page") * 1 || 1;
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.pagination.start = this.$lodash.get(res, "data.data.startRow");
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    compute_init_tabledata_params() {
      let params = {
        merchantName: this.searchForm.merchantName, // 商户名称
        parentId: this.detailObj.merchantId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
      });
      return arr;
    },
    handleSelect(record, index) {
      this.$message.success("您选择了Lv" + record.level);
      console.log(record);
      this.$emit("closeSelectDialog", record);
    }
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
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
  margin: 100px 0 !important;
}

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
  background: #fff;
}

.text-over-130{
  display block;
  max-width 90px;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}
.text-over-100{
  display block;
  max-width 95px;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

>>>.ant-table-tbody > tr > td {
  color: #3C4551;
}

>>>.ant-table-pagination.ant-pagination {
  margin: 16px 20px 16px 0;
}
</style>
