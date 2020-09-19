<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="授权中心" />
        <q-breadcrumbs-el label="角色管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div
        class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
      >
        <div class="append-handle-btn-input pl20x row w-240">
          <a-input
            v-model.trim="searchForm.name"
            @keydown.enter="handlerSearch"
            placeholder="请输入角色名称"
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
        <q-space></q-space>
        <div class="append-handle-btn-input pl30x height-30px line-height-30px">
          <a-button
            type="primary"
            :disabled="role.id?false: true"
            @click="handleSetRole"
          >设置角色权限</a-button>
        </div>
        <div class="append-handle-btn-input pl30x height-30px line-height-30px mr20x">
          <a-button type="primary" @click="handleAddRole">创建角色</a-button>
        </div>
      </div>
      <a-table
        class="expanded"
        bordered
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 616 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        :row-selection="rowSelection"
        size="middle"
        rowKey="id"
      >
        <span slot="name" slot-scope="text,record">
          <span class="cursor-pointer"  @click="handleCopy(record.name, '角色名称')">{{record.name}}</span>
        </span>
        <span slot="remark" slot-scope="text,record">
          <span class="text-over">{{record.remark}}</span>
        </span>
        <span slot="createTime" slot-scope="text,record">
          <span>{{moment(new Date(record.createTime)).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </span>
        <a slot="action" slot-scope="text, record" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">修改角色</div>
            </template>
            <q-icon @click.native="handleEditUser(record)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <!-- confirm确认再次删除消息 -->
          <a-popconfirm
            title="你确定删除该项角色吗?"
            :class="record.isAdmin !== 1? '': 'no-show'"
            @confirm="confirm(record.id)"
            @cancel="$message.warn('取消删除角色操作！')"
            okText="确定"
            cancelText="取消"
            placement="topRight"
          >
            <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">删除角色</div>
              </template>
              <q-icon class="panda-icon panda-icon-delete panda-icon-hover fs18"></q-icon>
            </a-tooltip>
          </a-popconfirm>
        </a>
      </a-table>
    </div>
    <!-- 创建角色 -->
    <q-dialog v-model="addRoleShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-add :detailObj="showDialogObj" @closeDialog="handleCloseDialog"></dialog-add>
    </q-dialog>
    <!-- 设置菜单权限 -->
    <q-dialog v-model="setRoleShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @closeSetDialog="handleCloseDialog"></dialog-set>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 720px;
  min-height: 720px;
}

>>>.ant-empty-normal {
  margin: 284px 0;
}

>>>.ant-table-expanded-row td {
  padding: 0px;
}

>>>.ant-btn-primary[disabled] {
  background-color: #fff;
  color: #c1c1c1;
}

.text-over {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  white-space: nowrap;
}

</style>
<script>
import { api_auth } from "src/api/index.js";
import financesorter from "src/mixins/module/financesorter.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dialogAdd from "src/pages/auth/role/component/dialogAdd.vue";
import dialogSet from "src/pages/auth/role/component/dialogSet.vue";
import { tablecolumns_config } from "src/pages/auth/role/config/config.js";
import { handleCopy } from "src/util/module/common.js";
import moment from "moment";

export default {
  mixins: [financesorter, commonmixin],
  data() {
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        this.role = record;
      },
      type: "radio"
    };
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        name: ""
      },
      rowSelection,
      showDialogObj: {},
      addRoleShow: false, // 新建角色弹窗
      setRoleShow: false, //设置角色权限弹窗
      role: {}
    };
  },
  components: {
    dialogAdd,
    dialogSet
  },
  created() {
    this.initTableData();
  },
  methods: {
    moment,
    handleCopy,
    // 修改用户
    handleEditUser(item) {
      this.showDialogObj = { ...item };
      this.addRoleShow = true;
    },
    // 删除用户
    handleDeleteUser(item) {},
    // 创建角色
    handleAddRole() {
      this.showDialogObj = {};
      this.addRoleShow = true;
    },
    // 设置角色权限
    handleSetRole() {
      this.showDialogObj = { ...this.role };
      this.setRoleShow = true;
    },
    handlerSearch() {
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_auth.post_admin_role_list(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.start = this.$lodash.get(res, "data.data.startRow");
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
      let { name } = this.searchForm;
      let params = {
        name,
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = this.start + index;
      });
      return arr;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    //关闭弹窗
    handleCloseDialog() {
      this.addRoleShow = false;
      this.setRoleShow = false;
      this.initTableData();
    },
    // 确认按钮
    confirm(val) {
      let params = { id: val };
      api_auth.post_admin_role_delete(params).then(res => {
        let { code, msg } = res.data;
        if (code === "0000000") {
          this.$message.success("删除角色成功！");
          this.handlerSearch();
        } else {
          this.$message.error(msg, 5);
        }
      });
    }
  }
};
</script>
