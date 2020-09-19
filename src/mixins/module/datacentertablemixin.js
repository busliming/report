/*
 * @Desc: 
 * @Date: 2020-02-08 21:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-10 19:25:21
 */
import { getAutoParams } from "src/util/module/common.js";
export default {
  data() {
    return {
      pagination: {
        pageSize: 20,
        current: 1,
        filter: this.$route.name === 'bet_slip'?"1": "3", //tab栏中投注-投注时间
        dateType: "day",  // 日周月年
        total: 0,
        start: '', //排序值
        // showTotal: total => `共 ${total} 条数据`,
        showTotal: total => this.$t('total_data')+": "+ total,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      },
      allMatches: [
        { label: this.$t('match_list.match1'), value: "" },
        { label: this.$t('match_list.match2'), value: 1 },
        { label: this.$t('match_list.match3'), value: 2 },
        { label: this.$t('match_list.match4'), value: 3 },
        { label: this.$t('match_list.match5'), value: 4 },
        { label: this.$t('match_list.match6'), value: 5 },
        { label: this.$t('match_list.match7'), value: 6 },
        { label: this.$t('match_list.match8'), value: 7 },
        { label: this.$t('match_list.match9'), value: 8 },
        { label: this.$t('match_list.match10'), value: 9 },
        { label: this.$t('match_list.match11'), value: 10 },
        { label: this.$t('match_list.match12'), value: 100 },
        { label: this.$t('match_list.match13'), value: 101 },
        { label: this.$t('match_list.match14'), value: 102 },
        { label: this.$t('match_list.match15'), value: 103 },
        { label: this.$t('match_list.match16'), value: 104 },
      ],
      totalData:[{
        rowkey:'totalData',
        _index: '总计',
        merchantName: '',
        merchantLevel: '',
        agentLevel: '',
        currency: "",
        betAmount: '-',
        orderSum:'-',
        returnAmount:'-',
        profit:'-',
        returnRate:'-',
        betUserSum:'-',
        addUser:'',
        registerTotalUserSum:'',
        betUserRate:'',
      }]
    }
  },
  methods: {
    sorterForTable(pagination, filter, sorter) {
      console.log(pagination, filter, sorter);
      console.log({...filter},'filter')
      this.pagination = pagination;
      this.pagination.sort = (sorter.order && sorter.order.replace('end', ''));
      this.pagination.orderBy = sorter.field;
      this.pagination.status = (filter.status && filter.status[0]);
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
      });
      return arr;
    },
  },
  watch: {
    searchForm: {
      handler(val){
        console.log(val);
        this.pagination.current = 1;
      },
      deep: true
    },
    ...getAutoParams({
      keys: ["current", "pageSize","sort","orderBy","filter","dateType"],
      obj: "pagination",
      cb: function () {
        let timer = null
        return function () {
          clearTimeout(timer)
          timer = setTimeout(() => this.initTableData(), 100)
        }
      }()
    })
  },
}