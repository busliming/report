<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-09 17:36:22
 -->
<template>
  <div style="width: 460px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">设置角色权限-{{detailObj.name}}</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup class="text-panda-dialog-close" />
        </div>
      </q-card-section>
      <q-card-section class="fs14 mt20x ml20x">
        <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit">
          <!-- <div class="mt30x row">
            <div class="text-panda-text-7 mt10x fw_600">角色名称</div>
            <div class="append-handle-btn-input row ml20x">
              <a-form-item class="w-300">
                <a-input
                  disabled
                  size="large"
                  v-decorator="[
                      'name',
                      { initialValue: detailObj.name }
                    ]"
                />
              </a-form-item>
            </div>
          </div> -->

          <div class="row" style="overflow-x: hidden; min-height: 500px;" :style="{maxHeight: maxHeight}">
            <!-- 邮箱 -->
            
            <div style="border-radius: 4px; width: 190px;" class="position-relative border-2 mr20x">
              <div class="title mt10x">资源列表</div>
              <a-tree
                v-if="treeData.length"
                v-model="checkedKeys"
                class="fs12"
                checkable
                multiple
                :tree-data="treeData"
                :replace-fields="replaceFields"
                defaultExpandAll
                @check="onCheck"
                @select="onSelect"
              >
                <TreeNode title="平台权限" key="all" />
              </a-tree>
            </div>
            <div style="border-radius: 4px; width: 190px" class=" pl20x  border-2">
              <div class="title mt10x mb5x">权限列表</div>
              <a-checkbox-group
                v-model="value"
                name="checkboxgroup"
                :options="options"
                @change="onChange"
              />
            </div>
          </div>

          <div class="row mt10x flex justify-end">
            <q-btn
              class="panda-btn-white mr30x"
              style="width:80px;height:32px; border: 1px solid #8A92A5;"
              v-close-popup
              label="取消"
            />
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handleSubmit"
              :loading="loading"
              label="保存"
            />
          </div>
        </a-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_auth } from "src/api/index.js";
import roleMixin from "src/pages/auth/role/mixin";
import md5 from "js-md5";
import authMenu from "src/config/authMenu.js";
export default {
  mixins: [roleMixin],
  props: {
    detailObj: ""
  },
  data() {
    // const options = [
    //   { label: 'Apple', value: '1' },
    //   { label: 'Pear', value: '2' },
    //   { label: 'Orange', value: '3' },
    // ];
    return {
      checkedKeys: [], //默认选中值
      checkedCopyKeys: [],
      treeSubmitKeys: [], //勾选提交选中值
      treeData: [],
      replaceFields: {
        key: "id",
        title: "name"
      },
      options: [], //权限列表
      value: [],
      isAll: true  //默认
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit" });
  },
  created() {
    console.warn(window.screen.height,document.body.clientHeight,document.documentElement.clientHeight,'document.documentElement.clientHeight')
    this.initMenuList();
    this.initMenuByRoleId();
    this.initPermissionList()
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    maxHeight(){
      return document.documentElement.clientHeight >= 937? '715px': '500px';
    }
  },
  watch: {
    treeSubmitKeys(val){
      console.log(val,'需要提交的资源列表')
      if(val.length > 0){
        // 你勾选checkbox之后和拉取数据的数组取出不同的元素！
        // let onlyKey = this.getArrDifference(val,this.checkedCopyKeys);
        let onlyKey = this.getArrDifference(val,this.checkedCopyKeys);
        console.log(onlyKey,'onlyKey')
        let menuIdList = []
        onlyKey.map(item => {
          let optionObj = this.options.find(option => option.menuId === item)
          optionObj && menuIdList.push(optionObj.id)
        })
        console.log(menuIdList,'menuList')
        console.log(this.value,'为处理之前')
        this.value = this.getArrDifference(menuIdList,this.copyValue)
        console.log(this.value,'右边权限勾选数组');
      }else{
        // this.treeSubmitKeys = [];
        this.value = [];
      }
    },
    value(val){
      // 右边权限列表勾选
      console.log(val,'权限列表');
      if(val.length === this.options.length){
        // 全选
        console.log('全选')
      }else{
        // 没有全选
        console.log('没有全选')
        // console.log(this.getArrDifference(val,this.copyValue));
        // let menuidArr = this.getArrDifference(val,this.copyValue)
        // menuidArr = menuidArr.slice(-1)
        // console.log(menuidArr,'menuidArr')
        // // 处理左边菜单栏逻辑
        // this.checkedKeys = this.getArrDifference(menuidArr,this.checkedKeys);
        // this.treeSubmitKeys = this.getArrDifference(menuidArr,this.checkedKeys)
        
      }
    }
  },
  methods: {
    ...mapActions(["clear_user_info", "clear_token"]),
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);       
      });
    },
    async initPermissionList(){
      let res = await api_auth.post_admin_permission_getAll({})
      if(res.data.code === '0000000'){
        res.data.data.map(item => (item.value = item.id,item.label = item.alias))
        this.options = res.data.data || [];
      }
    },
    async onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
      // && (selectedKeys.includes('2') || selectedKeys.includes('7') || selectedKeys.includes('10') || selectedKeys.includes('13') || selectedKeys.includes('17'))
      if(selectedKeys.length>1 ){
        selectedKeys.shift();
      }
      this.leftSelectMenuId = selectedKeys.join(',');
      let params = {
        menuIds: selectedKeys.join(',')
      }
      let res = await api_auth.post_admin_menu_getPermissionByMenuIds(params)
      if(res.data.code === '0000000'){
        res.data.data.map(item => (item.value = item.id,item.label = item.alias))
        console.log(res.data.data)
        this.options = res.data.data
        console.log(this.options,'$$$')
      }
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues);
      console.log('value = ', this.value);
      console.log(this.leftSelectMenuId,'222')
      console.log(this.getArrDifference(this.value,this.copyValue));
      
      let onlyKeys = this.getArrDifference(this.value, this.copyValue);
      console.log(onlyKeys,'onlyKeys')
      // onlyKeys.shift()
      // if(onlyKeys.length === this.options.length){
      //   console.log('右边权限已勾选,需要勾选左边资源！')
      //   console.log(this.checkedKeys,'左边菜单')
      //   this.checkedKeys = [...onlyKeys, ...this.checkedKeys];
      //   this.treeSubmitKeys = [...this.checkedKeys];
      //   console.log(this.value);
      // }else{
      //   this.value = this.copyValue
      // }
      // if(onlyKeys.length>0){
      //   console.log('不勾选',onlyKeys)
        
      // }else{
      //   console.log('勾选',onlyKeys)
      //   if(onlyKeys.length === this.options.length){
      //     console.log('右边权限已勾选,需要勾选左边资源！')
      //     this.checkedKeys = [...onlyKeys, ...this.checkedKeys];
      //     this.treeSubmitKeys = [...this.checkedKeys];
      //     console.log(this.value);
      //   }else{
      //     this.value = this.copyValue
      //   }
      // }
      // if(onlyKeys.length >1){
      //   onlyKeys.shift()
      // }
      
      
    },
    onCheck(checkedKeys, info) {
      console.log(checkedKeys,info,'onCheck')
      if(info.checkedNodes.length === 0){
        this.isAll = false;
      }else{
        this.isAll = true;
      }
      this.treeSubmitKeys = checkedKeys.length>0?[
        ...info.halfCheckedKeys.splice(0),
        ...checkedKeys
      ].filter(item => item != 0): [];
      console.log(this.treeSubmitKeys,'treeSubmitKeys')
    },
    // 菜单所有
    async initMenuList() {
      let res = await api_auth.post_admin_menu_getAll({});
      let { code, data } = res.data;
      if (code == "0000000") {
        this.treeData = [
          { name: "菜单权限", id: 0, path: "all", children: data }
        ];
        // this.treeData = data;
      }
    },
    // 角色所拥有菜单
    async initMenuByRoleId() {
      let res = await api_auth.post_admin_menu_getMenuByRoleId({
        roleId: this.detailObj.id
      });
      let { code, data } = res.data;
      if (code == "0000000") {
        this.checkedKeys = data.menuIds === ""? []: data.menuIds.split(",").map(item => item * 1);
        this.checkedCopyKeys = [...this.checkedKeys];
        let arr = [];
        for (let i = 0; i < this.checkedKeys.length; i++) {
          if (this.checkedKeys[i] == 2 ||this.checkedKeys[i] == 7 ||this.checkedKeys[i] == 10 ||this.checkedKeys[i] == 13 ||this.checkedKeys[i] == 17) 
          {
            this.checkedKeys.splice(i, 1);
          }
        }
        this.value = data.permissionIds === ''? []: data.permissionIds.split(",").map(item => item * 1);
        this.copyValue = [...this.value] //左边资源列表勾选时右边权限列表对应的去重用到
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      console.warn(this.treeSubmitKeys);
      console.warn(this.checkedKeys);
      // console.warn(this.checkedCopyKeys);
      let params = {
        roleId: this.detailObj.id,
        menuId: !this.isAll? '': this.treeSubmitKeys.length > 0? this.treeSubmitKeys.join(","): this.checkedCopyKeys.join(","),    
        // menuId: this.treeSubmitKeys.length > 0? this.treeSubmitKeys.join(","): this.checkedCopyKeys.join(","),
        permissionId: this.value.length > 0?this.value.join(','): ''
      };
      api_auth.post_admin_role_addRoleMenu(params).then(res => {
        this.loading = false;
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$emit("closeSetDialog");
          if (this.detailObj.isAdmin === 1) {
            if (this.get_user_info.merchantCode == this.detailObj.merchantCode) {
              this.$message.success("修改自身角色权限成功！请重新登录验证！");
              setTimeout(() => {
                this.$q.sessionStorage.remove("userInfo");
                this.$q.sessionStorage.remove("token");
                this.clear_user_info();
                this.clear_token();
                this.$router.push({
                  name: "login"
                });
              }, 3000);
            } else {
              this.$message.success("设置角色权限成功！");
            }
          } else {
            this.$message.success("设置角色权限成功！");
          }
        } else {
          this.$message.error(msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.title {
  text-align: center;
  color: #333;
  // position: absolute;
  top: 25px;
  // left: 50%;
  // transform: translateX(-50%);
  font-size: 14px;
}

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

>>>.ant-input-suffix {
  right: 25px;
}

>>>.ant-input-disabled {
  background-color: #fff;
  color: #3c4551;
}

>>>.ant-checkbox-group-item{
  display block
}
</style>
