<template>
  <div class="full-height full-width">
    <div class="pl20x mt20x mb20x">
      <q-breadcrumbs
        separator=">"
        active-color="whiddte"
        class="text-panda-text-4"
      >
        <q-breadcrumbs-el label="账户中心" />
        <q-breadcrumbs-el label="我的证书" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <!-- <div>
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
      </div> -->
      <a-table
        class="border-top full-width"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: 616 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        size="middle"
        @change="sorterForTable"
        :rowKey="record => record.id"
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
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">复制证书</div>
            </template>
            <q-icon @click.native="handleCopy(record, index)" class="panda-icon panda-icon-fu-zhi-key panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">更新证书</div>
            </template>
            <q-icon @click.native="handleEdit(record)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top" v-if="record.agentLevel == 1">
            <template slot="title">
              <div class="fs12">子证书管理</div>
            </template>
            <q-icon @click.native="handleSubCert(record, index)" class="panda-icon panda-icon-panda-icon-zi-guanli panda-icon-hover fs18"></q-icon>
          </a-tooltip>
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
  margin: 320px 0;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 30%;
}

.no-left >>> .q-field__append {
  border-left: none;
}
</style>
<script>
import mykeyMixin from 'src/pages/account/mykey/mixin/index.js';
export default {
  mixins: [mykeyMixin],
  created() {
    this.initParams(); 
  },
};
</script>
