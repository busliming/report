/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 15:34:54
 */
const POSITION = 'right';
export const tablecolumns_config = [
  {
    title: "序号",
    width: 90,
    dataIndex: "_index",
    // fixed: "left",
    align: "center"
  },
  {
    title: "日期",
    width: 120,
    dataIndex: "time",
    // fixed: "left",
    align: 'left',
    scopedSlots:{customRender:"time"},
  },
  {
    title: "商户名称",
    width: 140,
    dataIndex: "merchantName",
    // fixed: "left",
    align: 'left',
    scopedSlots:{customRender:"merchantName"},
  }, 
  {
    title: "币种",
    width: 100,
    dataIndex: "currency",
    align: 'center',
    scopedSlots:{customRender:"currency"},
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: "投注笔数",
    dataIndex: "orderSum",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"orderSum"},
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"profit"},
  },
  {
    title: "盈利率",
    dataIndex: "returnRate",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"returnRate"},
  },
  {
    title: "投注用户数",
    dataIndex: "betUserSum",
    width: 160,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betUserSum"},
  },
  { 
    title: "新增用户数", 
    dataIndex: "addUser", 
    align: POSITION, 
    width: 160, 
    sorter: true, 
  },
  { 
    title: "注册用户数", 
    dataIndex: "registerTotalUserSum", 
    align: POSITION, 
    width: 130, 
    sorter: true, 
  },
  {
    title: "投注率",
    dataIndex: "betUserRate",
    width: 100,
    sorter: true, 
    scopedSlots:{customRender:"betUserRate"},
    align: POSITION
  }
];

