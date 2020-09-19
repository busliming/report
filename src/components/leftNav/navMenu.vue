<!--
 * @Desc: 
 * @Date: 2020-05-16 16:56:15
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-16 19:34:42
 -->
<template>
  <div class="nav-menu">
    <template v-for="(item,index) in menuList">
      <a-menu :key="index">
        <a-menu-item v-if="item.children === undefined" :key="item.name">
          <my-icon v-if="!item.children" type="p-icon-zhuye" theme="filled" />
          <span v-else class="fs16">●</span>
          <span class="ml5x">{{ item.text }}</span>
        </a-menu-item>
        <a-sub-menu :key="item.name" v-if="item.children && item.children.length > 0">
          <span slot="title">
            <my-icon :type="item.icon" theme="filled" />
            <span>{{item.text}}</span>
          </span>
          <!-- <navMenu :menuList="item.children" /> -->
          <a-menu-item v-for="item1 in item.children" :key="item1.name">
            <span class="fs16">●</span>
            <span class="ml5x">{{ item1.text }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <!-- <a-sub-menu :key="item.name" v-if="item.children && item.children.length > 0">
      
        
      </a-sub-menu>-->
    </template>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  props: {
    menuList: {
      type: Array
      // required: true
    }
  },
  created() {
    console.warn(this.menuList);
  }
};
</script>