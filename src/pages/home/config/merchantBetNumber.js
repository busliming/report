/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-19 13:40:58
 */
export const merchant_bet_config = [
  {
    title: "排名",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "商户名称",
    width: 110,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: "上月排名",
    width: 76,
    dataIndex: "lastBy",
    key: "lastBy",
    align: "center",
    scopedSlots: { customRender: 'lastBy' },
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 130,
    align: "right",
    scopedSlots: { customRender: 'betAmount' },
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    width: 130,
    key: "profit",
    align: "right",
    scopedSlots: { customRender: 'profit' }
  },
];

