/*
 * @Desc: 
 * @Date: 2020-02-25 16:16:58
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-15 21:47:42
 */
 import { api_auth } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";

export default {
  mixins: [commonmixin],
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),
      enabledList: [
        //商户状态
        { label: "禁用", value: 0 },
        { label: "启用", value: 1 }
      ],
      roleList: [], // 角色权限
      loading: false,
      settleCurrencyList: [
        //结算币种
        { label: "所有币种", value: "" },
        { label: "人民币", value: "CNY" },
        { label: "美元", value: "USD" },
        { label: "欧元", value: "EUR" },
        { label: "新元", value: "SGD" }
      ],
      merchantTypeList: [
        //商户类型
        { label: "所有商户", value: "" },
        { label: "直营商户", value: 0 },
        { label: "渠道商户", value: 1 },
        { label: "二级商户", value: 2 }
      ],
    };
  },
  methods: {
    // 角色所有
    async initRoleList() {
      let res = await api_auth.post_admin_role_getAll({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        this.roleList = data;
      }
    }
  }
};
