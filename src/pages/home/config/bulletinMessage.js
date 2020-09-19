/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-04 17:45:55
 */
const POSITION = 'left';
export const bulletinMessageConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "消息标题",
    width: 450,
    dataIndex: "messageTitle",
    key: "messageTitle",
    align: POSITION,
    scopedSlots: { customRender: 'messageTitle' },
  },
  
  {
    title: "发送时间",
    dataIndex: "sendTimeStr",
    key: "3",
    width: 100,
    align: POSITION,
    // fixed: 'right'
    // scopedSlots: { customRender: 'createTime' },
  }
];

