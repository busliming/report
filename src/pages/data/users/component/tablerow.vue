<template>
  <!-- <q-tr :props="props" class="bg-panda-dark-dark text-panda-text-light panda-table"> -->
  <q-tr
    :props="props"
    class="panda-table hyuiut"
    @click.native="table_item_click(props.row)"
  >
    <q-td
      key="id"
      class="panda-table panda-table-col-checkbox"
      :style="compute_table_col_width('id')"
      :props="props"
    >
      {{ props.row._index }}
    </q-td>

    <q-td
      key="userId"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('userId')"
      :props="props"
    >
      {{ props.row.userId }}
    </q-td>

    <q-td
      key="userName"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('userName')"
      :props="props"
    >
      {{ props.row.userName }}
    </q-td>
    <q-td
      key="merchantName"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('merchantName')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.merchantName"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="betNum"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('betNum')"
      :props="props"
    >
      {{ props.row.betNum }}
    </q-td>

    <q-td
      key="betAmount"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('betAmount')"
      :props="props"
    >
    {{ props.row.betAmount }}
     </q-td>
    <q-td
      key="profit"
      class="panda-table panda-table-col-text-indent red"
      :style="compute_table_col_width('profit')"
      :props="props"
    >
      <!-- <table-cell-ellipsis
        :str_all="props.row.profit"
      ></table-cell-ellipsis> -->
      <span v-bind:class="[props.row.profit<0?'red':'']">{{ props.row.profit }}</span>
    </q-td>

    <q-td
      key="profitRate"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('profitRate')"
      :props="props"
    >
      {{ props.row.profitRate }}
    </q-td>

    <q-td
      key="activeDays"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('activeDays')"
      :props="props"
    >
      {{ props.row.activeDays }}
    </q-td>

    
    <q-td
      key="caozuo"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('caozuo')"
      :props="props"
    >

 <div class=" row justify-center q-gutter-x-sm"> 

        
      <a class="panda-a cursor-pointer" @click="selectAdmin(props.row)">   <span class="panda-icon panda-icon-cha-kan"></span></a>
      
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
import log_login_mixin from "src/pages/data/users/mixin/index.js";
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
