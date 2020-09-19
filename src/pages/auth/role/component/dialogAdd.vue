<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-24 19:51:55
 -->
<template>
  <div style="width: 470px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">{{detailObj.id?'修改角色':'创建角色'}}</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup class="text-panda-dialog-close" />
        </div>
      </q-card-section>
      <q-card-section class="fs14 mt20x ml20x">
        <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit">
          <div class="mt30x row">
            <!-- 用户名 -->
            <div>
              <div class="text-panda-text-7 mb10x fw_600">
                角色名称
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-400" has-feedback>
                  <a-input
                    allowClear
                    placeholder="请输入角色名称"
                    autocomplete="off"
                    maxlength="10"
                    :disabled="detailObj.isAdmin === 1?true: false"
                    style="width: 100%"
                    size="large"
                    v-decorator="[
                      'name',
                      { rules: [
                        { required: true, message: '角色名称不能为空！' },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- 邮箱 -->
            <div>
              <div class="text-panda-text-7 mb10x fw_600">
                备注信息
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-400" has-feedback>
                  <a-textarea
                    placeholder="请输入备注信息"
                    autocomplete="off"
                    maxlength="50"
                    size="large"
                    :rows="3"
                    allow-clear
                    v-decorator="[
                      'remark',
                      { rules: [
                        { required: true, message: '备注信息不能为空！' },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
            <!-- 密码 -->
          </div>

          <div class="row mt10x mb20x flex justify-end">
            <q-btn
              class="panda-btn-white mr30x"
              style="width:80px;height:32px; border: 1px solid #8A92A5;"
              v-close-popup
              label="取消"
            />
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:80px;height:32px; "
              @click="handleSubmit"
              :loading="loading"
              label="保存"
            />
          </div>
        </a-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { api_public, api_auth } from "src/api/index.js";
import authMixin from "src/pages/auth/role/mixin";
import md5 from "js-md5";

export default {
  mixins: [authMixin],
  props: {
    detailObj: {
      type: Object
    }
  },
  data() {
    return {
      formData: {
        avatar: "" // 头像
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "add" });
  },
  mounted() {
    (this.detailObj.id !== undefined) && this.initFormValues();
  },
  methods: {
    initFormValues() {
      let initValues = {
        name: this.detailObj.name,
        remark: this.detailObj.remark
      };
      this.form.setFieldsValue(initValues);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          let params = this.delete_empty_property_with_exclude(values);
          if (!this.detailObj.id) {
            api_auth.post_admin_role_add(values).then(res => {
              this.loading = false;
              let { code, msg, data } = res.data;
              if (code == "0000000") {
                this.$emit("closeDialog");
                this.$message.success("创建角色成功！");
              } else {
                this.$message.error(msg);
              }
            });
          }else{
            values.id = this.detailObj.id;
            api_auth.post_admin_role_editPost(values).then(res => {
              this.loading = false;
              let { code, msg, data } = res.data;
              if (code == "0000000") {
                this.$emit("closeDialog");
                this.$message.success("修改角色成功！");
              } else {
                this.$message.error(msg);
              }
            })
          }
        }
      });
    },
    // 上传图片
    uploadAvatar(event) {
      let inputFile = event.target.files[0];
      const isLt2M = inputFile && inputFile.size / 1024 / 1024 < 5;
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
          this.formData.avatar = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传头像成功");
        } else {
          this.$message.error("上传头像失败！请重新上传！");
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}

>>>.ant-input-lg {
  font-size: 14px;
}

>>>.ant-select-lg {
  font-size: 14px;
}

>>>.ant-input-number-lg {
  width: 170px;
  font-size: 14px;
}

>>>.ant-input-suffix {
  right: 25px;
}
</style>
