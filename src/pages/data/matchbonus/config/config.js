/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 21:56:03
 */
import { i18n } from 'src/boot/i18n';
const POSITION = 'right';
export const tablecolumns_config = [
  {
    title: i18n.t('match_bonus_config.index'),
    width: 100,
    dataIndex: "_index",
    key: "_index",
    // fixed: "left",
    align: "center"
  },
  {
    title: i18n.t('match_bonus_config.beginTime'),
    dataIndex: "beginTime",
    key: "beginTime",
    width: 250,
    // sorter: true, 
    align: 'center',
    scopedSlots:{customRender:"beginTime"},
  },
  {
    title: i18n.t('match_bonus_config.matchInfoZS'),
    width: 300,
    dataIndex: "matchInfoZS",
    key: "matchInfoZS",
    // fixed: "left",
    align: 'left',
    scopedSlots:{customRender:"matchInfoZS"},
  },
  {
    title: i18n.t('match_bonus_config.betAmount'),
    dataIndex: "betAmount",
    key: "betAmount",
    width: 200,
    // sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: i18n.t('match_bonus_config.profitAmount'),
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 200,
    // sorter: true, 
    scopedSlots:{customRender:"profitAmount"},
    align: POSITION
  },
  {
    title: i18n.t('match_bonus_config.preProfit'),
    dataIndex: "preProfit",
    key: "preProfit",
    width: 200,
    // sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"preProfit"},
  },
  {
    title: i18n.t('match_bonus_config.rollingProfit'),
    dataIndex: "rollingProfit",
    key: "rollingProfit",
    width: 200,
    // sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"rollingProfit"},
  },
  { 
    title: i18n.t('match_bonus_config.profitRate'), 
    dataIndex: "profitRate", 
    key: "8", 
    align: POSITION, 
    width: 200, 
    // sorter: true,
    scopedSlots:{customRender:"profitRate"}, 
  }
];

