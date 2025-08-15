<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;"><b>{{$i18ns('(二)负债情况分析')}}</b>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;">1、{{$i18ns('短期借款和应付票据（查询企业贷款卡与银行短期借款与银行承兑汇票金额项目核对，分析银行负债的真实性，是否有不良信用记录；结合流动资产与销售规模，分析是否有短期借款被长期占用的情况。）')}}
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
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >2、{{$i18ns('应付账款的对象和期限（分析其占用的时间和金额是否合理，是否有拖欠货款的不良信用记录。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc2 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >3、{{$i18ns('应付税金和应付工资的金额、期限是否合理')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc3 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >4、{{$i18ns('长期负债的构成（其中银行借款所用建设项目的项目进度和效益，还款计划。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc4 }}
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
  name: "debtAnalysisReport",
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
        desc1: "",
        desc2: "",
        desc3: "",
        desc4: ""
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
  min-height: 200px !important;
  height: auto !important;
  height: 200px !important;
  text-align: left;
  padding-left: 10px;
  //word-break: break-all;
  //word-wrap: break-word;
  //white-space: pre-wrap;
  direction: ltr;
  overflow: auto;
  display:flex;
}
.table_desc {
  text-align: left;
  padding-left: 10px;
  background: #f3f4f5;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
}
</style>
