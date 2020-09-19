/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 17:02:57
 */
export const bet_top_ten_config = [
  {
    title: "排名",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "赛事对阵",
    width: 210,
    dataIndex: "matchInfo",
    key: "matchInfo",
    align: "left",
    scopedSlots: { customRender: 'matchInfo' },
  },
  {
    title: "赛事状态",
    dataIndex: "matchStatus",
    key: "1",
    width: 100,
    align: "left",
    scopedSlots: { customRender: 'matchStatus' },
  },
  {
    title: "开赛时间",
    dataIndex: "beginTime",
    key: "beginTime",
    align: "right",
    width: 110,
    scopedSlots: { customRender: 'beginTime' },
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 120,
    align: "right",
    scopedSlots: { customRender: 'betAmount' },
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    key: "profit",
    width: 120,
    align: "right",
    scopedSlots: { customRender: 'profit' },
  },
  {
    title: "投注用户数",
    dataIndex: "userAmount",
    key: "userAmount",
    width: 90,
    align: "right",
    scopedSlots: { customRender: 'userAmount' },
  },
];

