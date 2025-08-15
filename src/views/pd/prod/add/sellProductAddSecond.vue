<template>
  <div>
<!--    <el-row >-->
<!--      <div class="divider"><b class="text-edit">产品属性</b></div>-->
<!--    </el-row>-->
<!--&lt;!&ndash;    <el-divider></el-divider>&ndash;&gt;-->
<!--    <to-json-->
<!--      toUrl="/views/pd/prod/prodBaseAttribute/prodBaseAttribute_modify.json"-->
<!--      :params="pageParams">-->
<!--    </to-json>-->
<!--    <el-row>-->
<!--      <div class="divider"><b class="text-edit">产品参数</b></div>-->
<!--    </el-row>-->
<!--    <el-divider></el-divider>-->
    <el-tabs type="card" @tab-click="tabClick" v-model="tabName">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :label="item.apply_name"
        :name="item.apply_type"
        :key="index">
        <sellProductRela
          v-if="tabName === item.apply_type"
          :pageList="item.pageList"
          :pageParams="pageParams"
          :applyType="item.apply_type"
          @callback="sendMessage">
        </sellProductRela>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import sellProductRela from "@/views/pd/prod/add/sellProductRela.vue";
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  components: {
    sellProductRela
  },
  name: "sellProductAddSecond",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        tranType: "",
        sale_prod_cd: "",
        sale_prod_name: "",
        prod_type: "",
        prod_version: "",
        template_version: "",
        busi_seq: "",
        template_id: "",
        cust_class:"",
        isLastTab: false,
        cust_class_list: ""
      },
      applyTypeList: [],
      tabList: [],
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
    this.pageParams.cust_class = this.cParentParams.cust_class;
    this.pageParams.cust_class_list = this.cParentParams.cust_class_list;
    console.log("zhelidhgkd",this.pageParams);
    this.getTabs();
  },
  methods: {
    /**
     * 表单提交
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
              if (item1.apply_type === item.dictId) {
                item1.apply_type = item.dictName
              }
            });
          });
          //默认展示首位选项卡
          this.tabName = this.tabList[0].apply_type;
          //判断当前页面是否只有单个申请类型
          this.isSingleTab();
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 获取下拉字典
     */
    getDict() {
      let request_map = {}
      request_map["dictType"] = "PD_E_APPLY_TYPE";
      request_map["dictKey"] = "PD_E_APPLY_TYPE";
      this.$http.invokeAPI("/SUMP/rest/dict", "post", request_map).then(response => {
        if (response.code === "200") {
          this.applyTypeList = response.data;
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
    },
    /**
     * 返回可售产品相关信息
     */
    sendMessage(pageParams) {
      this.pageParams.sale_prod_cd = pageParams.sale_prod_cd;
      this.pageParams.sale_prod_name = pageParams.sale_prod_name;
      this.pageParams.prod_version = pageParams.prod_version;
      this.pageParams.busi_seq = pageParams.busi_seq;
      this.pageParams.template_id = pageParams.template_id;
      this.pageParams.template_id = pageParams.template_id;
    },
    /**
     * 选项卡点击
     */
    tabClick(item) {
      console.log("item", item);
      let lastTabType = this.tabList[this.tabList.length - 1].apply_type;
      if (lastTabType === item._props.name) {
        this.pageParams.isLastTab = true;
      } else {
        this.pageParams.isLastTab = false;
      }
      console.log("zhelidhgkd2",this.pageParams);
    },
    /**
     * 判断当前tab页是否既为首页也为末尾页
     */
    isSingleTab() {
      console.log("this.tabList.length", this.tabList.length);
      if (this.tabList.length === 1) {
        this.pageParams.isLastTab = true;
      }
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

.text-edit {
  padding: 0;
  margin: 0;
  color: #697b8c;
  line-height: 36px;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}

.divider {
  border: 1px solid #DCDFE6;
  padding: 10px;
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
</style>
