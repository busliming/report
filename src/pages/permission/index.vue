<!--
 * @Desc: 
 * @Date: 2020-07-03 19:54:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-17 11:27
--> 
<template>
  <div class="auth">
    <div class="auth-content">
      <div class="auth-img">
        <img src="~assets/img/no-auth.svg" alt="无权限图片">
      </div>
      <div class="auth-title">{{$t('no_auth_title')}}</div>
      <a-button type="primary" @click="$router.replace('/main/data_center/match_bonus')">{{$t('no_auth_btn')}}</a-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.auth{
  display flex
  justify-content center; /* 水平居中 */
	align-items center; /*垂直居中*/
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  // position relative
  .auth-content{
    // position absolute
    // left 50%
    // top 50%
    // transform translate(-50%,-50%);
    min-width 256px
    height 230px
    // background red
    text-align center
    .auth-title{
      font-size 20px
      color #596278
      margin-top 20px
      margin-bottom 20px
    }  
  }  
}
</style>