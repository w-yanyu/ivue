<template>
  <div>
    <div class="todo-top">
      <el-tabs v-model="activeName" type="card" ref="iouTabs">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.tree_menu_name"
          :name="'tab'+item.tree_seq"
          v-if="item.tabStatus"
        >
          <pte-resolver
            v-if="activeName === ('tab'+item.tree_seq)"
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="c_$params"
            :to-request="item.toRequest"
            @update="update"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "InterLendIOU",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        lend_no: "",//放款序号
        apply_no: "",//申请号
        pageType: ""
      },
      activeName: "first",
      is_NO: "0",
      tempList: [],
      tabList: [], // tab切换列表
      submitLoading: false, // 防止多次提交
      lendDetail: {}, // 放款明细
    };
  },
  created() {
    this.c_$params.lend_no = this.cParentParams.lend_no;
    this.c_$params.apply_no = this.cParentParams.apply_no;
    this.c_$params.pageType = this.cParentParams.pageType;
    this.getTabInfo(this.cParentParams.pageType); // 获取tab信息
  },
  methods: {
    /**
     * 获取tab信息
     */
    getTabInfo(pageType) {
      let that=this;
      let params = {
        appId: "icmsOnl",
        frame_cd: "internationLoan",
        servicecode: "bpm0048",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            let reqList = res.data;
            let showList = [];
            this.getLoanDetails(this.cParentParams.apply_no,(data)=>{
                this.c_$params.lend_no = data.lend_no;
                for(let i=0;i<reqList.length;i++){
                  let node = new Object;
                  node.tree_seq = reqList[i].tree_seq;
                  node.tree_menu_name = reqList[i].tree_menu_name;
                  if (reqList[i].tree_menu_name === "涉农贷款信息" && data.farm_flag === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else if (reqList[i].tree_menu_name === "涉融资平台信息" && data.is_pbc === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else if (reqList[i].tree_menu_name === "涉房地产贷款信息" && data.realty_flag === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else if (reqList[i].tree_menu_name === "涉项目贷款信息" && data.proj_loan_flag === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else if (reqList[i].tree_menu_name === "发票信息" && that.cParentParams.invoice_flag === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else if (reqList[i].tree_menu_name === "贸易合同信息" && that.cParentParams.trade_flag === this.is_NO) {
                    node.tabStatus = false;
                  }
                  else {
                    node.tabStatus = true;
                  }
                  let toReq = new Object;
                  toReq.url = reqList[i].vue_path;
                  node.toRequest = toReq;
                  showList.push(node);
                }
                this.tabList = showList;
                this.activeName = "tab" + this.tabList[0].tree_seq;
                console.log("菜单列表",this.tabList);
                this.checkModifyOrInfo(pageType);//检查tab信息并且替换相关信息
              }
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取放款明细信息
     */
    getLoanDetails(apply_no,callback) {
      let params = {
        apply_no: apply_no,
        servicecode: "ar0575",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            callback(res.data)
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 判断页面类型（修改，新增，详情）
     * @param pageType
     */
    checkModifyOrInfo(pageType) {
      if (pageType === "info") {
        for (let i = 0; i < this.tabList.length; i++) {
          //借据详情页替换
          if (this.tabList[i].toRequest.url === "@InterLendIOUDetails") {
            this.tabList[i].toRequest.url = "@InterLendIOUDetails_info";
          }
          //发票详情页替换
          if (this.tabList[i].toRequest.url === "/views/icms/internationalBusiness/ArbInvoiceInfo/arb_invoice_info_manage.json") {
            this.tabList[i].toRequest.url = "/views/icms/internationalBusiness/ArbInvoiceInfo/arb_invoice_info_manage2.json";
          }
        }
      }
    },
    //更新tab涉及信息的状态，子组件触发
    update(data) {
      if (data == "refresh"){
        console.log(this.$parent.$parent,9999)
        // this.$parent.refresh()
        this.$dataBus.doCallBack(this, "refresh");
      }
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].tree_menu_name === "涉农贷款信息" && data.name === "farm_flag") {
          this.tabList[i].tabStatus = data.value ;
        }
        //房地产
        else if (this.tabList[i].tree_menu_name === "涉房地产贷款信息" && data.name === "realty_flag") {
          this.tabList[i].tabStatus = data.value ;
        }
        //融资
        else if (this.tabList[i].tree_menu_name === "涉融资平台信息" && data.name === "is_pbc") {
          this.tabList[i].tabStatus = data.value ;
        }
        //项目贷款
        else if (this.tabList[i].tree_menu_name === "涉项目贷款信息" && data.name === "proj_loan_flag") {
          this.tabList[i].tabStatus = data.value ;
        }
      }
    }
  }
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
