<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;"><b>{{$i18ns('(四)损益情况分析')}}</b>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;">1、{{$i18ns('主营业务收入变化情况（将主营业务收入与同期相比较，要结合产品价格、产品的产量和销售数量的变动，分析产品销售的真实情况，不能单纯只看营业收入。）')}}
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
        <el-col :span="24" class="table_desc" >2、{{$i18ns('主营业务利润（分析产品销售成本和销售费用与销售收入的增减变化情况是否同步，结合原材料、能源价格以及员工工资等主要成本因素，分析企业生产成本的变动情况和主营业务盈利能力。）')}}
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
        <el-col :span="24" class="table_desc" >3、{{$i18ns('经营费用的变化（比较分析管理费用和财务费用变化情况，对照管理费用与销售规模的发展是否同步，财务费用与银行借款是否相匹配。）')}}
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
        <el-col :span="24" class="table_desc" >4、{{$i18ns('投资收益分析（要具体反映投资收益的来源，分析企业投资的项目有哪些是有回报的，哪些是还没有回报的，哪些是已经形成损失的，投资收益与长期投资比较是否合理。如与长期投资比较，投资收益过高，应分析申请人是否在资本市场有较大的投入。）')}}
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
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >5、{{$i18ns('实现利润情况（与同期比较实现的利润总额情况，分析利润与销售增长幅度是否一致。如出现亏损应分析具体原因。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc5 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >6、{{$i18ns('利润分配情况（了解出资方对历次利润分配的意向，分析公司股东是否注重公司自身的积累。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc">
          <ol>
            <li>
              {{ page.desc6 }}
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
  name: "profitAndLossAnalysisReport",
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
        desc4: "",
        desc5: "",
        desc6: ""
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
