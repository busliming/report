/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-09 20:54:49
 */
const POSITION = 'left';
export const secondMerchantInfoConfig = [
  {
    title: "序号",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "商户名称",
    width: 120,
    dataIndex: "merchantName",
    key: "merchantName",
    align: POSITION,
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: "入驻时间",
    dataIndex: "createTime",
    key: "3",
    width: 160,
    align: POSITION,
    // scopedSlots: { customRender: 'createTime' },
  },
  {
    title: "证书状态",
    dataIndex: "status",
    key: "4",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: 'status' },
  },
  {
    title: "管理员设置",
    dataIndex: "merchantAdmin",
    key: "5",
    width: 120,
    align: "center",
    // fixed: 'right',
    scopedSlots: { customRender: 'merchantAdmin' },
  },
];

