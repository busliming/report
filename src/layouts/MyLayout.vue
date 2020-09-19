<template>
  <a-layout id="components-layout-demo-custom-trigger" class="full-width full-height">
    <q-resize-observer />
    <a-layout-header class="bg-panda-bg-6 height-80px border-bottom" style="padding: 0;">
      <q-toolbar>
        <img class="ml35x" :src="logo" height="45px" alt srcset />
        <q-toolbar-title class="fs20 fw_600"></q-toolbar-title>
        <div class="flex items-center q-gutter-lg fs20 text-black">
          <div>
            <a-select class="w-100" :default-value="language" @change="handle_change_language">
              <a-select-option v-for="(lang,index) in languageList" :key="index" :value="lang.key">
                {{lang.label}}
              </a-select-option>
            </a-select>
          </div>
          <div class="username text-black fs16">{{get_user_info.username}}</div>
          <a-dropdown :trigger="['click']" class="mr20x">
            <a class="ant-dropdown-link" href="#">
              <img class="border_radius mr20x avatar" :src="avatarImg" width="42" height="42" alt />
              <a-icon type="down" style="fontSize: 16px; color: #838CA1" />
            </a>
            <a-menu slot="overlay" class="fs14" @click="handle_menu_click">
              <a-menu-item v-for="(item, index) in menuList" :key="index">
                <a>
                  <a-icon :type="item.type" class="mr10x"></a-icon>
                  {{item.label}}
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </q-toolbar>
    </a-layout-header>
    <a-layout>
      <left-nav></left-nav>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="stylus" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 50px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  background: #1890ff;
  margin: 16px;
}

// 分页
>>> .ant-table-pagination.ant-pagination {
  margin-right: 30px;
}

>>>.ant-badge-dot {
  margin-top: 2px;
  margin-right: 2px;
}

.seamless-warp {
  height: 35px;
  overflow: hidden;
}

ul, li {
  list-style: none;
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import { api_login, api_message } from "src/api/index.js";
import logomixin from "src/mixins/common/logomixin.js";
import merchantMenu from "src/config/merchantMenu.js";
import leftNav from "src/components/leftNav/leftNav.vue";
import yonghu from "src/assets/img/yong-hu.svg";

export default {
  name: "MyLayout",
  components: {
    leftNav,
  },
  mixins: [logomixin],
  data() {
    return {
      menuList: [
        // { label: "修改密码", type: "lock" },
        { label: this.$t('log_out'), type: "poweroff" }
      ],
      collapsed: false,
      languageList: [
        { key: 'zs', label: '简体中文'},
        { key: 'en', label: 'English'},
      ],
      language: this.$q.sessionStorage.getItem('language') || 'zs'
    };
  },
  created() {
    window.$router = this.$router;
    this.initLogo(); // 各个环节logo的取值
  },
  watch: {
    $route: {
      handler(val) {
        // 不在用户投注页面时清除session
        if (val.name != "users" && val.name != "users_user_detail") {
          this.$q.sessionStorage.getItem("selectedDate") &&
            this.$q.sessionStorage.remove("selectedDate");
          this.$q.sessionStorage.getItem("cachParams") &&
            this.$q.sessionStorage.remove("cachParams");
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters(["get_user_info", "get_amount"]),
    avatarImg() {
      let avatar = "";
      if (this.get_user_info.avatar) {
        avatar = `data:image/jpg;base64,${this.get_user_info.avatar}`;
      } else {
        avatar = yonghu;
      }
      return avatar;
    }
  },

  methods: {
    ...mapActions({
      clear_user_info: "clear_user_info",
      clear_token: "clear_token",
      set_user_info: "set_user_info"
    }),
    // 语种切换
    handle_change_language(val){
      console.log(val);
      this.$q.sessionStorage.set('language',val)
      window.location.reload();
    },
    // 退出登录
    handle_menu_click(e) {
      if (this.menuList[e.key].label === this.$t('log_out')) {
        this.$q.sessionStorage.remove("userInfo");
        this.$q.sessionStorage.remove("token");
        this.clear_user_info();
        this.clear_token();
        this.$router.push({ name: "login" });
        this.$message.success(this.$t('log_out_success'));
      } else {
        this.updatePwdShow = true;
      }
    }
  }
};
</script>
