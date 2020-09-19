<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="账户中心" />
        <q-breadcrumbs-el label="投注用户管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="no-left append-handle-btn-input ml20x">
            <a-input
              v-model.trim="searchForm.userId"
              placeholder="请输入用户ID/用户名"
              @keydown.enter="handleSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="no-left append-handle-btn-input ml20x">
            <a-input
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              @keydown.enter="handleSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <q-btn
            class="panda-btn-primary-dense bg-primary ml40x"
            style="width:60px;height:30px; "
            label="搜索"
            @click="handleSearch"
          />
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 616 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record._index"
      >
        <span slot="userId" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userId,'用户ID')">{{record.userId}}</span>
        </span>
        <span slot="userName" slot-scope="text, record" >
          <span class="cursor-pointer text-over-130" @click="handleCopy(record.userName,'用户名')">{{record.userName}}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.merchantName,'用户名称')">{{record.merchantName}}</span>
        </span>
        <span slot="amount" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.amount | moneyFormat}}</span>
          </div>
        </span>
        <span slot="betAmount" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betAmount | moneyFormat}}</span>
          </div>
        </span>
        <span slot="profit" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.profit | moneyFormat}}</span>
          </div>
        </span>
        <span slot="betNum" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betNum | amount}}</span>
          </div>
        </span>
        <span slot="currencyCode" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.currencyCode | filterCurrency}}</span>
          </div>
        </span>
        <span slot="lastLoginStr" slot-scope="text,record">
          <span v-if="record.lastLoginStr == '刚刚'">{{record.lastLoginStr}}</span>
          <span v-else>
            {{record.lastLoginStr}}<span v-if="record.lastLoginStr">前</span>
          </span>
        </span>
        <span slot="enabled" slot-scope="enabled">
          <span v-if="enabled == 1">在线</span>
          <span v-else>-</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看投注详情</div>
            </template>
            <q-icon @click.native="handleLook(record, index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </a>
      </a-table>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 690px;
  min-height: 690px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

.no-left >>> .q-field__append {
  border-left: none;
}
.text-over-130 {
  display inline-block
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
  white-space: nowrap;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_account } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { channelConfig } from "src/pages/account/betting/config/channelConfig.js";
import { tablecolumns_config } from "src/pages/account/betting/config/config.js";
import { handleCopy } from "src/util/module/common.js";
import constantmixin from 'src/mixins/common/constantmixin.js'
import { dom } from "quasar";
const { height, width } = dom;

export default {
  mixins: [...mixins, constantmixin],
  data() {
    return {
      tabledata: [],
      tabledata_loading: false,
      searchForm: {
        userId: "", //商户ID
        userName: "", //用户名称
        merchantName: "" //商户名称
      },
      scroll_area_height: ""
    };
  },
  computed: {
    ...mapGetters(['get_user_info']),
    columns(){
      return this.get_user_info.agentLevel === 1?channelConfig:tablecolumns_config
    }
  },
  created() {
    this.initTableData();
  },
  methods: {
    handleCopy,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_account.post_admin_userRepor_queryAllUserStatisticList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
      });
    },
    compute_init_tabledata_params() {
      let {userId,userName,merchantName} = this.searchForm
      let params = {
        userId, // 用户ID
        userName, //用户名称
        merchantName: this.searchForm.merchantName, // 商户名称
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        sort: this.pagination.sort,
        orderBy: this.pagination.orderBy
      };
      if (/^\+?[0-9][0-9]*$/.test(userId) && params.userId.length > 16 ) {
        params.userId = userId;
        params.userName = "";
      } else {
        params.userName = userId;
        params.userId = ''
      }
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 查看
    handleLook(record, index) {
      this.$q.sessionStorage.set('record',record);
      this.$router.push({
        name: "betting_user_detail",
        query: {
          userId: record.userId
        }
      });
    }
  }
};
</script>
