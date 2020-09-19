/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-23 17:19:06
 */
const POSITION = 'left'
export const tablecolumns_config = [
  {
    title: "序号",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: 'left'
  },
  {
    title: "账期",
    width: 90,
    dataIndex: "financeDate",
    key: "financeDate",
    align: POSITION,
    scopedSlots: { customRender: "financeDate" },
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
    width: 90,
    align: POSITION,
  },
  {
    title: "账单金额",
    dataIndex: "billAmount",
    key: "billAmount",
    width: 110,
    align: POSITION,
    sorter: true,
    scopedSlots: { customRender: "billAmount" },
  },
  {
    title: "账单金额(CNY)",
    dataIndex: "billAmountCNY",
    key: "billAmountCNY",
    width: 140,
    align: POSITION,
    scopedSlots: { customRender: "billAmountCNY" },
  },
  {
    title: "投注金额",
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 110,
    align: POSITION,
    sorter: true,
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "投注金额(CNY)",
    dataIndex: "orderAmountTotalCNY",
    key: "orderAmountTotalCNY",
    width: 150,
    align: POSITION,
    scopedSlots: { customRender: "orderAmountTotalCNY" },
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 110,
    align: POSITION,
    sorter: true,
    scopedSlots: { customRender: "profitAmount" },
  },
  {
    title: "盈利金额(CNY)",
    dataIndex: "profitAmountCNY",
    key: "profitAmountCNY",
    width: 150,
    align: POSITION,
    scopedSlots: { customRender: "profitAmountCNY" },
  },
  {
    title: "分成方式",
    dataIndex: "computingStandard",
    key: "computingStandard",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "标准费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "执行费率",
    dataIndex: "executeRate",
    key: "executeRate",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: "executeRate" },
  },
  {
    title: "调整额",
    dataIndex: "adjustAmount",
    key: "adjustAmount",
    width: 110,
    align: POSITION,
    scopedSlots: { customRender: "adjustAmount" },
  },
  {
    title: "二级商户",
    dataIndex: "merchantNum",
    key: "merchantNum",
    width: 90,
    fixed: 'right',
    scopedSlots: { customRender: "merchantNum" },
    align: "center"
  }
];
