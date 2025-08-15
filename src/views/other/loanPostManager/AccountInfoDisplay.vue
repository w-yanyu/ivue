<template>
  <div class="formStyle">
    <div class="title">已选公账账号信息</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="185px"
      class="custom-common--form"
    >
      <el-row class="caSeq-table">
        <el-table :data="tableData">
          <!-- <el-table-column label="是否锁定" align="center">
            <template slot-scope="scope">{{dattypTranslate(scope.row.isLock)}}</template>
          </el-table-column> -->
          <el-table-column label="公账序号" align="center" prop="caSeq"></el-table-column>
          <el-table-column label="还款/宕帐日期" align="center" prop="caRepayOrDebtDate"></el-table-column>
          <el-table-column label="付款人" align="center" prop="caPayer"></el-table-column>
          <el-table-column label="金额" align="center" prop="caAmt"></el-table-column>
          <el-table-column label="摘要" align="center" prop="caAbstract"></el-table-column>
          <el-table-column label="剩余金额" align="center" prop="caRestAmt"></el-table-column>
          <el-table-column :label="$i18ns('备注')" align="center" prop="caRemark"></el-table-column>
        </el-table>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ChooseAccountLookup from "./ChooseAccountLookup";

export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "AccountInfoDisplay",
  data() {
    return {
      ruleForm: {
        caSeq: ""
      },
      rules: {
        caSeq: [{ required: true, message: "请选择公账账号" }]
      }, 
      tableData: [], // 选择带回列表数据
      dattypList: [] // 是否锁定数据字典
    };
  },

  created() {
    this.tableData= this.cParentScope.parentFormModel.pbacctsq;
  },
  methods: {
    // /**
    //  * 选择带回回调
    //  */
    // lookSelect(tableList, dattypList) {
    //   let rpamountChild = 0;
    //   this.dattypList = dattypList;
    //   let map = {};
    //   this.tableData.forEach(item => {
    //     map[item.caSeq] = true;
    //   });
    //   tableList.forEach(item => {
    //     if (!map[item.caSeq]) {
    //       this.tableData.push(item);
    //     }
    //   });
    //   this.cParentScope.parentFormModel.pbacctsq = [];
    //   this.tableData.forEach(item => {
    //     this.cParentScope.parentFormModel.pbacctsq.push(item.caSeq);
    //     rpamountChild += parseFloat(item.caRestAmt);
    //   });
    //   this.cParentScope.parentFormModel.rpamount = rpamountChild;
    //   this.lookClose();
    // },
    // /**
    //  * 是否锁定转换
    //  */
    // dattypTranslate(val) {
    //   for (let index = 0; index < this.dattypList.length; index++) {
    //     const item = this.dattypList[index];
    //     if (val === item.dictId) return item.dictName;
    //   }
    // }
  
    
  }
};
</script>
<style lang="less" scoped>
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }
}
.formStyle {
  margin: 10px 0px 30px 100px;
  border: 1px solid #d8dde9;
  border-radius: 10px;
  // position: relative;
 
}
.title {
  width: 160px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
  color: #697b8c;
  position: absolute;
  top: 0px;
  z-index: 1000;
  left: 50%;
  background: #fff;

}
.caSeq-table {
  padding: 30px  10px 20px 10px ;
}
</style>