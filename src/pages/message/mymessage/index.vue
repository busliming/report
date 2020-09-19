<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="消息中心" />
        <q-breadcrumbs-el label="我的消息" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="append-handle-btn-input pl20x row w-240">
            <a-input
              v-model.trim="searchForm.title"
              @keydown.enter="handlerSearch"
              placeholder="请输入消息标题"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handlerSearch"
            >搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1569, y: 675 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <span slot="_index" slot-scope="text, record">
          <span>{{record._index}}</span>
        </span>
        <span slot="newTitle" slot-scope="text, record" class="flex">
          <span class="mr10x">
            【系统消息】
            <span class="cursor-pointer" @click="handleCopy(record.title,'消息标题')">{{record.title}}</span>
          </span>
          <div class="icon">
            <my-icon v-if="record.selfIsRead == 0" type="p-icon-weidu1"></my-icon>
            <my-icon v-if="record.selfIsRead == 1" type="p-icon-wei" class="text-panda-text-4"></my-icon>
          </div>
        </span>
        <span
          slot="sendTime"
          slot-scope="text, record"
        >{{moment(record.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span slot="context" slot-scope="text, record">
          <!-- 去掉html标签 -->
          <!-- <span class="text-over">{{getText(record.context)}}</span> -->
          <span class="text-over" v-html="record.context" @click.prevent="handleUpdateKey(record)"></span>
        </span>
        <a slot="action" slot-scope="text, record" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看消息详情</div>
            </template>
            <q-icon @click.native="handleLook(record)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </a>
      </a-table>

      <!-- 消息详情弹窗 -->
      <q-dialog
        v-model="dialogDetailShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-detail
          :detailObj="showDialogObj"
          @lookNew="handleLookNew"
          @deleteNew="handleDeleteNew"
        ></dialog-detail>
      </q-dialog>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 715px;
  min-height: 715px;
}

>>>.ant-empty-normal {
  margin: 286px 0;
}

.text-over {
  display: block;
  display: -webkit-box;
  max-width: 595px;
  margin: 0 auto;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant, api_message, api_data } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/message/mymessage/config/config.js";
import dialogDetail from "src/pages/message/mymessage/component/dialogDetail.vue";
import { getText } from "src/util/module/getText.js";
import { handleCopy } from "src/util/module/common.js";
import moment from "moment";

export default {
  mixins: [...mixins],
  components: {
    dialogDetail
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      },
      dialogDetailShow: false, //消息详情阀值
      showDialogObj: {},
      currentNew: {}, //点击此处该详情
      value: [],
    };
  },
  computed: {
    ...mapGetters(["get_message"])
  },
  created() {
    this.initTableData();
  },
  methods: {
    ...mapActions(["clear_message", "set_data"]),
    moment,
    getText,
    handleCopy,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_message.post_admin_noticeNew_news(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata, "tabledata");
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.tabledata = [];
          code !== '0400403' && this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let params = {
        title: this.searchForm.title, //公告标题，可模糊搜索
        pgNum: this.pagination.current, //分页，查询第几页数据。
        pgSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    // 点击此处跳转！！！
    async handleUpdateKey(record) {
      let params = {
        id: record.id
      };
      let res = await api_message.post_admin_noticeNew_newsDetail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentNew = data;
        if (this.currentNew.type === 1) {
          // 新注册商户
          this.$router.push({ name: "basic" });
        } else {
          // 商户key是否过期信息
          this.$router.push({ name: "mykey" });
        }
        this.set_data(this.currentNew.children);
      } else {
        this.$message.error(msg);
      }
    },
    // 点击搜索按钮
    handlerSearch() {
      this.initTableData();
    },
    // 查看
    handleLook(record) {
      this.showDialogObj = { ...record };
      this.dialogDetailShow = true;
    },
    // 确认按钮
    confirm(val) {
      let params = { id: val };
      api_message.post_manage_news_delete(params).then(res => {
        let { code, msg } = res.data;
        if (code === "0000000") {
          this.$message.success("删除我的消息成功！");
          this.handleClearVuex();
          this.handlerSearch();
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    // 确定按钮
    handleLookNew() {
      this.handleClearVuex();
      this.handlerSearch();
    },
    // 删除信息
    handleDeleteNew(id) {
      this.confirm(id);
    },
    // 取消按钮
    cancel(e) {
      this.$message.warn("取消删除信息操作！");
    },
    //清除vuex里面的值
    handleClearVuex() {
      this.get_message && this.clear_message(null);
    }
  },
  watch: {
    get_message: {
      handler: function(val) {
        if (val) {
          this.handleLook({ ...val });
        }
      },
      immediate: true
    },
    value(val) {
      console.log(`selected:`, val);
    },
  }
};
</script>
