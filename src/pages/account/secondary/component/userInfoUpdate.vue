<template>
  <div class="edit-user-info-second">
    <a-form class="edit" :form="form" @submit="handleSubmit">
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="left pl20x">
            <div class>
              <div class="text-panda-text-7 mb10x fw_600">
                商户编号
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-300" has-feedback>
                  <a-input
                    placeholder="请输入商户编号"
                    maxlength="6"
                    v-decorator="[
                      'merchantCode',
                      { rules: [
                        {
                          validator: checkedMerchantCode,
                        }
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
            <div>
              <div class="text-panda-text-7 mb10x fw_600">
                商户名称
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-300" has-feedback>
                  <a-input
                    placeholder="请输入商户名称"
                    maxlength="12"
                    v-decorator="[
                      'merchantName',
                      { rules: [
                        { required: true, message: '商户名称不能为空！' },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="right ml80x" style="margin-top: 25px;">
            <div class="flex" style="width:165px; position: relative" v-if="detailObjImg">
              <div class="border-radius-4" :style="detailObjImg? 'border: 1px dashed #c1c1c1': ''">
                <img
                  :src="detailObjImg"
                  v-if="httpUrl_72"
                  class="border-radius-4"
                  alt
                  :style="detailObjImg? 'max-height: 160px; max-width: 160px; padding: 5px;': 'max-height: 165px; max-width: 165px;'"
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
        <div class="ml20x w-300">
          <div class="text-panda-text-7 mb10x">
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
        <div class="flex ml20x" v-for="(item, index) in users" :key="'contact' + index">
          <div :key="'contact' + index">
            <div class="text-panda-text-7 mb12x fw_600" v-if="index == 0">
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
            <div class="text-panda-text-7 mb12x fw_600" v-if="index == 0">
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
          <div style="margin-left: 465px;">
            <q-btn class="panda-btn-upload" @click="handleAddUsers">+ 新增联系人</q-btn>
          </div>
        </div>
        <div class="flex ml20x mt10x">
          <div class>
            <div class="text-panda-text-7 mb10x fw_600">国家</div>
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
            <div class="text-panda-text-7 mb10x fw_600">省市地区</div>
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
          <div class="ml20x">
            <div class="text-panda-text-7 mb12x fw_600">详细地址</div>
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
        <!-- 商户有效期 -->
        <div class="row">
          <div class="col-4 pl20x">
            <div class="text-panda-text-7 mb10x fw_600">
              商户类型
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-130" has-feedback>
                二级商户
              </a-form-item>         
            </div>
          </div>
          <div class="col-4">
            <div class="text-panda-text-7 mb10x fw_600">
              渠道商户
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-130" has-feedback>
                {{get_user_info.merchantName}}
              </a-form-item>         
            </div>
          </div>
          <div class="col-4">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                商户有效期
              </div>
              <div id="time" class="append-handle-btn-input position-relative w-200">
                <a-form-item>
                  {{detail.startTime}} ~ {{detail.endTime}}
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 保存取消按钮 -->
        <div class="row flex justify-center mb20x">
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:80px;height:32px; "
            @click="handleSubmit"
            :loading="ajaxLoading" 
            label="保存"
          />
          <q-btn
            class="panda-btn-white"
            style="width:80px;height:32px;border: 1px solid #8A92A5; "
            @click="handleCancel"
            label="取消"
          />
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import { api_account, api_public } from "src/api/index.js";
import editOrUpdateMixin from "src/pages/account/secondary/mixin/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import moment from 'moment'
export default {
  mixins: [editOrUpdateMixin,commontoolmixin],
  props: {
    id: ''
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),
      detail: ''
    }
  },
  computed: {
    ...mapGetters(['get_user_info']),
    detailObjImg() {
      return this.detail.logo? "data:image/jpg;base64," + this.detail.logo: this.httpUrl_72;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-user-info-second-update" });
  },
  created(){
    this.initMerchantDetail();
  },
  methods: {
    moment,
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
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          this.detail.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.logo = this.detail.logo;
          values.agentLevel = this.detail.agentLevel;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone && phone.slice(0, phone.lastIndexOf(","));
          values.startTime = this.detail.startTime;
          values.endTime = this.detail.endTime;
          values.id = this.detail.id;
          values.parentId = this.detail.parentId;
          values.transferMode = this.detail.transferMode;
          values.url = this.detail.url;
          values.callbackUrl = this.detail.callbackUrl;
          values.balanceUrl = this.detail.balanceUrl;
          values.whiteIp = this.detail.whiteIp;
          if (this.handleNeedValues(values)) {
            console.log("Received values of form: ", values);
            this.ajaxLoading = true;
            api_account.post_admin_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("编辑二级商户成功！");
                this.$emit('close',true)
              } else {
                this.$message.error(msg);
                this.ajaxLoading = false;
              }
            });
          }
        }
      });
    },
    initMerchantDetail() {
      let params = {
        id: this.id
      };
      api_account.get_admin_merchant_getDetail(params).then(res => {
        let { code, msg } = res.data;
        if (code == "0000000") {
          this.detail = res.data.data;
          this.initUsers();
          this.detail && this.getInitValues()
        } else {
          this.$message.error(msg);
          // this.ajaxLoading = false;
        }
      });
    },
    // 数据赋值
    getInitValues(){
      let initValues = {
        merchantCode: this.detail.merchantCode,
        merchantName: this.detail.merchantName,
        email: this.detail.email,
        country: this.detail.country,
        province: this.detail.province,
        address: this.detail.address,
      };
      console.log(initValues,'initValues')
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    handleNeedValues(values) {
      if (!values.contact || !values.phone) {
        this.$message.warn("商务联系人或者联系电话不能为空！");
        return false;
      } else {
        return true;
      }
    },
    // 验证商户编号
    checkedMerchantCode(rule, value, callback) {
      const form = this.form;
      if (!/^\d{6}$/.test(value)) {
        callback("商户编号只能为6位数字！");
      } else {
        callback();
      }
    },
    // 初始化联系方式
    initUsers() {
      if (this.detail.contact) {
        let contacts = this.detail.contact.split(",");
        let phones = this.detail.phone?this.detail.phone.split(","): [];
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
  }
};
</script>

<style lang="stylus" scoped>
// form表单input样式重写
>>>.q-field__bottom--animated {
  bottom: 6px;
}

>>>.q-field__marginal {
  font-size: 14px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 12px;
}

>>>.ant-upload-list {
  display: none;
}

>>>.ant-upload.ant-upload-select {
  height: 30px;
  line-height: 30px;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 30px;
}

>>>.ant-input {
  min-height: 30px;
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
  margin-top: -12px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 34px;
  // margin-top: 5px;
}

>>>.ant-input-number {
  width: 180px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}

>>>#time .ant-input {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 11px;
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

</style>