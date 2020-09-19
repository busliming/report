<!--
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: /panda-bc数据源相关报表系统/src/pages/data/betslip/index.vue
-->


<template>
  <div class="full-width full-height">
    <div class="pl20x fs14" style="padding-top:18px;">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el :label="$t('bet_slip_breadcrumbs.bread1')" class="text-panda-text-4" />
        <q-breadcrumbs-el :label="$t('bet_slip_breadcrumbs.bread2')" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="pl20x pt15x pb15x fs14 bg-panda-bg-6 row" style="margin: 15px 20px 20px 20px">
      <!-- 投注时间tab栏 -->
      <div class="append-handle-btn-input">
        <a-radio-group v-model="pagination.filter">
          <a-radio-button value="1">{{$t('bet_slip_bet')}}</a-radio-button>
          <a-radio-button value="3">{{$t('bet_slip_settle')}}</a-radio-button>
        </a-radio-group>
      </div>
      <!-- <div class="append-handle-btn-input position-relative ml20x" style="margin-top:1px;">
        <a-select
          autocomplete
          class="w-120"
          placeholder="请选择投注"
          v-model="searchForm.seriesType"
          @change="handleChange"
        >
          <a-select-option
            :value="item.value"
            v-for="(item, index) in settleTypeName"
            :key="index"
          >{{ item.label }}</a-select-option>
        </a-select>
        <div class="position-absolute select-left-border-bet"></div>
      </div> -->
      <div class="append-handle-btn-input position-relative ml20x" style="margin-top:1px;">
        <a-select
          autocomplete
          class="w-120"
          placeholder="请选择类型"
          v-model="searchForm.matchType"
          @change="handleChange"
        >
          <a-select-option
            :value="item.value"
            v-for="(item, index) in matchTypeList"
            :key="index"
          >{{ item.label }}</a-select-option>
        </a-select>
        <div class="position-absolute select-left-border-bet"></div>
      </div>
       <div class="append-handle-btn-input pl20x row w-180" style="margin-top:1px; width: 210px;">
        <a-select
          show-search
          mode="multiple"
          :placeholder="$t('bet_slip_order_result_placeholder')"
          option-filter-prop="children"
          style="width: 100%"
          v-model="searchForm.orderStatusList"
          :filterOption="filterOption"
          :disabled="pagination.filter == 3? true: false"
          allowClear
          showArrow
          :maxTagCount="1"
          :maxTagTextLength="4"      
        >
          <!-- @change="handleChange" -->
          <a-select-option
            :value="item.value"
            :label="item.label"
            v-for="(item,index) in settleStatusName"
            :key="'status'+index"
          >{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div class="append-handle-btn-input pl20x row" style="width: 215px;">
        <a-input
          v-model="searchForm.matchId"
          :placeholder="$t('bet_slip_order_bet_id_placeholder')"
          @keydown.enter="handleSearch"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
        </a-input>
      </div>
      <div class="append-handle-btn-input pl20x row" style="width: 215px;">
        <a-input
          v-model.trim="searchForm.userId"
          :placeholder="$t('bet_slip_order_user_name_placeholder')"
          @keydown.enter="handleSearch"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
        </a-input>
      </div>
      <div class="append-handle-btn-input position-relative ml20x" style="margin-top:1px;">
        <a-select
          autocomplete
          class="w-120"
          placeholder="请选择赛种"
          v-model="searchForm.sportId"
          @change="handleSportIdChange"
        >
          <a-select-option
            :value="item.value"
            v-for="(item, index) in allMatches"
            :key="index"
          >{{ item.label }}</a-select-option>
        </a-select>
        <div class="position-absolute select-left-border-bet"></div>
      </div>
      <!-- <div class="append-handle-btn-input pl20x row w-280" style="margin-top:1px;">
        <a-select
          v-model="value"
          mode="multiple"
          style="width: 100%"
          placeholder="请选赛种后输入或选择玩法名称"
          option-label-prop="label"
          :filterOption="filterOption"
          showArrow
          allowClear
          :maxTagCount="2"
          :maxTagTextLength="2"
        >
          <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
          <a-select-option
            :value="item.playId+'/'+index"
            :label="item.playName"
            v-for="(item,index) in hotPlayList"
            :key="'play'+index"
          >{{item.playName}}</a-select-option>
        </a-select>
      </div> -->
      <q-space />
      <a-button
        type="primary"
        style="height: 30px; line-height: 30px;"
        class="mr20x"
        @click="handleExportExcel"
      >
        <a-icon type="export" />
        <span class="ml10x">{{$t('report_btn')}}</span>
      </a-button>
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3 position-relative">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
        >
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x fs14">{{$t('bet_slip_time')}}</div>
            <div class="mr20x">
              <a-range-picker
                show-time
                show-today
                :allowClear="false"
                :disabled-date="disabledDate"
                :value="[moment(searchForm.startTime,'YYYY-MM-DD HH:mm:ss'), moment(searchForm.endTime, 'YYYY-MM-DD HH:mm:ss')]"    
                @change="onChange"
                :format="dateFormat"
              />
            </div>
          </div>
          <div class="append-handle-btn-input pl40x row line-height-32px">
            <div style="line-height: 32px; margin-right: 10px;">{{ $t('bet_slip_stake') }}</div>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.minBetAmount"
                :placeholder="$t('bet_slip_min')"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.maxBetAmount"
                :placeholder="$t('bet_slip_max')"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl40x row line-height-32px">
            <div style="line-height: 32px; margin-right: 10px;">{{ $t('bet_slip_win') }}</div>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.minProfit"
                :placeholder="$t('bet_slip_min')"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-80">
              <a-input-number
                v-model.trim="searchForm.maxProfit"
                :placeholder="$t('bet_slip_max')"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <!-- <div class="append-handle-btn-input pl30x row" style="margin-top:1px; width: 210px;" v-if="get_user_info.agentLevel == 1">
            <a-select
              show-search
              placeholder="请输入或选择商户名称"
              option-filter-prop="children"
              style="width: 100%"
              :filterOption="filterOption"
              allowClear
              @change="handleMerchantChange"
            >
              <a-select-option
                :value="item.merchant_name"
                :label="item.merchant_name"
                v-for="(item,index) in merhchantList"
                :key="'merchant'+index"
              >{{item.merchant_name}}</a-select-option>
            </a-select>
          </div>
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <a-checkbox v-model="isMore">
              二次结算
            </a-checkbox>
          </div> -->
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handleSearch"
            >{{$t('search_btn')}}</a-button>
          </div>
          <div class="fs16 position-absolute" style="bottom: 11px; left: 20px;" v-if="tabledata.length>0">
            <span class="pr20x">
              <span class="title-grey">{{ $t('bet_slip_total_orders') }}: </span>
              <span class="fw_600">{{userStatistics.sumBetNo}}</span>
            </span>
            <span class="pr20x">
              <span class="title-grey">{{ $t('bet_slip_total_users') }}: </span>
              <span class="fw_600">{{userStatistics.userAmount}}</span>
            </span>
            <span class="pr20x">
              <span class="title-grey">{{ $t('bet_slip_total_bets') }}: </span>
              <span class="fw_600" v-if="userStatistics.betAmount">¥ {{userStatistics.betAmount}}</span>
              <span class="fw_600" v-else>--</span>
            </span>
            <span class="pr20x">
              <span class="title-grey">{{ $t('bet_slip_total_win') }}: </span>
              <span
                v-if="userStatistics.sumProfitAmount !== undefined"
                class="fw_600"
                :class="userStatistics.sumProfitAmount>0?'text-red': 'text-green'"
              >¥ {{userStatistics.sumProfitAmount}}</span>
              <span v-else>--</span>
            </span>
          </div>
        </div>
      </div>
      <a-table
        class="border-top parent-table-open"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x:1670, y: 535 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        :expandedRowKeys="expandedRowKeysByDetail"
        size="middle"
        rowKey="orderNo"
      >
        <!-- 用户 -->
        <div slot="userId" slot-scope="text,record" class="tdpadding">
          <div>
            <div class="text-pande-primary color-blue" v-if="searchForm.seriesType == 2 || record.seriesType != 1">
              <span>{{ record.seriesValue }}</span>
              <span class="q-ml-md">共:{{ record.betCount }} 注</span>
              <span class="q-ml-md">每注: {{ record.orderDetailList[0].betAmount}}</span>
            </div>
            <span
              class="cursor-pointer"
              @click="handleCopy(record.userName,'用户名')"
            >{{ record.userName }}</span>
          </div>
          <div>
            <div
              class="Detail-text-grey cursor-pointer"
              @click="handleCopy(record.orderNo,'注单号')"
            >{{$t('bet_slip_user_bet')}} {{record.orderNo}}</div>
            <div
              class="Detail-text-grey cursor-pointer"
              @click="handleCopy(record.uid,'用户ID')"
            >{{$t('bet_slip_user_user')}} {{record.uid}}</div>
          </div>
        </div>
        <!-- 赛事信息 -->
        <div slot="betNoInfo" slot-scope="text,record">
          <div v-for="(item, index) in record.orderDetailList" :key="index" class="item-content">
            <q-separator v-if="record.orderDetailList!==1&&index>0" class="mt5x mb5x hr-grey"></q-separator>
            <div class="item-open  position-relative">
              <table-cell-ellipsis-ant
                :span_html="('<div class=\'ellipsis\'>'+item.matchInfo+'</div><div class=\'ellipsis Detail-text-grey\'>'+ item.sportName  +'&nbsp;/&nbsp;'+  item.matchName +'</div>')"
                :str_all="('<div>'+item.matchInfo+'</div><div>'+ item.sportName  +'&nbsp;/&nbsp;'+  item.matchName +'</div>')"
              ></table-cell-ellipsis-ant>
              <span
                class="Detail-text-grey cursor-pointer"
                @click="handleCopy(item.matchId,'赛事ID')"
              >{{$t('bet_slip_match_id')}} {{item.matchId}}</span>
              <div
                class="Detail-text-grey col-2 position-absolute"
                style="right: 5px; bottom: 3px;"
              >{{item.beginTimeStr&&item.beginTimeStr.substring(5,item.beginTimeStr.length)}}
              </div>
            </div>     
          </div>
        </div>
        <!-- 注单详情 -->
        <div slot="betNoDetail" slot-scope="text,record">
          <div v-for="(item, index) in record.orderDetailList" :key="index" style="width:300px;" class=" position-relative">
            <div v-if="record.orderDetailList!==1&&index>0" class="hr-grey mt5x mb5x" style="width: 100%; height:1px;"></div>
            <div class="item-open">
              <div class="row justify-between">
                <div class="ellipsis">{{ item.playName }} <span v-if="item.scoreBenchmark">[{{item.scoreBenchmark.replace(':',"-")}}]</span></div>
                <div
                  class="ellipsis"
                >{{ matchTypeList[item.matchType].label }}</div>
              </div>
              <div class="row justify-between">
                <div :class="[searchForm.seriesType == 2 || searchForm.seriesType == '' || searchForm.seriesType == 1?'col-10':'col-12']">
                  <table-cell-ellipsis-ant
                    :span_html="('<div class=\'text-FFBA72 ellipsis\'>'+item.marketValue+'</div>')"
                    :str_all="('<div>'+item.marketValue+'</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
              </div>
            </div>
            <div
              class="Detail-text-grey position-absolute"
              style="right: 10px; bottom: 0px;"
            >{{$t('bet_slip_betting_time')}} {{record.createTimeStr&&record.createTimeStr.substring(5,record.createTimeStr.length)}}</div>
          </div>
        </div>
        <!-- 赔率 -->
        <div slot="oddsValue" slot-scope="text,record">
          <template v-if="searchForm.seriesType == '' || searchForm.seriesType == 2 ">
            <div v-for="(item, index) in record.orderDetailList" :key="'oddsValue'+index">
              <q-separator v-if="record.orderDetailList!==1&&index>0" class="mt5x mb5x hr-grey"></q-separator>
              <div class="item-open">
                <div class="text-red pt10x">{{ getFloatStr(item.oddFinally) }}</div>
                <div class="Detail-text-grey" v-if="searchForm.seriesType == '' && record.seriesType == 1">[{{item.marketType}}]</div>
                <div :class="item.betResult == 4?'fs12': 'Detail-text-grey'" v-if="record.seriesType != 1">{{ item.betResult | filterStatues }}</div>
              </div>
            </div>
          </template>
          <div v-for="(item, index) in record.orderDetailList" :key="index">
            <div v-if="index<1 && searchForm.seriesType == 1">
              <div class="text-red">{{ getFloatStr(item.oddFinally) }}</div>
              <div class="Detail-text-grey">[{{item.marketType}}]</div>
            </div>
          </div>
        </div>
        <!-- 投注金额 -->
        <div slot="betAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{record.orderAmountTotal? record.orderAmountTotal: '-' | amount}}</div>
            <div class="Detail-text-grey">{{ record.currencyCode && currencyList[record.currencyCode].label }}</div>
          </div>
        </div>
        <!-- 用户盈利 -->
        <div slot="profitAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{record.profitAmount ?record.profitAmount:'-' | amount}}</div>
            <div class="Detail-text-grey">{{ record.currencyCode && currencyList[record.currencyCode].label }}</div>
          </div>
        </div>
        <!-- 投注人民币 -->
        <div slot="orderAmountTotal" slot-scope="text,record">
          <div class="item-open flex items-center justify-center">
            <div>{{!record.localBetAmount?'-':record.localBetAmount | amount}}</div>
            <!-- <div class="Detail-text-grey">{{ record.currencyCode && currencyList[record.currencyCode].label }}</div> -->
          </div>
        </div>
        <!-- 币种 -->
        <div slot="currencyCode" slot-scope="text,record">
          <div class="item-open flex items-center justify-centerflex items-center justify-center">
            {{ record.currencyCode && currencyList[record.currencyCode].label}}
              <!-- <div>[{{ text&&deviceTypeName[text] }}]</div>
              <div class="Detail-text-grey">{{ record.ip }}</div>
              <div class="Detail-text-grey">{{ record.ipArea }}</div> -->
          </div>
        </div>
        <!-- 过关类型 -->
        <div slot="seriesType" slot-scope="text,record">
          <span v-if="record.seriesType === 1">{{ $t('bet_slip_betting_types.type2') }}</span>
          <span v-else-if="record.seriesType === 2">{{ $t('bet_slip_betting_types.type3') }}</span>
        </div>
        <!-- 状态 -->
        <div slot="outcome" slot-scope="text,record">
          <div class="item-open">
            <div
              v-if="record.orderStatus !== 1"
              :class="[3,4].includes(record.orderStatus)?['text-red']:''"
              class="pt20x"
            >{{settleStatusNameObj[record.orderStatus]}}</div>
            <div
              :class="['4','5'].includes(text)?['text-red']:''"
              class="pt10x"
            >
              <span>{{filterstatues[record.outcome]}}</span>
            </div>
            <div
              class="Detail-text-grey"
            >{{ record.settleTimeStr&&record.settleTimeStr.substring(5,record.settleTimeStr.length) }}</div>
          </div>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api_data, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import log_login_mixin from "src/pages/data/betslip/mixin/index.js";
import { tablecolumns_config } from "src/pages/data/betslip/config/config.js";
// import { tablecolumns_config1 } from "src/pages/data/betslip/config/config_1.js";
import { handleCopy } from "src/util/module/common.js";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin, log_login_mixin, constantmixin],
  components: {
    tableCellEllipsisAnt,
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      expandedRowKeysByDetail: [],
      tabledata: [],
      columns: tablecolumns_config, // 单关
      // columns1: tablecolumns_config1, //串关
      tabledata_loading: false,
      visable_select: false, // 下拉框是否显示
      // 用户统计
      userStatistics: {
        // 投注总额统计
        betAmount: "",
        // 注单统计
        sumBetNo: "",
        // 用户净输赢统计
        sumProfitAmount: "",
        // 用户统计
        userAmount: "",
        // 有效流水
        validFlow: ""
      },
      searchForm: {
        sportId: "",
        seriesType: '',
        matchType: "",
        orderStatusList: [],
        matchId: "",
        userId: "",
        userName: "",
        merchantName: "",
        orderNo: "",
        startTime: `${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 00:00:00`,
        endTime: `${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 23:59:59`,
        // startTime: "2020-05-01 12:00:00",
        // endTime: "2020-06-06 12:00:00",
        minBetAmount: "",
        maxBetAmount: "",
        minProfit: "",
        maxProfit: "",
        playIdList: '',
        settleType: ''
      },
      value: [],
      hotPlayList: [],
      merhchantList: [],
       isMore: false, // 多次结算
      detailObj: {},
    };
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  created() {
    this.initTableData();
    // this.initHotPlayName();
    this.initMerchantList();
  },
  watch: {
    value(val) {
      console.log(`selected:`, val);
      if (val && val.length > 0) {
        this.values = val.map(item => (item = item.split("/")[0]));
      }else{
        this.values = ''
      }
      console.log(this.values);
    },
    "pagination.filter"(val){
      this.searchForm.orderStatusList= val == 3?[1]: [];
    }
  },
  methods: {
    /**
     * @description 13.123转为13.12 10.1转为10.10
     * @param  {number} num 赔率
     * @return {number} num
     */
    getFloatStr(num){
      num += '';
      num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
      if (/^0+/) //清除字符串开头的0
      num = num.replace(/^0+/, '');
      if (!/\./.test(num)) //为整数字符串在末尾添加.00
      num += '.00';
      if (/^\./.test(num)) //字符以.开头时,在开头添加0
      num = '0' + num;
      num += '00'; //在字符串末尾补零
      num = num.match(/\d+\.\d{2}/)[0];
      return num;
    },
    // 导出报表
    handleExportExcel() {
      console.log((new Date(this.searchForm.endTime) - (new Date(this.searchForm.startTime)))/1000/60/60/24 > 1);
      if (this.pagination.total > 0) {
        if((new Date(this.searchForm.endTime) - (new Date(this.searchForm.startTime)))/1000/60/60/24 <= 1){
          let params = this.compute_init_tabledata_params();
          params = this.delete_empty_property_with_exclude(params);
          Object.assign(params,{token: this.$q.sessionStorage.getItem('token')},{language: this.$q.sessionStorage.getItem('language')},{ url: "/bc/order/exportTicketList" });
          api_export.post_excel_export(params,1);
        }else{
          this.$message.warn(this.$t('report'),5)
        }
        
      }
    },
    disabledDate(current) {
      return  current.isBefore(moment(Date.now()).add(-90, 'days')) ||  current.isAfter(moment(Date.now()).add(1, 'days'))    
    },
    handleMerchantChange(value) {
      this.searchForm.merchantName = value;
      console.log(`selected ${value}`);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(val) {
      this.handleSearch();
    },
    handleSportIdChange(){
      this.handleSearch();
      // this.initHotPlayName();
    },
    async initMerchantList(){
      let res = await api_data.post_admin_merchantReport_queryMerchantList({})
      // console.warn(res.data);
      if ((res.data.code = "0000000")) {
        this.merhchantList = res.data.data || [];
      }
    },
    // 注单中心统计接口
    queryStatistics(params) {
      api_data.post_bc_order_getStatistics(params)
        .then(res => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || {};
          if (sus == "0000000") {
            this.userStatistics = data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    moment,
    handleCopy,
    onChange(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
    },
    handleSearch() {
      this.initTableData();
    },
    handleLook(row, index) {
      console.warn(row, index);
    },
    async initHotPlayName() {
      let res = await api_data.post_admin_userReport_queryHotPlayName({sportId: this.searchForm.sportId});
      console.log(res.data);
      if ((res.data.code = "0000000")) {
        this.hotPlayList = res.data.data || [];
      }
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      this.queryStatistics(params);
      api_data.post_bc_order_queryTicketList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.expandedRowKeysByDetail = this.tabledata.map(x => x.id);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }else{
          this.tabledata = [];
          // res.data.msg && this.$message.error(res.data.msg);
          code !== '0400403' && this.$message.error(res.data.msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let { current, pageSize, sort, orderBy, filter } = this.pagination;
      let {
        sportId,
        seriesType,
        matchType,
        orderStatusList,
        matchId,
        userId,
        userName,
        merchantName,
        orderNo,
        startTime,
        endTime,
        minBetAmount,
        maxBetAmount,
        minProfit,
        maxProfit,
        playIdList,
        settleType
      } = this.searchForm;
      // startTime = startTime ? (startTime += " 00:00:00") : startTime;
      // endTime = endTime ? (endTime += " 23:59:59") : endTime;
      if (/^\+?[0-9][0-9]*$/.test(userId) && userId.length > 16) {
        userId = userId;
        userName = "";
      } else {
        userName = userId;
        userId = "";
      }
      if (matchId.length > 7) {
        (orderNo = matchId), (matchId = "");
      } else {
        (matchId = matchId), (orderNo = "");
      }
      return {
        pageNum: current,
        pageSize,
        matchId,
        minProfit,
        maxProfit,
        minBetAmount,
        maxBetAmount,
        orderNo,
        startTime,
        endTime,
        userId,
        userName,
        merchantName,
        sportId,
        filter,
        seriesType,
        orderStatusList: orderStatusList.length > 0?orderStatusList: '',
        matchType,
        sort,
        orderBy,
        playIdList: this.values,
        settleType: this.isMore? '30': ''
      };
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
  margin: 246px 0;
}

>>>.match-team-child {
  .text-panda-text-light {
    >>>.show_toggle {
      position: absolute;
      right: 0;
    }
  }
}

.center {
  width: 30px;
  border-left: 0;
  pointer-events: none;
  background-color: #fff;
}

.max {
  width: 100px;
  text-align: center;
  border-left: 0;
}

.min {
  width: 100px;
  text-align: center;
  border-right: 0;
  border-radius: 4px 0 0 4px;
}

>>>.leftdetail div {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flipy {
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /* IE */
  filter: FlipV;
}

>>>.icon-tog {
  font-size: 16px;
}

.remarklist {
  width: 180px;
}

.item-content {
  width: 250px;
}

$paddingtd = 8px;

.item-open {
  height: 60px;
  padding: 0 $paddingtd;
}

.tdpadding {
  padding: 0 $paddingtd;
}

.ellipsis {
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
