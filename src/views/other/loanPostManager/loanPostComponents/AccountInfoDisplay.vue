<template>
  <div class="formStyle">
    <div class="title">{{tableTitle}}</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="185px"
      class="custom-common--form"
    >
      <el-row class="caSeq-table" v-if="this.cParentScope.parentFormModel.rptype === '1'||this.cParentScope.parentFormModel.rptype===undefined">
        <el-table :data="tableData">
          <el-table-column label="是否锁定" align="center">
            <template slot-scope="scope">{{dattypTranslate(scope.row.isLock)}}</template>
          </el-table-column>
          <el-table-column label="公账序号" align="center" prop="caSeq"></el-table-column>
          <el-table-column label="还款/宕帐日期" align="center" prop="caRepayOrDebtDate"></el-table-column>
          <el-table-column label="付款人" align="center" prop="caPayer"></el-table-column>
          <el-table-column label="金额" align="center" prop="caAmt"></el-table-column>
          <el-table-column label="摘要" align="center" prop="caAbstract"></el-table-column>
          <el-table-column label="剩余金额" align="center" prop="caRestAmt"></el-table-column>
          <el-table-column :label="$i18ns('备注')" align="center" prop="caRemark"></el-table-column>
        </el-table>
      </el-row>
      <el-row class="caSeq-table" v-if="this.cParentScope.parentFormModel.rptype === '0'">
        <el-table :data="tableDataTwo">
          <el-table-column label="订单号" align="center" prop="orderNo"></el-table-column>
          <el-table-column label="流程申请号" align="center" prop="flowNo"></el-table-column>
          <el-table-column label="扣款金额" align="center" prop="caAmt"></el-table-column>
          <el-table-column label="实际扣款金额" align="center" prop="factAmt"></el-table-column>
          <el-table-column label="交易状态" align="center">
            <template slot-scope="scope">{{statusTranslate(scope.row.status)}}</template>
          </el-table-column>
          <el-table-column label="响应码" align="center" prop="retCode"></el-table-column>
          <el-table-column label="响应信息" align="center" prop="retText"></el-table-column>
          <el-table-column label="操作" align="center"></el-table-column>
        </el-table>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

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
      rules: {},
      tableTitle: "", //表格标题
      tableData: [], // 选择带回列表数据
      tableDataTwo: [], // 选择带回列表数据
      dattypList: [], // 是否锁定数据字典
      paystatuList: [] // 是否锁定数据字典
    };
  },

  created() {
    console.log(this.cParentScope.parentFormModel.rptype );
    
    if (this.cParentScope.parentFormModel.rptype === "1" ||this.cParentScope.parentFormModel.rptype===undefined) {
      this.tableTitle = "已选公账账号信息";
      this.tableData = this.cParentScope.parentFormModel.pbacctsq;
    } else {
      this.tableDataTwo = [];
      this.tableTitle = "扣款信息";
      var data = this.cParentScope.parentFormModel.pbacctsq;
      data.forEach(item => {
        item.factAmt = item.caRestAmt; //扣款成功金额,实际扣款金额
        item.retCode = item.caRemark; //响应码
        item.retText = item.caAbstract; //响应信息
        item.status = item.deduct_status; //扣款状态
        this.tableDataTwo.push(item);
      });
    }
  },
  mounted() {
    this.getDictList("E_YES___", "dattypList"); //是否字典
    this.getDictList("E_PAYSTUS", "paystatuList"); //扣款状态字典
  },
  methods: {
    /**
     * 是否锁定转换
     */
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 扣款状态转换
     */
    statusTranslate(val) {
      for (let index = 0; index < this.paystatuList.length; index++) {
        const item = this.paystatuList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            return this[listKey];
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
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
  padding: 30px 10px 20px 10px;
}
</style>