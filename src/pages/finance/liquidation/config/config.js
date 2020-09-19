/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 15:23:12
 */
const POSITION = 'left'
export const tablecolumns_config = [
  {
    title: "序号",
    width: 50,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: 'left'
  },
  {
    title: "账期",
    width: 80,
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
    align: 'left',
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "商户类型",
    dataIndex: "agentLevel",
    key: "agentLevel",
    width: 80,
    align: 'left',
    scopedSlots: { customRender: "agentLevel" },
  },
  {
    title: "结算币种",
    dataIndex: "currencyStr",
    key: "currencyStr",
    width: 80,
    align: 'center',
  },
  {
    title: "账单金额",
    dataIndex: "billAmount",
    key: "billAmount",
    width: 120,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "billAmount" },
  },
  {
    title: "账单金额(CNY)",
    dataIndex: "billAmountCNY",
    key: "billAmountCNY",
    width: 140,
    align: 'right',
    scopedSlots: { customRender: "billAmountCNY" },
  },
  {
    title: "投注金额",
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 110,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "投注金额(CNY)",
    dataIndex: "orderAmountTotalCNY",
    key: "orderAmountTotalCNY",
    width: 140,
    align: 'right',
    scopedSlots: { customRender: "orderAmountTotalCNY" },
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 110,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "profitAmount" },
  },
  {
    title: "盈利金额(CNY)",
    dataIndex: "profitAmountCNY",
    key: "profitAmountCNY",
    width: 140,
    align:'right',
    scopedSlots: { customRender: "profitAmountCNY" },
  },
  {
    title: "盈利率",
    dataIndex: "profitRate",
    key: "profitRate",
    width: 85,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "profitRate" },
  },
  {
    title: "分成方式",
    dataIndex: "computingStandard",
    key: "computingStandard",
    width: 75,
    align: 'center',
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "标准费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 75,
    align: 'right',
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "执行费率",
    dataIndex: "executeRate",
    key: "executeRate",
    width: 75,
    align: 'right',
    scopedSlots: { customRender: "executeRate" },
  },
  {
    title: "调整额",
    dataIndex: "adjustAmount",
    key: "adjustAmount",
    width: 65,
    align: 'right',
    scopedSlots: { customRender: "adjustAmount" },
  },
  {
    title: "操作",
    key: "action",
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: "action" },
    align: "center"
  },
  {
    title: "二级商户",
    dataIndex: "merchantNum",
    key: "merchantNum",
    width: 75,
    fixed: 'right',
    scopedSlots: { customRender: "merchantNum" },
    align: "center"
  }
];
