export default {
  data() {
    return {
      loginStatus_arr: [
        { label: "全部", value: "" },
        { label: "正常", value: "1" },
        { label: "失败", value: "2" },
        { label: "异常", value: "3" }
      ],
      loginType_arr: [
        { label: "全部", value: "" },
        { label: "登录", value: "1" },
        { label: "登出", value: "2" }
      ],
      loginSuccess_arr:[
        { label: "成功", value: "1" },
        { label: "失败", value: "0" }
      ]
    };
  },
  methods: {
    compute_constant_value(key, value) {
      if (!key) {
        return "";
      }
      if (!Array.isArray(this[key])) {
        return "";
      }

      let rv = "";
      let len = this[key].length;
      for (let i = 0; i < len; i++) {
        if (this[key][i].value == value) {
          rv = this[key][i].label;
          break;
        }
      }
      return rv;
    }
  }
};
