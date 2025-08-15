<template>
  <div>
    <div class="todo-top">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="240px"
        class="custom-common--form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$i18ns('产品号')" prop="appl_id" class="upload-item">
              <el-input
                v-model="this.cParentParams.prod_code"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('币种')" prop="ccy_code_num" class="upload-item">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row class="custom-common--footer">
          <el-button type="primary" size="small" @click="topSubmit" :disabled="submitLoading">提交</el-button>
        </el-row> -->
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.tree_menu_name"
          :name="'tab' + item.tree_seq"
        >
          <pte-resolver
            v-if="activeName === 'tab' + item.tree_seq"
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="c_$params"
            :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import { List } from "gojs";
export default {
  name: "WaitToDoDeal",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      ln_prodcd_cd: "",
      ruleForm: {
        appl_id: "",
        route_id: "",
        user_id: "",
      },
      roadList: [], // 可选节点列表
      urinfoList: [], // 可选节点列表
      c_$meta: {},
      c_$scope: {},
      c_$params: {},
      activeName: "first",
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
      showList: [],
    };
  },
  created() {
    this.getTabInfo(); // 获取tab信息
  },
  methods: {
    /**
     * 获取头部信息
     */
    getHeadInfo() {
      let that = this;
    },
    /**
     * 获取可选节点列表
     */
    mounted() {
      this.c_$params.applid = this.cParentParams.appl_id
        ? this.cParentParams.appl_id
        : this.$dataBus.getCurrentcParams(this).data_appl_id; // appid参数传递
      this.c_$params.cust_id = this.cParentParams.cust_id
        ? this.cParentParams.cust_id
        : this.$dataBus.getCurrentcParams(this).data_cust_id; //cust_id参数传递
    },

    roadChange(val) {
      let ismanu = "N";
      this.roadList.forEach((item) => {
        if (item.route_id === val) {
          ismanu = item.next_is_manu;
        }
      });
      if (ismanu === "Y") {
        this.routidSelect = true;
        // if (this.urinfoList.length === 0) {

        //}
      } else {
        this.routidSelect = false;
      }
    },
    /**
     * 获取tab信息
     */
    getTabInfo() {
      let that=this;
      let params = {
        prod_code: this.cParentParams.prod_code,
        servicecode: "ln3280",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log(res.data, "======================");
            this.c_$params = res.data;
            
            this.pushNode(
              "base_comp",
              that.$i18ns('基础部件'),
              "views/product/productModel/baseProduct/comps/base_component_attr.json"
            );
            this.pushNode(
              "loan_comp",
              that.$i18ns('放款部件'),
              "views/product/productModel/baseProduct/comps/lendg_component_attr.json"
            );
            this.pushNode(
              "prcg_comp",
              that.$i18ns('定价部件'),
              "views/product/productModel/baseProduct/comps/prcg_component_attr.json"
            );
            this.pushNode(
              "inst_comp",
              that.$i18ns('计息部件'),
              "views/product/productModel/baseProduct/comps/inst_cal_component_attr.json"
            );
            this.pushNode(
              "rpymt_comp",
              that.$i18ns('还款部件'),
              "views/product/productModel/baseProduct/comps/rpymt_component_attr.json"
            );
            this.pushNode(
              "matu_comp",
              that.$i18ns('到期部件'),
              "views/product/productModel/baseProduct/comps/matu_component_attr.json"
            );
            this.pushNode(
              "acctg_comp",
              that.$i18ns('核算部件'),
              "views/product/productModel/baseProduct/comps/busi_acctg_component_attr.json"
            );
            // 贴息标志
            if(res.data.subsd_int_flg === "1"){
              this.pushNode(
              "subsd_int_comp",
              that.$i18ns('贴息部件'),
              "views/product/productModel/baseProduct/comps/subsd_int_component_attr.json"
            );
            }
            // 营销标志
            if(res.data.mktg_flg === "1"){
              this.pushNode(
              "mktg_comp",
              that.$i18ns('营销部件'),
              "views/product/productModel/baseProduct/comps/mktg_component_attr.json"
            );
            }
            // 营改增标志
            if(res.data.prc_tax_seprtn_flg === "1"){
              this.pushNode(
              "vat_comp",
              that.$i18ns('营改增部件'),
              "views/product/productModel/baseProduct/comps/vat_component_attr.json"
            );
            }
            // 联合贷标志
            if(res.data.union_loan_flg === "1"){
              this.pushNode(
              "union_comp",
              that.$i18ns('联合贷部件'),
              "views/product/productModel/baseProduct/comps/union_component_attr.json"
            );
            }
            // 罚金标志
            if(res.data.fine_flg === "1"){
              this.pushNode(
              "fine_comp",
              that.$i18ns('罚金部件'),
              "views/product/productModel/baseProduct/comps/fine_component_attr.json"
            );
            }
            // 费用标志
            if(res.data.fee_flg === "1"){
              this.pushNode(
              "chrg_comp",
              that.$i18ns('费用部件'),
              "views/product/productModel/baseProduct/comps/chrg_component_attr.json"
            );
            }
            // 通知标志
            if(res.data.ntc_flg === "1"){
              this.pushNode(
              "ntc_comp",
              that.$i18ns('通知部件'),
              "views/product/productModel/baseProduct/comps/ntc_component_attr.json"
            );
            }
            // 代理标志
            if(res.data.agnc_flg === "1"){
              this.pushNode(
              "agnc_comp",
              that.$i18ns('代理部件'),
              "views/product/productModel/baseProduct/comps/agnc_component_attr.json"
            );
            }
            // 额度标志
            if(res.data.use_lmt_flg === "1"){
              this.pushNode(
              "lmt_comp",
              that.$i18ns('额度部件'),
              "views/product/productModel/baseProduct/comps/lmt_component_attr.json"
            );
            }
            // 融通标志
            if(res.data.fincg_flg === "1"){
              this.pushNode(
              "asset_asmt_comp",
              that.$i18ns('融通部件'),
              "views/product/productModel/baseProduct/comps/asset_asmt_component_attr.json"
            );
            }
            // 代偿标志
            if(res.data.asmpn_flg === "1"){
              this.pushNode(
              "asmpn_comp",
              that.$i18ns('代偿部件'),
              "views/product/productModel/baseProduct/comps/asmpn_component_attr.json"
            );
            }

            this.tabList = this.showList;
            this.activeName = "tab" + this.tabList[0].tree_seq;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    pushNode(tree_seq, tree_menu_name, url) {
      let node = new Object();
      node.tree_seq = tree_seq;
      node.tree_menu_name = tree_menu_name;
      let toReq = new Object();
      toReq.url = url;
      node.toRequest = toReq;
      this.showList.push(node);
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      const tags = this.$store.state.pte_tagsNav.tagNavList.filter(
        (item) => !this.routeEqual(this.$route, item)
      );
      this.$store.commit("SETTAGNAVLIST", tags);
      this.$store.state.pte_tagsNav.tagNavList = tags;
      this.$router.push("/dashboard");
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    },
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
</style>
