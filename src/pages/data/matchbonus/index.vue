<template>
  <div class="full-width full-height">
    <div class="pl20x pt20x fs14">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el :label="$t('match_bonus_breadcrumbs.bread1')" class="text-panda-text-4" />
        <q-breadcrumbs-el :label="$t('match_bonus_breadcrumbs.bread2')" class="fw_600 text-panda-text-7 fs14" />
        <!-- {{$t('test')}} -->
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3 border-radius-4">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
        >
          <div class="append-handle-btn-input pl30x position-relative">
            <a-select autocomplete :class="is_zs?'w-120': 'w-190'" :placeholder="$t('match_bonus_placeholder')" v-model="searchForm.sportId" @change="handleChangeSportId">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x fs14">{{$t('match_bonus_time')}}</div>
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
          <!-- <div class="append-handle-btn-input ml20x w-240">
            <a-range-picker
              :defaultValue="defaultValue"
              :disabled-date="disabledDate"
              @change="onChange"
            />
          </div> -->
          <!-- <div class="append-handle-btn-input pl30x row w-240">
            <a-input
              v-model.trim="searchForm.tournamentId"
              placeholder="请输入联赛ID"
              @keydown.enter="handleSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x row w-250">
            <a-input
              v-model.trim="searchForm.matchId"
              placeholder="请输入赛事ID/主客队名称"
              @keydown.enter="handleSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div> -->
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handleSearch"
            >{{$t('search_btn')}}</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        ref="matchTable"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 565 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="matchId"
      >
        <span slot="beginTime" slot-scope="text,record" class>
          <span>{{ format_date(record.beginTime) }}</span>
        </span>
        <div
          slot="matchInfoZS"
          slot-scope="text, record"
          class="display-inline-block"
          @mouseover="tooltip_icotitle_hidden('ico-title' + record._index, 1)"
          @mouseout="tooltip_icotitle_hidden('ico-title' + record._index, 2)"
        >
          <div
            class="textwidth-2 float-left tournamentId"
          >
            <table-cell-ellipsis-ant :span_html="is_zs? record.matchInfoZS: record.matchInfoEn" :str_all="is_zs? record.matchInfoZS: record.matchInfoEn"></table-cell-ellipsis-ant>
          </div>
          <span class="float-right ml1x hidden" :ref="'ico-title' + record._index">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ record.matchId }}</span>
              </template>
              <img
                src="~assets/copy.svg"
                class="tag-read cursor-pointer"
              />
            </a-tooltip>
          </span>
        </div>
        <span slot="betAmount" slot-scope="text" class>
          <span>{{ text | moneyFormat }}</span>
        </span>
        <span slot="profitAmount" slot-scope="text" class>
          <span>{{ text | moneyFormat }}</span>
        </span>
        <span slot="preProfit" slot-scope="text,record" class>
          <span v-if="record.preProfit">{{ record.preProfit | moneyFormat}}</span>
          <span v-else>-</span>
        </span>
        <span slot="rollingProfit" slot-scope="text" class>
          <span v-if="text" v-bind:class="[text < 0 ? 'text-red' : '']">{{ text | moneyFormat }}</span>
          <span v-else>-</span>
        </span>
        <span slot="profitRate" slot-scope="text" class>
          <span v-if="text" v-bind:class="[text < 0 ? 'text-red' : '']">{{ text | moneyFormat }}%</span>
          <span v-else>-</span>
        </span>
        <template slot="footer"  >
          <a-table
            class="border-top expanded "
            :columns="columns"
            :dataSource="total_data"
            :scroll="{ x: 1600 }"
            size="middle"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="betAmount" 
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

<script>
import { mapGetters,mapActions } from 'vuex'
import { api_data, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import moment from "moment";
// import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/matchbonus/config/config.js";
import { handleCopy } from "src/util/module/common.js";
// import dialogMain from "src/pages/data/matchbonus/component/dialog_main.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import formartmixin from "src/mixins/module/formartmixin.js";
export default {
  mixins: [commonmixin, dataCenterMixin,formartmixin],
  components: {
    tableCellEllipsisAnt
  },
  data() {
    return {
      tabledata: [],
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        sportId: "",
        startTime: `${moment(new Date().setDate(new Date().getDate() - 2)).format('YYYY-MM-DD')} 00:00:00`,
        endTime:  `${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 23:59:59`,
        tournamentId: "",
        matchId: "",
        matchInfo: ""
      },
      total_data:[{
        _index: this.$t('total'),
        betAmount: '',
        profitAmount: '',
        preProfit: '',
        rollingProfit: '',
        profitRate: ''
      }]
    };
  },
  created() {
    // this.init_sport_list();
    this.initTableData();
  },
  destroyed(){
    this.clear_bool();
  },
  computed: {
    ...mapGetters(['get_bool']),
    is_zs(){
      return this.$q.sessionStorage.getItem('language') === 'zs'? true: false;
    }
  },
  watch: {
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
  },
  methods: {
    ...mapActions(['clear_bool']),
    moment,
    async init_sport_list(){
      let res = await api_data.get_bc_order_getSportList({})
      if(res.data.code === '0000000'){
        this.allMatches = res.data.data;
      }
    },
    disabledDate(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(1, 'days'))
    },
    handleChangeSportId(){
      this.handleSearch();
    },
    handleCopy,
    tooltip_icotitle_hidden(key, value) {
      let dom = this.$refs[key];
      if (value == 1) {
        dom.classList.remove("hidden");
      } else {
        dom.classList.add("hidden");
      }
    },
    onChange(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      // this.get_bool && this.clear_bool();
      // this.initTableData();
    },
    handleSearch() {
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_data.post_bc_match_queryPlayStatisticList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.start");
          console.log(this.pagination.start,'pagination.start')
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
          this.init_total(params);
        }else{
          this.tabledata = [];
          code !== '0400403' && this.$message.error(res.data.msg, 5);
        }
        
      })
    },
    compute_init_tabledata_params() {
      let { current, pageSize, sort, orderBy } = this.pagination;
      let {
        tournamentId,
        startTime,
        endTime,
        matchId,
        matchInfo,
        sportId
      } = this.searchForm;
      if(/^\+?[0-9][0-9]*$/.test(matchId)){
        matchId = matchId
        matchInfo = ''
        console.log(matchId)    
      }else{
        matchInfo = matchId
        matchId = ''
        console.log(matchInfo)
      }
      // startTime = this.get_bool?moment().format("YYYY-MM-DD"): startTime;
      if( this.get_bool &&  moment().format('LT')<'12:00'){
        startTime =  moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD').format("YYYY-MM-DD");
        endTime =  moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD').format("YYYY-MM-DD");
      }else if(this.get_bool &&  moment().format('LT')>='12:00'){
        startTime = moment().format("YYYY-MM-DD")
      }
      return {
        pageNum: current,
        pageSize,
        tournamentId,
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        matchId,
        matchInfo,
        sportId,
        sort,
        orderBy
      };
    },
    async init_total(params){
      api_data.post_bc_order_getMatchStatistics(params).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code === '0000000') {
            let obj = this.$lodash.get(res, "data.data");
            console.log(obj,'obj')
            let data = {};
            let moneyArr = ['betAmount','profitAmount','preProfit','rollingProfit','profitRate']
            moneyArr.forEach(item => {      
              data[item]= this.$options.filters['moneyFormat'] (obj[item])
            })
            data.profitRate =  data.profitRate + '%';
            Object.assign(this.total_data[0],data);
            console.warn(this.total_data[0])
          } else {
            this.$message.error(msg, 5);
          }
        });
    },
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 670px;
  min-height: 670px;
}

>>>.ant-empty-normal {
  margin: 282px 0;
}

>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}

>>>.ant-table-footer {
  padding 0px;
  padding-right :8px;
}

// >>>.ant-table-thead > tr > th .ant-table-column-sorter {
//   right: 15%;
// }

.textwidth-2 {
  width: 270px;
}
</style>
