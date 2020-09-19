<!--
 * @Desc: 
 * @Date: 2020-06-07 15:00:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-09 20:48:55
--> 
<template>
  <div class="browser">
    <div class="absolute-center" id="browser-common">
      <div class="text-center browser-title mt20x mb30x">
        <img class="mt15x" src="~assets/img/weihu.svg" alt width="95" />
      </div>
      <div class="text-center browser-title-sm mt40x">
        <span>系统维护中...</span>
      </div>
      <div class="text-center browser-title-md mt30x">
        <span>维护时间：{{moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}}～{{moment(Date.now()+2*60*60*1000).format('YYYY-MM-DD HH:mm:ss')}}</span>
      </div>
      <div class="text-center browser-title-lg mt50x line-height-30px">
        <span class="mr20x">————</span>
        <span>亲爱的用户们</span>
        <span class="ml20x">————</span>
        <div>为了让了给您提供更高品质的博彩体验，我们正在进行系统维护。</div>
        <div>目前暂时不能访问该站点，请您稍后再回来。给您造成的不便，请谅解！</div>
      </div>
    </div>
    <div class="browser-bg"></div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  methods: {
    moment
  }
};
</script>

<style lang="stylus" scoped>
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
  // font-family: PingFangSC-Regular;
  padding-top 60px;
  font-size: 30px;
  color: #FFFFFF;
  letter-spacing: 2px;
}

.browser-title-sm {
  // font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #D1D1D1;
  letter-spacing: 0;
}

.browser-title-md {
  // font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #D1D1D1;
  letter-spacing: 0;
}

.browser-title-lg {
  // font-family: PingFangSC-Regular;
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

