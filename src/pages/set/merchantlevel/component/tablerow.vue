<template>
<!-- <q-tr :props="props" class="bg-panda-dark-dark text-panda-text-light panda-table"> -->
  <q-tr
    :props="props"
    class="panda-table hyuiut"
    @click.native="table_item_click(props.row)"
  >
    <q-td
      key="dengji"
      class="panda-table panda-table-col-checkbox"
      :style="compute_table_col_width('dengji')"
      :props="props"
    >
      {{ props.row.dengji }}
    </q-td>

    <q-td
      key="jisuanbiaozhun"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('jisuanbiaozhun')"
      :props="props"
    >
      {{ props.row.jisuanbiaozhun }}
    </q-td>

    
    <q-td
      key="jinefanwei"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('jinefanwei')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.jinefanwei"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="pingtaifeil"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('pingtaifeil')"
      :props="props"
    >
      {{ props.row.pingtaifeil }}
    </q-td>

    <q-td
      key="huiyuanfei"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('huiyuanfei')"
      :props="props"
    >
      {{ props.row.huiyuanfei }}
    </q-td>

    <q-td
      key="jishufuwufei"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('jishufuwufei')"
      :props="props"
    >
      {{ props.row.jishufuwufei }}
    </q-td>

    <q-td
      key="zuihougengxinshijian"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zuihougengxinshijian')"
      :props="props"
    >
      {{ props.row.zuihougengxinshijian }}
    </q-td>
<q-td
      key="zuihougengxinren"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zuihougengxinren')"
      :props="props"
    >
      {{ props.row.zuihougengxinren }}
    </q-td>
   
    <q-td
      key="caozuo"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('caozuo')"
      :props="props"
    >

 <div class=" row justify-center q-gutter-x-sm"> 

         <a class="panda-a cursor-pointer q-m" @click="selectAdmin(props.row)">   <span class="panda-icon panda-icon-fu-zhi-key"></span></a>
      
 </div>
   

    </q-td>
  </q-tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mixins from "src/mixins/index.js";
import tableColWidthmixin from "src/mixins/style/tableColWidth.js";
import alertmessagemixin from "src/mixins/module/alertmessagemixin.js";
import dialogmixin from "src/mixins/module/dialogmixin.js";
import log_login_mixin from "src/pages/set/platformrate/mixin/index.js";
import tableCellEllipsis from "src/components/table/tableCellEllipsis.vue";
import { dom } from "quasar";
const { height, width } = dom;
export default {
  mixins: [tableColWidthmixin, alertmessagemixin, dialogmixin, log_login_mixin],
  components: {
    tableCellEllipsis
  },
  data() {
    return {
      affected_match_id_arr: [],
      affected_match_sportId: "",
      affected_type: 1
    };
  },
  props: {
    props: "",
    is_top_slot: "",
    show_right_detail_obj: "",
    tablecolumns: ""
  },
  methods: {
    table_item_click(item) {
      this.$emit("item_click", item);
    },

    show_detail(item) {
      this.$emit("show_detail", item);
    },

    compute_table_row_bg(item) {
      let str = "";
      str = item.is_child_showing ? "bg-panda-dark-dark" : "bg-panda-base-dark";
      if (item.is_selected) {
        str = "bg-panda-dark-light";
      }
      if (
        this.show_right_detail_obj &&
        item.id == this.show_right_detail_obj.id
      ) {
        str = "bg-panda-dark-light";
      }
      return str;
    }
  },
  filters: {
    filterLoginType(val) {
      let arr = ["登录", "登出"];
      return arr[val - 1];
    }
  }
};
</script>
  