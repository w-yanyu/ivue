<template>
  <el-select v-model="scope.row.level_rule_rank" :placeholder="$i18ns('请选择')">
    <el-option
      v-for="item in options"
      :key="item.level_rule_rank"
      :label="item.level_name"
      :value="item.level_rule_rank"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  data() {
    return {
      options: [],
    };
  },
  props: {
    scope: Object,
    temp_id: String,
    adj_id: String,
  },
  mounted: function () {
    var _this = this; //很重要！！
    let params = {
      temp_id: _this.temp_id,
      adj_id: _this.adj_id,
      servicecode: "cr0041",
    };
    console.log(params);
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          _this.options = res.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {},
};
</script>

