<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="对账单" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="append-handle-btn-input pl20x row line-height-32px" >
            <a-radio-group v-model="searchForm.filter" @change="onChangeFilter">
            <a-radio-button value="3">结算时间</a-radio-button>
            <a-radio-button value="1">投注时间</a-radio-button>            
            <!-- <a-radio-button value="2">开赛时间</a-radio-button> -->
            </a-radio-group>
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
            <div class="position-absolute select-left-border-finance"></div>
          </div>

          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x">日期</div>
            <div class="w-240">
              <a-range-picker
                @change="onChange"
                :default-value="dateFormat"
                :disabled-date="disabledDate"
              />
            </div>              
          </div>
          <div class="append-handle-btn-input pl30x row w-240" v-if="get_user_info.agentLevel === 1">
            <a-input v-model.trim="searchForm.merchantName" placeholder="请输入商户名称/编号" maxLength="20" allowClear autocomplete="off">
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15"/>
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x position-relative" v-if="get_user_info.agentLevel === 1">
            <a-select autocomplete class="w-120" placeholder="结算币种" @change="handlerCurrency">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in currencyList"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
            <a-button type="primary" @click="handlerSearch">搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
         ref="TableInfo"
        class="border-top expanded"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 560 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <div slot="expandedbtn" slot-scope="text, record">
          <div v-for="(item, index) in record.dayVoList" :key="index">
          
            <span v-if="record.dayVoList.length > 1 && index < 1">
              <span
                :class="'row-close' + record._index"
                class="ant-table-row-expand-icon ant-table-row-collapsed"
                @click="tableItemClickExpanded(record)"
              ></span>
            </span>
          </div>
        </div>
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="getStrLength(record.merchantName)>12" placement="top">
                <template slot="title">
                  <span
                    v-html="record.merchantName"
                    :style="`max-width: 120px; word-break:break-all;`"
                  ></span>
                </template>
                <span class="text-over1">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over1">{{record.merchantName}}</span>
            </span>
            <span class="text-panda-text-4 cursor-pointer ml5x text-over3" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="agentLevel" slot-scope="text">
          <span>{{ text | filterAgentLevel }}</span>
        </span>
        <span slot="currencyStr" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span>{{ item.currencyStr }}</span>
          </div>
        </span>
        <span slot="orderUserNum" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderUserNum == null">-</span>
            <span v-else>{{ item.orderUserNum | amount }}</span>
          </div>
        </span>
       <span slot="orderValidNum" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderValidNum== null" >-</span>
           <span v-else>{{ item.orderValidNum| amount }}</span>
          </div>
        </span>
        <span slot="orderAmountTotal" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderAmountTotal == null">-</span>
            <span v-else>{{ item.orderAmountTotal | moneyFormat }}</span>
          </div>
        </span>
        <span slot="platformProfit" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.platformProfit == null">-</span>
            <span v-else>{{ item.platformProfit | moneyFormat }}</span>
          </div>
        </span>
        <span slot="platformProfitRate" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
             <span v-if="item.platformProfitRate==null">-</span>
            <span>{{ item.platformProfitRate | moneyFormat }}%</span>
          </div>
        </span>
       
        <a slot="action" slot-scope="text, record" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">下载对账单</div>
            </template>
            <q-icon @click.native="handleDownLoadRecord(record)" class="panda-icon panda-icon-xia-zai panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <!-- <q-icon
            class="panda-icon panda-icon-xia-zai panda-icon-hover fs18"
            v-else
          >
          </q-icon> -->
        </a>
        <template slot="footer"  >
          <a-table
            class="border-top expanded "
            :columns="totalColumns"
            :dataSource="total_data"
            :scroll="{ x: 1600 }"
            size="middle"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="rowkey" 
            >
             <span slot="action" >
              <div>
                <span>-</span>
              </div>
            </span>
            </a-table>
        </template>
      </a-table>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 260px 0;
}
>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}
>>>.ant-table-footer{
  padding :0;
  padding-right :8px;
}

.text-over1{
  display inline-block;
  max-width 105px;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over3{
  display inline-block;
  max-width 65px ;
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
  max-width: 170px;
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

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}
>>>.ant-table-expanded-row td{
  padding 0px;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_finance,api_export } from "src/api/index.js";
import financesorter from "src/mixins/module/financesorter.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import financeMixin from 'src/pages/finance/statements/mixin/index.js'
import { tablecolumns_config ,dayTotal_config} from "src/pages/finance/statements/config/config.js";
import { channel_config ,channel_dayTotal_config} from "src/pages/finance/statements/config/channelConfig.js";
import { handleCopy,getStrLength } from "src/util/module/common.js";
import {delete_data,delete_no_need_data}from "src/util/module/dataProcessing.js";
import moment from "moment";
export default {
  mixins: [financesorter,commonmixin,constantmixin,financeMixin],
  data() {
    return {
      test_: false,
      tabledata: [],
      innerData: [],
      tabledata_loading: false,
      searchForm: {
        financeDate: '',
        merchantName: "",
        currency: "",
        filter:'3', // 1：投注时间    3：结算时间 （默认）
        timeZone:'UTC8',// 1：账务日    3：自然日（默认）
         startTime:moment(new Date().setDate(new Date().getDate() - 2)).format(
          "YYYY-MM-DD"
        ),// 开始时间
        endTime:moment().format("YYYY-MM-DD"),// 结束时间
      },
      showDialogObj: {},
      show_right_detail_obj: "",
      currentRecord: "",
      dateFormat:[ moment(new Date(new Date().setDate(new Date().getDate() - 2)),'YYYY-MM-DD'),moment(new Date(), 'YYYY-MM-DD')],
      total_data: [], //统计数据
    };
  },
  computed: {
    ...mapGetters(['get_user_info']),
    columns(){
      return this.get_user_info.agentLevel === 1? channel_config: tablecolumns_config;
    },
    totalColumns(){
      return this.get_user_info.agentLevel === 1? channel_dayTotal_config: dayTotal_config;
    }
  },
  created() {
    this.initTableData();
  },
  methods: {
    moment,
    handleCopy,
    getStrLength,
    // 账单下载
    handleDownLoadRecord(item) {
      // window.open(FILE_PREFIX + item.financeDayId);
      let params = {
        url: '/admin/financeMonth/financeDayExport',
        financeDayId: item.financeDayId,
        filter:this.searchForm.filter,
        timeZone:this.searchForm.timeZone,
        token: this.$q.sessionStorage.getItem('token')
      }
     api_export.post_excel_export(params,1)
    
    },
    disabledDate(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(0, 'days'))
    },
    handleTimeZoneChange(val){
      this.handleSearch();
    },
    onChangeFilter(val){
      this.pagination.current = 1, //分页，查询第几页数据。
      this.initTableData();
    },
    handlerCurrency(val) {
      this.searchForm.currency = val;
      this.initTableData();
    },
    handlerSearch(){
      this.initTableData();
    },
    tableItemClickExpanded(item){
      let ind = item._index
      let dom = document.getElementsByClassName("row-close" + ind);
      console.warn(dom[0].classList.value);
      let domvalue = dom[0].classList.value.includes("ant-table-row-collapsed");
      let itemlist = document.getElementsByClassName("row-item-close" + ind);
      if (domvalue) {
        dom[0].classList.remove("ant-table-row-collapsed");
        dom[0].classList.add("ant-table-row-expanded");
      } else {
        dom[0].classList.remove("ant-table-row-expanded");
        dom[0].classList.add("ant-table-row-collapsed");
      }
      this.$lodash.forEach(itemlist, function(val, ind) {
        let itemval = val.classList.value.includes("hidden");
        if (domvalue) {
          val.classList.remove("hidden");
        } else {
          val.classList.add("hidden");
        }
      });  
      if(item.showExpand && Array.isArray(item.dayVoList)){
        item.dayVoList_ = item.dayVoList.slice(0,1);
      }else if (Array.isArray(item.dayVoList)){
        item.dayVoList_ = item.dayVoList.slice();
      }
      this.$forceUpdate();
      item.showExpand = item.showExpand == true? false: true;
    },
    onChange(date, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_finance.post_report_financeMonth_queryFinanceDay(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == '0000000') {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata, "tabledata");
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(msg, 5);
        }
          this.initDayTotal(params);
      });
    },
    initDayTotal(params){
      // 总计
      let paramsTotal = JSON.parse(JSON.stringify(params));
      delete_data(paramsTotal,'pageNum');
      delete_data(paramsTotal,'pageSize');
      api_finance.post_report_financeMonth_queryFinanceDayTotal(paramsTotal).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
      if (code === '0000000') {
          let obj = this.$lodash.get(res, "data.data") || {};
          let data = {};
          let filteArr = ['orderValidNum','orderUserNum']
          filteArr.forEach(item=>{
            data[item]= this.$options.filters['amount'] (obj[item])
          })
          let moneyArr = ['orderAmountTotal','platformProfit','platformProfitRate']
          moneyArr.forEach(item => {      
            data[item]= this.$options.filters['moneyFormat'] (obj[item])
          })
          data.platformProfitRate !='-' &&  data.platformProfitRate != 0? 
          data.platformProfitRate =  data.platformProfitRate + '%':
          data.platformProfitRate = '-'
          Object.assign(this.dayTotal[0],data); 
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let {financeDate,merchantName,currency,filter,timeZone,startTime,endTime} = this.searchForm; 
      let params = {
        merchantName, //商户名称，可模糊搜索
        financeDate,
        currency,
        filter,
        timeZone,
        startTime,
        endTime,
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item.showExpand = false;
      });
      return arr;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 下载对账单
    handleDownLoad(record, index) {
      console.log(record, index, "qqq");
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
