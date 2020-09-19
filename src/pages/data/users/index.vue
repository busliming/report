<template>
  <div class="full-width full-height">
    <div class="pl20x pt20x fs14">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="用户投注统计" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="pl20x pt15x pb15x fs14 bg-panda-bg-6 row" style="margin: 15px 20px 20px 20px">
      <!-- 投注时间tab栏 -->
      <div>
        <a-radio-group v-model="pagination.filter">
          <a-radio-button value="3">结算时间</a-radio-button>   
          <a-radio-button value="1">投注时间</a-radio-button>   
          <!-- <a-radio-button value="2">开赛时间</a-radio-button>  -->
        </a-radio-group>
      </div>
      <!-- 投注周期tab栏 -->
      <div class="ml20x">
        <a-radio-group v-model="pagination.dateType" class="pl20x">
          <a-radio-button value="day">日</a-radio-button>
          <!-- <a-radio-button value="week">周</a-radio-button>  2020-06-28-->
          <a-radio-button value="month">月</a-radio-button>
          <!-- <a-radio-button value="year">年</a-radio-button> -->
        </a-radio-group>
      </div>
      <!-- 日期选择 -->
      <div class="ml20x">
        <a-date-picker
          :disabledDate="disabledDate"
          :disabledTime="disabledDateTime"
          v-if="pagination.dateType==='day'"
          :defaultValue="defaultDay"
          @change="handleSelectDay"
        />
        <a-week-picker
          :disabledDate="disabledDate"
          v-else-if="pagination.dateType==='week'"
          placeholder="请选择周期"
          :defaultValue="defaultWeek"
          @change="handleSelectWeek"
        ></a-week-picker>
        <a-month-picker
          :disabledDate="disabledDate"
          v-else-if="pagination.dateType==='month'"
          placeholder="请选择月份"
          :defaultValue="defaultMonth"
          @change="handleSelectMonth"
        />
        <a-date-picker
          placeholder="请选择年份"
          mode="year"
          format="YYYY"
          v-else-if="pagination.dateType==='year'"
          :value="time"
          :open="isopen"
          @panelChange="handlePanelChange"
          @openChange="handleOpenChange"
          @change="handleChange"
        />
      </div>
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
        >
          <div class="append-handle-btn-input position-relative ml20x">
            <a-select
              autocomplete
              class="w-120"
              placeholder="体育种类"
              v-model="searchForm.sportId"
              @change="handlerMatches"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input
              v-model.trim="searchForm.userName"
              placeholder="输入用户名/用户ID"
              @keydown.enter="handlerSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x row w-240" v-if="get_user_info.agentLevel === 1">
            <a-input
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              @keydown.enter="handlerSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x row w-240" v-if="get_user_info.agentLevel === 1">
            <a-input
              v-model.trim="searchForm.merchantCode"
              placeholder="请输入商户编号"
              @keydown.enter="handlerSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl40x row line-height-32px">
            <div style="line-height: 32px; margin-right: 10px;">投注金额</div>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.minBetAmount"
                placeholder="最小值"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.maxBetAmount"
                placeholder="最大值"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input position-relative ml30x">
            <a-select autocomplete class="w-120" placeholder="币种类型" @change="handlerCurrency">
              <a-select-option
                :value="item.value"
                v-for="(item) in currencyList"
                :key="'currency' + item.value"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl30x" style="box-sizing: border-box">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handlerSearch"
            >搜索</a-button>
          </div>
          <q-space />
          <div>
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
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: 535 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="userId" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userId,'用户ID')">{{record.userId}}</span>
        </span>
        <span slot="userName" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userName,'用户名')">{{record.userName}}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record" class="q-gutter-sm">
          <span class=" cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">{{record.merchantName}}</span><span class="text-panda-text-4 cursor-pointer" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
        </span>
        <span slot="currency" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.currency">{{record.currency | filterCurrency}}</span>
          <span v-else>暂未返回</span>
        </span>
        <span slot="betNum" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betNum] | amount}}</span>
        </span>
        <span slot="betAmount" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betAmount] | moneyFormat}}</span>
        </span>
        <span slot="profit" slot-scope="text, record" class="q-gutter-md">
          <span v-bind:class="[record[filterName[pagination.filter].profit]<0?'red':'']">
            <span>{{record[filterName[pagination.filter].profit] | moneyFormat}}</span>
          </span>
        </span>
        <span slot="profitRate" slot-scope="text, record" class="q-gutter-md">
          <span
            v-bind:class="[record[filterName[pagination.filter].profitRate]<0?'red':'']"
            v-if="record[filterName[pagination.filter].profitRate]"
          >{{ record[filterName[pagination.filter].profitRate] | moneyFormat}}%</span>
          <span v-else>-</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看投注详情</div>
            </template>
            <q-icon @click.native="handleLook(record)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </a>
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
import { tablecolumns_config } from "src/pages/data/users/config/config.js";
import { channel_config } from "src/pages/data/users/config/channelConfig.js";
import { handleCopy } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin, constantmixin],
  components: {
    dialogExcel
  },
  data() {
    return {
      tabledata: [],
      tabledata_loading: false,
      filterName: {
        "1": {
          betNum: "validTickets",
          betAmount: "validBetAmount",
          profit: "profit",
          profitRate: "profitRate"
        },
        "2": {
          betNum: "liveOrderNum",
          betAmount: "liveOrderAmount",
          profit: "liveProfit",
          profitRate: "liveProfitRate"
        },
        "3": {
          betNum: "settleOrderNum",
          betAmount: "settleOrderAmount",
          profit: "settleProfit",
          profitRate: "settleProfitRate"
        }
      },
      dateFormat: "YYYY-MM-DD",
      searchForm: {
        userName: "",
        userId: "",
        merchantName: "",
        merchantCode: "",
        minBetAmount: "",
        maxBetAmount: "",
        currency: "",
        sportId: "",
        date: ""
      },
      exportExcelShow: false,
      isopen: false, // 处理年份组件阀值
      defaultDay: null, // 默认日期
      defaultWeek: null, // 默认周数
      defaultMonth: null, // 默认月份
      time: null // 默认年份
    };
  },
  created() {
    this.initSessionObj();
    this.initTableData();
  },
  computed: {
    ...mapGetters(['get_user_info']),
    columns() {
      return this.get_user_info.agentLevel === 1
        ? channel_config
        : tablecolumns_config;
    }
  },
  directives: {
    width_eq_prev(el) {
      let prev = el && el.previousElementSibling;
      if (prev) {
        let width = prev.offsetWidth || 300;
        el.style.width = width + "px";
      }
    }
  },
  methods: {
    moment,
    // 复制
    handleCopy,
    handlerCurrency(val) {
      console.warn(val);
      this.searchForm.currency = val;
      this.initTableData();
    },
    // 处理用户投注详情回旋参数
    initSessionObj() {
      let cachParams = this.$q.sessionStorage.getItem("cachParams"); // 做点击详情跳转参数，回旋
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate");
      if (cachParams) {
        this.pagination.filter = cachParams.filter;
        this.pagination.dateType = cachParams.dateType;
        this.searchForm.date = cachParams.date;
        this.searchForm.sportId = cachParams.sportId;
        this.searchForm.userName = cachParams.userName;
        this.searchForm.merchantName = cachParams.merchantName;
        if (this.pagination.dateType === "day") {
          this.searchForm.day = moment(cachParams.date).format("YYYYMMDD");
          this.defaultDay = moment(
            moment(cachParams.date).format("YYYYMMDD"),
            this.dateFormat
          );
        } else if (this.pagination.dateType === "week") {
          this.searchForm.week = cachParams.date;
          this.defaultWeek = moment(
            moment(cachParams.date).format("YYYYMMDD"),
            this.dateFormat
          );
          console.log(this.defaultWeek, "defaultWeek");
        } else if (this.pagination.dateType === "month") {
          this.searchForm.week = moment(cachParams.date).format("YYYYMM");
          this.defaultMonth = moment(
            moment(cachParams.date).format("YYYYMMDD"),
            this.dateFormat
          );
        } else {
          this.searchForm.yeah = moment(cachParams.date).format("YYYYMM");
          this.time = moment(
            moment(cachParams.date).format("YYYYMMDD"),
            this.dateFormat
          );
        }
      } else {
        this.searchForm.date = moment().format("YYYYMMDD");
        this.defaultDay = moment(moment().format("l"), this.dateFormat);
      }
      console.log(this.searchForm.date, "initSessionObj");
    },
    //选择日期参数处理
    handleSelectDay(date, dateString) {
      //  2020-04-11 转为 20200411
      this.searchForm.day = moment(dateString).format("YYYYMMDD");
      this.$q.sessionStorage.set("selectedDate", date);
      this.initTableData();
    },
    //选择周参数处理
    handleSelectWeek(date, dateString) {
      this.searchForm.week = dateString.replace(/-/g, "").replace("周", "");
      this.$q.sessionStorage.set("selectedDate", date);
      this.initTableData();
    },
    //选择月份参数处理
    handleSelectMonth(date, dateString) {
      this.searchForm.month = moment(dateString).format("YYYYMM");
      this.$q.sessionStorage.set("selectedDate", date);
      this.initTableData();
    },
    // 更新年份值
    handlePanelChange(value, mode) {
      this.isopen = false;
      this.time = value;
      this.searchForm.year = moment(this.time).format("YYYY");
      this.$q.sessionStorage.set("selectedDate", value);
      this.initTableData();
    },
    // 体育赛事种类切换
    handlerMatches(val) {
      this.searchForm.sportId = val;
      this.initTableData();
    },
    disabledDate(current) {
      return current && current > moment().endOf("day");
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
    handleLook(record, index) {
      let { sportId, date, userName, merchantName } = this.searchForm;
      let { dateType, filter } = this.pagination;
      date = this.computeSelectedDate(dateType, date);
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate");
      let params = {
        filter,
        dateType,
        date: selectedDate
          ? moment(moment(selectedDate).format("l"), this.dateFormat)
          : moment(moment().format("l"), this.dateFormat),
        sportId,
        userName,
        merchantName
      };
      console.log(dateType, date, "@@@");
      this.$q.sessionStorage.set("cachParams", params);
      this.$q.sessionStorage.set('record',record);
      this.$router.push({
        name: "users_user_detail",
        query: {
          userId: record.userId,
          sportId,
          date,
          dateType,
          filter,
          user: record.userName,
          merchantName
        }
      });
    },
    // 关闭年期组件
    handleOpenChange(status) {
      this.isopen = status ? true : false;
    },

    // 清除年份值
    handleChange() {
      this.time = null;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
      let newdate = "";
      if (dateString) {
        if (this.pagination.dateType === "week") {
          newdate = dateString.replace(/-/g, "").replace("周", "");
          this.searchForm.date = newdate;
        } else if (this.pagination.dateType === "day") {
          this.searchForm.date = moment(dateString).format("YYYYMMDD");
        } else if (this.pagination.dateType === "month") {
          this.searchForm.date = moment(dateString).format("YYYYMM");
        }
        this.$q.sessionStorage.set("selectedDate", date);
        console.log(this.searchForm.date, "newdate");
        this.initTableData();
      }
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_data.query_userbetlist_byTime(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }else{
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
      let {
        userId,
        userName,
        merchantName,
        merchantCode,
        minBetAmount,
        maxBetAmount,
        currency,
        sportId,
        date
      } = this.searchForm;
      if (/^\+?[0-9][0-9]*$/.test(userName) && userName.length > 16) {
        userId = userName;
        userName = "";
      } else {
        userName = userName;
        userId = "";
      }
      date = this.computeSelectedDate(dateType, date);

      console.log(date, dateType, "查看bug");
      return {
        date,
        pageNum: current,
        pageSize,
        userId,
        userName,
        merchantName,
        merchantCode,
        minBetAmount,
        maxBetAmount,
        currency,
        sportId,
        dateType,
        sort,
        orderBy,
        filter
      };
    },
    // 处理给后台传参
    computeSelectedDate(dateType, date) {
      let cachParams = this.$q.sessionStorage.getItem("cachParams"); // 用户进入详情页面，回旋参数
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate"); // 用户是否主动选择日期

      if (selectedDate && cachParams) {
        // 用户主动选择日期且有进入详情页
        if (dateType === "day") {
          date = moment(selectedDate).format("YYYYMMDD");
        } else if (dateType === "week") {
          date =
            (moment(selectedDate).format("YYYY") +
              this.getYearWeek(moment(selectedDate).format("YYYY-MM-DD"))) *
              1 -
            1;
        } else if (dateType === "month") {
          date = moment(selectedDate).format("YYYYMM");
        } else {
          date = moment(selectedDate).format("YYYY");
        }
      } else if (cachParams) {
        //用户进入详情页面and未主动选日期
        if (dateType === "day") {
          date = moment(date).format("YYYYMMDD");
        } else if (dateType === "week") {
          date =
            (moment(date).format("YYYY") +
              this.getYearWeek(moment(date).format("YYYY-MM-DD"))) *
              1 -
            1;
        } else if (dateType === "month") {
          date = moment(date).format("YYYYMM");
        } else {
          date = moment(date).format("YYYY");
        }
      } else {
        // 分用户未进入详情页面和是否主动选择日期
        if (dateType === "day") {
          date = this.searchForm.day
            ? this.searchForm.day
            : moment().format("YYYYMMDD");
        } else if (dateType === "week") {
          date = this.searchForm.week
            ? this.searchForm.week * 1 - 1
            : (moment().format("YYYY") +
                this.getYearWeek(moment().format("YYYY-MM-DD"))) *
                1 -
              1;
        } else if (dateType === "month") {
          date = this.searchForm.month
            ? this.searchForm.month
            : moment().format("YYYYMM");
        } else {
          date = this.searchForm.year
            ? this.searchForm.year
            : moment().format("YYYY");
        }
      }
      return date;
    },
    // 导出报表
    handleExportExcel() {
      if (this.pagination.total > 0) {
        // this.exportExcelShow = true;
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        
        Object.assign(params,{token: this.$q.sessionStorage.getItem('token')}, { url: "/admin/userReport/exportUserOrderReport" });
        api_export.post_excel_export(params,1);
      } else {
        this.$message.error("暂无数据！");
      }
    }
  },
  watch: {
    // 处理给日期组件赋值
    "pagination.dateType"(val) {
      console.log(val, "watch监听数据");
      let cachParams = this.$q.sessionStorage.getItem("cachParams");
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate");
      if (selectedDate && cachParams) {
        this.defaultDay = moment(
          moment(selectedDate).format("l"),
          this.dateFormat
        );
        this.defaultWeek = moment(
          moment(selectedDate).format("l"),
          this.dateFormat
        );
        this.defaultMonth = moment(
          moment(selectedDate).format("l"),
          this.dateFormat
        );
        this.time = moment(moment(selectedDate).format("l"), this.dateFormat);
      } else if (cachParams) {
        this.defaultDay = moment(
          moment(cachParams.date).format("l"),
          this.dateFormat
        );
        this.defaultWeek = moment(
          moment(cachParams.date).format("l"),
          this.dateFormat
        );
        this.defaultMonth = moment(
          moment(cachParams.date).format("l"),
          this.dateFormat
        );
        this.time = moment(
          moment(cachParams.date).format("l"),
          this.dateFormat
        );
      } else {
        this.defaultDay = moment(moment().format("l"), this.dateFormat);
        this.defaultWeek = moment(moment().format("l"), this.dateFormat);
        this.defaultMonth = moment(moment().format("l"), this.dateFormat);
        this.time = moment(moment().format("l"), this.dateFormat);
      }
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
  margin: 244px 0;
}

// >>>.ant-table-thead > tr > th .ant-table-column-sorter {
//   right: 15%;
// }

.red {
  color: $red;
}

>>>.match-team-child {
  .text-panda-text-light {
    >>>.show_toggle {
      position: absolute;
      right: 0;
    }
  }
}
</style>
