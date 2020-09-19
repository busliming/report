<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="消息中心" />
        <q-breadcrumbs-el label="公告栏" class="fw_600 text-panda-text-7" />
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
              placeholder="请输入公告标题"
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
          <q-space />
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 615 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <span slot="bulletinTitle" slot-scope="text, record">
          <div class="flex items-center text-center justify-start">
            <div>
              <my-icon v-if="record.isTag == 1" type="p-icon-biaoji" class="mr5x"></my-icon>
              <span v-else class="mr5x no-show">11</span>
            </div>
            <div class="text-over-130">【{{ handleNotice(record.noticeTypeId) }}】 <span class=" cursor-pointer" @click="handleCopy(record.title,'公告标题')">{{record.title}}</span></div>
            <div>
              <my-icon v-if="record.upload" type="p-icon-fujian" class="ml10x text-panda-text-4"></my-icon>
            </div>
          </div>
        </span>
        <span slot="context" slot-scope="text, record" class="text-over">
          <span class="text-over">{{getText(record.context)}}</span>
        </span>
        <span slot="status" slot-scope="text, record">
          <span class="panda-icon-blue" v-if="record.status === 0">草稿</span>
          <span v-if="record.status === 1">已发布</span>
        </span>
        <span
          slot="sendTime"
          slot-scope="text, record"
        >{{moment(record.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>

        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看公告详情</div>
            </template>
            <q-icon @click.native="handleLook(record,index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
        </a>
      </a-table>
      <!-- confirm确认再次删除草稿箱 -->
      <!-- 查看活动详情弹窗 -->
      <q-dialog
        v-model="dialogDetailShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-detail :detailObj="showDialogObj" @closeDialog="handleCloseDialogDetail"></dialog-detail>
      </q-dialog>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 286px 0;
}

.text-over {
  display: block;
  display: -webkit-box;
  max-width: 770px;
  margin: 0 auto;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-over-130 {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 310px;
  white-space: nowrap;
}

.text-over-300 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

.no-show{
  // opacity 0
  visibility hidden
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}
</style>
<script>
import { mapGetters, mapActions} from 'vuex'
import { api_message } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/message/bulletin/config/config.js";
import dialogDetail from "src/pages/message/bulletin/component/dialogDetail.vue";
import { getText } from "src/util/module/getText.js";
import { handleCopy } from "src/util/module/common.js";

import moment from "moment";
// import { getAutoParams } from "src/util/module/common.js";

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
        title: ""
      },
      locale: {
        emptyText: "Sorry，没有找到您想要的结果，请更换查询条件！"
      },
      dialogDetailShow: false, //活动详情阀值
      showDialogObj: {},
      currentRecord: "",
      noticeList: []
    };
  },
  computed: {
    ...mapGetters(['get_message'])
  },
  created() {
    this.initNoticeList();
    this.initTableData();
  },
  methods: {
    ...mapActions(['clear_message']),
    moment,
    getText,
    handleCopy,
    handleNotice(id){
      let obj =  this.noticeList.find(item => item.id === id);
      if(obj){
        return obj.typeName;
      }else{
        return '--';
      }
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_message.post_admin_noticeNew_notice(params).then(res => {
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
        }else{
          this.tabledata = [];
          code !== '0400403' && this.$message.error(res.data.msg, 5);
        }
      });
    },
    async initNoticeList(){
      let res = await api_message.post_admin_noticeNew_noticeType({})
      if(res.data.code === '0000000'){
        this.noticeList = res.data.data || [];
      }else{
        this.noticeList = [];
      }
    },
    compute_init_tabledata_params() {
      let params = {
        title: this.searchForm.title, //商户名称，可模糊搜索
        pgNum: this.pagination.current, //分页，查询第几页数据。
        pgSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    // 点击搜索按钮
    handlerSearch() {
      this.initTableData();
    },
    // 查看
    handleLook(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.dialogDetailShow = true;
    },
    handleCloseDialogDetail(){
      if(this.get_message){
        this.clear_message();
      }
      this.handlerSearch();
    },
    confirm(val) {
      let params = { id: val };
      api_message.post_manage_notice_delete(params).then(res => {
        let { code } = res.data;
        if (code === "0000000") {
          this.$message.success("删除草稿成功！");
          this.handlerSearch();
        } else {
          this.$message.error("删除草稿失败！");
        }
      });
    },
    cancel() {
      this.$message.warn("取消删除草稿！");
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.setMerchantShow = false;
      this.initTableData();
    },
    //确认按钮
    async handleConfirm() {
      let params = {
        merchantCode: this.currentRecord.merchantCode,
        status: this.currentRecord.status == 1 ? 0 : 1
      };
      let res = await api_merchant.get_manage_merchant_updateMerchantStatus(
        params
      );
      let { code, msg } = res.data;
      if (code == "0000000") {
        if (this.currentRecord.status == 0) {
          this.$message.success("启用" + msg);
        } else {
          this.$message.error("禁用" + msg);
        }
      }
      this.$set(
        this.currentRecord,
        "status",
        this.currentRecord.status == 1 ? 0 : 1
      );
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
    }
  }
};
</script>
