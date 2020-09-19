<!--
 * @Desc: 
 * @Date: 2020-06-11 15:59:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-16 10:58:22
--> 
<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconTag"></use>
    </svg>
    <slot></slot>
  </div>
</template>
   
<script>
import "src/assets/iconfont/iconfont.js";
import 'src/assets/iconfont/iconfont.css'
export default {
  name: "myIcon",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    iconTag() {
      return `#${this.type}`;
    }
  }
};
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>