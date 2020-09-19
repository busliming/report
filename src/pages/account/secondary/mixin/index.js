/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 15:56:52
 */
import { mapGetters } from "vuex";
import { api_public,api_base } from "src/api/index.js";
import constantmixin from 'src/mixins/common/constantmixin.js'

const FILE_PREFIX =
  process.env.API_PREFIX_FILE_REAL + "/manage/merchant/file/download?fileName=";
export default {
  mixins: [constantmixin],
  data() {
    return {
      loading: false,
      dateFormat: "YYYY/MM/DD",
      formData: {
        logo: "",
        currency: "",
        directSale: "",  //直营商户权限
        transferMode: "",
        childConnectMode: "", //对接模式
      }, //表单
      transferModeList: [
        //商户钱包
        { label: "免转钱包", value: 1 },
        { label: "转账钱包", value: 2 }
      ],
      directSaleList: [
        //直营商户曲线
        { label: "是", value: 1 },
        { label: "否", value: 2 }
      ],
      childConnectModeList: [
        //二级商户对接模式
        { label: "对接panda", value: 1 },
        { label: "对接渠道", value: 2 }
      ],
      computingStandardList: [
        //计算标准
        { label: "盈利金额", computingStandard: "1" },
        { label: "投注金额", computingStandard: "2" }
      ],
      paymentCycleList: [
        //缴纳周期
        { label: "每月", paymentCycle: 1 },
        { label: "每季度", paymentCycle: 2 },
        { label: "每半年", paymentCycle: 3 },
        { label: "每年", paymentCycle: 4 }
      ],
      vipPaymentCycleList: [
        //缴纳周期
        { label: "每月", vipPaymentCycle: 1 },
        { label: "每季度", vipPaymentCycle: 2 },
        { label: "每半年", vipPaymentCycle: 3 },
        { label: "每年", vipPaymentCycle: 4 }
      ],
      techniquePaymentCycleList: [
        //缴纳周期
        { label: "每月", techniquePaymentCycle: 1 },
        { label: "每季度", techniquePaymentCycle: 2 },
        { label: "每半年", techniquePaymentCycle: 3 },
        { label: "每年", techniquePaymentCycle: 4 }
      ],
      merchantLevelList: [], //商户等级
      users: [
        { contact: "", phone: "" }
        // { contact: "", phone: "" }
      ],
      files: [], //文件路径
      detailObj: {}, //当前商户详细信息
      selectLevelShow: false, // 商户等级弹窗阀值
      selectChannelShow: false, // 渠道商户选择弹窗阀值
      ajaxLoading: false,
      rangeConfig: {
        rules: [
          { type: "array", required: true, message: "商户有效期不能为空！" }
        ]
      },
      commerceList: [],  //商务列表
    };
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  methods: {
    // 验证ip白名单
    checkedWhiteIp(rule, value, callback){
      //let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if(!value){
        callback('IP白名单不能为空！')
      }else{
        callback();
      }
      // else if(!reg.test(value)){
      //   callback('ip白名单输入格式有误！')
      // }
    },
    // 有index跳转到edit或update 路由传参 本地持久化
    handleRouteParams() {
      let { agentLevel, pageSize, pageNum } = this.$route.query
      let params = {
        agentLevel,
        pageSize,
        pageNum
      };
      this.$q.sessionStorage.set("params", params);
    },
    // 取消按钮
    handleCancel() {
      // this.$router.push({name: 'secondary'});
      // this.handleRouteParams();
      this.$emit('close')
    },
    // 删除联系人
    handleRemoveUsers(i) {
      this.users.splice(i, 1);
      this.$message.success("删除联系人成功！");
    },
    initCommerceList() {
      api_base.get_manage_merchant_admin_list().then(res => {
        console.log(res);
        let { code } = res.data;
        if (code === '0000000') {
          this.commerceList = res.data.data;
        }
      })
    },
    // 联想下拉框过滤
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 上传LOGO
    uploadAvatar(event) {
      console.log(event, "inputFile");
      let inputFile = event.target.files[0];
      console.log(inputFile, "inputFile");
      const isLt2M = inputFile.size / 1024 / 1024 < 5;
      const isWantImage =
        inputFile.type === "image/jpeg" ||
        inputFile.type === "image/png" ||
        inputFile.type === "image/gif" ||
        inputFile.type === "image/tif" ||
        inputFile.type === "image/bmp";
      if (!isWantImage) {
        this.$message.error("只支持上传png/jpeg/tif/gif/bmp,请重新上传！");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不超过5M,请重新上传");
        return;
      }
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("imageFile", inputFile);
      console.log(event);
      // 清空触发change事件
      event.target.value = "";
      api_public.put_manage_merchant_img_upload(formData).then(res => {
        console.log(res);
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          this.formData.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
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
            console.log(res);
            let { code } = res.data;
            if (code === "0000000") {
              let { fileName, filePath } = res.data.data;
              // filePath = filePath.slice(filePath.indexOf("d/") + 2);
              // console.log(filePath, ".........");
              this.files.push({
                name: fileName,
                file: filePath
              });
              this.$message.success(`${fileName}文件上传成功！`);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("文件上传失败！请重试！");
          });
      } else {
        this.$message.error("文件上传最多不超过5个！");
      }
    },
    // 下载文件
    handleDownload(item) {
      console.log(item);
      let params = {
        fileName: item.name,
        filePath: item.file
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          console.log(res);
          this.$message.success(`下载${item.name}成功!`);
          window.open(FILE_PREFIX + item.name + "&filePath=" + item.file);
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    // 删除上传的文件
    handleRemove(item, index) {
      this.files.splice(index, 1);
      this.$message.warn("删除" + item.name + "成功！");
    },
    //新增联系人
    handleAddUsers() {
      if (this.users.length > 4) {
        this.$message.warn("新增联系人不能超过 " + this.users.length + " 组");
      } else {
        this.users.push({
          contact: "",
          phone: ""
        });
        this.$message.success("新增联系人成功！");
      }
    },
    // 点击商户等级弹出弹窗
    handleLevelDiaolog() {
      this.selectLevelShow = true;
    },
    // 关闭选择商户等级弹窗
    handleCloseDialogSelect(record) {
      console.log(record);
      this.handleFunction(record);
      this.selectLevelShow = false;
    },
  }
};
