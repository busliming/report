/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-20 19:57:40
 */
export const tablecolumns_config = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "用户ID",
    width: 160,
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    align: "right"
  },
  {
    title: "所属商户",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 130,
    align: "right"
  },
  {
    title: "累计投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 200,
    align: "right",
    sorter: true,
    scopedSlots: { customRender: "betAmount" },
  },
  {
    title: "累计盈利",
    dataIndex: "profit",
    key: "profit",
    width: 200,
    sorter: true,
    align: "right",
    scopedSlots: { customRender: "profit" },
  },
  {
    title: "注单数量",
    dataIndex: "betNum",
    key: "betNum",
    width: 150,
    align: "right",
    sorter: true,
    scopedSlots: { customRender: "betNum" },
  },
  {
    title: "最后投注时间",
    dataIndex: "lastBetStr",
    key: "lastBetStr",
    width: 200,
    align: "right",
    
  },
  {
    title: "在线状态",
    dataIndex: "enabled",
    key: "enabled",
    width: 150,
    align: "right",
    scopedSlots: { customRender: 'enabled' }, 
    filters: [{ text: '在线', value: "1" }, { text: '离线', value: "0" }],
    onFilter: (value, record) => record.enabled == value ,
    filterMultiple: false,
  },
  {
    title: "最后登录时间",
    dataIndex: "lastLoginStr",
    key: "lastLoginStr",
    // width: 150,
    // sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    // sortDirections: ['descend', 'ascend'],
    align: "right",
    scopedSlots: { customRender: "lastLoginStr" },
  },
  // { 
  //   title: "商户状态", 
  //   dataIndex: "enabled", 
  //   key: "8", 
  //   align: "center", 
  //   width: 200, 
  //   scopedSlots: { customRender: 'enabled' }, 
  //   filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }], },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

