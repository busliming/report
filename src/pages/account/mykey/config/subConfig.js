/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-18 15:07:58
 */
export const subConfig = [
  {
    
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "商户名称",
    width: 110,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "渠道商户",
    width: 120,
    dataIndex: "parentName",
    key: "parentName",
    align: "left",
    scopedSlots: { customRender: "parentName" },
  },
  {
    title: "商户有效期",
    dataIndex: "startTime",
    key: "startTime",
    width: 210,
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
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 100,
    align: "left"
  },
  {
    title: "最后更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    width: 160,
    align: "left"
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 110,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

