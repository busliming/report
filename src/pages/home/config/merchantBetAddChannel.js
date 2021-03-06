/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-09 10:37:23
 */
import moment from 'moment'
const POSITION = 'left';
export const merchantBetAddChannelConfig = [
  {
    title: "排名",
    width: 50,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "商户名称",
    width: 105,
    dataIndex: "merchantName",
    key: "merchantName",
    align: POSITION,
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: `${moment(Date.now()).month()-2}月排名`,
    width: 80,
    dataIndex: "lastRank",
    key: "lastRank",
    align: "center",
    scopedSlots: { customRender: 'lastRank' },
  },
  {
    title: `${moment(Date.now()).month()-1}月增速`,
    width: 80,
    dataIndex: "growthRate",
    key: "growthRate",
    align: "center",
    scopedSlots: { customRender: 'growthRate' },
  },
  {
    title: `${moment(Date.now()).month()-1}月增长金额`,
    dataIndex: "increasedAmount",
    key: "increasedAmount",
    width: 100,
    align: "right",
    scopedSlots: { customRender: 'increasedAmount' },
  },
  {
    title: `${moment(Date.now()).month()-1}月投注金额`,
    dataIndex: "betAmount",
    width: 100,
    key: "betAmount",
    align: "right",
    scopedSlots: { customRender: 'betAmount' }
  }
];

