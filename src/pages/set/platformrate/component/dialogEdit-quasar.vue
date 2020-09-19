<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 14:57:26
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">新建平台费率</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="fs14">
        <div>
          <div class="text-panda-text-7 mb12x fw_600">
            计算标准
            <span class="panda-text-red">*</span>
          </div>
          <div class="append-handle-btn-input position-relative">
            <div
              class="text-panda-text-7 fs14 position-absolute"
              style="left: 12px; top: 9px;"
              v-if="!formData.computingStandard"
            >请选择计算标准</div>
            <q-select
              id="select"
              class="input-height-36px w-170"
              v-model="formData.computingStandard"
              :options="computingStandardList"
              outlined
              ref="computingStandard"
              dense
              options-dense
              emit-value
              map-options
              option-value="computingStandard"
              option-label="label"
              popup-content-class="text-panda-text-dark"
            ></q-select>
          </div>
        </div>
        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">
              金额范围 (万元)
              <span class="panda-text-red">*</span>
            </div>
            <div class="no-left append-handle-btn-input row">
              <q-input
                style=" width:170px;"
                outlined
                dense
                color="panda-text-light"
                type="number"
                ref="rangeAmountBegin"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.rangeAmountBegin"
                placeholder="请输入最小值"
                lazy-ruless
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    '最小值不能为空！',
                  val => (/^[0-9]\d*(\.\d+)?$/).test(val) || '请输入正数！', 
                ]"
                clearable
              ></q-input>
              <span class="line-height-36px ml15x mr15x">至</span>
              <q-input
                style=" width:170px;"
                outlined
                dense
                type="number"
                ref="rangeAmountEnd"
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.rangeAmountEnd"
                placeholder="请输入最大值"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || '最大值不能为空！',
                  val => (val*1 > formData.rangeAmountBegin*1) || '最大值不能小于最小值！',
                  val => (/^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*/).test(val) || '请输入正数！',
                  val => val > 0 || '请输入正数！' ,    
                ]"
                clearable
              ></q-input>
            </div>
          </div>
        </div>
        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">
              平台费率（%）
              <span class="panda-text-red">*</span>
            </div>
            <div class="no-left append-handle-btn-input row">
              <q-input
                style=" width:170px;"
                outlined
                dense
                ref="terraceRate"
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.terraceRate"
                placeholder="请输入平台费率"
                lazy-ruless
                :rules="[
                  val =>
                    (val !== null && val !== '') ||
                    '平台费率不能为空！',
                  val => (/^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*/).test(val) || '请输入正数！' ,
                  val => val > 0 || '请输入正数！' , 
                ]"
                clearable
              ></q-input>
              <!-- <span class="line-height-36px ml15x">%</span> -->
            </div>
          </div>
          <div class="ml40x">
            <div class="text-panda-text-7 mb12x fw_600">
              缴纳周期
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative">
              <div
                class="text-panda-text-7 fs14 position-absolute"
                style="left: 12px; top: 9px;"
                v-if="!formData.paymentCycle"
              >请选择缴纳周期</div>
              <q-select
                id="select"
                ref="paymentCycle"
                class="input-height-36px w-170"
                v-model="formData.paymentCycle"
                :options="paymentCycleList"
                outlined
                dense
                options-dense
                emit-value
                map-options
                option-value="paymentCycle"
                option-label="label"
                popup-content-class="text-panda-text-dark"
                lazy-rules
                :rules="[
                      val =>
                        (val !== null && val !== '') ||
                        '缴纳周期不能为空！'
                    ]"
              ></q-select>
            </div>
          </div>
        </div>

        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">备注</div>
            <div class="append-handle-btn-input row">
              <q-input
                style=" width:565px;"
                outlined
                ref="key"
                type="textarea"
                dense
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.remarks"
                placeholder="请输入备注内容"
              ></q-input>
            </div>
          </div>
        </div>

        <div class="row mt40x mb20x">
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handleSave"
            label="保存"
          />
          <q-btn
            class="panda-btn-white"
            style="width:80px;height:32px; border: 1px solid #8A92A5; "
            v-close-popup
            label="取消"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { api_base } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
export default {
  mixins: [commonmixin],
  data() {
    return {
      formData: {
        computingStandard: "", //计算标准
        rangeAmountBegin: "", //金额范围开始
        rangeAmountEnd: "", //金额范围结束
        terraceRate: "", //平台费率
        paymentCycle: "",
        remarks: "" //备注
      },
      //表单
      merchantLevelList: [], //商户等级
      computingStandardList: [
        //计算标准
        { label: "盈利金额", computingStandard: "1" },
        { label: "投注金额", computingStandard: "2" }
      ],
      paymentCycleList: [
        //缴纳周期
        { label: "每月", paymentCycle: 1 },
        { label: "每季度", paymentCycle: 2 },
        { label: "每半年", paymentCycle: 3 },
        { label: "每年", paymentCycle: 4 }
      ]
    };
  },
  created() {
    // this.initMerchantLevel();
    // this.initTerraceRateList();
  },
  methods: {
    async initMerchantLevel() {
      let res = await api_base.get_manage_merchantLevel_queryLevelList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        this.merchantLevelList = data;
      }
    },

    handleSave() {
      this.validate();
      if (
        this.$refs.computingStandard.hasError ||
        this.$refs.rangeAmountBegin.hasError ||
        this.$refs.rangeAmountEnd.hasError ||
        this.$refs.terraceRate.hasError
        // this.$refs.paymentCycle.hasError
      ) {
        this.formHasError = true;
      } else {
        if (!this.formData.computingStandard) {
          this.$message.error("计算标准不能为空！");
          return;
        } else if (!this.formData.paymentCycle) {
          this.$message.error("缴纳周期不能为空！");
          return;
        }
        console.log(this.formData.rangeAmountBegin,this.formData.rangeAmountEnd);
        let params = {
          computingStandard: this.formData.computingStandard, //计算标准
          rangeAmountBegin: this.formData.rangeAmountBegin * 10000, //金额范围开始
          rangeAmountEnd: this.formData.rangeAmountEnd * 10000, //金额范围结束
          terraceRate: this.formData.terraceRate, //平台费率
          paymentCycle: this.formData.paymentCycle, //平台费率缴纳周期
          remarks: this.formData.remarks //备注
        };
        params = this.delete_empty_property_with_exclude(params);
        api_base.post_manage_merchantRate_add(params).then(res => {
          let { code, msg } = res.data;
          if (code == "0000000") {
            this.$message.success("新建费率成功！");
            this.$emit("closeDialogEditShow");
          } else {
            this.$message.error(msg);
          }
        });
      }
    },
    // 表单验证
    validate() {
      this.$refs.computingStandard.validate();
      this.$refs.rangeAmountBegin.validate();
      this.$refs.rangeAmountEnd.validate();
      this.$refs.terraceRate.validate();
      // this.$refs.paymentCycle.validate();
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

.no-left >>> .q-field__append {
  border-left: none;
}
</style>
