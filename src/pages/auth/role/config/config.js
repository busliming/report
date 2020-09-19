/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-20 21:05:17
 */
export const tablecolumns_config = [
  {
    title: "序号",
    width: 100,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: 'left'
  },
  {
    title: "角色名称",
    width: 250,
    dataIndex: "name",
    key: "name",
    align: "left",
    fixed: 'left',
    scopedSlots: { customRender: "name" },
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 300,
    align: "left",
    scopedSlots: { customRender: "remark" },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 270,
    align: "left",
    scopedSlots: { customRender: "createTime" },
  },
  {
    title: "授权时间",
    dataIndex: "authorizedTime",
    key: "authorizedTime",
    width: 270,
    align: "left",
  },
  {
    title: "授权人",
    dataIndex: "createUsername",
    key: "createUsername",
    // width: 300,
    align: "left",
  },
  {
    title: "操作",
    key: "action",
    width: 200,
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: 'right'
  }
];
