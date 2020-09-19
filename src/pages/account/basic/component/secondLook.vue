<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="账户中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户信息管理" class="text-panda-text-4" />
        <q-breadcrumbs-el label="查看基本资料" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; min-height: 790px;" class="bg-panda-bg-6 shadow-3 border-radius-4 relative-position pl20x pr20x" id="secondUpdate">
      <a-tabs v-model="activeKey" class="col-12 ml20x">
        <a-tab-pane key="1" tab="基本信息">
          <div class="border-2 border-radius-4 mt40x pl20x pr20x ml20x" style="max-width: 701px;">
            <div class="row fs14 text-panda-text-7 pr10x mb40x">
              <div class="row pl20x mt40x">
                <div
                class="border-radius-4"
                :style="detailObj.logo? 'border: 1px dashed #c1c1c1': ''"
                >
                  <img
                    :src="detailObjImg"
                    v-if="httpUrl_72"
                    class="border-radius-4"
                    alt
                    width="100"
                    height="100"
                    style="padding: 5px;"
                  />
                  <!-- :style="detailObj.logo? 'max-height: 100px; max-width: 100px; padding: 5px;': 'max-height: 105px; max-width: 105px;'" -->
                </div>
                <div class="pl40x fw_600">
                  <div class=" line-height-24px mt20x text-panda-text-7 fs14">
                    <span class="panda-text-1">商户编号：</span>{{ detailObj.merchantCode }}
                  </div>
                  <div class="mt10x text-panda-text-7 fw_600"><span class="panda-text-1">商户名称：</span>{{ detailObj.merchantName }}</div>
                </div>
              </div>
              <q-btn style="margin-left: 235px; margin-top: 70px" class="panda-btn-upload" @click="handleEditBasic">编辑基本资料</q-btn>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x fs14">
              <div class="col-4 pl20x">
                <div class="panda-text-1">
                  商务联系人
                  <my-icon
                    type="p-icon-xiala"
                    @click="handleShowMoreContact"
                    class="fs12 cursor-pointer"
                    v-if="currentContact.length > 1"
                  ></my-icon>
                </div>
                <div
                  class="text-panda-text-7 line-height-24px"
                  v-if="!showMoreContact"
                >
                  {{ currentContact[0] }}
                </div>
                <div
                  v-else
                  class="text-panda-text-7 line-height-24px"
                  v-for="(item, index) in currentContact"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">
                  联系电话
                  <my-icon
                    type="p-icon-xiala"
                    @click="handleShowMoreContact"
                    class="fs12 cursor-pointer"
                    v-if="currentContact.length > 1"
                  ></my-icon>
                </div>
                <div
                  class="text-panda-text-7 line-height-24px"
                  v-if="!showMoreContact"
                >
                  {{ currentPhone[0] }}
                </div>
                <div
                  v-else
                  class="text-panda-text-7 line-height-24px"
                  v-for="(item, index) in currentPhone"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">电子邮件</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.email }}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">国家</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.country }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">省市地区</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.province }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">详细地址</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.address }}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">商户类型</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.agentLevel==0?"直营商户": detailObj.agentLevel==1?'渠道商户': '二级商户' }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">渠道商户</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.parentName }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">商户有效期</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.startTime }} ~ {{detailObj.endTime}}
                </div>
              </div>
            </div>
            <!-- <div
              class="absolute-top-right mt20x mr40x text-center cursor-pointer"
              @click="handleEditBasic"
            >
              <div class="fs30">
                <my-icon type="p-icon-shezhi" theme="filled" />
              </div>
              <div>编辑基本资料</div>
            </div> -->
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="商务信息">
          2
        </a-tab-pane>
        <a-tab-pane key="3" tab="技术参数">
          3
        </a-tab-pane> -->
      </a-tabs>
      
    </div>
  </div>
</template>

<script>
import { api_public, api_base, api_account } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import editOrUpdateMixin from "src/pages/account/basic/mixin/index.js";
import moment from "moment";

const FILE_PREFIX =
  process.env.API_PREFIX_FILE_REAL + "/manage/merchant/file/download?fileName=";
export default {
  mixins: [commontoolmixin, editOrUpdateMixin],
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),
      activeKey: '1',
      showMoreContact: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "secondEdit" });
  },
  created() {
    this.initMerchantDetail();
  },
  computed: {
    detailObjImg() {
      return this.detailObj.logo
        ? "data:image/jpg;base64," + this.detailObj.logo
        : this.httpUrl_72;
    },
    currentContact() {
      let arr =
        (this.detailObj.contact && this.detailObj.contact.split(",")) || [];
      return arr;
    },
    currentPhone() {
      let arr = (this.detailObj.phone && this.detailObj.phone.split(",")) || [];
      return arr;
    }
  },
  watch: {
    "detailObj.filePath"(val) {
      if (val) {
        let arr = val.split(";");
        let arr1 = [];
        if (this.detailObj.fileName) {
          arr1 = this.detailObj.fileName.split(";");
        }
        let newArr = [];
        if (arr.length > 0) {
          arr.map((item, i) => {
            newArr.push({
              name: arr1[i] || item.slice(item.indexOf("d/") + 2),
              file: item
            });
          });
        }
        this.files = newArr;
      }
    }
  },
  methods: {
    moment,
    // 点击出现多个联系人
    handleShowMoreContact() {
      this.showMoreContact = !this.showMoreContact;
    },
    onChange(value, dateString) {
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
    },
    // 上传logo
    uploadAvatar(event, num) {
      let inputFile = event.target.files[0];
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
      // 清空触发change时间
      event.target.value = "";
      api_public.put_manage_merchant_img_upload(formData).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          this.detailObj.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    // 关闭选择渠道弹窗
    handleCloseDialog(record) {
      this.selectChannelShow = false;
      this.detailObj.parentId = record.id;
      this.detailObj.childConnectMode = record.childConnectMode; //渠道商户对接模式=> 1 对接panda 2 对接渠道 控制是否显示只读
      this.detailObj.transferMode = record.childConnectMode === 2 ? 1 : ""; //控制url是否显示
      this.$message.success(`您选择了渠道商户： ${record.merchantName}`);
      console.table(record);
      this.$nextTick(() => {
        // 对接渠道商户时，url带出来，并且只能为只读！
        if (record.childConnectMode === 2) {
          this.form.setFieldsValue({
            parentName: record.merchantName,
            transferMode: record.transferMode,
            url: record.url,
            callbackUrl: record.callbackUrl
          });
        }else{
          this.form.setFieldsValue({
            parentName: record.merchantName
          });
        }
      });
    },
    // 选择渠道商户弹窗
    handleChannelDialog() {
      this.selectChannelShow = true;
    },
    initUsers() {
      if (this.detailObj.contact) {
        let contacts = this.detailObj.contact.split(",");
        let phones = this.detailObj.phone.split(",");
        let newUsers = [];
        for (let i = 0; i < contacts.length; i++) {
          newUsers.push({
            contact: contacts[i],
            phone: phones[i]
          });
        }
        this.users = newUsers;
      } else {
        this.users = this.users;
      }
    },
    async initMerchantDetail() {
      let params = {
        id: this.get_user_info.merchantId
      };
      let res = await api_account.get_admin_merchant_getDetail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.detailObj = data;
        this.detailObj.childConnectMode = data.parent.childConnectMode;
        if (this.detailObj) {
          this.initUsers();
        }
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.logo = this.detailObj.logo;
          values.agentLevel = this.detailObj.agentLevel;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          values.startTime = this.detailObj.startTime;
          values.endTime = this.detailObj.endTime;
          values.id = this.detailObj.id;
          values.parentId = this.detailObj.parentId;
          if (values.transferMode === 2) {
            values.url = "";
            values.callbackUrl = "";
          }
          if (this.handleNeedValues(values)) {
            console.log("Received values of form: ", values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("修改二级商户成功！");
                this.$router.go(-1);
                this.handleRouteParams();
              } else {
                this.$message.error(msg);
                this.ajaxLoading = false;
              }
            });
          }
        }
      });
    },
    handleNeedValues(values) {
      console.log(values.contact, values.phone);
      if (!values.contact || !values.phone) {
        this.$message.warn("商务联系人或者联系电话不能为空！");
        return false;
      } else {
        return true;
      }
    },
    // 钱包类型
    handleTransferModeChange(val) {
      this.detailObj.transferMode = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>#secondUpdate .ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-select-selection--single {
  height: 36px;
  line-height: 36px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 36px;
}

>>>.ant-select-selection__placeholder, .ant-select-search__field__placeholder {
  font-size: 12px;
  margin-top: -12px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 36px;
  // margin-top: 5px;
}

>>>.ant-input-number {
  width: 170px;
  height: 36px;
  font-size: 12px;
  line-height: 36px;
}

>>>#number .ant-input-number {
  width: 300px;
}

>>>#time .ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  padding: 0 11px;
}

>>>#parentName .ant-input {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 11px;
}

// 复写input框
>>>#secondUpdat .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 36px;
}

>>>#secondUpdat .q-field--dense .q-field__marginal {
  height: 36px;
}

>>>#secondUpdat .q-field--auto-height.q-field--dense .q-field__control {
  min-height: 36px;
}

>>>#secondUpdat .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 36px;
}

// form表单input样式重写
>>>#secondUpdat .q-field__bottom--animated {
  bottom: 6px;
}

>>>#secondUpdat .q-field__marginal {
  font-size: 14px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 12px;
}

>>>.ant-upload-list {
  display: none;
}

>>>.ant-input-disabled {
  background: #fff;
  color: #666;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 36px;
}

>>>.ant-select-disabled .ant-select-selection{
  background: #fff;
  color: #666;
}
</style>
