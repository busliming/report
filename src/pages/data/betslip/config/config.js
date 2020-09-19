/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: \panda-bc数据源相关报表系统\src\pages\data\betslip\config\config.js
 */

import { i18n } from 'src/boot/i18n';
 export const tablecolumns_config = [
  {
    title: i18n.t('bet_slip_config.index'),
    width: 70,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots:{customRender:"_index"}
  },
  {
    title: i18n.t('bet_slip_config.userName'),
    width: 190,
    dataIndex: "userId",
    key: "userId",
    scopedSlots:{customRender:"userId"},
    align: "left"
  },
  {
    title: i18n.t('bet_slip_config.matchInfo'),
    dataIndex: "betNoInfo",
    key: "betNoInfo",
    width: 250,
    scopedSlots:{customRender:"betNoInfo"},
    align: "left"
  },
  {
    title: i18n.t('bet_slip_config.betDetail'),
    dataIndex: "betNoDetail",
    key: "betNoDetail",
    width: 300,
    scopedSlots:{customRender:"betNoDetail"},
    align: "left"
  },
  {
    title: i18n.t('bet_slip_config.odds'),
    dataIndex: "oddsValue",
    key: "oddsValue",
    width: 80,
    scopedSlots:{customRender:"oddsValue"},
    align: "center"
  },
  {
    title: i18n.t('bet_slip_config.betAmount'),
    dataIndex: "betAmount",
    key: "betAmount",
    width: 100,
    scopedSlots:{customRender:"betAmount"},
    align: "center"
  },
  // {
  //   title: "注额(本地)",
  //   dataIndex: "localBetAmount",
  //   key: "localBetAmount",
  //   width: 100,
  //   scopedSlots:{customRender:"localBetAmount"},
  //   align: "left"
  // },
  {
    title: i18n.t('bet_slip_config.userProfit'),
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 100,
    scopedSlots:{customRender:"profitAmount"},
    align: "center"
  },
  {
    title: i18n.t('bet_slip_config.betOnRmb'),
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 150,
    scopedSlots:{customRender:"orderAmountTotal"},
    align: "center"
  },
  {
    title: i18n.t('bet_slip_config.currency'),
    dataIndex: "currencyCode",
    key: "currencyCode",
    width: 140,
    scopedSlots:{customRender:"currencyCode"},
    align: "center"
  },
  {
    title: i18n.t('bet_slip_config.type'),
    dataIndex: "seriesType",
    key: "seriesType",
    width: 140,
    scopedSlots:{customRender:"seriesType"},
    align: "center"
  },
  {
    title: i18n.t('bet_slip_config.status'),
    dataIndex: "outcome",
    key: "outcome",
    width: 130,
    scopedSlots:{customRender:"outcome"},
    align: "center"
  },
];

