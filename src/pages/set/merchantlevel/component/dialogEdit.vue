<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-18 17:22:17
 -->
<template>
  <div style="width: 600px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">新建商户等级</div>
          <q-space></q-space>
          <q-btn
            flat
            dense
            icon="close"
            v-close-popup
            class="text-panda-dialog-close"
          />
        </div>
      </q-card-section>
      <q-card-section class="fs14 mt20x">
        <a-form
          id="components-form-edit"
          class="edit"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <div class="flex" style="width:165px; position: relative">
              <div
                class="border-radius-4"
                :style="formData.logo ? 'border: 1px dashed #c1c1c1' : ''"
              >
                <img
                  :src="httpUrl_72"
                  v-if="httpUrl_72"
                  class="border-radius-4"
                  alt
                  :style="
                    formData.logo
                      ? 'max-height: 160px; max-width: 160px; padding: 5px;'
                      : 'max-height: 165px; max-width: 165px;'
                  "
                />
              </div>

              <div
                class
                style="position: absolute; bottom: 0px; right: -200px;z-index: 2"
              >
                <input
                  style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:200px;"
                  type="file"
                  name="inputfile1"
                  @change="uploadAvatar($event)"
                  ref="inputfile1"
                  accept="image/jpeg, image/gif, image/png, image/bmp"
                />
              </div>
              <div
                class
                style="position: absolute; bottom: 0; right: -130px; z-index: 1"
              >
                <q-btn class="panda-btn-upload mt9x" label="上传LOGO" />
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="text-panda-text-7 fw_600">
              商户等级
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input w-170">
              <a-input
                placeholder="请输入商户等级"
                size="large"
                disabled
                v-decorator="['level', { initialValue: mostLevel }]"
              />
            </div>
          </a-form-item>

          <div class="mt20x row">
            <div>
              <div class="text-panda-text-7 mb12x fw_600">
                平台费率
                <span class="panda-text-red">*</span>
              </div>
              <div
                class="append-handle-btn-input position-relative w-170"
                @click.stop="handleLevelDiaolog"
              >
                <a-form-item>
                  <a-input
                    placeholder="请输入平台费率"
                    size="large"
                    addonAfter="%"
                    read-only
                    v-decorator="[
                      'terraceRate',
                      { initialValue: formData.terraceRate }
                    ]"
                  />
                </a-form-item>
              </div>
            </div>

            <div class="ml25x">
              <div class="text-panda-text-7 mb12x fw_600">计算标准</div>
              <div class="append-handle-btn-input position-relative w-170">
                <a-form-item>
                  <a-select
                    placeholder="请选择计算标准"
                    size="large"
                    hasFeedback
                    disabled
                    v-decorator="[
                      'computingStandard',
                      { initialValue: formData.computingStandard }
                    ]"
                  >
                    <a-select-option
                      :value="item.computingStandard"
                      v-for="(item, index) in computingStandardList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border3"></div>
                </a-form-item>
              </div>
            </div>

            <div class="ml25x">
              <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
              <div class="append-handle-btn-input position-relative w-170">
                <a-form-item>
                  <a-select
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    disabled
                    v-decorator="[
                      'paymentCycle',
                      { initialValue: formData.paymentCycle }
                    ]"
                  >
                    <a-select-option
                      :value="item.paymentCycle"
                      v-for="(item, index) in paymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border3"></div>
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="row">
            <a-form-item>
              <div class="text-panda-text-7 fw_600">会员费 (万元)</div>
              <div class="no-left append-handle-btn-input position-relative">
                <a-input-number
                  placeholder="请输入会员费"
                  autocomplete="off"
                  size="large"
                  :min="0"
                  :max="10000"
                  :precision="2"
                  v-decorator="['vipAmount']"
                />
              </div>
            </a-form-item>
            <div class="ml25x">
              <a-form-item>
                <div class="text-panda-text-7 fw_600">缴纳周期</div>
                <div class="append-handle-btn-input position-relative w-170">
                  <a-select
                    autocomplete
                    class="w-170"
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    v-decorator="['vipPaymentCycle']"
                  >
                    <a-select-option
                      :value="item.vipPaymentCycle"
                      v-for="(item, index) in vipPaymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <a-form-item>
              <div class="text-panda-text-7 fw_600">技术服务费 (万元)</div>
              <div class="no-left append-handle-btn-input position-relative">
                <a-input-number
                  placeholder="请输入技术服务费"
                  autocomplete="off"
                  size="large"
                  :min="0"
                  :max="10000"
                  :precision="2"
                  v-decorator="['techniqueAmount']"
                />
              </div>
            </a-form-item>
            <div class="ml25x">
              <a-form-item>
                <div class="text-panda-text-7 fw_600">缴纳周期</div>
                <div class="append-handle-btn-input position-relative w-170">
                  <a-select
                    autocomplete
                    class="w-170"
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    v-decorator="['techniquePaymentCycle']"
                  >
                    <a-select-option
                      :value="item.techniquePaymentCycle"
                      v-for="(item, index) in techniquePaymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="row mt10x mb20x">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handleSubmit"
              label="保存"
            />
            <q-btn
              class="panda-btn-white"
              style="width:80px;height:32px; border: 1px solid #8A92A5;"
              v-close-popup
              label="取消"
            />
          </div>
        </a-form>
      </q-card-section>
    </q-card>
    <!-- 选择商户等级 -->
    <q-dialog
      v-model="selectLevelShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-select-rate
        @closeSelectRate="handleCloseDialogRate"
      ></dialog-select-rate>
    </q-dialog>
  </div>
</template>
<script>
import { api_public, api_base, api_merchant } from "src/api/index.js";
import dialogSelectRate from "src/pages/set/merchantlevel/component/dialogSelectRate.vue";
import commonmixin from "src/mixins/common/commontoolmixin.js";

export default {
  mixins: [commonmixin],
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      // httpUrl_72: imgSrc
      httpUrl_72: require("../../../../assets/img/bg1.png"),
      formData: {
        level: "", //级别
        logo: "", // 商户logo
        rateId: "", //费率ID
        vipAmount: "",
        vipPaymentCycle: "",
        techniqueAmount: "",
        techniquePaymentCycle: ""
        // computingStandard: null //计算标准
      },
      terraceRateList: [], // 平台费率

      merchantLevelList: [], //商户等级
      terraceRateObj: {}, //当前下拉框选中汇率包含的对象
      //

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
      ],
      vipPaymentCycleList: [
        //缴纳周期
        { label: "每月", vipPaymentCycle: 1 },
        { label: "每季度", vipPaymentCycle: 2 },
        { label: "每半年", vipPaymentCycle: 3 },
        { label: "每年", vipPaymentCycle: 4 }
      ],
      techniquePaymentCycleList: [
        //缴纳周期
        { label: "每月", techniquePaymentCycle: 1 },
        { label: "每季度", techniquePaymentCycle: 2 },
        { label: "每半年", techniquePaymentCycle: 3 },
        { label: "每年", techniquePaymentCycle: 4 }
      ],
      selectLevelShow: false //选择平台费率弹窗
    };
  },
  computed: {
    mostLevelObj() {
      return (
        this.merchantLevelList.length > 0 &&
        this.$lodash.last(this.merchantLevelList)
      );
    },
    mostLevel() {
      return this.mostLevelObj ? this.mostLevelObj.level + 1 : 1;
    }
  },
  components: {
    dialogSelectRate
  },
  props: {
    detailObj: ""
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit" });
  },
  created() {
    this.initMerchantLevel();
    this.initTerraceRateList();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          if (!values.terraceRate) {
            this.$message.warn("平台费率不能为空！");
            return;
          } else if (values.vipAmount && !values.vipPaymentCycle) {
            this.$message.warn("会员费缴纳周期不能为空！");
            return;
          } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
            this.$message.warn("技术服务费缴纳周期不能为空！");
            return;
          }
          values.vipAmount = values.vipAmount * 10000 || 0;
          values.techniqueAmount = values.techniqueAmount * 10000 || 0;
          values.terraceRate = this.formData.terraceRate;
          values.computingStandard = this.formData.computingStandard;
          values.paymentCycle = this.formData.paymentCycle;
          values.rangeAmountBegin = this.formData.rangeAmountBegin;
          values.rangeAmountEnd = this.formData.rangeAmountEnd;
          values.rateId = this.formData.rateId;
          values.logo = this.formData.logo;
          console.log(values, "values");
          let params = this.delete_empty_property_with_exclude(values);
          api_base.post_manage_merchantLevel_add(values).then(res => {
            let { code, msg, data } = res.data;
            if (code == "0000000") {
              this.$emit("closeDialogSetShow");
              this.$message.success("新建商户等级成功！");
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    // 上传图片
    uploadAvatar(event) {
      let inputFile = event.target.files[0];
      const isLt2M = inputFile && inputFile.size / 1024 / 1024 < 5;
      const isWantImage =
        inputFile.type === "image/jpeg" ||
        inputFile.type === "image/png" ||
        inputFile.type === "image/gif" ||
        inputFile.type === "image/tif" ||
        inputFile.type === "image/bmp";
      if (!isWantImage) {
        this.$message.error("只支持上传png/jpeg/tif/gif/bmp,请重新上传！");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不超过5M,请重新上传");
        return;
      }
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("imageFile", inputFile);
      console.log(event);
      // 清空触发change时间
      event.target.value = "";
      api_public.put_manage_merchant_img_upload(formData).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          this.formData.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    // 商户等级
    async initMerchantLevel() {
      let res = await api_base.get_manage_merchantLevel_queryLevelList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        this.merchantLevelList = data;
      }
    },
    // 费率请求
    async initTerraceRateList() {
      let res = await api_base.get_manage_merchantRate_queryRateList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        console.log(data, "terraceRateList");
        this.terraceRateList = data;
      }
    },
    // 点击商户等级弹出弹窗
    handleLevelDiaolog() {
      this.selectLevelShow = true;
    },
    handleCloseDialogRate(record) {
      console.log(record);
      this.handleFunction(record);
      this.selectLevelShow = false;
    },
    handleFunction(item) {
      this.formData.terraceRate = item.terraceRate;
      this.formData.computingStandard = item.computingStandard;
      this.formData.paymentCycle = item.paymentCycle;
      this.formData.rateId = item.id;
      this.formData.rangeAmountBegin = item.rangeAmountBegin;
      this.formData.rangeAmountEnd = item.rangeAmountEnd;
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}

>>>.ant-input-lg {
  font-size: 14px;
}

>>>.ant-select-lg {
  font-size: 14px;
}

>>>.ant-input-number-lg {
  width: 170px;
  font-size: 14px;
}

>>>.ant-form-explain {
  font-size: 12px;
  width: 170px;
}

>>>.ant-input-disabled {
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
}

>>>.ant-select-disabled .ant-select-selection {
  background: #fff;
  // color: rgba(0, 0, 0, 0.65);
}

>>>.ant-form-item-control {
  line-height: 36px;
}

>>>.ant-form-item {
  margin-bottom: 20px;
}
</style>
