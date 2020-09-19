/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-08 11:21:26
 */
export default [
  //数据中心
  {
    path: "data_center",
    name: "data_center",
    text: "数据中心",
    icon: "p-icon-shuju",
    children: [
      {
        path: "match_bonus",
        name: "match_bonus",
        text: "赛事报表",
        parent_name: "data_center"
      },
      {
        path: "bet_slip",
        name: "bet_slip",
        text: "注单查询",
        parent_name: "data_center"
      }
    ]
  }
];
