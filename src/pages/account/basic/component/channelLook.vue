<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="账户中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户信息管理" class="text-panda-text-4" />
        <q-breadcrumbs-el label="查看基本资料" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div
      style="margin: 20px;min-height: 790px;"
      class="bg-panda-bg-6 shadow-3 border-radius-4 relative-position pl20x pr20x"
    >
      <a-tabs v-model="activeKey" class="col-12 ml20x">
        <a-tab-pane key="1" tab="基本信息">
          <div class="border-2 border-radius-4 mt20x pl20x pr20x ml20x" style="max-width: 701px;">
            <div class="row fs14 text-panda-text-7 pr10x mb40x">
              <div class="row pl20x mt40x">
                <div
                class="border-radius-4"
                :style="detailObj.logo? 'border: 1px dashed #c1c1c1': ''"
                >
                  <img
                    :src="detailObjImg"
                    v-if="httpUrl_72"
                    class="border-radius-4"
                    alt
                    width="100"
                    height="100"
                    style="padding: 5px;"
                  />
                  <!-- :style="detailObj.logo? 'max-height: 100px; max-width: 100px; padding: 5px;': 'max-height: 105px; max-width: 105px;'" -->
                </div>
                <div class="pl40x fw_600">
                  <div class=" line-height-24px mt20x text-panda-text-7 fs14">
                    <span class="panda-text-1">商户编号：</span>{{ detailObj.merchantCode }}
                  </div>
                  <div class="mt10x text-panda-text-7 fw_600"><span class="panda-text-1">商户名称：</span>{{ detailObj.merchantName }}</div>
                </div>
              </div>
              <q-btn style="margin-left: 265px; margin-top: 70px" class="panda-btn-upload" @click="handleEditBasic">编辑基本资料</q-btn>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x fs14">
              <div class="col-4 pl20x">
                <div class="panda-text-1">
                  商务联系人
                  <my-icon
                    type="p-icon-xiala"
                    @click="handleShowMoreContact"
                    class="fs12 cursor-pointer"
                    v-if="currentContact.length > 1"
                  ></my-icon>
                </div>
                <div
                  class="text-panda-text-7 line-height-24px"
                  v-if="!showMoreContact"
                >
                  {{ currentContact[0] }}
                </div>
                <div
                  v-else
                  class="text-panda-text-7 line-height-24px"
                  v-for="(item, index) in currentContact"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">
                  联系电话
                  <my-icon
                    type="p-icon-xiala"
                    @click="handleShowMoreContact"
                    class="fs12 cursor-pointer"
                    v-if="currentContact.length > 1"
                  ></my-icon>
                </div>
                <div
                  class="text-panda-text-7 line-height-24px"
                  v-if="!showMoreContact"
                >
                  {{ currentPhone[0] }}
                </div>
                <div
                  v-else
                  class="text-panda-text-7 line-height-24px"
                  v-for="(item, index) in currentPhone"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">电子邮件</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.email }}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">国家</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.country }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">省市地区</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.province }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">详细地址</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.address }}
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="商务信息">
          <div class="border-2 border-radius-4 mt20x pl20x pr20x ml20x mb20x" style="max-width: 701px;">
            <div class="row fs14 text-panda-text-7 pr10x mb20x">
              <div class="row pl20x mt20x">
                <div
                class="border-radius-4"
                :style="detailObj.logo? 'border: 1px dashed #c1c1c1': ''"
                >
                  <img
                    :src="detailObjImg"
                    v-if="httpUrl_72"
                    class="border-radius-4"
                    alt
                    width="100"
                    height="100"
                    style="padding: 5px;"
                  />
                  <!-- :style="detailObj.logo? 'max-height: 100px; max-width: 100px; padding: 5px;': 'max-height: 105px; max-width: 105px;'" -->
                </div>
                <div class="pl40x fw_600">
                  <div class=" line-height-24px mt20x text-panda-text-7 fs14">
                    <span class="panda-text-1">商户编号：</span>{{ detailObj.merchantCode }}
                  </div>
                  <div class="mt10x text-panda-text-7 fw_600"><span class="panda-text-1">商户名称：</span>{{ detailObj.merchantName }}</div>
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">商务等级</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.levelName }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">商户类型</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.agentLevel==0?"直营商户": detailObj.agentLevel==1?'渠道商户': '二级商户' }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">二级商户数量限制</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.childAmount }}/{{ detailObj.childMaxAmount }}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">平台费率(%)</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{ detailObj.terraceRate }}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">计算标准</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.computingStandard | filterComputingStandard}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">缴纳周期</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.paymentCycle | filterCycle}}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">会员费(CNY)</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.vipAmount | amount}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">缴纳周期</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.vipPaymentCycle | filterCycle}}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">技术服务费(CNY)</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.techniqueAmount | amount}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">缴纳周期</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.paymentCycle | filterCycle}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">结算币种</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.currency | filterCurrency}}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">Panda商务</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.commerce}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">商户有效期</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.startTime}} ~ {{detailObj.endTime}}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <!-- 合作协议文件 -->
            <div class="row pt20x">
              <div class="col-12 mb20x">
                <div class="pl20x">
                  <div class="text-panda-text-7 mb10x fw_600">
                    合作协议文件
                    <!-- <span class="panda-text-red">*</span> -->
                  </div>
                  <div class="append-handle-btn-input">
                    <div>
                      <div
                        class="text-panda-text-3 cursor-pointer mb10x"
                        v-for="(item, index) in files"
                        :key="index"
                      >
                        <span @click="handleDownload(item)">{{item.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="技术信息">
          <div class="border-2 border-radius-4 mt20x pl20x pr20x ml20x" style="max-width: 701px;">
            <div class="row fs14 text-panda-text-7 pr10x mb40x">
              <div class="row pl20x mt40x">
                <div
                class="border-radius-4"
                :style="detailObj.logo? 'border: 1px dashed #c1c1c1': ''"
                >
                  <img
                    :src="detailObjImg"
                    v-if="httpUrl_72"
                    class="border-radius-4"
                    alt
                    width="100"
                    height="100"
                    style="padding: 5px;"
                  />
                  <!-- :style="detailObj.logo? 'max-height: 100px; max-width: 100px; padding: 5px;': 'max-height: 105px; max-width: 105px;'" -->
                </div>
                <div class="pl40x fw_600">
                  <div class=" line-height-24px mt20x text-panda-text-7 fs14">
                    <span class="panda-text-1">商户编号：</span>{{ detailObj.merchantCode }}
                  </div>
                  <div class="mt10x text-panda-text-7 fw_600"><span class="panda-text-1">商户名称：</span>{{ detailObj.merchantName }}</div>
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-4 pl20x">
                <div class="panda-text-1">钱包类型</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.transferMode | filterTransferMode}}
                </div>
              </div>
              <div class="col-4">
                <div class="panda-text-1">二级商户对接模式</div>
                <div class="text-panda-text-7 line-height-24px">
                  对接Panda
                </div>
              </div>
            </div>
            <q-separator v-if="detailObj.transferMode == 1"></q-separator>
            <div class="row pt20x pb20x"  v-if="detailObj.transferMode == 1">
              <div class="col-4 pl20x">
                <div class="panda-text-1">加扣款接口URL</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.url}}
                </div>
              </div>
            </div>
            <q-separator v-if="detailObj.transferMode == 1"></q-separator>
            <div class="row pt20x pb20x" v-if="detailObj.transferMode == 1">
              <div class="col-4 pl20x">
                <div class="panda-text-1">加扣款回调URL</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.callbackUrl}}
                </div>
              </div>
            </div>
            <q-separator v-if="detailObj.transferMode == 1"></q-separator>
            <div class="row pt20x pb20x" v-if="detailObj.transferMode == 1">
              <div class="col-4 pl20x">
                <div class="panda-text-1">余额回调URL</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.balanceUrl}}
                </div>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="row pt20x pb20x">
              <div class="col-11 pl20x">
                <div class="panda-text-1">IP白名单</div>
                <div class="text-panda-text-7 line-height-24px">
                  {{detailObj.whiteIp}}
                </div>
              </div>
            </div>
          </div>  
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { api_public, api_base, api_account } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import editOrUpdateMixin from "src/pages/account/basic/mixin/index.js";
import moment from "moment";

const FILE_PREFIX =
  process.env.API_PREFIX_FILE_REAL + "/manage/merchant/file/download?fileName=";
export default {
  mixins: [commontoolmixin, editOrUpdateMixin],
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),
      activeKey: '1'
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "channelUpdate" });
  },
  created() {
    this.initMerchantDetail();
  },
  computed: {
    detailObjImg() {
      return this.detailObj.logo
        ? "data:image/jpg;base64," + this.detailObj.logo
        : this.httpUrl_72;
    },
    currentContact() {
      let arr =
        (this.detailObj.contact && this.detailObj.contact.split(",")) || [];
      return arr;
    },
    currentPhone() {
      let arr = (this.detailObj.phone && this.detailObj.phone.split(",")) || [];
      return arr;
    }
  },
  watch: {
    "detailObj.filePath"(val) {
      if (val) {
        let arr = val.split(";");
        let arr1 = [];
        if (this.detailObj.fileName) {
          arr1 = this.detailObj.fileName.split(";");
        }
        let newArr = [];
        if (arr.length > 0) {
          arr.map((item, i) => {
            newArr.push({
              name: arr1[i] || item.slice(item.indexOf("d/") + 2),
              file: item
            });
          });
        }
        this.files = newArr;
      }
    }
  },
  methods: {
    moment,
    //编辑基本资料
    handleEditBasic() {
      this.$router.push({
        name: "basic_edit"
      });
    },
    onChange(value, dateString) {
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
    },
    initUsers() {
      if (this.detailObj.contact) {
        let contacts = this.detailObj.contact.split(",");
        let phones = this.detailObj.phone.split(",");
        let newUsers = [];
        for (let i = 0; i < contacts.length; i++) {
          newUsers.push({
            contact: contacts[i],
            phone: phones[i]
          });
        }
        this.users = newUsers;
      } else {
        this.users = this.users;
      }
    },
    async initMerchantDetail() {
      let params = {
        id: this.get_user_info.merchantId
      };
      let res = await api_account.get_admin_merchant_getDetail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.detailObj = data;
        if (this.detailObj) {
          this.initUsers();
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-select-selection--single {
  height: 36px;
  line-height: 36px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 36px;
}

>>>.ant-select-selection__placeholder, .ant-select-search__field__placeholder {
  font-size: 12px;
  margin-top: -12px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 36px;
  // margin-top: 5px;
}

>>>.ant-input-number {
  width: 170px;
  height: 36px;
  font-size: 12px;
  line-height: 36px;
}

>>>#number .ant-input-number {
  width: 300px;
}

>>>#time .ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  padding: 0 11px;
}

// 复写input框
>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__control {
  min-height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 36px;
}

// form表单input样式重写
>>>.q-field__bottom--animated {
  bottom: 6px;
}

>>>.q-field__marginal {
  font-size: 14px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 12px;
}

>>>.ant-upload-list {
  display: none;
}

>>>.ant-input-disabled {
  background: #fff;
  color: #666;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 36px;
}

.append-handle-btn-input a {
  text-decoration: underline;
}
</style>
