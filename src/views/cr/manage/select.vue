<template>
  <el-select v-model="scope.row.tkpi_val" :disabled="true"  :placeholder="$i18ns('请选择')">
    <el-option
      v-for="item in options"
      :key="item.domain_id"
      :label="item.domain_name"
      :value="item.domain_key"
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
    metric_id: String,
  },
  mounted: function () {
    var _this = this; //很重要！！
    let params = {
      metric_id: _this.metric_id,
      servicecode: "cr0075",
    };

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

