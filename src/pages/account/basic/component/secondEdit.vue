<template>
  <div class="full-width full-height">
    <div class="pl20x mt15x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="账户中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户信息管理" class="text-panda-text-4" />
        <q-breadcrumbs-el label="编辑基本资料" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 14px 20px 20px 20px; min-height: 790px;" class="bg-panda-bg-6 shadow-3 border-radius-4 pl20x pr20x" id="secondUpdate">
      <a-tabs v-model="activeKey" class="col-12 ml20x">
        <a-tab-pane key="1" tab="基本信息">
          <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit" v-if="detailObj.merchantCode">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="row">
                  <div class="left mt20x pl40x">
                    <div class>
                      <div class="text-panda-text-7  fw_600">
                        商户编号
                      </div>
                      <div class="append-handle-btn-input row">
                        <a-form-item class="w-300" has-feedback>
                          <span>{{detailObj.merchantCode}}</span>
                        </a-form-item>
                      </div>
                    </div>
                    <div>
                      <div class="text-panda-text-7  fw_600">
                        商户名称
                      </div>
                      <div class="append-handle-btn-input row">
                        <a-form-item class="w-300" has-feedback>
                          <span>{{detailObj.merchantName}}</span>
                        </a-form-item>
                      </div>
                    </div>
                    <div class="w-240">
                      <div class="text-panda-text-7 ">
                        <div class="flex justify-between">
                          <div class="email fw_600">
                            邮箱地址
                            <span class="panda-text-red">*</span>
                          </div>
                          <div class="msg fs12 text-panda-text-3">发送通知的主要邮箱地址</div>
                        </div>
                      </div>
                      <div class="append-handle-btn-input row">
                        <a-form-item class="w-300" has-feedback>
                          <a-input
                            placeholder="请输入邮箱地址"
                            maxlength="18"
                            v-decorator="[
                                  'email',
                                  { rules: [
                                    {
                                      type: 'email',
                                      message: '邮箱格式不正确！',
                                    },
                                    {
                                      required: true,
                                      message: '邮箱地址不能为空！',
                                    },
                                  ]}
                                ]"
                          />
                        </a-form-item>
                      </div>
                    </div>
                  </div>
                  <div class="right ml80x" style="margin-top: 40px;">
                    <div class="flex" style="width:165px; position: relative">
                      <div
                        class="border-radius-4"
                        :style="detailObj.logo? 'border: 1px dashed #c1c1c1': ''"
                      >
                        <img
                          :src="detailObjImg"
                          v-if="httpUrl_72"
                          class="border-radius-4"
                          alt
                          :style="detailObj.logo? 'max-height: 160px; max-width: 160px; padding: 5px;': 'max-height: 165px; max-width: 165px;'"
                        />
                      </div>
                      <div class="position-relative">
                        <input
                          style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:150px; z-index: 1; position: absolute;bottom: -40px;right:0px;"
                          type="file"
                          name="inputfile1"
                          @change="uploadAvatar($event)"
                          ref="inputfile1"
                          accept="image/jpeg, image/gif, image/png, image/bmp, image/tif, image/jpg"
                        />
                        <q-btn
                          class="panda-btn-upload mt9x position-absolute"
                          style="bottom: -40px;right:0px; z-index: 0"
                          label="上传LOGO"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style="clear: both"></div>
                <div class="flex ml40x" v-for="(item, index) in users" :key="'contact' + index">
                  <div :key="'contact' + index">
                    <div class="text-panda-text-7  fw_600" v-if="index == 0">
                      商务联系人
                      <span class="panda-text-red">*</span>
                    </div>
                    <div class="append-handle-btn-input row">
                      <q-input
                        style=" width:240px;"
                        maxlength="10"
                        outlined
                        :ref="'contact' + index"
                        dense
                        color="panda-text-light"
                        class="text-panda-text-dark panda-input-dense input-height-36px"
                        v-model.trim="item.contact"
                        placeholder="请输入联系人名称"
                        lazy-rules
                        :rules="[
                          
                        ]"
                      ></q-input>
                    </div>
                  </div>
                  <div v-if="index != 0" class="line-height-36px ml25x">
                    <span
                      class="panda-icon panda-icon-qu-chu cursor-pointer"
                      @click="handleRemoveUsers(index)"
                    ></span>
                  </div>
                  <div :class="index == 0 ? 'ml65x' : 'ml25x'">
                    <div class="text-panda-text-7  fw_600" v-if="index == 0">
                      联系电话
                      <span class="panda-text-red">*</span>
                    </div>
                    <div class="append-handle-btn-input row">
                      <q-input
                        style=" width:240px;"
                        maxlength="12"
                        outlined
                        :ref="'phone' + index"
                        dense
                        color="panda-text-light"
                        class="text-panda-text-dark panda-input-dense input-height-36px"
                        v-model.trim="item.phone"
                        placeholder="请输入联系人电话"
                        lazy-rules
                        :rules="[
                          
                        ]"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <div>
                  <q-space></q-space>
                  <div style="margin-left: 485px;">
                    <q-btn class="panda-btn-upload" @click="handleAddUsers">+ 新增联系人</q-btn>
                  </div>
                </div>
                <div class="flex ml40x mt10x">
                  <div class>
                    <div class="text-panda-text-7  fw_600">国家</div>
                    <div class="append-handle-btn-input row">
                      <a-form-item class="w-240">
                        <a-input
                          placeholder="请输入国家名称"
                          maxlength="10"
                          v-decorator="[
                            'country',
                          ]"
                        />
                      </a-form-item>
                    </div>
                  </div>
                  <div class="ml65x">
                    <div class="text-panda-text-7  fw_600">省市地区</div>
                    <div class="append-handle-btn-input row">
                      <a-form-item class="w-240">
                        <a-input
                          placeholder="请输入省市地区"
                          maxlength="10"
                          v-decorator="[
                            'province',
                          ]"
                        />
                      </a-form-item>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="ml40x">
                    <div class="text-panda-text-7  fw_600">详细地址</div>
                    <div class="append-handle-btn-input row">
                      <a-form-item class="w-542">
                        <a-input
                          placeholder="请输入详细地址"
                          maxlength="20"
                          v-decorator="[
                            'address',
                          ]"
                        />
                      </a-form-item>
                    </div>
                  </div>
                </div>
                <div class="row pb20x" style="max-width: 600px;">
                  <div class="col-4 pl40x">
                    <div class="text-panda-text-7 fw_600">商户类型</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ detailObj.agentLevel==0?"直营商户": detailObj.agentLevel==1?'渠道商户': '二级商户' }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="text-panda-text-7 fw_600">渠道商户</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ detailObj.parentName }}
                    </div>
                  </div>
                  <div class="col-4 pl20x">
                    <div class="text-panda-text-7 fw_600">商户有效期</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ detailObj.startTime }} ~ {{detailObj.endTime}}
                    </div>
                  </div>
                </div>
                <div class="mt20x mb20x flex justify-center" style="max-width: 600px;">
                  <q-btn
                    class="panda-btn-primary-dense bg-primary mr20x"
                    style="width:100px;height:32px; "
                    @click="handleSubmit"
                    :loading="ajaxLoading"
                    label="保存"
                  />
                  <q-btn
                    class="panda-btn-white border-1px"
                    style="width:80px;height:32px; "
                    @click="handleCancel"
                    label="取消"
                  />
                </div>
              </div>
              <!-- 保存取消按钮 -->

            </div>
            <!-- </form> -->
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- 选择商户等级 -->
    <q-dialog v-model="selectChannelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-select-channel @closeDialog="handleCloseDialog"></dialog-select-channel>
    </q-dialog>
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
      activeKey: '1'
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "secondUpdate" });
  },
  created() {
    this.initMerchantDetail();
  },
  computed: {
    detailObjImg() {
      return this.detailObj.logo
        ? "data:image/jpg;base64," + this.detailObj.logo
        : this.httpUrl_72;
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
        let initValues = {
          email: this.detailObj.email,
          country: this.detailObj.country,
          province: this.detailObj.province,
          address: this.detailObj.address,
        };
        this.$nextTick(() => {
          this.form.setFieldsValue(initValues);
        });
        if (this.detailObj) {
          this.initUsers();
        }
      } else {
        this.$message.error(msg);
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
            api_account.post_admin_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("修改商户基本资料成功！");
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
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-select-selection--single {
  height: 30px;
  line-height: 30px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 30px;
}

>>>.ant-select-selection__placeholder, .ant-select-search__field__placeholder {
  font-size: 12px;
  margin-top: -10px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 28px;
  margin-top: 0px;
}

>>>.ant-input-number {
  width: 160px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
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
  height: 30px;
}

>>>#secondUpdat .q-field--dense .q-field__marginal {
  height: 30px;
}

>>>#secondUpdat .q-field--auto-height.q-field--dense .q-field__control {
  min-height: 30px;
}

>>>#secondUpdat .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 30px;
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
  line-height: 30px;
}

>>>.ant-select-disabled .ant-select-selection{
  background: #fff;
  color: #666;
}

// 复写input框
>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 30px;
}

>>>.q-field--dense .q-field__marginal {
  height: 30px;
}

>>>.q-field--auto-height.q-field--dense .q-field__control {
  min-height: 30px;
}

>>>.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 30px;
}
>>>.ant-form-explain, .ant-form-extra{
  margin-top: -3px;
}

>>>.ant-select-lg .ant-select-selection__rendered{
  line-height: 30px;
}
</style>
