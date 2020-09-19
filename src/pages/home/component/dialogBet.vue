<!--
 * @Desc: 今日用户信息
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-06 21:21:37
 -->
 
<template>
  <div
    style="max-width:386px; overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">币种明细</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <a-table
        :columns="merchantBetColumns"
        :dataSource="userTodayData"
        :pagination="pagination"
        :loading="tabledata_loading"
        :scroll="{ y: 300 }"
        size="small"
        rowKey="currency"
      >
        <span slot="customTitle">
          大额投注用户数 
          <a-tooltip placement="top">
            <template slot="title">
              <span>累计投注金额≧￥5000</span>
            </template>
            <a-icon type="question-circle" class="cursor-pointer" />
          </a-tooltip>
        </span>
        <template slot="footer">
          <div class="flex justify-between fw_600 text-panda-text-7 text-center">
            <span style="width: 78px">总计</span>
            <span style="width: 136px">{{userToday.betUserAmount}}</span>
            <span style="width: 162px">{{userToday.briskUser}}</span>
          </div>
        </template>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_user } from "src/api/index.js";
import { betCurrency_config } from "src/pages/home/config/betCurrency.js";
export default {
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      merchantBetColumns: betCurrency_config,
      merchantBetData: [],
      pagination: {
        pageSize: 100,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "30", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      }
    };
  },
  created() {
    // this.formData.merchantAdmin = this.detailObj.merchantAdmin;
  },
  props: {
    userTodayData: {
      type: Array,
      default() {
        return [];
      }
    },
    userToday: {
      type: Object
    }
  },
  computed: {
    time() {
      return (
        this.betRows &&
        this.betRows.filter(item => this.detailObj.month == item["日期"])[0]
          .time
      );
    },
    year() {
      return this.time && this.time.toString().substr(0, 4) + "年";
    }
  },
  methods: {
    // 保存按钮
    handleSave() {
      this.validate();
      if (this.$refs.key.hasError) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          merchantCode: this.detailObj.merchantCode,
          key: this.detailObj.key,
          startTime: this.detailObj.startTime,
          endTime: this.detailObj.endTime
        };
        this.initSaveUserKey(params);
      }
    },
    validate() {
      this.$refs.key.validate();
      // this.$refs.time.validate();
    },
    // 生成KEY
    handleGeneratePassword() {
      api_merchant.get_manage_merchant_generateKey({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.detailObj.key = res.data.data;
          this.$message.success("生成KEY" + msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
      console.log(this.detailObj, "detailObj");
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-table-body {
  overflow;
}

>>>.ant-table-footer {
  padding: 0;
  height: 30px;
  line-height: 30px;
}

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: 600;
}
</style>
