/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-13 18:20:55
 */
export const tablecolumns_config = [
  {
    
    title: "序号",
    width: 100,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "商户名称",
    width: 130,
    dataIndex: "merchantName",
    key: "merchantName",
    fixed: "left",
    align: "left",
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "商户类型",
    width: 150,
    dataIndex: "agentLevel",
    key: "agentLevel",
    fixed: "left",
    align: "left",
    scopedSlots: { customRender: "agentLevel" },
  },
  {
    title: "有效期",
    dataIndex: "startTime",
    key: "startTime",
    width: 300,
    align: "left",
    scopedSlots: { customRender: "startTime" },
  },
  {
    title: "证书状态",
    dataIndex: "status",
    key: "status",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "证书信息",
    dataIndex: "key",
    key: "key",
    width: 300,
    align: "left"
  },
  {
    title: "更新人",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 150,
    align: "left"
  },
  {
    title: "最后更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    // width: 250,
    align: "left"
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

