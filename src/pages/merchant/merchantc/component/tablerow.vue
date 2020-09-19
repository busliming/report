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
      key="shanghubianhao"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shanghubianhao')"
      :props="props"
    >
      {{ props.row.shanghubianhao }}
    </q-td>

    <q-td
      key="shanghumingcheng"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shanghumingcheng')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.shanghumingcheng"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="shanghudengji"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shanghudengji')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.shanghudengji"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="Email"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('Email')"
      :props="props"
    >
      {{ props.row.Email }}
    </q-td>

    <q-td
      key="shangwulianxiren"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shangwulianxiren')"
      :props="props"
    >
      {{ props.row.shangwulianxiren }}
    </q-td>

    <q-td
      key="lianxidianhua"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('lianxidianhua')"
      :props="props"
    >
      {{ props.row.lianxidianhua }}
    </q-td>

    <q-td
      key="shanghuguanliyuan"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shanghuguanliyuan')"
      :props="props"
    >
      {{ props.row.shanghuguanliyuan }}
    </q-td>

    <q-td
      key="ruzhushijian"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('ruzhushijian')"
      :props="props"
    >
      {{ props.row.ruzhushijian }}
    </q-td>

    <q-td
      key="shanghuzhuangtai"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('shanghuzhuangtai')"
      :props="props"
    >
                 <q-btn
                    class="panda-btn-primary-dense fff"
                    style="width:52px;height:30px; "
                    label="启用"

                  />
    </q-td>
    <q-td
      key="caozuo"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('caozuo')"
      :props="props"
    >

 <div class=" row justify-center q-gutter-x-sm">

         <a class="panda-a cursor-pointer q-m" @click="to_edit_item(props.row)">    编辑</a>
      <a class="panda-a cursor-pointer" @click="to_show_detail(props.row)">   <span class="panda-icon panda-icon-cha-kan"></span></a>
      <a class="panda-a cursor-pointer" @click="to_set_admin(props.row)">   <span class="panda-icon panda-icon-shezhi-guanliyuan"></span></a>
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
import log_login_mixin from "src/pages/merchant/merchantc/mixin/index.js";
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

    to_show_detail(item) {
      this.$emit("show_detail", item);
    },
    to_edit_item(item){
      this.$emit('edit_item',item)
    },
    to_set_admin(item){
      this.$emit('to_set_admin',item)
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
