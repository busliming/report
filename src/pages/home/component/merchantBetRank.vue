<!--
 * @Desc: 
 * @Date: 2020-05-31 12:11:32
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-25 14:48:52
--> 
<template>
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
    <span slot="userId" slot-scope="text, record, index">
      <span>
        <span v-if="(record.lastBy - record.nowBy) === 0">
          <img :src="ping" class="mr5x" />
        </span>
        <span class="text-red vertical-middle" v-if="record.lastBy < 11 && record.nowBy < record.lastBy">
          <img :src="up" class="middle" width="10" style="margin-top: -2px;" />
          {{record.lastBy - record.nowBy}}
        </span>
        <span
          class="text-red mr5x"
          v-if="(record.lastBy  === null|| record.lastBy > 11) && record.nowBy < 11 "
        >
          <img :src="news" class="middle" width="22" />
        </span>
        <span
          class="text-green vertical-middle"
          v-if=" (record.lastBy && record.lastBy < 11) && record.nowBy > record.lastBy"
        >
          <img :src="down" class="middle" width="10" style="margin-top: -2px;" />
          {{-(record.lastBy - record.nowBy)}}
        </span>
        <span
          @mouseenter="handlerTooltipHidden('icon'+index,1)"
          @mouseleave="handlerTooltipHidden('icon'+index,2)"
        >
          <a-tooltip v-if="record.userId.length>7" placement="topLeft">
            <template slot="title">
              <div
                v-html="record.userId"
                :style="`max-width: 185px; word-break:break-all;`"
              ></div>
            </template>
            <span class="text-over2">{{record.userId}}</span>
          </a-tooltip>
          <span v-else class="text-over2 ml5x">{{record.userId}}</span>
          <!-- <span class="text-over1">{{ record.id }}</span> -->
          <span
            @click="handlerDialogMoney(record)"
            class="hidden cursor-pointer vertical-middle"
            :ref="'icon'+index"
          >
            <img :src="money" class="ml5x" alt />
          </span>
        </span>
      </span>
    </span>
    <span slot="merchantName" slot-scope="text, record, index">
      <span>
        <span v-if="(record.lastBy - record.nowBy) === 0">
          <img :src="ping" class="mr5x" />
        </span>
        <span class="text-red vertical-middle" v-if="record.lastBy < 11 && record.nowBy < record.lastBy">
          <img :src="up" class="middle" width="10" />
          {{record.lastBy - record.nowBy}}
        </span>
        <span
          class="text-red"
          v-if="(record.lastBy  === null|| record.lastBy > 11) && record.nowBy < 11 "
        >
          <img :src="news" class="middle" width="22" />
        </span>
        <span
          class="text-green"
          v-if=" (record.lastBy && record.lastBy < 11) && record.nowBy > record.lastBy"
        >
          <img :src="down" class="middle" width="10" />
          {{-(record.lastBy - record.nowBy)}}
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
            <span class="text-over1 ml5x">{{record.merchantName}}</span>
          </a-tooltip>
          <span v-else class="text-over1 ml5x">{{record.merchantName}}</span>
          <!-- <span class="text-over1">2{{ record.merchantName }}</span> -->
          <span
            @click="handlerDialogMoney(record)"
            class="hidden cursor-pointer vertical-middle"
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
    <span slot="betAmount" slot-scope="text, record">
      <span>￥{{ record.betAmount | moneyFormat }}</span>
    </span>
    <span slot="profit" slot-scope="text, record">
      <span>￥{{ record.profit | moneyFormat }}</span>
    </span>
  </a-table>
</template>

<script>
import {mapGetters} from 'vuex'
import { api_home } from "src/api/index.js";
import { merchantBetRankConfig } from "src/pages/home/config/merchantBetRank.js";
import { merchantBetRankChannelConfig } from "src/pages/home/config/merchantBetRankChannel.js";
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
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
      detailObj: {},
    };
  },
  computed: {
    ...mapGetters(['get_user_info']),
    merchantBetColumns(){
      return this.get_user_info.agentLevel === 1?merchantBetRankChannelConfig:merchantBetRankConfig;
    }
  },
  created(){
    this.initMerchantOrderTop10();
  },
  methods: {
    // 多币种弹窗
    handlerDialogMoney(record) {
      // this.detailObj = { ...record };
      // this.dialogMoneyShow = true;
    },
    // 本月商户投注金额排行
    async initMerchantOrderTop10() {
      this.merchantBetLoading = true;
      let res = ''
      if(this.get_user_info.agentLevel === 1){
        res = await api_home.post_report_home_merchantOrderTop10({});
      }else{
        res = await api_home.get_admin_userReport_queryPlayerTop10({});
      }   
      this.merchantBetLoading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let arr = res.data.data.list;
        this.merchantBetData = this.rebuildTabledataToNeeded(arr);
      } else {
        this.merchantBetData = [];
        // this.$message.error(
        //   `本月商户投注金额排行,code值: ${code},请联系相关技术人员！`
        // );
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
      // 727 版本需求影藏
      // let dom = this.$refs[key];
      // value === 1
      //   ? dom.classList.remove("hidden")
      //   : dom.classList.add("hidden");
    },
  }
};
</script>

<style lang="stylus">
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
  max-width 70px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over2{
  display inline-block;
  max-width 80px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}
</style>