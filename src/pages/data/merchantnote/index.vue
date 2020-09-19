<template>
  <div class="full-width full-height">
    <div class="pl20x pt20x fs14">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户注单统计" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="pl20x pt15x pb15x fs14 bg-panda-bg-6 row" style="margin: 15px 20px 20px 20px">
      <!-- 投注时间tab栏 -->
      <div>
        <a-radio-group v-model="pagination.filter">
          <a-radio-button value="3">结算时间</a-radio-button>    
          <a-radio-button value="1">投注时间</a-radio-button>  
          <!-- <a-radio-button value="2">开赛时间</a-radio-button> -->
        </a-radio-group>
      </div>
      <!-- 投注周期tab栏 -->
      <div class="ml20x">
        <a-radio-group v-model="pagination.dateType" class="pl20x">
          <a-radio-button value="day">日</a-radio-button>
          <!-- <a-radio-button value="week">周</a-radio-button> 2020-6-28 -->
          <a-radio-button value="month">月</a-radio-button>
          <!-- <a-radio-button value="year">年</a-radio-button> -->
        </a-radio-group>
      </div>
      <!-- 日期选择 -->
      <div class="ml20x append-handle-btn-input w-240" style="margin-top: 1px;">
        <!-- <a-week-picker
          :disabledDate="disabledDate"
          v-if="pagination.dateType==='week'"
          placeholder="请选择周期"
          :defaultValue="moment(moment().format('l'), dateFormat)"
          @change="onChange"
        ></a-week-picker>
        <a-month-picker
          :disabledDate="disabledDate"
          v-else-if="pagination.dateType==='month'"
          :defaultValue="moment(moment().format('l'), 'YYYYMM')"
          placeholder="请选择月份"
          @change="onChange"
        />
        <a-date-picker
          :disabledDate="disabledDate"
          :disabledTime="disabledDateTime"
          :defaultValue="moment(moment().format('l'), dateFormat)"
          v-else-if="pagination.dateType==='day'"
          @change="onChange"
        />
        <a-date-picker
          placeholder="请选择年份"
          mode="year"
          format="YYYY"
          :defaultValue="defaultYeah"
          v-else
          :value="time"
          :open="isopen"
          @panelChange="handlePanelChange"
          @openChange="handleOpenChange"
          @change="handleChange"
        /> -->
        <a-range-picker 
          @change="onChange" 
          :disabledDate="disabledDate"
          :allowClear="false"
          v-if="pagination.dateType==='day'"
          :value="[moment(searchForm.startDate,'YYYY-MM-DD'), moment(searchForm.endDate, 'YYYY-MM-DD')]"
          :format="dateFormat"
        />
        <a-range-picker
          :placeholder="['开始月份', '结束月份']"
          v-else-if="pagination.dateType==='month'"
          format="YYYY-MM"
          :disabledDate="disabledDate"
          :value="value"
          :mode="mode"
          :allowClear="false"
          :open="isopen"
          @openChange="handleOpenChange"
          @panelChange="handlePanelChange"
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
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
        >
          <div class="append-handle-btn-input position-relative ml20x">
            <a-select autocomplete class="w-120" placeholder="体育种类" v-model="searchForm.sportId" @change="handlerMatches">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="'sport'+index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input v-model.trim="searchForm.merchantName" @keydown.enter="handlerSearch" placeholder="请输入商户名称/编号" maxLength="20" allowClear autocomplete="off">
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15"/>
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handlerSearch"
            >搜索</a-button>
          </div>
          <q-space />
          <div class="row">
            <div class="append-handle-btn-input position-relative mr20x">
              <a-select autocomplete class="w-120" placeholder="币种类型" @change="handlerCurrency">
                <a-select-option
                  :value="item.value"
                  v-for="(item) in currencyList"
                  :key="'currency' + item.value"
                >{{ item.label }}</a-select-option>
              </a-select>
              <div class="position-absolute select-left-border-finance"></div>
            </div>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:105px;height:30px; "
              @click="handleExportExcel"
            >
              <!-- <q-icon left class="panda-icon panda-icon-cha-kan panda-icon-white"></q-icon> -->
              <a-icon type="export" />
              <div class="ml10x">导出报表</div>
            </q-btn>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        ref="matchTable"
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: 490 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="record.merchantName.length>6" placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 120px; word-break:break-all;`"
                  ></div>
                </template>
                <div class="text-over1">{{record.merchantName}}</div>
              </a-tooltip>
              <div v-else class="text-over1">{{record.merchantName}}</div>
            </span>
            <span class="text-panda-text-4 cursor-pointer ml5x text-over1" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="time" slot-scope="text, record">
          <span v-if="pagination.dateType === 'day' && record.time">{{ String(record.time).replace(/(\d{4})(\d\d)(\d\d)/, "$1-$2-$3")}}</span>
          <span v-else>{{ String(record.time).replace(/(\d{4})(\d\d)/, "$1-$2")}}</span>
        </span>
        <span slot="agentLevel" slot-scope="text, record" class="q-gutter-md">
          <span v-if="get_user_info.merchantCode === record.merchantCode">渠道商户</span>
          <span v-else>二级商户</span>
        </span>
        <span slot="currency" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.currency">{{record.currency | filterCurrency}}</span>
          <span v-else>暂未返回</span>
        </span>
        <span slot="merchantLevel" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.merchantLevel !== null">Lv{{record.merchantLevel}}</span>
          <span v-else>-</span>
        </span>
        <span slot="betAmount" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].betAmount] | moneyFormat}}</span>
        </span>
        <span slot="orderSum" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].orderSum] | amount}}</span>
        </span>
        <span slot="returnAmount" slot-scope="text,record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].returnAmount] | moneyFormat}}</span>
        </span>
        <span slot="profit" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].profit] | moneyFormat}}</span>
        </span>
        <span slot="returnRate" slot-scope="text, record" class="q-gutter-md">
          <span
            :class="record[filterName[pagination.filter].returnRate] < 0?'text-red': ''"
          >{{ record[filterName[pagination.filter].returnRate] === null? '-': record[filterName[pagination.filter].returnRate]}}<span v-if="record[filterName[pagination.filter].returnRate] !== null">%</span></span>
        </span>
        <span slot="betUserSum" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].betUserSum]>=0?record[filterName[pagination.filter].betUserSum]:"-" }}</span>
        </span>
        <span slot="betUserRate" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].betUserRate] | moneyFormat }}%</span>
        </span>
        <template slot="footer" slot-scope="" >
          <a-table
            class="border-top "
            :columns="columns"
            :dataSource="totalData"
            :scroll="{ x: 1670 }"
            size="middle"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="rowkey" 
            >  
          </a-table>
        </template>
      </a-table>
    </div>
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_data, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/merchantnote/config/config.js";
import { channel_config } from "src/pages/data/merchantnote/config/channelConfig.js";
import { handleCopy } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin, constantmixin],
  components: {
    dialogExcel
  },
  data() {
    return {
      timeValue: undefined,
      dateFormat: "YYYY-MM-DD",
      tabledata: [],
      mode: ['month', 'month'],
      tabledata_loading: false,
      filterName: {
        "1": {
          betAmount: "validBetAmount",
          returnRate: "profitRate",
          profit: "profit",
          orderSum: "validTickets",
          betUserRate: "betUserRate",
          returnAmount: "returnAmount",
          betUserSum: 'validBetUsers',
        },
        "2": {
          betAmount: "liveBetAmount",
          returnRate: "liveProfitRate",
          profit: "liveProfit",
          orderSum: "liveOrderNum",
          betUserRate: "liveUserRate",
          returnAmount: "liveReturn",
          betUserSum: 'liveUsers',
        },
        "3": {
          betAmount: "settleBetAmount",
          returnRate: "settleProfitRate",
          profit: "settleProfit",
          orderSum: "settleOrderNum",
          betUserRate: "settileUserRate",
          returnAmount: "settleReturn",
          betUserSum: 'settleUsers',
        }
      },
      searchForm: {
        agentLevel: "",
        merchantName: "",
        merchantCode: "",
        startDate:moment(new Date().setDate(new Date().getDate() - 2)).format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startDate1:  moment(new Date().setDate(new Date().getDate() - 90)).format("YYYY-MM"), 
        endDate1: moment().format("YYYY-MM"),
        timeZone: "UTC8", //日期类型 EZ是帐务日，UTC8是自然日
        sportId: "",
        currency: "",
        date: ""
      },
      timeZoneList: [
        // { label: '所有账期', value: ''},
        { label: '自然日', value: 'UTC8'},
        { label: '账务日', value: 'EZ'},
      ],
      value: [],
      exportExcelShow: false,
      time: null,
      isopen: false,
    };
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    columns() {
      return this.get_user_info.agentLevel === 1? channel_config: tablecolumns_config;
    }
  },
  created() {
    this.value = [moment(this.searchForm.startDate1,'YYYY-MM'), moment(this.searchForm.endDate1, 'YYYY-MM')];
    this.initTableData();
  },
  methods: {
    moment,
    // 复制商户ID
    handleCopy,
    handleTimeZoneChange(val){
      this.handlerSearch();
    },
    // 关闭月份组件
    handleOpenChange(status) {
      this.isopen = status ? true : false;
    },
    // 更新月份值
    handlePanelChange(value, mode) {
      console.log(mode.indexOf('date'),value,mode,'月份')
      this.value = value;
      this.mode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]];
      if(mode.indexOf('date')>0){
        // console.log(mode.indexOf('date'))
        this.isopen = false;
        this.initTableData();
      } 
    },
    handlerCurrency(val) {
      console.warn(val);
      this.searchForm.currency = val;
      this.initTableData();
    },
    handlerMatches(val) {
      this.searchForm.sportId = val;
      this.initTableData();
    },
    disabledDate(current) {
      return  current.isBefore(moment(Date.now()).add(-90, 'days')) ||  current.isAfter(moment(Date.now()).add(1, 'days'))    
    },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    },
    handlerSearch() {
      this.initTableData();
    },
    onChange(date, dateStrings) {
      if (dateStrings) {
        Object.assign(this.searchForm, {
          startDate: dateStrings[0],
          endDate: dateStrings[1]
        });
        this.initTableData();
      }
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_data.query_merchantlist(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code === "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          if(res.data.data.aggregate){
            let profitRate = res.data.data.aggregate.profitRate? res.data.data.aggregate.profitRate+'%': ''
            let settleProfitRate = res.data.data.aggregate.settleProfitRate? res.data.data.aggregate.settleProfitRate+'%': ''
            this.totalData[0].betAmount = this.pagination.filter == 1?this.$options.filters['moneyFormat'](res.data.data.aggregate.validBetAmountSum): this.$options.filters['moneyFormat'](res.data.data.aggregate.settleBetAmountSum)  // 投注金额
            this.totalData[0].orderSum = this.pagination.filter == 1?this.$options.filters['amount'](res.data.data.aggregate.validTicketsSum): this.$options.filters['amount'](res.data.data.aggregate.settleOrderNumSum)  // 投注笔数
            this.totalData[0].profit = this.pagination.filter==1?this.$options.filters['moneyFormat'](res.data.data.aggregate.profitSum):this.$options.filters['moneyFormat'](res.data.data.aggregate.settleProfitSum) // 平台盈利金额
            this.totalData[0].returnRate = this.pagination.filter==1?profitRate: settleProfitRate// 盈利率
            this.totalData[0].betUserSum = this.pagination.filter==1?res.data.data.aggregate.validBetUsersSum: res.data.data.aggregate.settleUsersSum// 投注用户数                     
            this.totalData[0].addUser = res.data.data.aggregate.addUserSum   //新增用户数
          }
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.tabledata = [];
          code !== '0400403' && this.$message.error(res.data.msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let {
        current,
        pageSize,
        dateType,
        sort,
        orderBy,
        filter
      } = this.pagination;
      let {  merchantName, sportId,currency, date,startDate, endDate,startDate1, endDate1, agentLevel, merchantCode, timeZone } = this.searchForm;
      console.log(currency)
      if(dateType === 'day'){
        startDate = moment(startDate).format("YYYYMMDD");
        endDate = moment(endDate).format("YYYYMMDD");
      }else{
        console.log(this.value)
        startDate = moment(this.value[0]).format("YYYYMM");
        endDate = moment(this.value[1]).format("YYYYMM");
      }
      if (/^\+?[0-9][0-9]*$/.test(merchantName)) {
        merchantCode = merchantName;
        merchantName = "";
      } else {
        merchantName = merchantName;
        merchantCode = "";
      }
      return {
        // date,
        pageNum: current,
        pageSize,
        merchantName,
        merchantCode,
        agentLevel,
        startDate,
        endDate,
        currency,
        timeZone,
        sportId,
        dateType,
        sort,
        orderBy,
        filter
      };
    },
    // 导出报表
    handleExportExcel() {
      // this.exportExcelShow = true;
      if (this.pagination.total > 0) {
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params,{token: this.$q.sessionStorage.getItem('token')}, { url: "/admin/merchantReport/merchantFileExport" });
        api_export.post_excel_export(params,1);
      }
    }
  },
  watch: {
    "pagination.dateType"(val) {
      this.isopen = false;
      console.log(val)
      if (val === "month") {
        this.value = [moment(this.searchForm.startDate1,'YYYY-MM'), moment(this.searchForm.endDate1, 'YYYY-MM')]
      }
    },
    tabledata(val) {
      // 同步表与footer滚动
      let dom = this.$refs.matchTable.$el.querySelectorAll(".ant-table-body")[0];  
      dom.addEventListener(
        "scroll",
        () => {
          this.$refs.matchTable.$el.querySelectorAll(
            ".ant-table-body"
          )[1].scrollLeft = dom.scrollLeft;
        },
        true
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 650px;
  min-height: 650px;
}

>>>.ant-empty-normal {
  margin: 223px 0;
}

// >>>.ant-table-thead > tr > th .ant-table-column-sorter {
//   right: 15%;
// }

.red {
  color: $red;
}


>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}

>>>.ant-table-footer {
  padding 0px;
  padding-right :8px;
}

.text-over1{
  display inline
  max-width 70px ;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}
</style>
