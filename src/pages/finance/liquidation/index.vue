<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="电子账单" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x fs14">账单</div>
            <a-month-picker
              :disabledDate="disabledDate"
              placeholder="请选择月份"
              @change="onChange"
            />
          </div>
          <div class="append-handle-btn-input position-relative ml20x" style="margin-top:1px;">
            <a-select
              autocomplete
              class="w-120"
              placeholder="请选择"
              v-model="searchForm.timeZone"
              @change="handleTimeZoneChange"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in timeZoneList"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-bet"></div>
          </div>
          <div class="append-handle-btn-input pl30x row line-height-32px">
            <div class="mr10x fs14">盈利范围</div>
            <div class="w-100">
              <a-input-number
                v-model.trim="searchForm.profitAmountStart"
                placeholder="最小值"
                autocomplete="off"
              ></a-input-number>
            </div>
            <div class="ml10x mr10x">~</div>
            <div class="w-100">
              <a-input-number
                v-model.trim="searchForm.profitAmountEnd"
                placeholder="最大值"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl30x">
            <a-checkbox class="text-panda-text-7" v-model="status">金额展示人民币</a-checkbox>
          </div>
          <div class="append-handle-btn-input pl30x line-height-32px">
            <a-button type="primary" size="default" @click="handleSearch">搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        id="liquidation"
        :columns="status? tablecolumns_config: noCnyConfig"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 616 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="record.merchantName.length>7" placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 120px; word-break:break-all;`"
                  ></div>
                </template>
                <span class="text-over1">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over1">{{record.merchantName}}</span>
            </span><br>
            <span class="text-panda-text-4 cursor-pointer" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="agentLevel" slot-scope="text">
          <span>{{ text | filterAgentLevel }}</span>
        </span>
        <span slot="billAmount" slot-scope="text, record">{{ record.billAmount | moneyFormat }}</span>
        <span slot="billAmountCNY" slot-scope="text, record">{{ record.billAmountCNY | moneyFormat }}</span>
        <span
          slot="orderAmountTotal"
          slot-scope="text, record"
        >{{ record.orderAmountTotal | moneyFormat }}</span>
        <span
          slot="orderAmountTotalCNY"
          slot-scope="text, record"
        >{{ record.orderAmountTotalCNY | moneyFormat }}</span>
        <span slot="profitAmount" slot-scope="text, record">
          <span v-if="record.profitAmount>=0">{{ record.profitAmount | moneyFormat }}</span>
          <span v-else class="panda-text-red">{{ record.profitAmount | moneyFormat }}</span>
        </span>
        <span slot="profitAmountCNY" slot-scope="text, record">
          <span v-if="record.profitAmountCNY>=0">{{ record.profitAmountCNY | moneyFormat }}</span>
          <span v-else class="panda-text-red">{{ record.profitAmountCNY | moneyFormat }}</span>
        </span>
        <span slot="profitRate" slot-scope="text,record">
          <span v-if="record.profitRate == null">-</span>
          <span v-else-if="record.profitRate >= 0">{{ text }}%</span>        
          <span v-else class="panda-text-red">{{ text }}%</span>         
        </span>
        <span slot="computingStandard" slot-scope="text, record">
          <span>{{ record.computingStandard | filterComputingStandard }}</span>
        </span>
        <span slot="terraceRate" slot-scope="text, record">
          <span v-if="record.terraceRate">{{ record.terraceRate | moneyFormat}}%</span>
          <span v-else>-</span>
        </span>
        <span slot="executeRate" slot-scope="text, record">
          <span v-if="record.terraceRate">{{ record.executeRate | moneyFormat}}%</span>
          <span v-else>-</span>
        </span>
        <span slot="adjustAmount" slot-scope="text, record">
          <span v-if="record.adjustAmount">{{ record.adjustAmount | moneyFormat }}</span>
          <span v-else-if="record.adjustAmount===0">0</span>
          <span v-else>-</span>
        </span>
        <span slot="merchantNum" slot-scope="text, record" v-if="record.agentLevel === 1">
          <a @click.prevent="handleLookSecondaryMerchant(record)">
            {{ record.merchantNum}}
          </a>
        </span>
        <span slot="action" slot-scope="text, record, index" class="q-gutter-md cursor-pointer">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看电子账单</div>
            </template>
            <q-icon @click.native="handleLook(record,index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </span>
      </a-table>
      <!-- 查看二级商户详情 -->
      <q-dialog
        v-model="dialogLookMerchantShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-look-merchant :detailObj="showDialogObj"></dialog-look-merchant>
      </q-dialog>
      <!-- 查看电子账单详情弹窗 -->
      <q-dialog
        v-model="dialogLookElectronicShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-look-electronic :detailObj="showDialogObj" @closeDialog="handleCloseDialogSet"></dialog-look-electronic>
      </q-dialog>
      <!-- 调整电子账单弹窗 -->
      <q-dialog
        v-model="dialogSetElectronicShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-set-electronic :detailObj="showDialogObj" @closeDialog="handleCloseDialogSet"></dialog-set-electronic>
      </q-dialog>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>#liquidation .ant-spin-nested-loading > div > .ant-spin {
  max-height: 680px;
  min-height: 680px;
}

>>>#liquidation .ant-empty-normal {
  margin: 284px 0;
}

.text-over1{
  display inline-block;
  max-width 70px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}

.text-over-200 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

a {
  text-decoration: underline;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant, api_finance } from "src/api/index.js";
import financesorter from "src/mixins/module/financesorter.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import financeMixin from "src/pages/finance/liquidation/mixin/index.js";
import { tablecolumns_config } from "src/pages/finance/liquidation/config/config.js";
import { nosecond_config } from "src/pages/finance/liquidation/config/noSecondConfig.js";
import { noCnyConfig } from "src/pages/finance/liquidation/config/noCnyConfig.js";
import { noCnySecondConfig } from "src/pages/finance/liquidation/config/noCnySecondConfig.js";
import { handleCopy } from "src/util/module/common.js";
import dialogLookElectronic from "src/pages/finance/liquidation/component/dialogLookElectronic.vue";
import dialogLookMerchant from "src/pages/finance/liquidation/component/dialogLookMerchant.vue";
import moment from 'moment';
export default {
  mixins: [financesorter, commonmixin, constantmixin, financeMixin],
  components: {
    dialogLookElectronic,
    dialogLookMerchant
  },
  data() {
    return {
      tabledata: [],
      // columns: noCnyConfig,
      // noCnyConfig,
      // tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        merchantName: "",
        profitAmountStart: "", // 盈利范围 -开始范围
        profitAmountEnd: "", // 盈利范围 -结束范围
        agentLevel: "",
        currency: "",
        financeDate: "",
        timeZone: 'UTC8'
      },
      dialogLookElectronicShow: false, //查看电子账单阀值
      dialogSetElectronicShow: false, //调整电子账单阀值
      dialogLookMerchantShow: false, //二级商户详情阀值
      showDialogObj: {},
      show_right_detail_obj: "",
      status: false, // 金额展示人民币阀值
    };
  },
  computed: {
    ...mapGetters(['get_user_info']),
    tablecolumns_config(){
      return this.get_user_info.agentLevel === 1? tablecolumns_config: nosecond_config
    },
    noCnyConfig(){
      return this.get_user_info.agentLevel === 1? noCnyConfig: noCnySecondConfig
    }
  },
  created() {
    this.initTableData();
    console.log(this.tablecolumns_config,'tablecolumns_config')
  },
  methods: {
    moment,
    handleCopy,
    // 本月之后日期禁用掉
    disabledDate(current) {
      return current && current > moment().endOf("day");
    },
    handleTimeZoneChange(val){
      this.handleSearch();
    },
    //搜索
    handleSearch() {
      this.initTableData();
    },
    onChange(date, dateString) {
      console.log(date, dateString);
      this.searchForm.financeDate = dateString;
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_finance
        .post_report_financeMonth_queryFinanceMonthList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          let msg = this.$lodash.get(res, "data.msg");
          if (code == "0000000") {
            let currentPage =
              this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.pagination.start = this.$lodash.get(res, "data.data.startRow");
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            console.log(this.tabledata, "tabledata");
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(msg, 5);
          }
        });
    },
    compute_init_tabledata_params() {
      let { pageSize, sort, orderBy } = this.pagination;
      let {
        financeDate,
        profitAmountStart,
        profitAmountEnd,
        timeZone
      } = this.searchForm;
      let params = {
        // status: 1,//商户状态 、1.启用、2.禁用 搜索条件，不传默认查全部
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize, //分页，每页查询多少条，默认20条。可不传
        financeDate,
        profitAmountStart,
        profitAmountEnd,
        sort,
        orderBy,
        timeZone
      };
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 查看二级商户详情列表
    handleLookSecondaryMerchant(record) {
      console.log(record);
      record.timeZone = this.searchForm.timeZone;
      this.showDialogObj = { ...record };
      this.dialogLookMerchantShow = true;
    },
    // 查看
    handleLook(record, index) {
      console.log(record, index, "qqq");
      record.timeZone = this.searchForm.timeZone;
      this.showDialogObj = { ...record };
      this.dialogLookElectronicShow = true;
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.dialogSetElectronicShow = false;
      this.dialogLookElectronicShow = false;
      this.initTableData();
    }
  }
};
</script>
