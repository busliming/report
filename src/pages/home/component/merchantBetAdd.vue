<!--
 * @Desc: 
 * @Date: 2020-05-31 12:11:32
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-25 14:49:32
--> 
<template>
  <div>
    <a-table
      class="mt20x"
      :columns="merchantBetColumns"
      :dataSource="merchantBetData"
      :scroll="{ x: 500, y: 310 }"
      :pagination="pagination"
      :loading="merchantBetLoading"
      size="small"
      rowKey="_index"
    >
      <span slot="_index" slot-scope="text, record">
        <span v-if="record._index == 1">
          <img :src="n1" alt />
        </span>
        <span v-if="record._index == 2">
          <img :src="n2" alt />
        </span>
        <span v-if="record._index == 3">
          <img :src="n3" alt />
        </span>
        <span v-if="record._index == 4">
          <img class="w-8" :src="n4" alt />
        </span>
        <span v-if="record._index == 5">
          <img class="w-8" :src="n5" alt />
        </span>
        <span v-if="record._index == 6">
          <img class="w-8" :src="n6" alt />
        </span>
        <span v-if="record._index == 7">
          <img class="w-8" :src="n7" alt />
        </span>
        <span v-if="record._index == 8">
          <img class="w-8" :src="n8" alt />
        </span>
        <span v-if="record._index == 9">
          <img class="w-8" :src="n9" alt />
        </span>
        <span v-if="record._index == 10">
          <img class="w-12" :src="n10" alt />
        </span>
      </span>
      <span slot="id" slot-scope="text, record, index">
        <span class="vertical-middle">
          <span v-if="(record.lastRank - record.currentRank) === 0">
            <img :src="ping" class="mr5x" />
          </span>
          <span class="text-red" v-if="record.lastRank < 11 && record.currentRank < record.lastRank">
            <img :src="up" class="middle" width="10" />
            {{record.lastRank - record.currentRank}}
          </span>
          <span
            class="text-red"
            v-if="(record.lastRank  === null|| record.lastRank > 11) && record.currentRank < 11 "
          >
            <img :src="news" class="middle" width="22" />
          </span>
          <span
            class="text-green"
            v-if=" (record.lastRank && record.lastRank < 11) && record.currentRank > record.lastRank"
          >
            <img :src="down" class="middle" width="10" />
            {{-(record.lastRank - record.currentRank)}}
          </span>
          <span
            @mouseenter="handlerTooltipHidden('icon'+index,1)"
            @mouseleave="handlerTooltipHidden('icon'+index,2)"
          >
            <a-tooltip v-if="record.id.length>6" placement="topLeft">
              <template slot="title">
                <div
                  v-html="record.id"
                  :style="`max-width: 185px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over1">{{record.id}}</span>
            </a-tooltip>
            <span v-else class="text-over1">{{record.id}}</span>
            <!-- <span class="text-over1">{{ record.id }}</span> -->
            <span
              @click="handlerDialogMoney(record)"
              class="hidden cursor-pointer"
              :ref="'icon'+index"
            >
              <img :src="money" class="ml5x" alt />
            </span>
          </span>
        </span>
      </span>
      <span slot="merchantName" slot-scope="text, record, index">
        <span class="vertical-middle">
          <span v-if="(record.lastRank - record.currentRank) === 0">
            <img :src="ping" class="mr5x" />
          </span>
          <span class="text-red" v-if="record.lastRank < 11 && record.currentRank < record.lastRank">
            <img :src="up" class="middle" width="10" />
            {{record.lastRank - record.currentRank}}
          </span>
          <span
            class="text-red"
            v-if="(record.lastRank  === null|| record.lastRank > 11) && record.currentRank < 11 "
          >
            <img :src="news" class="middle" width="22" />
          </span>
          <span
            class="text-green"
            v-if=" (record.lastRank && record.lastRank < 11) && record.currentRank > record.lastRank"
          >
            <img :src="down" class="middle" width="10" />
            {{-(record.lastRank - record.currentRank)}}
          </span>
          <span
            @mouseenter="handlerTooltipHidden('icon'+index,1)"
            @mouseleave="handlerTooltipHidden('icon'+index,2)"
          >
            <a-tooltip v-if="record.merchantName.length>6" placement="topLeft">
              <template slot="title">
                <div
                  v-html="record.merchantName"
                  :style="`max-width: 120px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over1">{{record.merchantName}}</span>
            </a-tooltip>
            <span v-else class="text-over1">{{record.merchantName}}</span>
            <!-- <span class="text-over1">{{ record.merchantName }}</span> -->
            <span
              @click="handlerDialogMoney(record)"
              class="hidden cursor-pointer"
              :ref="'icon'+index"
            >
              <img :src="money" class="ml5x" alt />
            </span>
          </span>
        </span>
      </span>
      <span slot="lastBy" slot-scope="text, record">
        <span v-if="record.lastBy">{{record.lastBy}}</span>
        <span v-else>-</span>
      </span>
      <span slot="growthRate" slot-scope="text, record">
        <span>{{record.growthRate | moneyFormat}}%</span>
      </span>
      <span slot="increasedAmount" slot-scope="text, record">
        <span>￥{{ record.increasedAmount | moneyFormat }}</span>
      </span>
      <span slot="betAmount" slot-scope="text, record">
        <span>￥{{ record.betAmount | moneyFormat }}</span>
      </span>
    </a-table>
    <!-- 今日投注金额TOP10赛事 多币种 -->
    <q-dialog v-model="dialogMoneyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-money :detailObj="showDialogObj"></dialog-money>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api_home } from "src/api/index.js";
import dialogMoney from "src/pages/home/component/dialogMoney.vue";
import { merchantBetAddConfig } from "src/pages/home/config/merchantBetAdd.js";
import { merchantBetAddChannelConfig } from "src/pages/home/config/merchantBetAddChannel.js";
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  components: {
    dialogMoney
  },
  data() {
    return {
      merchantBetData: [],
      merchantBetLoading: false,
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
      showDialogObj: '',
      dialogMoneyShow: false,
    };
  },
  created() {
    // this.initMerchantOrderTop10();
  },
  computed:{
    ...mapGetters(['get_user_info']),
    merchantBetColumns(){
      return this.get_user_info.agentLevel === 1? merchantBetAddChannelConfig: merchantBetAddConfig;
    }
  },
  methods: {
    // 本月商户投注金额排行
    async initMerchantOrderTop10() {
      this.merchantBetLoading = true;
      let res = ''
      if(this.get_user_info.agentLevel === 1){
        res = await api_home.get_admin_merchantReport_amountGrowthRateTop10({});
      }else{
        res = await api_home.get_admin_merchantReport_amountGrowthRateTop10({});
      }   
      this.merchantBetLoading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let arr = res.data.data;
        this.merchantBetData = this.rebuildTabledataToNeeded(arr);
      } else {
        this.merchantBetData = [];
      }
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
    handlerTooltipHidden(key, value) {
      console.warn(key, value);
      // 727 版本需求影藏！
      // let dom = this.$refs[key];
      // value === 1
      //   ? dom.classList.remove("hidden")
      //   : dom.classList.add("hidden");
    },
    // 多币种弹窗
    handlerDialogMoney(record) {
      this.showDialogObj = { ...record };
      this.dialogMoneyShow = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.w-8 {
  width: 8px;
}

.w-12 {
  width: 12px;
}
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 350px !important;
  min-height: 350px !important;
}
>>>.ant-empty-normal {
  margin: 102px 0 !important;
}
.text-over1{
  display inline-block;
  max-width 65px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}
</style>