<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 20:06:58
 -->
<template>
  <div style="width: 600px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">{{$t('auth_modify_btn')}}: {{detailObj.username}}</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup class="text-panda-dialog-close" />
        </div>
      </q-card-section>
      <q-card-section class="fs14 mt20x ml20x">
        <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit">
          <a-form-item>
            <div class="flex" style="width:165px; position: relative">
              <div
                class="border-radius-4"
                :style="detailObj.avatar ? 'border: 1px dashed #c1c1c1' : ''"
              >
                <img
                  :src="detailObjImg"
                  v-if="httpUrl_72"
                  class="border-radius-4"
                  alt
                  :style="
                    detailObj.avatar
                      ? 'max-height: 160px; max-width: 160px; padding: 5px;'
                      : 'max-height: 165px; max-width: 165px;'
                  "
                />
              </div>

              <div class style="position: absolute; bottom: 0px; right: -200px;z-index: 2">
                <input
                  style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:200px;"
                  type="file"
                  name="inputfile1"
                  @change="uploadAvatar($event)"
                  ref="inputfile1"
                  accept="image/jpeg, image/gif, image/png, image/bmp"
                />
              </div>
              <div class style="position: absolute; bottom: 0; right: -130px; z-index: 1">
                <q-btn class="panda-btn-upload mt9x" :label="$t('auth_new_user.upload')" />
              </div>
            </div>
          </a-form-item>

          <div class="mt30x row">
            <!-- 用户名 -->
            <div>
              <div class="text-panda-text-7 mb10x fw_600">
                {{$t('auth_new_user.userName')}}
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-240" has-feedback>
                  <a-input
                    allowClear
                    :disabled="detailObj.isAdmin === 1? true: false"
                    :placeholder="$t('auth_new_user.userName_pl')"
                    autocomplete="off"
                    maxlength="20"
                    size="large"
                    v-decorator="[
                      'username',
                      { rules: [
                        { required: true, message: $t('auth_new_user.userName_er') },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
            <!-- 密码 -->
            <div class="ml40x">
              <div class="text-panda-text-7 mb10x fw_600">
                {{$t('auth_new_user.password')}}
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-240" has-feedback>
                  <a-input
                    allowClear
                    :placeholder="$t('auth_new_user.password_pl')"
                    maxlength="20"
                    autocomplete="off"
                    size="large"
                    v-decorator="[
                      'password',
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
                {{$t('auth_new_user.email')}}
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-240" has-feedback>
                  <a-input
                    :placeholder="$t('auth_new_user.email_pl')"
                    autocomplete="off"
                    maxlength="20"
                    size="large"
                    allowClear
                    v-decorator="[
                      'email',
                      { rules: [
                        { required: true, message: $t('auth_new_user.email_er') },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
            <!-- 密码 -->
            <div class="ml40x">
              <div class="text-panda-text-7 mb10x fw_600">
                {{$t('auth_new_user.contact')}}
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-240" has-feedback>
                  <a-input
                    allowClear
                    :placeholder="$t('auth_new_user.contact_pl')"
                    autocomplete="off"
                    maxlength="11"
                    size="large"
                    v-decorator="[
                      'phone',
                      { rules: [
                        { required: true, message: $t('auth_new_user.contact_er') },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="role">
              <div class="text-panda-text-7 fw_600 mb10x">
                {{$t('auth_new_user.role')}}
                <span class="panda-text-red">*</span>
              </div>
              <a-form-item>
                <div class="append-handle-btn-input position-relative w-240">
                  <a-select
                    autocomplete
                    :placeholder="$t('auth_new_user.role_pl')"
                    size="large"
                    :disabled="detailObj.isAdmin === 1? true: false"
                    hasFeedback
                    v-decorator="[
                      'roleId',
                      { rules: [
                        { required: true, message: $t('auth_new_user.role_er') },
                      ]}
                    ]"
                  >
                    <a-select-option
                      :value="item.id"
                      v-for="(item, index) in roleList"
                      :key="index"
                    >{{ is_zs?item.name: item.en }}</a-select-option>
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
            <div class="enabled w-240 ml40x">
              <div class="text-panda-text-7 fw_600 mb10x">
                {{$t('auth_new_user.status')}}
                <span class="panda-text-red">*</span>
              </div>

              <a-form-item>
                <div class="append-handle-btn-input position-relative">
                  <a-select
                    autocomplete
                    :placeholder="$t('auth_new_user.status_pl')"
                    size="large"
                    :disabled="detailObj.isAdmin === 1? true: false"
                    hasFeedback
                    v-decorator="[
                      'enabled',
                      { rules: [
                        { required: true, message: $t('auth_new_user.status_er') },
                      ]}
                    ]"
                  >
                    <a-select-option
                      :value="item.value"
                      v-for="(item, index) in enabledList"
                      :key="index"
                    >{{ item.label }}</a-select-option>
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="row mt10x mb20x flex justify-end">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handleSubmit"
              :loading="loading"
              :label="$t('yes_btn')"
            />
            <q-btn
              class="panda-btn-white mr30x"
              style="width:80px;height:32px; border: 1px solid #8A92A5;"
              v-close-popup
              :label="$t('no_btn')"
            />
          </div>
        </a-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_public, api_auth } from "src/api/index.js";
import userMixin from "src/pages/auth/user/mixin";
export default {
  mixins: [userMixin],
  props: {
    detailObj: ""
  },
  data() {
    return {
      formData: {
        avatar: "" // 头像
      }
    };
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    detailObjImg() {
      return this.detailObj.avatar
        ? "data:image/jpg;base64," + this.detailObj.avatar
        : this.httpUrl_72;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit" });
  },
  created() {
    this.initRoleList();
  },
  mounted() {
    this.initFormValues();
  },
  methods: {
    ...mapActions(['clear_user_info','clear_token']),
    initFormValues() {
      let initValues = {
        username: this.detailObj.username,
        email: this.detailObj.email,
        enabled: this.detailObj.enabled,
        phone: this.detailObj.phone,
        roleId: this.detailObj.roleId
      };
      this.form.setFieldsValue(initValues);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          values.id = this.detailObj.id;
          values.avatar = this.detailObj.avatar;
          values.password = values.password ? values.password : "";
          console.log(values, "values");
          this.loading = true;
          let params = this.delete_empty_property_with_exclude(values);
          api_auth.post_admin_user_editPost(values).then(res => {
            this.loading = false;
            let { code, msg, data } = res.data;
            if (code == "0000000") {
              this.$emit("closeEditDialog");
              if (this.get_user_info.isAdmin === 1) {
                if (this.get_user_info.username === values.username) {
                  this.$message.success("修改自身资料成功！请重新登录验证！");
                  setTimeout(() => {
                    this.$q.sessionStorage.remove("userInfo");
                    this.$q.sessionStorage.remove("token");
                    this.clear_user_info();
                    this.clear_token();
                    this.$router.push({
                      name: "login"
                    });
                  }, 3000);
                } else {
                  this.$message.success(this.$t('auth_modify_user_tip'));
                }
              } else {
                this.$message.success(this.$t('auth_modify_user_tip'));
              }
            } else {
              // this.$message.error(msg);
              this.$message.error(this.$t('auth_modify_user_tip1'));
            }
          });
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
          this.detailObj.avatar = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success(this.$t('auth_new_user_tip2'));
        } else {
          this.$message.error(this.$t('auth_new_user_tip3'));
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

>>>.ant-input-disabled {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
</style>
