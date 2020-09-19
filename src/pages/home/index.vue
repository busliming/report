<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="首页" class="fw_600 text-panda-text-7 fs16" />
      </q-breadcrumbs>
    </div>

    <div class="row mt20x pl20x pr20x text-panda-text-dark">
      <!-- 今日投注信息 -->
      <div class="col-3 bg-panda-bg-6 shadow-2 radius-4">
        <div class="row pt20x pl20x pr20x">
          <div class="fw_600 fs16 text-panda-text-7">
            <span class="title-block bg-panda-bg-2 mr5x"></span>今日投注信息
          </div>
          <div class="ml10x" style="margin-top: 2px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 200px; word-break:break-all;`">统计的是当前账务日（12点至次日12点）内投注成功（已结算+未结算）的注单数据</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
          <q-space></q-space>
          <q-btn
            class="panda-btn-white fs12 text-panda-text-4 border-1px"
            style="width:68px;height:24px;"
            @click="handleBetCurrency"
            label="币种明细"
          />
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-touzhuliang" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">￥ {{betToday.betAmount | moneyFormat}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-paicai" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">派彩金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">￥ {{betToday.settleAmount | moneyFormat}}</span>
            </div>
          </div>
        </div>
        <q-space class="line"></q-space>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-yingli" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">盈利金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">￥ {{betToday.profit | moneyFormat}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-touzhubishu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注笔数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">{{betToday.betNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 今日用户信息 -->
      <div class="col-3 bg-panda-bg-6 shadow-2 radius-4 ml20x mr20x">
        <div class="row pt20x pl20x pr20x">
          <div class="fw_600 fs16 text-panda-text-7">
            <span class="title-block bg-panda-bg-2 mr5x"></span>今日用户信息
          </div>
          <div class="ml10x" style="margin-top: 2px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 200px; word-break:break-all;`">统计的是当前账务日（12点至次日12点）内投注成功（已结算+未结算）的用户信息</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
          <q-space></q-space>
          <q-btn
            class="panda-btn-white fs12 text-panda-text-4 border-1px"
            style="width:68px;height:24px;"
            @click="handleUserCurrency"
            label="币种明细"
          />
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-touzhuyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注用户数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">{{ userToday.betUserAmount | amount}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-touzhuyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">
              大额投注用户数
              <a-tooltip trigger="hover">
                <template slot="title">
                  <span>累计投注金额≧￥5000</span>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">{{ userToday.briskUser | amount}}</span>
            </div>
          </div>
        </div>
        <q-space class="line"></q-space>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-zhuceyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">累计用户总数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">{{ userToday.registerAmount | amount}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-zhuceyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">新增用户数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600">{{ userToday.addUser | amount}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 今日投注金额TOP10赛事 -->
      <div class="col bg-panda-bg-6 shadow-2 radius-4" style="height: 330px;">
        <bet-top-ten :pagination="pagination"></bet-top-ten>
      </div>
    </div>

    <div class="row ml20x mt20x pr20x">
      <div class="col-6 bg-panda-bg-6 shadow-2 radius-4 mr20x">
        <div class="row fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>30天投注金额趋势
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 200px; word-break:break-all;`">统计的是30个账务日（包含当前账务日）投注成功(已结算+未结算)的总注额和公司总盈利的变化趋势</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <ve-line
          ref="betAmount14"
          id="userOrder"
          :loading="userOrderSettings.loading"
          :data="chartData"
          :colors="userOrderSettings.colors"
          width="98%"
          height="340px"
          :data-empty="chartData.rows.length>0? false: true"
          :extend="lineExtend"
          :events="chartEvents"
          :settings="userOrderSettings"
        >
          <!-- <div class="data-empty" v-if="chartData.rows.length < 0">没有数据😂</div> -->
        </ve-line>
      </div>
      <div class="col bg-panda-bg-6 shadow-2 radius-4" v-if="get_user_info.agentLevel !== 1">
        <div class="row fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>30天投注用户分布
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 200px; word-break:break-all;`">统计的是用户在30个账务日内（包含当前账务日）累计投注成功（已结算+未结算）总注额分布在各个金额区间分布情况</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
         <!-- <ve-histogram :data="chartData1"></ve-histogram> -->
        <!-- <ve-bar :data="chartData1"></ve-bar> -->
         <!-- :extend="chartExtend" -->
        <ve-histogram
          ref="betUser14"
          id="betUser14"
          :loading="userSettings.loading"
          width="98%"
          height="340px"
          :data="userData"
          :data-empty="userData.rows.length>0? false: true"
          :settings="userSettings"
          :extend="chartExtend"
        >      
          <!-- <div class="data-empty"  v-if="userData.rows.length < 0">没有数据😂</div> -->
        </ve-histogram>
      </div>
      <!-- 公告信息 -->
      <div
        class="col bg-panda-bg-6 shadow-2 border-radius-4 position-relative"
        v-if="get_user_info.agentLevel === 1"
      >
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600 text-panda-text-7">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>公告消息
          </div>
        </div>
        <bulletinMsg :pagination="pagination"></bulletinMsg>
      </div>
    </div>
    <div class="row mt20x pr20x pl20x" style="height: 300px;">
      <div class="col-4 bg-panda-bg-6 shadow-2 border-radius-4 position-relative">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600 text-panda-text-7">
          <div v-if="get_user_info.agentLevel === 1">
            <span class="title-block bg-panda-bg-2 mr5x"></span>本月入驻二级商户信息
          </div>
          <div v-else>
            <span class="title-block bg-panda-bg-2 mr5x"></span>公告消息
          </div>
        </div>
        <second-merchant-info v-if="get_user_info.agentLevel === 1" :pagination="pagination" />
        <bulletinMsg v-else :pagination="pagination"></bulletinMsg>
      </div>
      <div class="col-4 bg-panda-bg-6 shadow-2 border-radius-4 ml20x mr20x" style="height: 400px;">
        <div class="row fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>
            本月{{get_user_info.agentLevel === 1? '二级商户': '用户'}}投注金额排行
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div v-if="get_user_info.agentLevel === 1"  :style="`max-width: 200px; word-break:break-all;`">	统计的是本月（本月1号12点至次月1号12点）成功投注（已结算+未结算）总注额前十名的二级商户排行信息。</div>
                  <div v-else :style="`max-width: 200px; word-break:break-all;`">		统计的是本月（本月1号12点至次月1号12点）成功投注（已结算+未结算）的总注额前十名的用户排行信息。</div>                  
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <div class="mt20x">
          <merchant-bet-rank :pagination="pagination" />
        </div>
      </div>
      <div class="col bg-panda-bg-6 shadow-2 border-radius-4">
        <div class="row fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>
            {{moment(new Date()).month()-1}}月{{get_user_info.agentLevel === 1? '二级商户': '用户'}}投注金额增速排行
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div v-if="get_user_info.agentLevel === 1" :style="`max-width: 200px; word-break:break-all;`">	统计的是上月对比上上个月累计成功投注（已结算+未结算）总注额增长百分比前十名的下属二级商户排行信息</div>
                  <div v-else :style="`max-width: 200px; word-break:break-all;`">		统计的是上月对比上上个月累计成功投注（已结算+未结算）总注额增长百分比前十名的下属用户排行信息</div>                  
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <merchant-bet-add :pagination="pagination" />
      </div>
    </div>
    <!--今日投注信息弹窗-->
    <q-dialog v-model="dialogUserShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-user :betTodayData="betTodayData"></dialog-user>
    </q-dialog>
    <!--今日用户信息币种弹窗-->
    <q-dialog v-model="dialogBetShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-bet :userToday="userToday" :userTodayData="userTodayData"></dialog-bet>
    </q-dialog>
    <!-- 未上传更新证书弹窗 -->
    <q-dialog v-model="eidtKeyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-edit :detailObj="showDialogObj" @closeDialog="handleCloseDialogEdit"></dialog-edit>
    </q-dialog>
    <!-- 今日投注金额TOP10赛事 多币种 -->
    <q-dialog v-model="dialogMoneyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-money :detailObj="showDialogObj"></dialog-money>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
import VeRing from "v-charts/lib/ring.common";
// import "v-charts/lib/style.css";
import { tablecolumns_config } from "src/pages/merchant/bettinguser/config/userConfig.js";
import { merchantConfig } from "src/pages/home/config/merchant.js";
import { channelConfig } from "src/pages/home/config/channelConfig.js";
import { secondConfig } from "src/pages/home/config/secondConfig.js";
import { merchant_bet_config } from "src/pages/home/config/merchantBetNumber.js";
import { api_home, api_user } from "src/api/index.js";
import dialogBet from "src/pages/home/component/dialogBet.vue";
import dialogUser from "src/pages/home/component/dialogUser.vue";
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
import dialogMoney from "src/pages/home/component/dialogMoney.vue";
import betTopTen from "src/pages/home/component/betTopTen.vue";
import bulletinMsg from "src/pages/home/component/bulletinMsg.vue";
import secondMerchantInfo from "src/pages/home/component/secondMerchantInfo.vue";
import merchantBetRank from "src/pages/home/component/merchantBetRank.vue";
import merchantBetAdd from "src/pages/home/component/merchantBetAdd.vue";
import moment from "moment";
export default {
  components: {
    VeLine,
    VeBar,
    VeRing,
    dialogBet,
    dialogUser,
    dialogEdit,
    betTopTen,
    dialogMoney,
    bulletinMsg,
    secondMerchantInfo,
    merchantBetRank,
    merchantBetAdd
  },
  data() {
    var self = this;
    this.chartExtend = {
      series: {
        barWidth: 20, //这就是宽度
        barGap: "5%"
      },
      legend: {
        left: "16",
        top: 20
      }, //隐藏legend
      yAxis: {
        // minInterval: 5 //标值的最小间隔
        barCateGoryGap: 20
      },
      grid: {
        show: false
      }
    };
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      loading: false,
      merchantBetLoading: false,
      merchantColumns: merchantConfig,
      merchantBetColumns: merchant_bet_config,
      dialogBetShow: false, //今日投注信息币种明细阀值
      dialogUserShow: false, //今日用户信息币种明细阀值
      dialogMoneyShow: false,
      pagination: {
        pageSize: 100,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      },
      tab: "0",
      msgTab: "0", //公告
      //14天投注金额趋势配置
      userOrderSettings: {
        colors: ["#5B8FF9", "#FF9D4D"],
        loading: false
      },
      // 14天用户投注堆叠面积图
      userSettings: {
        metrics: ["用户数量"],
        itemStyle: {
          color: ["#84A1FF"]
        },
        dataOrder: {
          label: "用户数量",
          order: ""
        },
        loading: false
      },
      // 商户分布信息环形图
      ringChart: {
        // 环形图颜色
        colors: ["#5B8FF9", "#5AD8A6", "#5D7092"]
      },
      merchantList: {
        columns: ["agentLevel", "count"],
        rows: []
      },
      title: {
        text: "16,168",
        subtext: "商户总数量",
        x: "center",
        y: "center",
        itemGap: 10,
        textStyle: {
          color: "#3C4551",
          fontFamily: "微软雅黑",
          fontSize: 30,
          fontWeight: "bold"
        }
      },

      lineExtend: {
        legend: {
          left: "16",
          top: 15
        }, //隐藏legend
        series: [
          {
            name: "邮件营销",
            type: "line",
            symbolSize: 8, //拐点圆的大小
            color: ["red"], //折线条的颜色
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: "dotted" //'dotted'虚线 'solid'实线
                }
              }
            }
          }
        ]
      },
      chartData: {
        columns: ["日期", "投注金额(万)", "盈利金额(万)"],
        rows: []
      },
      userData: {
        columns: ["投注区间","用户数量"],
        rows: []
      },
      betList: [
        { name: "1", count: "0-1000" },
        { name: "2", count: "1000-2000" },
        { name: "3", count: "2000-5000" },
        { name: "4", count: "5000-10000" },
        { name: "5", count: "1万-5万" },
        { name: "6", count: "5万-10万" },
        { name: "7", count: "10万-20万" },
        { name: "8", count: "20万+" }
      ],
      detailObj: {}, //弹窗需要信息
      profitObj: {}, //盈利率数据
      betRows: [], //投注时间数据
      startRows: [], //开始时间数据,
      endRows: [], //结算时间数据
      orderLimit: [], //注单限额统计
      name: "",
      chartEvents: {
        click(e) {
          self.dialogMonthShow = true;
          self.showDetailObj.month = e.name;
          self.showDetailObj.userId = self.$route.query.userId;
          console.log(e);
        }
      },
      dialogMonthShow: false, //月份弹窗阀值
      showDetailObj: {},
      merchantData: [], //本月入驻商户信息
      showDialogObj: {}, //保存弹窗需要的值
      setMerchantShow: false, // 设置管理员阀值
      merchantDataLoading: false,
      betToday: {}, //今日投注信息
      userToday: {}, //今日用户信息
      betTopTenData: [], //今日投注金额 TOP10赛事
      merchantBetData: [], // 本月商户投注金额排行
      matchTop10Loading: false, // 阀值
      showMoney: false,
      betTodayData: [], //今日投注信息币种详细数据
      userTodayData: [], //今日用户信息币种详细数据
      n1: require("src/assets/1.svg"),
      n2: require("src/assets/2.svg"),
      n3: require("src/assets/3.svg"),
      n4: require("src/assets/4.svg"),
      n5: require("src/assets/5.svg"),
      n6: require("src/assets/6.svg"),
      n7: require("src/assets/7.svg"),
      n8: require("src/assets/8.svg"),
      n9: require("src/assets/9.svg"),
      n10: require("src/assets/10.svg"),
      money: require("src/assets/money.svg"),
      news: require("src/assets/new.svg"),
      ping: require("src/assets/juxing.svg"),
      up: require("src/assets/up.svg"),
      down: require("src/assets/down.svg"),
      eidtKeyShow: false //证书弹窗
    };
  },
  created() {
    this.initAllData();
  },
  computed: {
    ...mapGetters(["get_user_info"])
  },
  methods: {
    moment,
    reverseObjectArray(array) {
      let newArr = [];
      for (let i = array.length - 1; i >= 0; i--) {
        newArr[newArr.length] = array[i];
      }
      return newArr;
    },
    handlerTooltipHidden(key, value) {
      console.warn(key, value);
      let dom = this.$refs[key];
      value === 1
        ? dom.classList.remove("hidden")
        : dom.classList.add("hidden");
    },
    // 多币种弹窗
    handlerDialogMoney(record) {
      this.detailObj = { ...record };
      this.dialogMoneyShow = true;
    },
    initAllData() {
      //今日投注信息
      this.initQueryBetToday();
      //今日用户信息
      this.initQueryUserToday();
      // 14天投注金额趋势
      this.initUserOrderDay14();
      // 14天投注用户趋势
      this.get_user_info.agentLevel !== 1 && this.initUserDay14();
      // 商户分布信息
      // this.initAgentCount();
    },
    // 今日投注信息
    async initQueryBetToday() {
      let res = await api_home.post_report_home_queryBetToday({});
      let { code } = res.data;
      if (code === "0000000") {
        this.betToday = res.data.data;
        this.betToday.currency = "人民币";
        this.betTodayData.push(this.betToday);
      } else {
        this.betToday = {};
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    // 今日用户信息
    async initQueryUserToday() {
      let res = await api_home.post_report_home_queryUserToday({});
      let { code } = res.data;
      if (code === "0000000") {
        this.userToday = res.data.data;
        this.userToday.currency = "人民币";
        this.userTodayData.push(this.userToday);
        console.warn(this.userTodayData);
      } else {
        this.userToday = {};
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    // 14天投注金额趋势
    async initUserOrderDay14() {
      this.userOrderSettings.loading = true;
      let res = await api_home.post_report_home_userOrderDay14({});
      this.userOrderSettings.loading = false;
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        data.length > 0 &&
          data.map((item, index) => {
            this.chartData.rows.push({
              日期: item.key.toString().substr(4),
              "投注金额(万)": item.betAmount.value / 10000,
              "盈利金额(万)": item.profit.value / 10000
            });
          });
        // this.chartData.rows = []
        this.$nextTick(_ => {
          console.error(this.$refs.betAmount14.echarts);
          this.$refs.betAmount14.echarts.resize();
        });
      } else {
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    // 14天投注用户趋势
    async initUserDay14() {
      this.userSettings.loading = true;
      let res = await api_home.post_report_home_userDay14({});
      this.userSettings.loading = false;
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        data = this.reverseObjectArray(data);
          data.map((item, index) => {
            this.userData.rows.push({
              投注区间: this.betList[index].count,
              用户数量: item.userCount
            });
          });
        // this.userData.rows = [];
        this.$nextTick(_ => {
          data.length > 0 && this.$refs.betUser14.echarts.resize();
        });
      } else {
        this.userData.rows = [];
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    // 今日投注信息币种明细
    handleBetCurrency() {
      this.dialogUserShow = true;
    },
    // 今日用户信息币种明细
    handleUserCurrency() {
      this.dialogBetShow = true;
    },
    //未设置管理员 设置管理员
    handleEdit(record, index) {
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
    },
    // 未上传证书 设置证书
    handleUpdateKey(record) {
      console.table(record);
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    handleCloseDialogEdit() {
      this.eidtKeyShow = false;
    },
    rebuildTabledataToNeeded(arr) {
      if (Array.isArray(arr) && arr.length >= 0) {
        arr.map((item, index) => {
          item.nowBy = index + 1;
          item._index = index + 1;
        });
        return arr;
      }
    },
    // 商户分布信息
    async initAgentCount() {
      let res = await api_home.get_manage_merchant_queryAgentCount();
      let { code } = res.data;
      if (code === "0000000") {
        // console.log(res.data.data)
        let { data } = res.data;
        let arr = this.handleNeedToData(data);
        this.title.text = arr.reduce((prev, next) => prev + next.count * 1, 0);
        console.log(this.title.text, "handleNeedToData");
        this.merchantList.rows = arr;
      }
    },
    handleNeedToData(arr) {
      arr.map((item, index) => {
        if (item.agentLevel == 0) {
          item.agentLevel = "直营商户";
        } else if (item.agentLevel == 1) {
          item.agentLevel = "渠道商户";
        } else {
          item.agentLevel = "二级商户";
        }
      });
      console.log(arr, "arr");
      return arr;
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.setMerchantShow = false;
    },
    // 本月入驻商户路由跳转
    handlerGoToMore() {
      this.$router.push({
        name: "merchantc",
        params: {
          agent: this.tab
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 260px;
  min-height: 260px;
}

>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}

.line {
  border-bottom: 1px solid #F4F5F8;
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}

.middle {
  vertical-align: middle;
}

.border-right-1px {
  border-right: 1px solid #F4F5F8;
}

>>>.ant-empty-normal {
  margin: 102px 0;
}

>>>#betTopTen .ant-empty-normal {
  margin: 62px 0;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  display: inline-block;
  white-space: nowrap;
}

.text-over-admin {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
  display: inline-block;
  white-space: nowrap;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 190px;
  display: inline-block;
  white-space: nowrap;
}

.data-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #888;
  font-size: 14px;
}

// >>>.v-charts-data-empty{
//   // display block !important;
//   display: flex !important;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(255, 255, 255, 0.7);
//   color: #888;
//   font-size: 14px;
// }

// 复写table里面td的高度
>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td {
  padding: 5px 4px 3px 4px;
}
</style>
