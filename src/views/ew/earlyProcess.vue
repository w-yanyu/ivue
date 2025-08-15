<template>
  <div>
    <to-json
      :toUrl="params.url_query"
      :params="this.params"
    ></to-json>
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item collapse-item-bottom" name="bottom">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tree_menu_name"
              :name="'tab' + item.tree_seq">
              <pte-resolver v-if="activeName === ('tab' + item.tree_seq)" :c-parent-meta="c_$meta"
                :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"></pte-resolver>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "InOutWareResult",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      activeNames: ["bottom"],//折叠面板
      params: {
        url_query: '',
        case_id:''
      },
      tabList: [], // tab切换列表
      activeName: "first",
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        cust_no: "",
        case_id: "",
      },
    };
  },
  created() {
    console.log("进来了"+this.cParentParams.rule_id,)
    this.params.url_query = this.cParentParams.url_query;
    this.params.case_id = this.cParentParams.case_id;
    this.c_$params.cust_no = this.cParentParams.cust_id; // 参数传递
    this.c_$params.case_id = this.cParentParams.case_id; // 参数传递
    this.getTabInfo(); // 获取tab信息
  },
  mounted() {
    this.isExpanded = true;
  },
  methods: {
      /**
       * 获取tab信息
       */
      getTabInfo() {
        console.log("getTabInfo", "=========getTabInfo");
        let params = {
          rule_id: this.cParentParams.rule_id,
          servicecode: "ew3191"
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then((res) => {
            if (res && res.code === "200") {
              console.log("res", res.data);
              let reqList = res.data;
              let showList = [];
              for (let i = 0; i < reqList.length; i++) {
                let node = new Object();
                node.tree_seq = i;
                node.tree_menu_name = reqList[i].template_name;
                let toReq = new Object();
                toReq.url = reqList[i].vue_path;
                node.toRequest = toReq;
                showList.push(node);
                 console.log("showList", showList);
              }
              this.tabList = showList;
              console.log("this.tabList", this.tabList);
              this.activeName = "tab" + this.tabList[0].tree_seq;
              
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },

  },
};
</script>

<style lang="less" scoped>
.el-form .custom-common--submit {
  padding: 0;
  .submit-item--btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
