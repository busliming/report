/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 15:16:38
 */
export const tablecolumns_config = [
  {
    title: "",
    width: 60,
    dataIndex: "expandedbtn",
    key: "expandedbtn",
    fixed: 'left',
    align: "center",
    scopedSlots:{customRender:"expandedbtn"},
  },
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    fixed: 'left',
    key: "_index",
    align: "left"
  },
  {
    title: "日期",
    width: 200,
    dataIndex: "financeDate",
    key: "financeDate",
    fixed: 'left',
    align: "left",
  },
  {
    title: "结算币种",
    dataIndex: "currencyStr",
    key: "currencyStr",
    width: 200,
    align: "center",
    scopedSlots: { customRender: "currencyStr" },
  },
  {
    title: "投注用户数",
    dataIndex: "orderUserNum",
    key: "orderUserNum",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderUserNum" },
  },
  {
    title: "投注笔数",
    dataIndex: "orderValidNum",
    key: "orderValidNum",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderValidNum" },
  },
  {
    title: "投注金额",
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "平台盈利",
    dataIndex: "platformProfit",
    key: "platformProfit",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "platformProfit" },
  },
  {
    title: "盈利率",
    dataIndex: "platformProfitRate",
    key: "platformProfitRate",
    // width: 200,
    align: "right",
    scopedSlots: { customRender: "platformProfitRate" },
  },
  {
    title: "下载对账单",
    key: "action",
    width: 140,
    scopedSlots: { customRender: "action" },
    fixed: 'right',
    align: "center"
  }
];
export const dayTotal_config = [
  {
    title: "",
    width: 60,
    dataIndex: "expandedbtn",
    key: "expandedbtn",
    align: "center",
    scopedSlots:{customRender:"expandedbtn"},
  },
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    align: "left"
  },
  {
    title: "日期",
    width: 200,
    dataIndex: "financeDate",
    key: "financeDate",
    align: "left",
  },
  {
    title: "结算币种",
    dataIndex: "currencyStr",
    key: "currencyStr",
    width: 200,
    align: "center",
    scopedSlots: { customRender: "currencyStr" },
  },
  {
    title: "投注用户数",
    dataIndex: "orderUserNum",
    key: "orderUserNum",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderUserNum" },
  },
  {
    title: "投注笔数",
    dataIndex: "orderValidNum",
    key: "orderValidNum",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderValidNum" },
  },
  {
    title: "投注金额", 
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "平台盈利",
    dataIndex: "platformProfit",
    key: "platformProfit",
    width: 200,
    align: "right",
    scopedSlots: { customRender: "platformProfit" },
  },
  {
    title: "盈利率",
    dataIndex: "platformProfitRate",
    key: "platformProfitRate",
    // width: 200,
    align: "right",
    scopedSlots: { customRender: "platformProfitRate" },
  },
  {
    title: "下载对账单",
    key: "action",
    width: 140,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];