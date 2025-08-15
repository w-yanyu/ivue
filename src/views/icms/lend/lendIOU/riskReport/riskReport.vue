<template>
  <div class="table_container">
        <div id="print">
            <h1>风控报告</h1>
            <div  class="table_center margin-t-12">
               <table border="1" style="width: 100%;">
                  <tr>
                    <td colspan="6" style="width:100%;text-align:center;"  class="table_header">{{ $i18ns("评分") }}</td>
                  </tr>
               </table>
                <table border="1" class="table_report" v-for="(item, index) in tableDataList.scoreCardList" :key="index">
                  <tr>
                    <td>{{ $i18ns("评分名称") }}</td>
                    <td colspan="2">{{ item.score_card_name }}</td>
                    <td>{{ $i18ns("总分") }}</td>
                    <td colspan="2">{{ item.total }}</td>
                  </tr>
                  <div class="div-table"  v-for="(ele, e) in item.list" :key="e">
                      <tr>
                        <th rowspan="2">{{$i18ns(ele.score_model_name)}}</th>
                        <td colspan="3">{{$i18ns('评分')}}</td>
                        <td colspan="3">{{$i18ns('权重')}}</td>
                      </tr>
                      <tr>
                        <td colspan="3">{{ ele.score_points }}</td>
                        <td colspan="3">{{ ele.score_attr_percent }}</td>
                      </tr>
                  </div>
                    
                </table>
            </div>
            <div  class="table_center margin-t-12">

                <table border="1" class="table_report">
                  <tr>
                    <td colspan="6" style="width:100%;text-align:center;"  class="table_header">{{ $i18ns("规则") }}</td>
                  </tr>
                  <tr  v-for="(item, index) in tableDataList.ruleList" :key="index">
                    <td colspan="4">{{item.rule_name}}</td>
                    <td colspan="2">{{item.hit_flag === 'hit' ? '命中' : '未命中'}}</td>
                  </tr>
                </table>
            </div>
            <div  class="table_center margin-t-12">
              <table border="1" style="width: 100%;">
                  <tr>
                    <td colspan="6" style="width:100%;text-align:center;"  class="table_header">{{ $i18ns("决策规则") }}</td>
                  </tr>
               </table>
                <table border="1" class="table_report" v-for="(item, index) in tableDataList.treeList" :key="index">
                  <tr>
                    <td>{{ $i18ns("决策规则名称") }}</td>
                    <td colspan="4">{{ item.tree_name }}</td>
                  </tr>
                  <div class="div-table"  v-for="(ele, e) in item.list" :key="e">
                      <tr>
                        <td colspan="3">{{$i18ns('规则名称')}}</td>
                        <td colspan="3">{{$i18ns('命中标志')}}</td>
                      </tr>
                      <tr>
                        <td colspan="3">{{ ele.rule_desc }}</td>
                        <td colspan="3">{{ ele.hit_flag === 'hit' ? '命中' : '未命中' }}</td>
                      </tr>
                  </div>
                    
                </table>
            </div>
            <!-- <to-json :toUrl="query_url" :params="getPageParams('due_item_no','custBTA6')"></to-json> -->
            <div class="noPrint">
                <el-button size="mini" type="primary" @click="handlePrintConfig()">打印</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "riskReport",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      tableDataList: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化查询数据
     */
    initData() {
      let that = this;
      let params = {
        apply_no: this.cParentParams.apply_no,
        servicecode: "ar1666",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
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
  }
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
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
  border: 1px solid #808080;
}

td {
  width: 10%;
  text-align: center;
  border: 1px solid #808080;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  text-align: center;
}

.tr_header {
  height: 300px;
  border-top: 0 solid
}

.tr_bottom {
  height: 0px;
  border: 0 solid;
}

.th_desc {
  text-align: left;
}
@page {
    size: auto A4 landscape;
    margin: 1.4cm 0;
}

.div-table {
  display: table-row-group;
}
</style>