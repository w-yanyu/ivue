<template>
  <el-tabs type="card" @tab-click="" v-model="tabName">
    <el-tab-pane
      v-for="(item,index) in tabList"
      :label="item.apply_name"
      :name="item.apply_type"
      :key="index">
      <sellProductRela
        v-if="tabName === item.apply_type"
        :pageList="item.pageList"
        :pageParams="pageParams"
        :applyType="item.apply_type">

      </sellProductRela>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import sellProductRela from "@/views/pd/prod/detail/sellProductRelaDetail.vue";

export default {
  components:{
    sellProductRela
  },
  name: "sellProductAddSecondDetail",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams:{
        tranType: "",
        sale_prod_cd: "",
        sale_prod_name: "",
        prod_type: "",
        prod_version: "",
        template_version: "",
        busi_seq: "",
        cust_class:"",
        template_id: "",
        pageTranType: "",
        cust_class_list: ""
      },
      applyTypeList:[],
      tabList:[],
      tabName: "",
    }
  },
  created() {
    this.pageParams.template_id = this.cParentParams.template_id;
    this.pageParams.tranType = this.cParentParams.tranType;
    this.pageParams.sale_prod_cd = this.cParentParams.sale_prod_cd;
    this.pageParams.sale_prod_name = this.cParentParams.sale_prod_name;
    this.pageParams.prod_type = this.cParentParams.prod_type;
    this.pageParams.prod_version = this.cParentParams.prod_version;
    this.pageParams.template_version = this.cParentParams.template_version;
    this.pageParams.busi_seq = this.cParentParams.busi_seq;
    this.pageParams.pageTranType = this.cParentParams.pageTranType;
    this.pageParams.cust_class = this.cParentParams.cust_class;
    this.pageParams.cust_class_list = this.cParentParams.cust_class_list;
    this.getTabs();
  },
  methods: {
    /**
     * 获取tab页
     */
    getTabs() {
      let params = {
        servicecode: "pd0136",
        template_id: this.pageParams.template_id,
        prod_version: this.pageParams.template_version
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tabList = res.data;
          this.tabList.forEach((item1, index1) => {
            this.applyTypeList.forEach((item, index) => {
                if (item1.apply_type === item.dictId){
                  item1.apply_type = item.dictName
                }
            });
          });
          //默认展示首位选项卡
          this.tabName = this.tabList[0].apply_type;
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>


<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
