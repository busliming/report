<!--
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: \panda-bc数据源相关报表系统\src\pages\auth\user\index.vue
-->
<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el :label="$t('auth_breadcrumbs.bread1')" />
        <q-breadcrumbs-el :label="$t('auth_breadcrumbs.bread2')" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div
        class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
      >
        <div class="append-handle-btn-input pl20x row w-240">
          <a-input
            v-model.trim="searchForm.username"
            @keydown.enter="handlerSearch"
            :placeholder="$t('auth_user_name_placeholder')"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
          </a-input>
        </div>
        <div class="append-handle-btn-input pl30x position-relative">
          <a-select autocomplete class="w-170" :placeholder="$t('auth_admin_placeholder')" @change="handlerenabled">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in enabledList"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input pl30x height-30px line-height-30px">
          <a-button
            type="primary"
            style="height: 30px; line-height: 30px;"
            @click="handlerSearch"
          >{{$t('search_btn')}}</a-button>
        </div>
        <q-space></q-space>
        <div class="append-handle-btn-input pl30x height-30px line-height-30px mr20x">
          <a-button type="primary" @click="handleAddUser">{{ $t('auth_add_btn') }}</a-button>
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
        size="middle"
        rowKey="id"
      >
        <span slot="username" slot-scope="text,record">
          <span class="cursor-pointer"  @click="handleCopy(record.username, '用户名')">{{record.username}}</span>
        </span>
        <span slot="roleName" slot-scope="text,record">
          {{is_zs?record.roleName: record.roleNameEn}}
        </span>
        <span slot="createTime" slot-scope="text,record">
          <span>{{moment(new Date(record.createTime)).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </span>
        <span slot="enabled" slot-scope="text, record">
          <a-button size="small" type="primary" v-if="record.enabled == 1">{{$t('auth_on')}}</a-button>
          <a-button size="small" type="dashed" v-else>{{$t('auth_off')}}</a-button>
        </span>
        <a slot="action" slot-scope="text, record" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">{{$t('auth_tip_edit')}}</div>
            </template>
            <q-icon @click.native="handleEditUser(record)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <!-- confirm确认再次删除消息 -->
          <a-popconfirm
            :class="record.isAdmin !== 1? '': 'no-show'"
            :title="$t('auth_tip_delete_tip1')"
            @confirm="confirm(record.id)"
            @cancel="$message.warn($t('auth_tip_delete_tip2'))"
            :okText="$t('auth_tip_delete_btn1')"
            :cancelText="$t('auth_tip_delete_btn2')"
            placement="topRight"
          >
            <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">{{$t('auth_tip_delete')}}</div>
              </template>
              <q-icon :class="record.id != 18?'': 'no-show'" class="panda-icon panda-icon-delete panda-icon-hover fs18"></q-icon>
            </a-tooltip>
          </a-popconfirm>
        </a>
      </a-table>
    </div>
    <!-- 新建商户 -->
    <q-dialog v-model="addUserShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-add @closeDialog="handleCloseDialog"></dialog-add>
    </q-dialog>
    <!-- 修改商户 -->
    <q-dialog v-model="editUserShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-edit :detailObj="showDialogObj" @closeEditDialog="handleCloseDialog"></dialog-edit>
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

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}

.text-over-200 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}

>>>.ant-table-expanded-row td {
  padding: 0px;
}
</style>
<script>
import { api_auth } from "src/api/index.js";
import datacentertablemixin from "src/mixins/module/datacentertablemixin";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dialogAdd from "src/pages/auth/user/component/dialogAdd.vue";
import dialogEdit from "src/pages/auth/user/component/dialogEdit.vue";
import { tablecolumns_config } from "src/pages/auth/user/config/config.js";
import { handleCopy } from "src/util/module/common.js";
import moment from "moment";

export default {
  mixins: [datacentertablemixin, commonmixin],
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      enabledList: [
        {value: 2, label: this.$t('auth_all')}, 
        {value: 1, label: this.$t('auth_on')},    
        {value: 0, label: this.$t('auth_off')},
                
      ],
      searchForm: {
        username: "",
        enabled: ''
      },
      showDialogObj: {},
      addUserShow: false, //创建用户弹窗
      editUserShow: false //修改用户弹窗
    };
  },
  components: {
    dialogAdd,
    dialogEdit
  },
  computed: {
    is_zs(){
      return this.$q.sessionStorage.getItem('language') === 'zs'? true: false;
    }
  },
  created() {
    this.initTableData();
  },
  methods: {
    moment,
    handleCopy,
    handlerenabled(val){
      this.searchForm.enabled = val;
      this.initTableData();
    },
    // 修改用户
    handleEditUser(item) {
      this.showDialogObj = { ...item };
      this.editUserShow = true;
    },
    // 删除用户
    handleDeleteUser(item) {},
    // 创建用户
    handleAddUser() {
      this.addUserShow = true;
    },
    handlerSearch() {
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_auth.post_admin_user_list(params).then(res => {
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
      let { username,enabled } = this.searchForm;
      let params = {
        username,
        enabled, // 默认2 查所有 0 禁用 1 启用
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = this.start + index + 1;
      });
      return arr;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    //关闭弹窗
    handleCloseDialog() {
      this.addUserShow = false;
      this.editUserShow = false;
      this.initTableData();
    },
    // 确认按钮
    confirm(val) {
      let params = { id: val };
      api_auth.post_admin_user_delete(params).then(res => {
        let { code, msg } = res.data;
        if (code === "0000000") {
          this.$message.success("删除用户成功！");
          this.handlerSearch();
        } else {
          this.$message.error(msg, 5);
        }
      });
    }
  }
};
</script>
