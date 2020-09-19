<!--
 * @Desc: 
 * @Date: 2020-05-16 16:38:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-11 22:08:43
 -->
<template>
  <a-layout-sider
    class="bg-panda-bg-6 border-right position-relative"
    :trigger="null"
    id="components-layout-demo-custom-trigger"
    collapsible
    v-model="collapsed"
  >
    <!-- <div class="logo" /> -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      @click="handlerClick"
      mode="inline"
      theme="light"
      :inlineCollapsed="collapsed"
      @openChange="onOpenChange"
    >
      <!-- <Menu :menu="menu"/> -->
      <!-- <template v-for="menu in menuList" >
        <Menu v-if="!menu.children" :menu="menu" :key="menu.path"/>
        <ReSubMenu v-else :key="menu.path" :data="menu"></ReSubMenu>
      </template>-->
      <!-- <navMenu :menuList="menuList"/> -->

      <!-- <template v-for="(item) in menuList">
        <a-menu-item v-if="item.children.length === 0" :key="item.path">
          <my-icon class="ml10x" :type="item.icon" theme="filled"><span class="ml10x">{{ item.name }}</span></my-icon>
          
        </a-menu-item>
        <a-sub-menu :key="item.path" v-if="item.children && item.children.length > 0">
          <span slot="title">
            <my-icon class="ml10x" v-if="item.icon" :type="item.icon" theme="filled" ><span class="ml10x">{{item.name}}</span></my-icon>         
          </span>
          <a-menu-item v-for="item1 in item.children" :key="item1.path">
            <span class="fs16 ml15x">●</span>
            <span class="ml5x">{{ item1.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template> -->

      <template v-for="item in menuList">
        <a-menu-item v-if="item.children.length === 0" :key="item.path">
          <my-icon type="p-icon-zhuye" theme="filled" />
          <span>{{is_zs?item.name: item.en}}</span>
        </a-menu-item>
      </template>
      <template v-for="item in menuList">
        <a-sub-menu :key="item.path" v-if="item.children && item.children.length > 0">
          <span slot="title">
            <my-icon :type="item.icon" theme="filled" style="font-size:16px;"/>
            <span>{{is_zs?item.name: item.en}}</span>
          </span>
          <a-menu-item v-for="item1 in item.children" :key="item1.path">
            <span class="fs16">●</span>
            <span class="ml5x">{{ is_zs?item1.name: item1.en }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
    <div class="position-absolute ml10x" style="bottom:60px;">
      <div :class="!collapsed ? 'panda-btn-toggle' : ''" class="text-center" @click="toggleCollapsed">
        <my-icon
          class="trigger"
          style="margin-top: -5px;"
          :type="collapsed ? 'p-icon-zhankai2' : 'p-icon-zhankai1'"
        />
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from "vuex";
import menuList from "src/config/menu.js";
export default {
  data() {
    return {
      menuList,
      collapsed: false,
      rootSubmenuKeys: [], // 有children的menu
      openKeys: [], // //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [] // 当前选中的菜单项 key 数组
    };
  },
  created() {
    this.initRootSubMenu();
    this.get_user_info && (this.menuList = this.get_user_info.menus)
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    initMenuList() {
      return this.menuList;
    },
    is_zs(){
      return this.$q.sessionStorage.getItem('language') === 'zs'? true: false;
    }
  },
  methods: {

    //初始化菜单有展开项的子集菜单
    initRootSubMenu() {
      let arr = this.menuList.filter(
        item => item.children && item.children.length > 0
      );
      arr.map(item => {
        this.rootSubmenuKeys.push(item.name);
      });
      console.log(this.rootSubmenuKeys, "initRootSubMenu");
    },
    // 点击菜单
    handlerClick(e) {
      console.log('click', e)
      this.$router.push({
        name: e.key
      });
    },
    // 切换左边导航的按钮
    toggleCollapsed() {
      // alert(1)
      // console.log(this.collapsed)
      this.collapsed = !this.collapsed;
      // console.log(this.collapsed)
    },
    // onOpenChange
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (this.openKeys.length > 0) {
          this.openKeys.pop();
        }
        if (this.selectedKeys.length > 0) {
          this.selectedKeys.pop();
        }
        this.openKeys.push(val.matched[1].name);
        this.selectedKeys.push(val.name);
        if (val.meta.father_menu) {
          this.selectedKeys = [...val.meta.father_menu];
        }
        console.log(this.selectedKeys, "当前选中的路由对应高亮菜单");
        console.log(this.openKeys, "需要展开的sub");
        console.log(val.meta, "meta对象");
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>