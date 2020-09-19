/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 16:02:20
 */
import { mapGetters } from 'vuex';
import { api_public, api_export } from "src/api/index.js";
export default {
  data() {
    return {
      merchantList: [
        // 商户种类
        { label: "直营商户", value: "1" },
        { label: "渠道商户", value: "2" },
        { label: "二级商户", value: "3" },
        { label: "投注用户", value: "4" }
      ],
      loginList: [
        //登录弹出
        { label: "是", value: 1 },
        { label: "否", value: 2 }
      ],
      files: [], //文件路径
    };
  },
  computed: {
    ...mapGetters(['get_token'])
  },
  methods: {
    //文件上传限制
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("单个文件大小不能超过20M！请重新上传");
      }
      return isLt2M;
    },
    // 文件上传
    customRequest(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      // formData.append("token", "aiufpaidfupipiu"); //随便写一个token示例
      console.log(formData, "formData");
      this.saveFile(formData);
    },
    // 文件上传前后端联调
    saveFile(formData) {
      if (this.files.length < 5) {
        api_public
          .post_manage_merchant_file_upload(formData)
          .then(res => {
            let { code } = res.data;
            if (code === "0000000") {
              let { fileName, filePath } = res.data.data;
              this.files.push({
                name: fileName,
                file: filePath
              });
              this.$message.success(`${fileName}文件上传成功！`);
              this.$q.localStorage.set("files", this.files);
            } else {
              this.$message.error("文件上传失败！请重试！");
            }
          })
      } else {
        this.$message.error("文件上传最多不超过5个！");
      }
    },
    // 下载文件
    handleDownload(item) {
      console.log(item);
      let params = {
        url: '/manage/merchant/file/download',
        fileName: item.name,
        filePath: item.file,
        token: this.get_token
      };
      api_export.post_excel_export(params);
      this.$message.success(`下载${item.name}成功!`);
    },
    handleRemove(item, index) {
      this.files.splice(index, 1);
      this.$q.localStorage.set("files", this.files);
      this.$message.warn("删除" + item.name + "成功！");
    }
  }
};
