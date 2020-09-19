<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="投注用户管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="no-left append-handle-btn-input">
            <q-input
              style=" width:240px;"
              outlined
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-30px ml20x"
              v-model.trim="searchForm.userId"
              placeholder="请输入用户ID"
              @keydown.enter="handleSearch"
              clearable
            >
              <template v-slot:prepend>
                <span class="panda-icon panda-icon-cha-zhao fs15"></span>
              </template>
            </q-input>
          </div>
          <div class="no-left append-handle-btn-input ml20x">
            <q-input
              style=" width:240px;"
              outlined
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-30px ml20x"
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              @keydown.enter="handleSearch"
              clearable
            >
              <template v-slot:prepend>
                <span class="panda-icon panda-icon-cha-zhao fs15"></span>
              </template>
            </q-input>
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
        <span slot="betAmount" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betAmount | amount}} CNY</span>
          </div>
        </span>
        <span slot="profit" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.profit | amount}} CNY</span>
          </div>
        </span>
        <span slot="betNum" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betNum | amount}}</span>
          </div>
        </span>
        <span slot="lastLoginStr" slot-scope="text,record">
          <span v-if="record.lastLoginStr == '刚刚'">{{record.lastLoginStr}}</span>
          <span v-else>
            {{record.lastLoginStr}}
            <span v-if="record.lastLoginStr">前</span>
          </span>
        </span>
        <span slot="enabled" slot-scope="enabled">
          <span v-if="enabled == 1">在线</span>
          <span v-else>本期不做</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <q-icon
            class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"
            @click.native="handleLook(record,index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>查看</span>
            </q-tooltip>
          </q-icon>
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
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_user } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/merchant/bettinguser/config/config.js";
import { dom } from "quasar";
const { height, width } = dom;

export default {
  mixins: [...mixins],
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        userId: "", //商户ID
        merchantName: "" //商户名称
      },
      scroll_area_height: ""
    };
  },
  created() {
    this.initTableData();
  },
  methods: {
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_user.post_order_user_queryUserBetList(params).then(res => {
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
      let params = {
        userId: this.searchForm.userId, // 用户ID
        merchantName: this.searchForm.merchantName, // 商户名称
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        sort: this.pagination.sort,
        orderBy: this.pagination.orderBy
      };
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 查看
    handleLook(record, index) {
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
