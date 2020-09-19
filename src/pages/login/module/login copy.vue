<template>
  <div class="login" :class="showMsg? 'on': 'off'" @keyup.enter="onSubmit" @click="showhide">
    <div class="absolute-center" id="login-common">
      <div class="text-center" style="padding-top: 40px;">
        <img src="~assets/logo.svg" height="80px" alt srcset />
      </div>
      <div class="text-center login-title mt30x mb40x">商户管理平台</div>
      <div class="row justify-center text-white mt6x" v-if="showMsg">
        <div class="login-input-item login-input-message bg-white text-center text-tishi fs16">
          <span class="mr10x">
            <img src="~assets/tishi.svg" width="12" height="12" alt />
          </span>
          <span class="fs15">{{showMessage}}</span>
        </div>
      </div>
      <!-- 账号   -->
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit.prevent="handleSubmit"
      >
        <a-form-item>
          <a-input
            @focus="handleMsg"
            v-decorator="[
          'username',
          { rules: [{ required: true, message: '用户名不能为空！' }] },
        ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.6)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '密码不能为空！' }] },
        ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,0.6)" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="login-form-button mt20x"
          >登录</a-button>
        </a-form-item>
      </a-form>
      <!-- <div class="text-white row justify-center text-white mb40x mt20x">
        <div class="login-input-shape">
          <q-btn
            @click="onSubmit"
            :loading="loading"
            class="login-input-shape fs16 bg-panda-bg-2"
            style=" height: 40px; letter-spacing:10px"
          >登录</q-btn>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import mixin from "src/mixins/index.js";
import { api_login } from "src/api/index.js";
import { Cookies } from "quasar";
import md5 from "js-md5";
let app_prefix =
  process.env.API_PREFIX_APP_PREFIX + process.env.API_PREFIX_URL_PREFIX;
if (process.env.NODE_ENV == "development") {
  app_prefix =
    "/" + process.env.API_PREFIX_1 + process.env.API_PREFIX_URL_PREFIX;
}
let API_PREFIX_CURRENT_ENV = process.env.API_PREFIX_CURRENT_ENV;
let LOCAL_TEST =
  API_PREFIX_CURRENT_ENV === "local_dev" ||
  API_PREFIX_CURRENT_ENV === "local_test";
export default {
  mixins: [...mixin],
  data() {
    return {
      LOCAL_TEST: LOCAL_TEST,
      timer: 0,
      showimg: false,
      codemsg: "",
      loginForm: {
        username: "",
        password: ""
      },
      isPwd: true,
      isPwd2: true,
      showMsg: false,
      showMessage: "账号或密码错误，请重新输入！",
      loading: false //登录loading
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "login" });
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  watch: {
    "loginForm.username": function(val, oldVal) {
      this.codemsg = "";
    },
    "loginForm.password": function(val, oldVal) {
      this.codemsg = "";
    }
  },
  methods: {
    ...mapActions(["set_token", "set_user_info"]),
    showhide() {
      if (this.showimg) {
        this.showimg = false;
      }
    },
    //修改密码
    goToPassword() {
      this.$router.push({ name: "password" });
    },
    //忘记密码
    goToNewpassword() {
      this.$router.push({ name: "newpassword" });
    },
    handleSubmit() {
      this.showMsg = false;
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = {
            username: values.username,
            password: md5(values.password) // md5 加密
          };
          this.initLogin(params);
        }
      });
    },
    // 请求处理
    initLogin(params) {
      this.loading = true;
      api_login
        .postLogin(params)
        .then(res => {
          let { code, msg } = res.data;
          console.log(code, msg);
          // 成功
          if (code == "0000000") {
            this.loading = false;
            // Cookies.set("login", this.loginForm);
            let { token, user } = res.data.data;
            // 存储到本地
            this.$q.sessionStorage.set("token", token);
            this.$q.sessionStorage.set("userInfo", user);
            // 存储到vuex
            this.set_user_info(user);
            this.set_token(token);
            // 进入内容页
            let name =
              user.menus[0].children.length > 0
                ? user.menus[0].children[0].path
                : user.menus[0].path;
            this.$router.push({ name });
            this.$message.success("登录成功！");
          } else {
            // 错误
            // console.warn(res.data)
            // this.$message.error(msg)
            this.loading = false;
            this.showMsg = true;
            this.showMessage = msg;
          }
        })
        .catch(err => {
          this.loading = false;
          this.$q.notify({
            icon: "warning",
            color: "negative",
            message: "网络异常,请联系相关技术人员！"
          });
        });
    },
    handleMsg() {
      this.showMsg = false;
    },
    //
    handlePaste() {
      return false;
      // this.isPwd = true;
    },
    handleCopy() {
      return false;
      // this.isPwd = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.panda-icon-red {
  color: red;
  -webkit-text-fill-color: red;
}

.login {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  opacity: 0.96;
  background: url('../../../assets/img/bg.png') no-repeat center center;
  overflow: hidden;
  background-size: cover;
}

.text-tishi {
  color: #D06263;
}

#login-common {
  width: 583px;
  height: auto;
  opacity: 0.9;
  background: #141F29;
  box-shadow: 0 0 25px 4px rgba(0, 15, 38, 0.5);
  border-radius: 4px;
  border-radius: 4px;
}

.login-title {
  font-family: PingFangSC-Semibold;
  font-size: 35px;
  color: #FFFFFF;
  line-height: 40px;
}

.login-input-message {
  width: 406px;
  height: 34px;
  line-height: 34px;
}

.login-input-shape {
  width: 406px;
  // height: 40px;
  // line-height: 40px;
}

.login-input-item {
  background: rgba(255, 255, 255, 0.9);
  // border: 1px solid #D06263;
  border-radius: 4px;
  border-radius: 4px;
  margin-bottom: 25px;
}

#components-form-demo-normal-login {
  width: 400px;
  margin: 0 auto;
  color: #000000;
}

>>>.ant-input-affix-wrapper {
  color: #000000;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 10px;
}

>>>.ant-input-suffix i {
  color: #000000 !important;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 20px;
}
>>>input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: #666666;
}
>>>.ant-input{
  font-style 16px !important;
}
</style>

