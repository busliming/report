/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-17 14:39:37
 */
export const matchMoney = [
  {
    title: "币种",
    width: 80,
    dataIndex: "currency",
    key: "currency",
    align: "center"
  },
  {
    title: "投注金额",
    width: 130,
    dataIndex: "betNumber",
    key: "betNumber",
    align: "center"
  },
  {
    title: "盈利金额",
    width: 150,
    dataIndex: "profit",
    key: "profit",
    align: "center"
  },
  {
    // title: "活跃投注用户数",
    dataIndex: "activeUser",
    key: "1",
    width: 150,
    align: "center",
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'activeUser' },
  }
];

