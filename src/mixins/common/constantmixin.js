/*
 * @Desc: 
 * @Date: 2020-05-07 17:36:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 12:48:40
 */
export default {
  data() {
    return {
      currencyList: [
        //商户币种
        { label: "全部币种", value: '' },
        { label: this.$t('currency.c1'), value: 1 },
        { label: this.$t('currency.c2'), value: 2 },
        { label: this.$t('currency.c3'), value: 3 },
        { label: this.$t('currency.c4'), value: 4 },
        { label: this.$t('currency.c5'), value: 5 },
        { label: this.$t('currency.c6'), value: 6 },
        { label: this.$t('currency.c7'), value: 7 },
        { label: this.$t('currency.c8'), value: 8 },
      ],
    }
  },
  filters: {
    filterCurrency(val){
      let arr = ['人民币','美元','港币','越南盾','新加坡币','英镑','欧元','比特币'];
      return arr[val-1]
    },
  }
}