<template>
  <div class="table_container">
    <div id="print">
      <h1>{{$i18ns('尽职调查报告')}}</h1>
      <div v-for="(item, index) in tableDataList" :key="index">
        <to-json
          :toUrl="item.report_path"
          :params="getPageParams('due_item_no',item.node_cd)"
        ></to-json>
      </div>
      <!-- <to-json :toUrl="query_url" :params="getPageParams('due_item_no','custBTA6')"></to-json> -->
      <div class="noPrint">
        <el-button size="mini" type="primary" @click="handlePrintConfig()">{{$i18ns('下载')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "DueTemplateReportView",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      group_num: "", //分组号
      node_cd: "", //节点代码
      orgBackground: "",
      tableDataList: [], //各表数据以及对应字段信息
      sale_prod_cd: "", // 可售产品编号
      apply_type: "", // 申请类型编号
      query_url: "@ArbConcSuggReport", // 测试页面路径
      pageParams: {
        apply_no: "",
        cust_no: "",
        due_item_no: "",
      },
    };
  },
  created() {
    this.group_num = this.cParentParams.group_num;
    this.node_cd = this.cParentParams.node_cd;
    this.getTableData();
  },
  methods: {
    /**
     * 获取各个列表数据
     */
    getTableData() {
      let that = this;
      let params = {
        servicecode: "pd0355",
        group_num: that.group_num,
        node_cd: that.node_cd,
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
            console.log("列表", that.tableDataList);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handlePrintConfig() {
      this.$dialog.open({
        that: this,
        title: "水印设置",
        width: "36%",
        toRequest: {
          url: "@printConfig",
          method: "get",
        },
      });
    },
    /**
     * 返回对应对象
     * @param due_item_no_temp
     */
    getPageParams(objName, due_item_no_temp) {
      console.log("调查项编号", due_item_no_temp);
      let obj = {
        apply_no: this.pageParams.apply_no,
        cust_no: this.pageParams.cust_no,
      };
      obj[objName] = due_item_no_temp;
      return obj;
    },
  },
};
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

.box {
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  border: 0px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

img {
  width: 100%;
  height: 100%;
}

.field-label {
  //border-radius: 4px;
  //border: 1px solid #FFE4B5;
  //background: #FDF5E6;
  text-align: left;
  width: 100%;
  height: 25px;
  font-weight: 400;
  //vertical-align: middle;
  border-top: solid 1px #d9e5f3;
  border-right: solid 1px #d9e5f3;
}

.field-value {
  //border-radius: 4px;
  //border: 1px solid #FFE4B5;
  //background: #FFFAFA;
  width: 100%;
  height: 25px;
  text-align: left;
  overflow: hidden; //超出的文本隐藏
  font-weight: 400;
  //vertical-align: middle;
  padding-left: 10px;
  border-top: solid 1px #d9e5f3;
  border-right: solid 1px #d9e5f3;
}

.table_container {
  position: relative;
  width: 70%;
  height: 100%;
  margin: 0 auto;
}

@page {
  size: auto A4 landscape;
  margin: 1.4cm 0;
}
</style>
