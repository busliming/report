/*
 * @Desc: 
 * @Date: 2020-04-08 13:47:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 12:18:17
 */
/* eslint-disable */
export default {
  data() {
    return {
      settleTypeName: [
        { label: this.$t('bet_slip_betting_types.type1'), value: '' },
        { label: this.$t('bet_slip_betting_types.type2'), value: 1 },
        { label: this.$t('bet_slip_betting_types.type3'), value: 2 },
      ],
      matchTypeList: [
        { label: this.$t('bet_slip_bet_types.bet1'), value: "" },
        { label: this.$t('bet_slip_bet_types.bet2'), value: 1 },
        { label: this.$t('bet_slip_bet_types.bet3'), value: 2 },
        { label: this.$t('bet_slip_bet_types.bet4'), value: 3 }
      ],
      settleStatusName: [
        // { label: "注单状态", value: "" },
        { value: 0, label: this.$t('bet_slip_order_result.order1') },
        { value: 1, label: this.$t('bet_slip_order_result.order2') },
        { value: 2, label: this.$t('bet_slip_order_result.order3') },
        { value: 3, label: this.$t('bet_slip_order_result.order4') },
        { value: 4, label: this.$t('bet_slip_order_result.order5') },
      ],
      deviceTypeName: { 1: "H5", 2: "PC", 3: "Android", 4: "IOS" },
      matchTypeName: { 1: this.$t('bet_slip_bet_types.bet2'), 2: this.$t('bet_slip_bet_types.bet3'), 3: this.$t('bet_slip_bet_types.bet4') },
      settleStatusNameObj: {
        0: this.$t('bet_slip_order_result.order1'), 1: this.$t('bet_slip_order_result.order2'), 2: this.$t('bet_slip_order_result.order3'), 3: this.$t('bet_slip_order_result.order4'), 4: this.$t('bet_slip_order_result.order5')
      },
      filterstatues: {
        2: this.$t('bet_slip_order_status.ord1'),
        3: this.$t('bet_slip_order_status.ord2'),
        4: this.$t('bet_slip_order_status.ord3'),
        5: this.$t('bet_slip_order_status.ord4'),
        6: this.$t('bet_slip_order_status.ord5'),
        7: this.$t('bet_slip_order_status.ord6'),
        8: this.$t('bet_slip_order_status.ord7'),
      }
    };
  },
  methods: {
    compute_constant_value(key, value) {
      if (!key) {
        return "";
      }
      if (!Array.isArray(this[key])) {
        return "";
      }

      let rv = "";
      let len = this[key].length;
      for (let i = 0; i < len; i++) {
        if (this[key][i].value == value) {
          rv = this[key][i].label;
          break;
        }
      }
      return rv;
    }
  },
  filters: {
    filterUserLevel(val) {
      let arr = ['正常用户', 'UFO-蛇', 'UFO-$', 'UFO-资讯客', 'UFO', '蛇-1级', '蛇-2级', '蛇-3级', '水军', '资讯客', '好脚', '赢家', '专家', '投资家'];
      return arr[val - 1];
    },
    filterStatues(val) {
      // 2是走水，3-输，4-赢，5-半赢，6-半输，7赛事取消，8赛事延期
      if (!val) return "-";
      let str = "";
      if (val == 0) {
        return (str = "--");
      } else if (val == 2) {
        return (str = "走水");
      } else if (val == 3) {
        return (str = "输");
      } else if (val == 4) {
        return (str = "赢");
      } else if (val == 5) {
        return (str = "赢半");
      } else if (val == 6) {
        return (str = "输半");
      } else if (val == 7) {
        return (str = "赛事取消");
      } else if (val == 8) {
        return (str = "赛事延期");
      }
    },
    filterSeriesType(val){
      let arr= ['单关','串关']
      return arr[val-1];
    }
  }
};
