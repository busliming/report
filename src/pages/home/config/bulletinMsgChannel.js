/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-02 21:52:42
 */
const POSITION = 'left';
export const bulletinMsgChannelConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "公告标题",
    width: 300,
    dataIndex: "bulletinTitle",
    key: "bulletinTitle",
    align: POSITION,
    scopedSlots: { customRender: 'bulletinTitle' },
  },
  
  {
    title: "发布时间",
    dataIndex: "sendTimeStr",
    key: "3",
    width: 60,
    align: POSITION,
    // fixed: 'right'
    // scopedSlots: { customRender: 'createTime' },
  }
];

