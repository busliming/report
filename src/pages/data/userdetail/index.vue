<template>
  <div class="full-width full-height">
    <div class="pl20x pt20x fs14">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="用户投注统计" class="text-panda-text-4" />
        <q-breadcrumbs-el label="用户投注详情" class="text-panda-text-7 fs14 fw_600" />
      </q-breadcrumbs>
    </div>

    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3 border-radius-4">
      <div
        class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4"
      >
        <div class="append-handle-btn-input pl30x" style="box-sizing: border-box">
          <a-button type="primary" style="height: 30px; line-height: 30px;" @click="handleBack">返回</a-button>
        </div>
        <div class="ml20x">
          统计时段： {{this.$route.query.date}}
        </div>
        <q-space />
        <div class="mr20x">
          用户状态: {{userDetail.disabled === 0? '正常': '禁用'}}
        </div>
      </div>
      <!-- <div
        class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x border-radius-4 ml10x mr10x"
      >
        <div class="bos" style="width: 33.33%">
          <div class="title">用户ID</div>
          <div class="content">{{userDetail.userId}}</div>
        </div>
        <div class="bos" style="width: 33.33%">
          <div class="title">投注金额</div>
          <div class="content" v-if="$route.query.filter == 3">{{userDetail.settleOrderAmount | amount}}</div>
          <div class="content" v-if="$route.query.filter == 2">{{userDetail.liveOrderAmount | amount}}</div>
          <div class="content" v-if="$route.query.filter == 1">{{userDetail.betAmount | amount}}</div>
        </div>
        <div class="bos" style="width: 33.34%">
          <div class="title">活跃天数</div>
          <div class="content">{{userDetail.activeDays}}</div>
        </div>
        <div class="bos" style="width: 33.33%">
          <div class="title">用户名</div>
          <div class="content">{{userDetail.userName}}</div>
        </div>
        <div class="bos" style="width: 33.33%">
          <div class="title">投注笔数</div>
          <div class="content" v-if="$route.query.filter == 3">{{userDetail.settleOrderNum | amount}}</div>
          <div class="content" v-if="$route.query.filter == 2">{{userDetail.liveOrderNum | amount}}</div>
          <div class="content" v-if="$route.query.filter == 1">{{userDetail.betNum | amount}}</div>
        </div>
        <div class="bos" style="width: 33.34%">
          <div class="title">注册时间</div>
          <div class="content">{{moment(userDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
        </div>
        <div class="bos" style="width: 33.33%">
          <div class="title">用户币种</div>
          <div class="content" v-if="userDetail.currencyCode">{{userDetail.currencyCode | filterCurrency}}</div>
          <div class="content" v-else>--</div>
        </div>
        <div class="bos" style="width: 33.33%">
          <div class="title">盈利金额</div>
          <div class="content" v-if="$route.query.filter == 3">{{userDetail.settleProfit | amount}}</div>
          <div class="content" v-if="$route.query.filter == 2">{{userDetail.liveProfit | amount}}</div>
          <div class="content" v-if="$route.query.filter == 1">{{userDetail.profit | amount}}</div>
        </div>
        <div class="bos" style="width: 33.34%">
          <div class="title">最后登录时间</div>
          <div class="content" v-if="userDetail.lastLogin">{{moment(userDetail.lastLoginmoment).format('YYYY-MM-DD HH:mm:ss')}}</div>
          <div class="content" v-else>--</div>
        </div>
      </div> -->
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: 615 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="orderDetailList" slot-scope="text,record">
          <div
            class="card-panel-row row line-height-24px justify-between color-blue"
            v-if="record.seriesType!==1"
          >
            <div class="text-left">
              <span>
                <span class="fw_600">{{ record.seriesValue }}</span>
                &nbsp;&nbsp;共&nbsp;{{record.betCount}}&nbsp;注&nbsp;&nbsp;每注：{{record.orderDetailList[0].betAmount}}
              </span>
            </div>
            <span
              class="panda-icon panda-icon-zhankai-beifen cursor-pointer icon-tog flipy"
              :class="'row-title'+record._index"
              @click="rowtog('row-close'+record._index,'row-title'+record._index)"
            ></span>
          </div>
          <div v-for="(item,key) in text" :key="key">
            <div :class="[key==0?'row-close'+record._index:'hidden row-close'+record._index]" class=" relative-position" style="width: 410px;">
              <q-separator v-if="record.seriesType!==1&&key>0" class="mt5x mb5x hr-grey-1"></q-separator>
              <div class="card-panel-row row line-height-24px justify-between DetailList">
                <div class="leftdetail ">
                  <table-cell-ellipsis-ant
                    :str_all="('<div class=\'text-left Detail-text-grey\'>'+item.sportName +'/'+item.matchName+'</div><div class=\'text-left\'>'+item.matchInfo+'</div> <div class=\'text-left Detail-text-grey\' >'+item.betNo+'&nbsp;('+(item.beginTimeStr?item.beginTimeStr:'')+')</div>')"
                  ></table-cell-ellipsis-ant>
                  <div class="absolute-right" style="top: 25px;right: -80px;">{{betResultName[item.betResult]}}</div>
                </div>
                <div>
                  <div class="card-panel-row row line-height-24px justify-between">
                    <div>
                      <span
                        class="fw_600 text-red"
                      >{{ (item.oddsValue/100000).toFixed(3).slice(0,-1) }}</span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="title-grey"
                      >{{matchTypeName[ item.matchType] }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-panel-row row line-height-24px justify-between">
                <div class="text-left col-6">
                  <table-cell-ellipsis-ant
                    :str_all="('<div  class=\'ellipsis\'>'+item.playName+'&nbsp;&nbsp;</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
                <div class="text-right col-6 fw_600">
                  <table-cell-ellipsis-ant
                    :str_all="('<div  class=\'ellipsis\'>'+item.marketValue+'</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span slot="orderNo" slot-scope="text,record" class="q-gutter-md">
          <a @click="handleDetail(record)" class="a-line">{{text}}</a>
        </span>
        <span slot="productAmountTotal" slot-scope="text" class="q-gutter-md">
          <span>{{text | moneyFormat}}</span>
        </span>
        <span slot="profitAmount" slot-scope="text" class="q-gutter-md">
          <span>{{text | moneyFormat}}</span>
        </span>
        <span slot="settleStatus" slot-scope="text" class="q-gutter-md">
          <span>{{settleStatusName[text]}}</span>
        </span>
      </a-table>
    </div>
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
    <q-dialog v-model="detailShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-Main :detailObj="showDialogObj" @closeDialogSetShow="handleCloseDialogSet"></dialog-Main>
    </q-dialog>
  </div>
</template>

<script>
import { api_data, api_export } from "src/api/index.js";
// import mixins from "src/mixins/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import log_login_mixin from "src/pages/data/userdetail/mixin/index.js";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/userdetail/config/config.js";
import dialogMain from "src/pages/data/userdetail/component/dialogMain.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import moment from 'moment'
export default {
  mixins: [commonmixin, dataCenterMixin, log_login_mixin,constantmixin],
  components: {
    dialogExcel,
    tableCellEllipsisAnt,
    dialogMain
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      exportExcelShow: false,
      detailShow: false,
      showDialogObj: "",
      userDetail: ''
    };
  },
  created() {
    this.initTableData();
    // this.initSessionRecord();
  },
  methods: {
    moment,
    async initSessionRecord(){
      let record = this.$q.sessionStorage.getItem('record');
      this.userDetail = record;
      let res = await api_data.get_admin_userReport_getUserInfo({uid: record.userId})
      // console.warn(res)
      if(res.data.code === '0000000'){
        this.userDetail = {...record,...res.data.data};
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
    rowtog(key, title) {
      let tit = document.getElementsByClassName(title);
      let dom = document.getElementsByClassName(key);
      let domvalue = dom[1].classList.value.includes("hidden");
      let itemlist = document.getElementsByClassName(key);
      if (domvalue) {
        tit[0].classList.remove("flipy");
      } else {
        tit[0].classList.add("flipy");
      }
      this.$lodash.forEach(itemlist, function(val, ind) {
        if (domvalue) {
          val.classList.remove("hidden");
        } else if (ind > 0) {
          val.classList.add("hidden");
        }
      });
    },
    handleDetail(record) {
      this.showDialogObj = { ...record };
      this.detailShow = true;
    },
    handleCloseDialogSet() {
      this.detailShow = false;
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_data.query_userorderlist(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(res.data.msg, 2);
        }
      });
    },
    compute_init_tabledata_params() {
      let { current, pageSize, sort, orderBy } = this.pagination;
      let { sportId, date, dateType, userId, filter } = this.$route.query;
      return {
        pageNum: current,
        pageSize,
        userId,
        sort,
        orderBy,
        sportId,
        date,
        dateType,
        filter
      };
    },
    // 导出报表
    handleExportExcel() {
      if (this.pagination.total > 0) {
        this.exportExcelShow = true;
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params,{token: this.$q.sessionStorage.getItem('token')}, { url: "/admin/userReport/exportUserOrder" });
        api_export.post_excel_export(params, 1);
        setTimeout(() => {
          this.exportExcelShow = false;
          console.log("exportExcelShow");
        }, 500);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
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

>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 640px;
  min-height: 640px;
}

>>>.ant-empty-normal {
  margin: 230px 0;
}

// >>>.ant-table-thead > tr > th .ant-table-column-sorter {
//   right: 15%;
// }

>>>.icon-tog {
  font-size: 16px;
  margin: 5px 0;
}

.bos {
  box-sizing: border-box;
  margin-top: -1px;
}

.title {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333;
  background: #F2F2F2;
  box-sizing: border-box;
}

.content {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333333;
  box-sizing: border-box;
}

</style>
