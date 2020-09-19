/*
 * @Desc: 
 * @Date: 2020-02-08 21:46:34
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-22 14:47:42
 */
import { getAutoParams } from "src/util/module/common.js";
export default {
  data() {
    return {
      pagination: {
        pageSize: 20,
        current: 1,
        computingStandard: '',
        total: 0,
        start: '', //排序值
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      },
      // pagination: {
      //   // 分页配置器
      //   pageSize: 10, // 一页的数据限制
      //   current: 1, // 当前页
      //   total: 100, // 总数
      //   hideOnSinglePage: false, // 只有一页时是否隐藏分页器
      //   showQuickJumper: true, // 是否可以快速跳转至某页
      //   showSizeChanger: true, // 是否可以改变 pageSize
      //   pageSizeOptions: ["10", "20", "50", "100"], // 指定每页可以显示多少条
      //   onShowSizeChange: (current, pagesize) => {
      //     // 改变 pageSize时的回调
      //     this.pagination.current = current;
      //     this.pagination.pageSize = pagesize;
      //   },
      //   // onChange: (current) => { // 切换分页时的回调，
      //   // 当在页面定义change事件时，切记要把此处的事件清除，因为这两个事件重叠了，可能到时候会导致一些莫名的bug
      //   //   this.pagination.current = current
      //   // },
      //   showTotal: total => `总数：${total}人` // 可以展示总数
      // },

    }
  },
  methods: {
    sorterForTable(pagination, filter, sorter) {
      console.log(pagination, filter, sorter);
      console.log({...filter},'filter')
      this.pagination = pagination;
      this.pagination.sort = (sorter.order && sorter.order.replace('end', ''));
      this.pagination.orderBy = sorter.field;
      this.pagination.status = (filter.status && filter.status[0]);
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
      });
      return arr;
    },
  },
  watch: {
    searchForm: {
      handler(val){
        console.log(val);
        this.pagination.current = 1;
      },
      deep: true
    },
    ...getAutoParams({
      keys: ["current", "pageSize","sort","orderBy",],
      obj: "pagination",
      cb: function () {
        let timer = null
        return function () {
          clearTimeout(timer)
          timer = setTimeout(() => this.initTableData(), 100)
        }
      }()
    }),
    pagination: {
      handler(newVal,oldVal){
        console.log(newVal === oldVal);
        console.log(newVal,oldVal,'@@@@');
        // this.initTableData();
        // this.$lodash.debounce(this.initTableData,1000, {
        //   'leading': true,
        //   'trailing': false
        // });
      },
      deep: true,
      immediate: true
    }
  },
}