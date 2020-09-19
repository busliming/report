<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-14 21:36:06
 -->
<template>
  <div
    style="width: 450px ; height:auto;max-width:450px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">修改密码</div>
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
        <div class="row pl20x pt30x">
          <div>
            <div class="row flex just-between">
              <!-- <div class="text-panda-text-7 mb12x fw_600">
                原密码
                <span class="panda-text-red">*</span>
              </div> -->
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-400">
                <a-input-password
                  placeholder="请输入原密码"
                  maxLength='20'
                  size="large"
                  v-decorator="[
                    'oldPassword',
                    {
                      rules: [
                        {
                          required: true,
                          message: '原密码不能为空',
                        },
                       
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>

        <div class="row pl20x">
          <div>
            <div class="row flex just-between">
              <!-- <div class="text-panda-text-7 mb12x fw_600">
                新密码
                <span class="panda-text-red">*</span>
              </div> -->
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-400">
                <a-input-password
                  placeholder="请输入新密码"
                  size="large"
                  maxLength='20'
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          min: 6,
                          message: '新密码长度最少为6位！！'
                        },
                        { validator: checkedPwd }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>

        <div class="row pl20x">
          <div>
            <div class="row flex just-between">
              <!-- <div class="text-panda-text-7 mb12x fw_600">
                再次输入新密码
                <span class="panda-text-red">*</span>
              </div> -->
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item class="w-400">
                <a-input-password
                  placeholder="请再次输入新密码"
                  size="large"
                  maxLength='20'
                  v-decorator="[
                    'surePassword',
                    {
                      rules: [
                        {
                          required: true,
                          min: 6,
                          message: '再次输入新密码长度最少为6位！'
                        },
                        { validator: checkedPwd }
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
                label="修改"
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
import { mapGetters } from 'vuex'
import { api_home } from "src/api/index.js";
export default {
  data() {
    return {
      adminPwd: ''
    };
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "updatePwd" });
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 验证密码输入框
    checkedPwd(rule, value, callback) {
      const form = this.form;
      // if (!/^[a-zA-Z]([_a-zA-Z0-9]{6,20})$/.test(value)) {
      // if (!/^\w+$/g.test(value)) {
      if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(value)) {
        callback("至少一个非数字字符！");
      } else {
        callback();
      }
    },
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
          values.username = this.get_user_info.username;
          this.initChangePwd(values);
        }
      });
    },
    initChangePwd(values) {
      api_home.post_admin_user_editPwd(values).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("修改密码成功");
          this.$emit("closeDialog");
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    // 接口代码
    initSaveUserInfo(params) {
      api_merchant.post_manage_merchant_admin_create(params).then(res => {
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
      api_merchant.get_manage_merchant_getPassword({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          // this.detailObj.adminPassword = res.data.data;
          this.$nextTick(() => {
            this.form.setFieldsValue({
              adminPassword: res.data.data
            });
            this.adminPwd = res.data.data;
          });
        }
        this.$message.success("生成密码" + msg);
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
  margin-top 2px;
}

>>>.ant-input-disabled {
  background-color: #fff;
  color: #666;
}
</style>
