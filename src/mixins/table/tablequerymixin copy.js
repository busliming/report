/**
 * 表格的翻页器和翻页器实际实现脱离
 * 只接收翻页器组件派发出的事件，然后触发当前列表页面请求
 *
 * 表格父组件  接收 翻页器传递的
 *
 * 请勿将 翻页器 插件 和此 表格插件 引入到同一个组件内
 *
 * 输入  跟随子组件事件 接收 pageSize  currentPage   pagination
 * 输出  无
 * 自成闭环系统
 *
 *
 * 对于 表格请求 可能出现 三种 情况
 * 1. 必须强制刷新，页数 调整为1    例如查询条件改变       属于 非首次请求
 * 2.必须强制刷新 ，页数 为当前     例如 生成联赛ID         属于 非首次请求
 * 3. 正常的翻页请求，但是不能重复   例如屏蔽 页面加载瞬间 多次请求同页数据    属于 首次请求
 *
 *
 *
 *
 * 修改人: @jinnian
 * 注释时间: 2019-09-04 11:09:43
 */
/***
 *
 * 考虑到 原有 表格页面  因为 各种要求 最终  导致 多个 入口 触发页面请问 方法
 * 造成 各种  BUG
 * 因此  统一入口
 * 把真正的 触发器 入口 放在  pagation  内部  将 表格的  queryform 融入到此处
 *
 * queryfrom   分为 表格版本的 queryform 和 一般版本的
 *
 *queryform  和 翻页器 合一  翻页器的 值 从 queryform  取舍
 *
 * 缓存操作   只在 进入页面 取值  ，只在  离开页面  赋值
 *set_reset_query(2);  // 派发事件  对于指定订阅的数据 做出对应修改  例如  数据源这里 , 重置不是清空 ，有自己的 默认全选
 *
 * 牵扯  查询条件组件 存在 反向 回显 ，需求 ，肯定会造成 同样参数多次请求  采用json  字符串对比方式， 简单 评定  避免同条件多次请求
 *
 *
 * 修改人: @jinnian
 * 注释时间: 2019-09-19 09:57:32
 */

import { mapGetters, mapActions } from "vuex";
let exist_div;
export default {
  data() {
    return {
      pageSize_key: "pageSize",
      currentPage_key: "currentPage",
      request_important_params: ["pageSize", "currentPage"], // 表格请求的必须参数的 键名

      auto_request: false, //  自动请求   自动监听 queryform 的 改变  自动 请求表格数据   默认 不支持  ，页面内 可以覆写
      queryform_form: {}, //  实际使用的
      queryform_module: {
        //  模板  对于表格页面  必须有这个 至少  有  select_sportId   pageSize  currentPage
        // pageSize: 50,
        // currentPage: 1
      },
      total: 0, // 总条目数   后台返回   传值给 翻页器使用
      request_history: [], // 请求历史   不一定用
      tabledata_can_request: true, // 只是为了防止多次点击 连续请求
      request_currentPage: -1,
      data_label: " ", // 此处设置无数据时候的显示值为空
      data_label_true: "Sorry，没有找到您想要的结果，请更换查询条件！",
      emited_datasourcecode: [],
      show_table_no_data: true,
      final_params_needed_keys: []
    };
  },

  computed: {
    ...mapGetters({
      resetCurrentPage: "get_resetCurrentPage"
    })
    // 无数据时的界面控制
  },
  watch: {
    tabledata(val) {
      if (Array.isArray(val) && val.length > 0) {
        this.show_table_no_data = false;
      } else {
        this.set_showrightdetail({
          routename: this.$route.name,
          value: 2
        });
        this.show_table_no_data = true;
      }
    },
    select_sportId(newValue, oldValue) {
      if (newValue && oldValue) {
        console.log(
          "======================================this.reset_queryform_select_sportId_new();===========================================",
          newValue,
          oldValue
        );
        // 处理注单中心先请求后赋值   参数变成最新
        Promise.resolve().then(() => {
          this.reset_queryform_select_sportId_new();
        });
      }
      if (!oldValue) {
        console.log(
          "============================================ this.reset_queryform_select_sportId_init();=====================================",
          newValue,
          oldValue
        );
        this.reset_queryform_select_sportId_init();
      }
    },
    select_sport_id(newValue, oldValue) {
      if (newValue && oldValue) {
        console.log(
          "======================================this.reset_queryform_select_sportId_new();===========================================",
          newValue,
          oldValue
        );
        // 处理注单中心先请求后赋值   参数变成最新
        Promise.resolve().then(() => {
          this.reset_queryform_select_sportId_new();
        });
      }
      if (!oldValue) {
        console.log(
          "============================================ this.reset_queryform_select_sportId_init();=====================================",
          newValue,
          oldValue
        );
        this.reset_queryform_select_sportId_init();
      }
    },
    queryform_form: {
      handler: function(newValue, oldValue) {
        // this.confirm_and_init_tabledata();
        this.init_tabledata_when_queryform_form_change(newValue, oldValue);
      },
      deep: true
    },
    emited_datasourcecode: {
      handler: function(newValue, oldValue) {
        //   不是翻页器触发
        console.log(" //   不是翻页器触发  260");

        this.set_resetCurrentPage();

        console.log(this.resetCurrentPage);

        console.log(666);
      },
      deep: true
    }
  },

  methods: {
    ...mapActions([
      "set_reset_query",
      "set_resetCurrentPage",
      "set_showrightdetail"
    ]),

    init_tabledata_when_queryform_form_change(newValue, oldValue) {
      // this.confirm_and_init_tabledata();
      /**
       * 存在翻页器回显 触发情况  和 其他查询 条件 改变触发 情况
       *
       */
      console.log(
        "==============================init_tabledata_when_queryform_form_change==================================================="
      );
      console.log(
        newValue[this.pageSize_key],
        oldValue[this.pageSize_key],
        newValue[this.currentPage_key],
        oldValue[this.currentPage_key]
      );
      if (this.request_history.length > 0) {
        let obj = JSON.parse(this.request_history[0]);

        let check =
          obj[this.pageSize_key] == newValue[this.pageSize_key] &&
          obj[this.currentPage_key] == newValue[this.currentPage_key];

        if (check && newValue[this.currentPage_key] != 1) {
          //   不是翻页器触发
          console.log(" //   不是翻页器触发");

          this.set_resetCurrentPage();
        } else {
          //  翻页器触发
          console.log("//  翻页器触发");
          this.confirm_and_init_tabledata();
        }
      } else {
        console.log("首次请求");
        this.confirm_and_init_tabledata();
      }
    },
    get_router_cache_value_and_init() {
      this.init_tabledata_by_router_cache();
    },
    confirm_and_init_tabledata() {
      let check = this.confirm_table_request_can_do();
      console.log(
        "当前的表格请求 confirm_and_init_tabledata() 的 参数  this.queryform_form  如下"
      );
      console.log(this.queryform_form);
      console.log("当前请求的select_sportId 如下");
      console.log(this.select_sportId);
      console.log("当前的请求历史如下");
      console.log(this.request_history);
      console.log("检查表格是否能请求结果：   ", check);

      if (check) {
        this.request_history.push(JSON.stringify(this.queryform_form));
        if (this.request_history.length > 1) {
          this.request_history.shift();
        }
        this.init_tabledata();
      }
    },

    handle_pagination_change(val) {
      console.log("父级 表格接收到的  this.pagination=val ");
      console.log(val);
      /**
       * 此处 值的传递 完全只是为了  表格显示不做实际请求 参照
       */
      this.pagination = val;
    },
    init_tabledata_with_pageSize_and_currentPage(pageSize, currentPage) {
      console.log(
        " init_tabledata_with_pageSize_and_currentPage(pageSize, currentPage) ",
        currentPage
      );
      this.queryform_form[this.pageSize_key] = pageSize;
      this.queryform_form[this.currentPage_key] = currentPage;
    },
    confirm_table_request_needed_parameter_ready() {
      let ready = true;
      /**
       * 基础数据确认
       * 一个 参数无值 则不再 请求
       */
      for (let i = 0; i < this.request_important_params.length; i++) {
        if (!this.queryform_form[this.request_important_params[i]]) {
          ready = false;
          break;
        }
      }
      return ready;
    },
    confirm_table_request_other_parameter_ready() {
      let ready = true;
      return ready;
    },

    confirm_table_request_can_do() {
      /**
       * 检查分两步
       * 1. 基础参数 必须参数 到位
       * 2. 确认不是多次请求
       *
       */
      let check = false;
      check =
        this.tabledata_can_request &&
        this.confirm_select_sportId_ready() &&
        this.confirm_table_request_needed_parameter_ready() &&
        this.confirm_table_request_other_parameter_ready() &&
        this.confirm_not_qurest_multi_times();

      return check;
    },
    confirm_select_sportId_ready() {
      let check = true;
      if (!this.select_sportId) {
        check = false;
      }
      return check;
    },

    confirm_not_qurest_multi_times() {
      let cando = true;
      /**
       * 这里 通过 json  字符串比较  两次的值
       * 只在
       */
      if (this.request_history > 0) {
        let str = this.request_history[0];
        if (str == JSON.stringify(this.queryform_form)) {
          cando = false;
        }
      }

      return cando;
    },

    init_tabledata_before() {
      // this.compute_pagination();
      this. = true;
      // this.$nextTick(() => {
      //   this.change_data_label_style(this.);
      // }); // 改变原始样式
      this.tabledata_can_request = false;
    },
    resolve_tabledata_response_base(res) {
      this.init_tabledata_after(res);
      this.tabledata = this.$lodash.get(res, "data.data.records") || [];
      this[this.currentPage_key] =
        this.find_value_in_obj_bypath(res, "res.data.page") * 1 || 1;
      this.total =
        this.find_value_in_obj_bypath(res, "res.data.total") * 1 || 0;
    },
    init_tabledata_after(res, no_msg) {
      this. = false;
      this.tabledata_can_request = true;
      if (!no_msg) {
        this.alert_message(res);
      }
      // this.$nextTick(() => {
      //   this.change_data_label_style(this.);
      // }); // 改变原始样式
    },
    // 改变查询没信息样式 废弃不用
    change_data_label_style(flag) {
      let nodata_total = document.getElementsByClassName(
        "q-table__bottom row items-center q-table__bottom--nodata"
      );
      // 显示分页器
      let pagination = document.getElementsByClassName(
        "q-table__bottom row items-center"
      );
      pagination = pagination && pagination[0];
      pagination && (pagination.style.display = "block");
      let nodata = nodata_total && nodata_total[0];
      let first = nodata && nodata.firstElementChild;
      // 移除图标
      if (first && first.tagName === "I") {
        first.style.display = "none";
      }
      // 移除存在的图片元素
      exist_div && exist_div.remove();
      // nodata是检验是否无数据的标志位，如果有，则增加icon图片
      if (nodata) {
        let exist_img = document.createElement("img");
        exist_img.setAttribute("src", "statics/svg/icon_empty.svg");
        // 图片的样式
        exist_img.style.cssText = `width: 60px; height: 60px; position: absolute; top: -67px; left: 95px`;
        // 主体元素样式
        exist_div = document.createElement("div");
        exist_div.style.cssText = `position: absolute; left: 871px; top: calc(266px + 67px);`;
        exist_div.append(exist_img, this.data_label_true);
        // 通过tabelloading 状态判断是否显示，字体图标灰色
        nodata.classList.add("panda-text-grey");
        if (flag) {
          nodata.style.display = "none";
        } else {
          nodata.style.display = "block";
        }
        nodata.appendChild(exist_div);
      }
    },

    init_tabledata_by_router_cache() {
      // this.queryform_form = this.$lodash.cloneDeep(this["queryform_module"]);

      // return false;
      this.select_sportId = this.get_router_cache_value_by_path("sportId");
      if (this.queryform_form) {
        let obj = "";
        if (this.get_router_cache_value_by_path) {
          obj = this.get_router_cache_value_by_path("queryform_form");
        }

        if (obj && typeof obj == "object" && Object.keys(obj).length > 0) {
          // 有缓存  用缓存
          console.log("表格页面处理  init_queryform   读取缓存内容 如下");
          console.log(obj);
          this.queryform_form = this.$lodash.cloneDeep(obj);
          // 注单中心注单详情不拿缓存值处理
          if (!this.ctl_by_self_) {
            this.confirm_and_init_tabledata();
          }
        } else {
          // 无缓存  用模板
          console.log(
            "表格页面处理  init_queryform  当前无缓存内容 将会 复制模板"
          );

          this.queryform_form = this.$lodash.cloneDeep(
            this["queryform_module"]
          );
        }
      }
    },

    tosearch_queryform() {
      /**
       * 重新从第一页请求  ,现在先默认 点击搜索 就是  更改了 查询条件 ，后期在做优化
       */
      if (
        this.queryform_form[this.currentPage_key] &&
        this.queryform_form[this.currentPage_key] !== 1
      ) {
        this.set_resetCurrentPage();
      } else {
        this.init_tabledata_force_irrespective_page();
      }
    },
    reset_queryform_select_sportId_new() {
      //  select_sportId  之前有数值
      console.log("88888888888");
      this.queryform_form = {};
      this.queryform_form = this.$lodash.cloneDeep(this["queryform_module"]);
      this.set_reset_query(2); // 派发事件  对于指定订阅的数据 做出对应修改

      this.set_resetCurrentPage();
      this.init_tabledata_force_irrespective_page();
    },
    reset_queryform_select_sportId_init() {
      // select_sportId   之前无数值

      this.init_tabledata_force_irrespective_page();
    },

    init_tabledata_force() {
      this.init_tabledata();
    },
    init_tabledata_force_irrespective_page() {
      console.log(7899999999);

      console.log(this.queryform_form);
      let check =
        this.tabledata_can_request &&
        this.confirm_select_sportId_ready() &&
        this.confirm_table_request_other_parameter_ready() &&
        this.confirm_table_request_needed_parameter_ready();
      if (check) {
        this.init_tabledata();
      }
    },
    check_final_params_by_needed_keys(params) {
      console.log( 'check_final_params_by_needed_keys(params) ');
      console.log(params);
      console.log(this.final_params_needed_keys);
 
      let check = true;
      let len = this.final_params_needed_keys.length;
      if (len > 0) {
        let pks = Object.keys(params);

       if( this.$lodash. intersection(this.final_params_needed_keys,pks ).length==len){
         check=true
       }else{
         check=false
       }

      } 
      console.log( check);
      return check;
    }
  }
};
