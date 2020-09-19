<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="账户中心" />
        <q-breadcrumbs-el label="投注用户管理" />
        <q-breadcrumbs-el label="投注用户详情" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div
      class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x border-radius-4 ml20x mr20x mt20x"
    >
      <!-- 用户投注详情 -->
      <div class="col-12">
        <div class="row mb20x">
          <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600 row">
            <div>
              <span class="title-block bg-panda-bg-2 mr5x"></span>用户基本信息
            </div>
          </div>
          <q-space/>
          <div class="status  line-height-16px pl20x pr20x text-panda-text-7 flex">
            <!-- <div class="pt20x mr20x">用户状态: {{userDetail.status === 1? '在线': '--'}}</div> -->
            <a-button
              type="primary"
              style="height: 30px; line-height: 16px;"
              class="mt12x"
              @click="handleBack"
            >返回</a-button>
          </div>
        </div>
        <div class="row pl20x pr20x">
          <div class="bos" style="width: 33.33%">
            <div class="title">用户名</div>
            <div class="content">{{userDetail.userName}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">用户币种</div>
            <div class="content">{{userDetail.currencyCode | filterCurrency}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">累计登录次数</div>
            <div class="content" v-if="userDetail.loginTimes">{{userDetail.loginTimes}}</div>
            <div class="content" v-else>--</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">可用余额</div>
            <div class="content">{{userDetail.amount | moneyFormat}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">用户ID</div>
            <div class="content">{{userDetail.userId}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">最后登录时间</div>
            <div class="content">{{moment(userDetail.lastLogin*1).format('YYYY-MM-DD HH:mm:ss')}}</div>
            <!-- <div class="content">暂未返回</div> -->
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">累计投注金额</div>
            <div
              class="content"
            >{{userDetail.betAmount | moneyFormat}}</div>
            <!-- <div class="content">暂未返回</div> -->
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">注册时间</div>
            <div class="content">{{moment(userDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">最后投注时间</div>
            <div
              class="content"
              v-if="userDetail.lastBetStr"
            >{{userDetail.lastBetStr}}</div>
            <div class="content" v-else>暂未返回</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">累计盈利</div>
            <div class="content">{{userDetail.profit | moneyFormat}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">注单数量</div>
            <div class="content">{{userDetail.betNum | amount}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">所属商户</div>
            <div class="content">{{userDetail.merchantName}}</div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="col-12 bg-panda-bg-6 radius-4  ml20x mr20x">
      <!-- tab选项卡 -->
      <div class="row mt20x text-panda-text-dark position-relative">
        <span class="title-block bg-panda-bg-2 mr5x mt15x position-absolute" style="left: 20px;"></span>
        <a-tabs v-model="activeKey" class="col-12">
          <!-- <a-tab-pane key="1" tab="用户看板">
            <user-dashboard v-if="activeKey == 1"></user-dashboard>
          </a-tab-pane> -->
          <a-tab-pane key="2" tab="账变记录" force-render>
            <user-account v-if="activeKey == 2"></user-account>
          </a-tab-pane>  
          <a-tab-pane key="3" tab="注单记录">
            <user-bet v-if="activeKey == 3"></user-bet>
          </a-tab-pane>
          
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { api_data } from "src/api/index.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import userDashboard from 'src/pages/account/betting/component/userDashboard.vue'
import userBet from 'src/pages/account/betting/component/userBet.vue'
import userAccount from 'src/pages/account/betting/component/userAccount.vue'
import moment from "moment";
export default {
  components: {
    userDashboard,
    userBet,
    userAccount
  },
  mixins: [constantmixin],
  data() {
    return {
      userDetail: "", //用户详情
      activeKey: '2'
    };
  },
  created() {
    this.initSessionRecord();
  },
  methods: {
    moment,
    handleBack() {
      this.$router.go(-1);
    },
    // 用户基本信息
    async initSessionRecord() {
      let record = this.$q.sessionStorage.getItem("record");
      this.userDetail = record;
      let res = await api_data.get_admin_userReport_getUserInfo({
        uid: record.userId
      });
      // console.warn(res)
      if (res.data.code === "0000000") {
        this.userDetail = { ...record, ...res.data.data };
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-empty-normal {
  margin: 155px 0 !important;
}

>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}

.bos {
  box-sizing: border-box;
  margin-top: -1px;
}

.title {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333;
  background: #F2F2F2;
  box-sizing: border-box;
}

.content {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333333;
  box-sizing: border-box;
}

>>>.ant-tabs-nav .ant-tabs-tab{
  font-size 16px;
  font-weight 600;
  color #3c4551;
}
>>>.ant-tabs-bar{
  margin 0 0 0 20px;
}
</style>
