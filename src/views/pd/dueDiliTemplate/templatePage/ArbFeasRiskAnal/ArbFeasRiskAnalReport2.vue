<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_report">
        <el-col :span="24" class="table_header" >六、可行性及风险性分析
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc1 }}
            </li>
          </ol>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbFeasRiskAnalReport2",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号

      page: {
        desc1: ""//对外股权(包括投资企业、投资额、企业净资产)
      }
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getCustData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams(){
      if (this.apply_no === null || this.apply_no === ""){
        return false;
      }
      if (this.cust_no === null || this.cust_no === ""){
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === ""){
        return false;
      }
      return true;
    },
    /**
     * 获取各个列表数据
     */
    getCustData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1702",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
}
</script>

<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   border-collapse: collapse;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
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

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.table_left {
  height: 150px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;

  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

.table_right {
  height: auto;
  min-height: 150px;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: 1px solid #5e6d82;
  border-collapse: collapse;
  text-align: left;

  display: flex;
  justify-content: left; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

.table_div {
  height: 400px !important;
}

.border_div {
  height: 100px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;

  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}
.page-desc {
  min-height: 150px !important;
  height: auto !important;
  height: 150px !important;
  text-align: left;
  padding-left: 10px;
  //word-break: break-all;
  //word-wrap: break-word;
  //white-space: pre-wrap;
}
</style>
