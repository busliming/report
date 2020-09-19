<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-10 17:27:25
 -->
<template>
  <div
    style="width: 340px ; height:auto;max-width:340px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">设置管理员</div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <a-form
        id="components-form-set"
        class="set"
        :form="form"
        @submit="handleSubmit"
      >
        <div class="row pl20x pt20x">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">
              超级管理员用户名
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-300" has-feedback>
                <a-input
                  placeholder="请输入管理员用户名"
                  size="large"
                  maxlength="20"
                  :disabled="detailObj.merchantAdmin ? true : false"
                  v-decorator="[
                    'merchantAdmin',
                    {
                      rules: [
                        {
                          required: true,
                          min: 4,
                          message: '管理员用户名最少4位！'
                        },
                        { validator: checkedMerchantAdmin }
                      ]
                    }
                  ]"
                />
                <!-- {
                validator: checkedMerchantAdmin,
                },-->
                <!-- { required: true, message: '管理员用户名不能为空！',trigger: 'blur', },
                { min: 4, message: '管理员用户名最少4位！',trigger: 'blur'},
                { max: 10, message: '管理员用户名最大10位！',trigger: 'blur'},
                { enum: ['admin', 'user', 'guest'], message: '管理员不可用该字段！'},
                {regexp: /^[a-zA-Z]([_a-zA-Z0-9]{3,20})$/, message: '用户名只能由字母、数字和下划线组成，且必须以字母开头！'}-->
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="row pl20x pt20x">
          <div>
            <div class="row flex just-between">
              <div class="text-panda-text-7 mb12x fw_600">
                登录密码
                <span class="panda-text-red">*</span>
              </div>
              <q-btn
                @click="handleCopy"
                class="panda-btn-upload fs12 ml40x"
                :disabled="!adminPwd? true: false"
                style="width: 70px; margin-top: -10px; box-sizing: content-box"
                >复制密码</q-btn
              >
              <q-btn
                @click="handleGeneratePassword"
                class="panda-btn-upload fs12"
                style="width: 70px; margin-top: -10px; box-sizing: content-box"
                >生成密码</q-btn
              >
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-300">
                <a-input
                  placeholder="请输入登录密码"
                  size="large"
                  disabled
                  v-decorator="[
                    'adminPassword',
                    {
                      rules: [
                        {
                          required: true,
                          message: '生成密码不能为空！请点击生成密码！'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>

        <q-card-section class="fs14">
          <div class="row" style="margin-top: -10px;">
            <q-space></q-space>
            <div class="row mb10x mr5x">
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width:100px;height:32px; "
                @click="handleSubmit"
                label="保存"
              />
              <q-btn
                class="panda-btn-white border-1px"
                style="width:80px;height:32px; "
                v-close-popup
                label="取消"
              />
            </div>
          </div>
        </q-card-section>
      </a-form>
    </q-card>
  </div>
</template>
<script>
import { api_account,api_merchant  } from "src/api/index.js";
export default {
  data() {
    return {
      noKeysWord: [
        "root",
        "admin",
        "administrator",
        "shutdown",
        "apache",
        "tomcat",
        "operator",
        "mail",
        "sync",
        "halt",
        "mysql",
        "nobody",
        "nfsnobody",
        "sshd",
        "rpcuser",
        "hdus",
        "hsqldb"
      ],
      adminPwd: ''
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "set" });
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.detailObj.adminPassword && (this.adminPwd = this.detailObj.adminPassword)
    this.form.setFieldsValue({
      merchantAdmin: this.detailObj.merchantAdmin,
      adminPassword: this.detailObj.adminPassword
    });
  },
  methods: {
    handleCopy() {
      console.log( this.adminPwd)
      var oInput = document.createElement("input");
      oInput.value = this.adminPwd;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      if (oInput.value) {
        this.$message.success(`复制管理员登录密码${this.adminPwd}成功,可以进行下一步操作！`);
        document.body.removeChild(oInput);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          if (this.detailObj.merchantAdmin) {
            let params = {
              id: this.detailObj.id,
              adminNewPassword: values.adminPassword
            };
            this.initChangePwd(params);
          } else {
            let params = {
              id: this.detailObj.id,
              adminName: values.merchantAdmin,
              adminPassword: values.adminPassword
            };
            this.initSaveUserInfo(params);
          }
        }
      });
    },
    // 验证商户管理员
    checkedMerchantAdmin(rule, value, callback) {
      const form = this.form;
      if (!/^[a-zA-Z]([_a-zA-Z0-9]{3,20})$/.test(value)) {
        callback("只能由字母、数字和下划线组成，且必须以字母开头！");
      } else if (this.noKeysWord.includes(value)) {
        callback("不得使用该关键词作为管理员用户名！");
      } else {
        callback();
      }
    },
    // 保存按钮
    handleSave() {
      this.validate();
      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        if (this.detailObj.merchantAdmin) {
          let params = {
            id: this.detailObj.id,
            adminNewPassword: this.detailObj.adminPassword
          };
          this.initChangePwd(params);
        } else {
          let params = {
            id: this.detailObj.id,
            adminName: this.detailObj.merchantAdmin
              ? this.detailObj.merchantAdmin
              : this.formData.merchantAdmin,
            adminPassword: this.detailObj.adminPassword
          };
          this.initSaveUserInfo(params);
        }
      }
    },
    initChangePwd(params) {
      api_account.get_admin_merchant_updateAdminPassword(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("修改密码成功");
          this.$emit("closeDialogSetShow");
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    // 接口代码
    initSaveUserInfo(params) {
      api_account.get_admin_merchant_createAdmin(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("设置管理员成功");
          this.$emit("closeDialogSetShow");
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    validate() {
      this.$refs.username.validate();
      this.$refs.password.validate();
    },
    // 生成密码
    handleGeneratePassword() {
      api_account.get_admin_merchant_getPassword({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          // this.detailObj.adminPassword = res.data.data;
          this.$nextTick(() => {
            this.form.setFieldsValue({
              adminPassword: res.data.data
            });
          });
        }
        this.$message.success("生成密码" + msg);
        this.adminPwd = res.data.data;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-input-lg {
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-form-explain, .ant-form-extra {
  font-size: 12px;
}

>>>.ant-input-disabled {
  background-color: #fff;
  color: #666;
}
</style>
