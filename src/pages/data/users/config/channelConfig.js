/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 15:35:55
 */
const POSITION = 'right';
export const channel_config = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "用户ID",
    width: 180,
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    align: POSITION,
    scopedSlots:{customRender:"userId"},
  },
  {
    title: "用户名",
    dataIndex: "userName",
    key: "1",
    width: 180,
    align: POSITION,
    scopedSlots:{customRender:"userName"},
  },
  {
    title: "所属平台",
    dataIndex: "merchantName",
    key: "2",
    width: 170,
    align: POSITION,
    scopedSlots:{customRender:"merchantName"},
  },
  {
    title: "币种",
    dataIndex: "currency",
    key: "20",
    width: 130,
    align: POSITION,
    scopedSlots:{customRender:"currency"},
  },
  {
    title: "投注笔数",
    dataIndex: "betNum",
    key: "3",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betNum"},
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "4",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    key: "5",
    width: 170,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"profit"},
  },
  {
    title: "盈利率",
    dataIndex: "profitRate",
    key: "6",
    width: 170,
    align: POSITION,
    sorter: true, 
    scopedSlots:{customRender:"profitRate"},
  },
  {
    title: "活跃天数",
    dataIndex: "activeDays",
    key: "7",
    // width: 170,
    // sorter: true, 
    align: POSITION,
  },
  {
    title: "操作",
    key: "8",
    width: 150,
    fixed:"right",
    scopedSlots:{customRender:"action"},
    align: "center"
  }
];



