<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-11 20:10:56
 -->
<template>
  <div
    style="width: 496px ; height:auto;max-width:496px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">编辑商户KEY</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" @click="handleClose(false)" />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="row pl20x pt20x">
        <div>
          <div class="text-panda-text-7 fw_600">商户名称</div>
          <div>{{ detailObj.merchantName || detailObj.merchantCode }}</div>
        </div>
      </div>
      <div class="row pl20x pt20x">
        <div>
          <div class="row flex just-between">
            <div class="text-panda-text-7 mb12x fw_600">
              KEY信息
              <span class="panda-text-red">*</span>
            </div>
            <q-btn
              @click="handleGeneratePassword"
              class="panda-btn-upload fs12"
              style="width: 72px; height: 30px; margin-top: -10px; box-sizing: content-box"
              :disable="detailObj.statusDescription !== '已过期'"
            >重新生成</q-btn>
          </div>

          <div class="append-handle-btn-input row">
            <q-input
              style=" width:456px;"
              outlined
              ref="key"
              type="textarea"
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-36px"
              v-model.trim="detailObj.key"
              placeholder="请输入公钥字符串"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') ||
                  '生成密码不能为空！请点击生成密码！'
              ]"
              disable
            ></q-input>
          </div>
        </div>
      </div>
      <div class="row pl20x pt20x">
        <div>
          <div class="row flex just-between">
            <div class="text-panda-text-7 mb12x fw_600">
              商户有效期
              <span class="panda-text-red">*</span>
            </div>
          </div>
          <div class="append-handle-btn-input">
            <a-range-picker
              ref="time"
              disabled
              v-if="
                detailObj.startTime !== undefined &&
                  detailObj.endTime !== undefined
              "
              :defaultValue="[
                moment(detailObj.startTime),
                moment(detailObj.endTime)
              ]"
              :placeholder="['开始时间', '结束时间']"
              @change="onChange"
            ></a-range-picker>
          </div>
        </div>
      </div>
      <q-card-section class="fs14">
        <div class="row mt10x">
          <q-space></q-space>
          <div class="row mb10x mr5x">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handleSave"
              label="保存"
            />
            <q-btn
              class="panda-btn-white"
              style="width:80px;height:32px; border: 1px solid #8A92A5; "
              @click="handleClose(false)"
              label="取消"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_account } from "src/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      formData: {
        // level: ''
        startTime: "", //开始日期
        endTime: "" //结束日期
      }
    };
  },
  created() {
    this.formData.merchantAdmin = this.detailObj.merchantAdmin;
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(["get_data",'get_user_info'])
  },
  methods: {
    moment,
    ...mapActions(["clear_data"]),
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
          endTime: this.detailObj.endTime,
          updatedBy: this.get_user_info.username
        };
        this.initSaveUserKey(params);
      }
    },
    initSaveUserKey(params) {
      api_account.get_admin_merchant_updateKey(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("编辑商户KEY成功");
          this.handleClose(true);
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    validate() {
      this.$refs.key.validate();
      // this.$refs.time.validate();
    },
    // 生成KEY
    handleGeneratePassword() {
      api_account.get_admin_merchant_generateKey({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.detailObj.key = res.data.data;
          this.$message.success("生成KEY" + msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    handleClose(val) {
      this.$emit("closeDialog",val);
      if (this.get_data) {
        this.clear_data();
      }
    },
    onChange(value, dateString) {
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
    }
  }
};
</script>
<style lang="stylus" scoped>
// form表单input样式重写
>>>.q-field--with-bottom {
  padding-bottom: 0;
}

>>>.q-field__bottom--animated {
  bottom: 4px;
}

>>>.q-field__marginal {
  font-size: 16px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 14px;
}

>>>.q-field__append {
  border-left: 0px;
}

// 复写日期组件样式
>>>.ant-input {
  height: 36px;
  line-height: 36px;
  border-color: #c1c1c1;
  padding: 0 11px;
}

>>>.ant-input:hover {
  box-shadow: 0 2px 4px 0 rgba(97, 128, 239, 0.2);
}


>>>.ant-input-disabled{
  background-color #f1f1f1;
  color rgba(0, 0, 0, 0.8)
}
</style>
