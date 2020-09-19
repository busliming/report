/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-19 10:35:10
 */
export const betCurrency_config = [
  {
    title: "币种",
    width: 86,
    dataIndex: "currency",
    key: "currency",
    align: "center"
  },
  {
    title: "投注用户数",
    width: 150,
    dataIndex: "betUserAmount",
    key: "betUserAmount",
    align: "center"
  },
  {
    // title: "活跃投注用户数",
    dataIndex: "briskUser",
    key: "briskUser",
    align: "center",
    width: 160,
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'activeUser' },
  }
];

