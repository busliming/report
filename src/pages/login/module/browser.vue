<!--
 * @Desc: 
 * @Date: 2020-06-07 15:00:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-09 21:50:35
--> 
<template>
  <div class="browser">
    <div class="absolute-center" id="browser-common">
      <div class="text-left" style="padding-top: 90px; padding-left: 75px;">
        <!-- <img :src="logo" height="80px" alt srcset /> -->
      </div>
      <div class="text-center browser-title mt20x mb70x">
        <span>抱歉，您的浏览器版本过低，暂时无法访问本站点</span>
      </div>
      <div class="text-center browser-title-sm mt20x mb70x">
        <span class="mr20x">————</span>
        <span>为了给您带来更好的交互体验，我们强烈建议您升级到以下浏览器后进行访问</span>
        <span class="ml20x">————</span>
      </div>
      <div class="flex chrome">
        <a v-if="!isMac" class="chrome1" href="//support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads">
          <img class="mt15x" src="~assets/img/IE.png" alt width="50" />
          <div class="text">IE11</div>
        </a>
        <a v-else class="chrome1" href="//support.apple.com/zh_CN/downloads/safari">
          <img class="mt15x" src="~assets/img/safari.png" alt width="50" />
          <div class="text">safari</div>
        </a>
        <a class="chrome1" href="//www.google.com/intl/zh-CN/chrome/">
          <img class="mt15x" src="~assets/img/chrome.png" alt width="47" />
          <div class="text">谷歌</div>
        </a>
        <a class="chrome1" href="//www.firefox.com.cn/">
          <img class="mt15x" src="~assets/img/firfox.png" alt width="47" />
          <div class="text">火狐</div>
        </a>
        <a class="chrome1" href="//browser.qq.com/">
          <img class="mt15x" src="~assets/img/qq.png" alt width="45" />
          <div class="text">QQ</div>
        </a>
        <a class="chrome1" href="//ie.sogou.com/">
          <img class="mt15x" src="~assets/img/souguo.png" alt width="47" />
          <div class="text">搜狗</div>
        </a>
        <a class="chrome1" href="//browser.360.cn/">
          <img class="mt15x" src="~assets/img/360safe.png" alt width="47" />
          <div class="text">360安全</div>
        </a>
        <a class="chrome1" href="//browser.360.cn/ee/">
          <img class="mt15x" src="~assets/img/360jisu.png" alt width="47" />
          <div class="text">360极速</div>
        </a>
        <a class="chrome1" href="//www.microsoft.com/zh-cn/edge">
          <img v-if="!isMac" class="mt15x" src="~assets/img/edge.png" alt width="45" />
          <img v-else class="mt15x" src="~assets/img/mac-edge.png" alt width="45" />
          <div class="text">Edge</div>
        </a>
      </div>
    </div>
    <div class="browser-bg"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isMac(){
      let  agent = navigator.userAgent.toLowerCase();
      return /macintosh|mac os x/i.test(agent)
    }
  }
};
</script>

<style lang="stylus" scoped>
.panda-icon-red {
  color: red;
  -webkit-text-fill-color: red;
}

.browser {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  background-color: #191919;
  // background: url('../../../assets/img/browser.png') no-repeat center center;
  overflow: hidden;
  background-size: cover;
}

.browser-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 70vh;
  background: url('../../../assets/img/browser.png') no-repeat center center;
  overflow: hidden;
  background-size: cover;
  z-index: 0;
}

.text-tishi {
  color: #FFBF00;
}

#browser-common {
  width: 1000px;
  height: 560px;
  background: #2B3038;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.browser-title {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #FFFFFF;
  letter-spacing: 2px;
}

.browser-title-sm {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #D1D1D1;
  letter-spacing: 0;
}

.chrome {
  width: 80%;
  margin: 0 auto;
}

.chrome1{
  width: 100px;
  cursor pointer;
  text-align center;
}

.text {
  font-family: PingFangSC-Regular;
  text-align: center;
  font-size: 20px;
  color: #32C5FF;
  letter-spacing: 0;
  margin-top: 20px;
  margin-bottom 10px;
}

.chrome1:hover {
  // opacity: 0.1;
  background: rgba(216,216,216,0.1);
  border-radius: 6px;
  border-radius: 6px;
}
</style>

