/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 18:01:25
 */
import { i18n } from 'src/boot/i18n';
export const tablecolumns_config = [
  {
    title: i18n.t('auth_config.index'),
    width: 160,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: 'left'
  },
  {
    title: i18n.t('auth_config.userName'),
    width: 200,
    dataIndex: "username",
    key: "username",
    align: "left",
    fixed: 'left',
    scopedSlots: { customRender: "username" },
  },
  {
    title: i18n.t('auth_config.email'),
    width: 200,
    dataIndex: "email",
    key: "email",
    align: "left"
  },
  {
    title: i18n.t('auth_config.contact'),
    dataIndex: "phone",
    key: "phone",
    width: 200,
    align: "left",
  },
  {
    title: i18n.t('auth_config.role'),
    dataIndex: "roleName",
    key: "roleName",
    width: 200,
    align: "left",
    scopedSlots: { customRender: "roleName" },
  },
  {
    title: i18n.t('auth_config.createTime'),
    dataIndex: "createTime",
    key: "createTime",
    width: 300,
    align: "left",
    scopedSlots: { customRender: "createTime" },
  },
  {
    title: i18n.t('auth_config.status'),
    dataIndex: "enabled",
    key: "enabled",
    // width: 200,
    align: "left",
    scopedSlots: { customRender: "enabled" },
  },
  {
    title: i18n.t('auth_config.action'),
    key: "action",
    width: 200,
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: 'right'
  }
];
