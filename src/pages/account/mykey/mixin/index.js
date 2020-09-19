/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-11 20:08:50
 */
import { mapGetters } from 'vuex'
import dialogEdit from "src/pages/account/mykey/component/dialogEdit.vue";
import dialogSub from "src/pages/account/mykey/component/dialogSub.vue";
import { tablecolumns_config } from "src/pages/account/mykey/config/config.js";
import { api_account } from "src/api/index.js";
import mixins from "src/mixins/index.js";
export default {
  mixins: [...mixins],
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,

      searchForm: {
        merchantName: "" //商户名称
      },
      showDialogObj: "",
      scroll_area_height: "",
      eidtKeyShow: false, //编辑证书弹窗阀值
      subKeyShow: false //子证书管理弹窗阀值
    }
  },
  computed: {
    ...mapGetters(['get_data'])
  },
  components: {
    dialogEdit,
    dialogSub
  },
  methods: {
    initParams(){
      if(this.get_data){
        this.handleEdit(this.get_data)
      }
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      api_account.get_admin_merchant_getKey(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = []
          res.data.data && arr.push(res.data.data);
          this.tabledata = this.computeToNeeded(arr);
        }else{
          this.tabledata = [];
          code !== '0400403' && this.$message.error(res.data.msg, 5);
        }
      });
    },
    computeToNeeded(arr) {
      if (arr.length > 0) {
        arr.map((item, index) => item._index = index + 1)
      }

      return arr;
    },
    compute_init_tabledata_params() {
      let params = {};
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 复制证书
    handleCopy(record, index) {
      console.log(record.key, index, "qqq");
      var oInput = document.createElement("input");
      oInput.value = record.key;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      if (oInput.value) {
        this.$message.success("复制KEY成功,可以进行下一步操作！");
      }
    },
    //编辑证书
    handleEdit(record) {
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    // 关闭更新证书弹窗
    handleCloseDialogEdit(val) {
      console.log(val)
      this.eidtKeyShow = false;
      val && this.initTableData();
    },
    // 子证书管理
    handleSubCert(record, index) {
      this.showDialogObj = { ...record };
      this.subKeyShow = true;
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.eidtKeyShow = false;
      this.initTableData();
    }
  }
};
