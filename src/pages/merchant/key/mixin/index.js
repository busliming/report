/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 16:00:39
 */
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
export default {
  data() {
    return {
      tabledata: [],
      tabledata_loading: false,
      searchForm: {
        merchantName: "" //商户名称
      },
      showDialogObj: "",
      eidtKeyShow: false, //编辑证书弹窗阀值
    }
  },
  components: {
    dialogEdit,
  },
  methods: {
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
    handleEdit(record, index) {
      console.log(index)
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.eidtKeyShow = false;
      this.initTableData();
    }
  }
};
