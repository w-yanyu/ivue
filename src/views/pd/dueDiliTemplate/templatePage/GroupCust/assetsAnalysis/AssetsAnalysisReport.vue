<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_report">
        <el-col :span="24" class="table_header" ><b>{{$i18ns('财务状况调查')}}</b>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;"><b>{{$i18ns('(一)资产情况分析')}}</b>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" style="border-top: 1px solid #5e6d82;">1、{{$i18ns('现金类资产（货币资金、银行存款、其他货币资金以及容易变现的短期投资，可直接用于偿付债务。但也要分析其真实的流动性，不能单纯看货币资金的多少，要对应地分析“应付票据”科目，如企业银行存款主要为银票或开立信用证的保证金，账面存款并不能作为归还银行贷款的保证。）')}}
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
        <el-col :span="24" class="table_desc" >2、{{$i18ns('应收账款的对象和账龄（分析应收账款中已形成或可能形成的坏账损失；将本期应收账款与年初和同期的增减比较，根据销售收入的增长幅度可以分析是否属于合理占用范围，从应收款的增减情况可以分析产品市场的变化。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc2 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >3、{{$i18ns('存货的占用情况（根据销售收入增减幅度，比较分析存货的总量是否属于合理范围；根据存货的具体内容，判断是否有积压的原材料或产成品。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc3 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >4、{{$i18ns('其他应收款的构成（根据其他应收款的对象和总量，分析其占用规模是否合理，是否有出资方抽逃资本的可能，或关联企业间融资、变相长期投资；是否隐藏了企业无法摊销的费用，形成潜在的亏损。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc4 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >5、{{$i18ns('长期投资的项目（了解企业长期投资具体项目的经营情况，结合“投资收益”分析投资回报，了解其投资是成功还是失败，是否已形成实际损失。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc5 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >6、{{$i18ns('固定资产构成（了解企业固定资产的总体构成，其中从机器设备的购置年份可以看出其技术上的先进程度，是否投资了非生产性房地产项目，是否按规定计提折旧。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc6 }}
            </li>
          </ol>
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_desc" >7、{{$i18ns('递延资产的构成和摊销（分析列入递延资产的内容是否合规，是否隐藏了不合理支出，形成潜亏，递延资产是否按期摊销。）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="24" class="table_right page-desc" contenteditable="true">
          <ol>
            <li>
              {{ page.desc7 }}
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
  name: "AssetsAnalysisReport",
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
        desc6: "",
        desc7: ""
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
  direction: ltr;
  overflow: auto;
  display:flex;
}
</style>
