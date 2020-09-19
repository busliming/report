export default {
  data() {
    return {
      matchStatus:{
        0:"未开赛",
        1:"进行中",
        2:"暂停",
        3:"结束",
        4:"关闭",
        5:"取消",
        6:"比赛放弃",
        7:"延迟",
        8:"未知",
        9:"延期",
        10:"比赛中断",
      },
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
