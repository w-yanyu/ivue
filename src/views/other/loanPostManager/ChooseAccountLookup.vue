<template>
  <div>
    <el-dialog
     title="公账账号查询"
     :visible.sync="dialogVisible"
     :show-close="true"
     :before-close="handleClose"
     width="1210px">
      <div class="custom-form--datagrid">
        <div class="datagrid-serch clearfix">
          <div class="datagrid-serch--left">
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="150px" class="custom-common--form">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="公账日期" prop="caRepayOrDebtDate">
                    <el-date-picker
                      v-model="ruleForm.caRepayOrDebtDate"
                      type="date"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公账金额" prop="caAmt">
                    <el-input v-model="ruleForm.caAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="存款人">
                    <el-input v-model="ruleForm.caPayer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="摘要">
                    <el-input v-model="ruleForm.caAbstract"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公账序号" >
                     <el-input v-model="ruleForm.caSeq"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="datagrid-serch--right">
            <el-row>
              <el-button type="primary" size="small" @click="search" icon="el-icon-search">查询</el-button>
              <el-button @click="reset" size="small">{{$i18ns('重置')}}</el-button>
            </el-row>
          </div>
        </div>
        <div class="datagrid-toolbar">
          <el-button type="primary" size="small" plain :disabled="selectedList.length === 0" @click="listChoose">{{$i18ns('选择')}}</el-button>
        </div>
        <div class="datagrid-table">
          <el-table
           :data="tableData"
           style="width: 100%"
           @selection-change="handleSelection">
            <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
            <el-table-column label="是否锁定" align="center">
              <template slot-scope="scope">
                {{dattypTranslate(scope.row.isLock)}}
              </template>
            </el-table-column>
            <el-table-column label="公账序号" align="center" prop="caSeq"></el-table-column>
            <el-table-column label="还款/宕帐日期" align="center" prop="caRepayOrDebtDate"></el-table-column>
            <el-table-column label="付款人" align="center" prop="caPayer"></el-table-column>
            <el-table-column label="金额" align="center" prop="caAmt"></el-table-column>
            <el-table-column label="摘要" align="center" prop="caAbstract"></el-table-column>
            <el-table-column label="剩余金额" align="center" prop="caRestAmt"></el-table-column>
            <el-table-column :label="$i18ns('备注')" align="center" prop="caRemark"></el-table-column>
          </el-table>
          <el-pagination
           v-if="tableData.length > 1"
           @size-change="sizeChange"
           @curent-change="currentChange"
           :current-page="currentPage"
           :page-size="tableSize"
           :page-sizes="[10, 20, 50]"
           layout="total, sizes, prev, pager, next, jumper"
           :total="tableTotal">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
  name: "ChooseAccountLookup",
  props: {
    showLookup: false, // 控制
    
  },
  data() {
    return {
      dialogVisible: true,
      ruleForm: {
        caSeq:"",//公账序号
        caRepayOrDebtDate: "", // 公账日期
        caAmt: "", // 公账金额
        caPayer: "", // 存款人
        caAbstract: "", // 摘要,
        splssfql: "2", // 剩余金额是否清零
      },
      tempRuleForm: {}, // 表单暂存信息
      rules: {
        caRepayOrDebtDate: [
          { required: true, message: '请选择公账日期'}
        ],
        caAmt: [
          { pattern: '^[0-9]+(\.[0-9]{1,2})?$', message: '请输入正确的金额' }
        ],
        splssfql: [
          { required: true, message: '请选择剩余金额是否清零'}
        ],
      },
      splssfqlList: [], // 剩余金额是否清零数据字典
      dattypList: [], // 是否锁定数据字典
      tableData: [], // 表单数据
      currentPage: 1,
      tableSize: 10,
      tableTotal: 10,
      selectedList: [], // 选中的列表数据
      caRepayOrDebtDate: "", // 公账日期
    }
  },
  created() {
    this.dialogVisible = true;
    this.getDictList("E_YES_CLEAR", "splssfqlList");
    this.getDictList("E_YES_LOCK", "dattypList");
  },
  methods: {
    /**
     * 多选框可选状态控制
     */
    selectable (row, index) {
      return row.isLock !== '1'; // isLock 1-已锁定 0-未锁定
    },
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 获取数据字典列表
     */
    getDictList(dictType, key) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[key] = res.data;
          if (key === "splssfqlList") this.ruleForm.splssfql = "2";
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 查询
     */
    search() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.tempRuleForm = _.cloneDeep(this.ruleForm);
          this.currentPage = 1;
          this.getTableData();
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      let params = {
        caRepayOrDebtDate: this.tempRuleForm.caRepayOrDebtDate,
        caSeq:this.tempRuleForm.caSeq,
        caAmt: this.tempRuleForm.caAmt,
        caPayer: this.tempRuleForm.caPayer,
        caAbstract: this.tempRuleForm.caAbstract,
        splssfql: this.tempRuleForm.splssfql,
        servicecode: "PLMSKGTS0014",
        start: this.currentPage,
        length: this.tableSize,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tableData = res.data.list;
          this.tableTotal = res.pageParam ? res.pageParam.total : 0;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 分页sizeChange 回调
     */
    sizeChange(val) {
      this.tableSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    /**
     * 分页currentChange回调
     */
    currentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    handleSelection(val) {
      this.selectedList = val;
    },
    /**
     * 选择列表数据
     */
    listChoose() {
      console.log(this.selectedList+"=============zi");
     console.log(this.selectedList);
      console.log(this.dattypList);
      
      this.$emit("select", this.selectedList, this.dattypList);
    },
    /**
     * 重置
     */
    reset() {
      this.$refs.ruleForm.resetFields();
    },
    handleClose() {
      this.$emit("close");
    }
  }
}
</script>