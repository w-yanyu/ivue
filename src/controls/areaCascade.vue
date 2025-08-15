<template>
  <div>
    <el-input v-model="value" :disabled="config.disabled"></el-input>
    <span class="el-input__suffix" @click="dialogVisible=true">
        <span class="el-input__suffix-inner">
          <i class="el-input__icon el-icon-zoom-in border"></i>
        </span>
    </span>
    <el-dialog
      :modal-append-to-body="false"
      :close-on-click-modal="true"
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :append-to-body="true"
    >
      <el-cascader-panel
        class="sunline-cascader-panel"
        ref="areaCascade"
        :size="size"
        :props="setProps"
        :placeholder="$i18ns(config.placeholder || '')"
        :name="name"
        :options="options"
        :show-all-levels="config.showAllLevels"
        v-model="value"
        @change="handleChange"
      >
      </el-cascader-panel>
    </el-dialog>
  </div>
</template>
<script>
import * as __ from "lodash";
import MyAxios from "pte-ui/utils/MyAxios";


export default {
  name: "areaCascade",
  components: {},
  props: {
    size: {
      type: String,
      default: "small"
    }, // 控件大小
    config: Object, // 控件的相关配置
    name: String,
    value: [Object, String, Array, Number]
  },
  data() {
    return {
      dialogVisible: false,
      dialogWidth: "45%",
      dialogTitle: this.$i18ns(this.config.title ) || this.$i18ns("请选择"),
      query: this.config.queryField || "query",
      pageCodeStr: "name",
      parentCodeStr: "parent_code",
      setProps: {
        multiple: false,
        lazy: true,
        lazyLoad: this.syncLoadOptions,
        value: "code",
        label: "name"
      },
      options: [],
    };
  },
  watch: {
    value(newVal, oldVal) {
      //将选择的城市名赋值给输入框
      this.$emit("input", this.value);
    }
  },
  created() {
    //初始化省级数据
    this.getOptions("0");
  },
  methods: {
    handleChange(val) {
      //关闭弹框
      this.dialogVisible = false;
      //获取中文名称
      this.value = this.$refs["areaCascade"].getCheckedNodes()[0].pathLabels.join(">");
      this.$emit("selecChange", val);
    },
    getOptions(code,resolve) {
      if (code == null){
        return false;
      }
      let params = {
        parent_code: code,
        servicecode: "ct2200",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (resolve) {
            let data = this.formatData(res.data);
            resolve(data);
          } else {
            this.options = this.arrayTransTree(res.data);
          }
        })
        .catch(err => {
          this.options = [];
          //不处理
        });
    },
    syncLoadOptions(node, resolve) {
      let {level, value} = node;
      this.getOptions(value, resolve);
    },
    formatData(list) {
      // 判断是否有子节点
      let data = [];
      let node = {};
      list.forEach(item => {
        node = item;
        node.label = item.name;
        node.value = item.code;
        if (item.isbottom == "Y") {
          node.leaf = true;
        }
        data.push(node);
      });
      return data;
    },
    arrayTransTree(list) {
      let cloneData = JSON.parse(JSON.stringify(list));
      if (!Array.isArray(list) || list.length <= 0) {
        return [];
      }
      let tree = cloneData.filter(parent => {
        var branchArr = cloneData.filter(child => {
          return parent[this.pageCodeStr] === child[this.parentCodeStr];
        });
        // parent.children = [];
        if (branchArr.length > 0) {
          parent.children = branchArr;
        }
        return parent[this.parentCodeStr] === "0";
      });
      return tree;
    }
  }
};
</script>
<style lang="less" >

.sunline-cascader-panel {
  /deep/ .el-cascader-menu {
    .el-cascader-menu__wrap {
      height: 100% !important;
      min-height: 100px;
      overflow: auto !important;
      max-height: 500px;
    }
  }
  .el-cascader-menu__list {
    position: relative;
    min-height: 100%;
    margin: 0px 2px 2px 2px !important;
    padding: 6px 0;
    list-style: none;
    box-sizing: border-box;
  }
}
</style>
