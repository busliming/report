/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-30 17:33:40
 */
const POSITION = 'left';
export const merchantBetRankConfig = [
  {
    title: "排名",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "用户ID",
    width: 120,
    dataIndex: "userId",
    key: "userId",
    align: POSITION,
    scopedSlots: { customRender: 'userId' },
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
  }
];

