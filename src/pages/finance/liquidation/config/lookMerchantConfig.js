/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-16 11:38:58
 */
 const POSITION = 'left';
export const lookMerchantConfig = [
  {
    title: "序号",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center",
  },
  {
    title: "账期",
    width: 100,
    dataIndex: "financeDate",
    key: "financeDate",
    align: POSITION,
  },
  {
    title: "商户名称",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 140,
    align: POSITION,
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "商户类型",
    dataIndex: "agentLevel",
    key: "agentLevel",
    width: 90,
    align: POSITION,
    scopedSlots: { customRender: "agentLevel" },
  },
  {
    title: "结算币种",
    dataIndex: "currencyStr",
    key: "currencyStr",
    width: 100,
    align: 'center',
  },
  {
    title: "投注金额",
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 150,
    align: 'right',  
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 150,
    align: 'right',
    scopedSlots: { customRender: "profitAmount" },
  },
  {
    title: "盈利率",
    dataIndex: "profitRate",
    key: "profitRate",
    width: 100,
    align: 'right',
    scopedSlots: { customRender: "profitRate" },
  }
];

