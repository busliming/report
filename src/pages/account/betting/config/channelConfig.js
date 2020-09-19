/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 16:39:49
 */
 const POSITION = 'right';
 export const channelConfig = [
   {
     title: "序号",
     width: 65,
     dataIndex: "_index",
     key: "_index",
     fixed: "left",
     align: "center"
   },
   {
     title: "用户ID",
     width: 150,
     dataIndex: "userId",
     key: "userId",
     fixed: "left",
     align: POSITION,
     scopedSlots:{customRender:"userId"},
   },
   {
     title: "用户名",
     width: 130,
     dataIndex: "userName",
     key: "userName",
     fixed: "left",
     align: 'right',
     scopedSlots:{customRender:"userName"},
   },
   {
     title: "所属商户",
     dataIndex: "merchantName",
     key: "merchantName",
     // fixed: "left",
     width: 130,
     align: 'right',
     scopedSlots:{customRender:"merchantName"},
   },
   {
     title: "可用余额",
     dataIndex: "amount",
     key: "amount",
     width: 150,
     align: POSITION,
     sorter: true,
     scopedSlots: { customRender: "amount" },
   },
   {
     title: "累计投注金额",
     dataIndex: "betAmount",
     key: "betAmount",
     width: 150,
     align: POSITION,
     sorter: true,
     scopedSlots: { customRender: "betAmount" },
   },
   {
     title: "累计盈利",
     dataIndex: "profit",
     key: "profit",
     width: 150,
     sorter: true,
     align: POSITION,
     scopedSlots: { customRender: "profit" },
   },
   {
     title: "用户币种",
     dataIndex: "currencyCode",
     key: "currencyCode",
     width: 120,
     align: POSITION,
     scopedSlots: { customRender: "currencyCode" },
   },
   {
     title: "注单数量",
     dataIndex: "betNum",
     key: "betNum",
     width: 135,
     align: POSITION,
     sorter: true,
     scopedSlots: { customRender: "betNum" },
   },
   {
     title: "最后投注时间",
     dataIndex: "lastBetStr",
     key: "lastBetStr",
     width: 160,
     align: POSITION,
     
   },
   {
     title: "在线状态",
     dataIndex: "enabled",
     key: "enabled",
     width: 110,
     align: "center",
     scopedSlots: { customRender: 'enabled' }, 
     filters: [{ text: '在线', value: "1" }, { text: '离线', value: "0" }],
     onFilter: (value, record) => record.enabled == value ,
     filterMultiple: false,
   },
   {
     title: "最后登录时间",
     dataIndex: "lastLoginStr",
     key: "lastLoginStr",
     width: 130,
     // sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
     // sortDirections: ['descend', 'ascend'],
     align: "right",
     scopedSlots: { customRender: "lastLoginStr" },
   },
   {
     title: "操作",
     key: "operation",
     fixed: "right",
     width: 105,
     scopedSlots: { customRender: "action" },
     align: "center"
   }
 ];
 