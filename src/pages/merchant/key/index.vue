<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs
        separator=">"
        active-color="whiddte"
        class="text-panda-text-4"
      >
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="证书管理" class="fw_600 text-panda-text-7" />
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
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
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
        class="border-top full-width"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 616 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        size="middle"
        @change="sorterForTable"
        :rowKey="record => record._index"
      >
        <span slot="agentLevel" slot-scope="text, record">
          <div class="text-over">
            <span v-if="record.agentLevel === 0">直营商户</span>
            <span v-else-if="record.agentLevel === 1">渠道商户</span>
            <span v-else-if="record.agentLevel === 2">二级商户</span>
            <span v-else>--</span>
          </div>
        </span>
        <span slot="startTime" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.startTime }} 至 {{ record.endTime }}</span>
          </div>
        </span>
        <span slot="status" slot-scope="text, record">
          <div class="text-over">
            <span
              v-if="record.statusDescription == '即将过期'"
              class="panda-dot panda-dot-yellow line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '有效'"
              class="panda-dot panda-dot-green line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '已过期'"
              class="panda-dot panda-dot-red line-height-40px mr5x"
            ></span>
            <span>{{ record.statusDescription }}</span>
          </div>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <q-icon
            class="panda-icon panda-icon-fu-zhi-key panda-icon-hover fs18"
            @click.native="handleCopy(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>复制证书</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            @click.native="handleEdit(record)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>更新证书</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-panda-icon-zi-guanli panda-icon-hover fs18"
            @click.native="handleSubCert(record, index)"
            v-if="record.agentLevel == 1"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>子证书管理</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            style="opacity:0"
            v-else
          >
          </q-icon>
        </a>
      </a-table>
    </div>
    <!-- 更新证书弹窗 -->
    <q-dialog
      v-model="eidtKeyShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-edit
        :detailObj="showDialogObj"
        @closeDialog="handleCloseDialogEdit"
      ></dialog-edit>
    </q-dialog>
    <!-- 子证书管理弹窗 -->
    <q-dialog
      v-model="subKeyShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-sub
        :detailObj="showDialogObj"
        @closeDialogSetShow="handleCloseDialogSet"
      ></dialog-sub>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 700px;
  min-height: 700px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 30%;
}

.no-left >>> .q-field__append {
  border-left: none;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/merchant/key/config/config.js";
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
import dialogSub from "src/pages/merchant/key/component/dialogSub.vue";
export default {
  mixins: [...mixins],
  components: {
    dialogEdit,
    dialogSub
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,

      searchForm: {
        merchantName: "" //商户名称
      },
      showDialogObj: "",
      scroll_area_height: "",
      eidtKeyShow: false, //编辑证书弹窗阀值
      subKeyShow: false //子证书管理弹窗阀值
    };
  },
  computed: {
    ...mapGetters(['get_data'])
  },
  created() {
    this.initParams();
    
  },
  methods: {
    ...mapActions(['clear_data']),
    initParams(){
      if(this.get_data){
        this.searchForm.merchantName = this.get_data.merchantName;
        this.handleEdit(this.get_data);
      }
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.get_manage_merchant_queryKeyList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.page") * 1 || 1;
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
        merchantName: this.searchForm.merchantName, // 商户名称
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      return params;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 复制证书
    handleCopy(record, index) {
      console.log(record.key, index, "qqq");
      var oInput = document.createElement("input");
      oInput.value = record.key;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      if (oInput.value) {
        this.$message.success("复制KEY成功,可以进行下一步操作！");
      }
    },
    //编辑证书
    handleEdit(record) {
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    handleCloseDialogEdit(){
      this.eidtKeyShow = false;
    },
    // 子证书管理
    handleSubCert(record, index) {
      this.showDialogObj = { ...record };
      this.subKeyShow = true;
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.eidtKeyShow = false;
      this.initTableData();
    }
  }
};
</script>
