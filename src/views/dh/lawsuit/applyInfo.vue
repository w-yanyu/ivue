<template>
  <div>
    <el-dialog
     title="查询"
     :visible.sync="dialogVisible"
     :show-close="true"
     :before-close="handleClose"
     :append-to-body="true"
     width="1210px">
      <div class="custom-form--datagrid">
        <div class="datagrid-serch clearfix">
          <div class="datagrid-serch--left">
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="150px" class="custom-common--form">
             <el-row>
                <el-col :span="8">
                  <el-form-item label="借据号" prop="lncfno">
                    <el-input v-model="ruleForm.lncfno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户名称" prop="cust_nm">
                    <el-input v-model="ruleForm.cust_nm"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="证件号码" prop="idtfno">
                    <el-input v-model="ruleForm.idtfno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用类型" prop="fee_type">
                    <el-select v-model="ruleForm.fee_type">
                    <el-option v-for="item in feeTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                    </el-select>
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
            <el-table-column label="缴费申请单号" align="center" prop="appl_id"></el-table-column>
            <el-table-column label="借据号" align="center" prop="lncfno"></el-table-column>
            <el-table-column label="客户名称" align="center" prop="cust_nm"></el-table-column>
            <el-table-column label="证件号码" align="center" prop="idtfno"></el-table-column>
            <el-table-column label="费用类型" align="center" prop="fee_type" :formatter="formatFeeType"></el-table-column>
            <el-table-column label="付款金额" align="center" prop="pay_amount"></el-table-column>
            <el-table-column label="公司承担金额" align="center" prop="compnay_balance"></el-table-column>
            <el-table-column label="未处理金额" align="center" prop="compnay_balance"></el-table-column>
          </el-table>
          <el-pagination
           v-if="tableData.length>1"
           @size-change="sizeChange"
           @current-change="currentChange"
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
  name: "ApplyInfo",
  props: {
    showApply: false, // 控制

  },
  data() {
    return {
      dialogVisible: true,
      ruleForm: {
        lncfno:"",//借据号
        cust_nm: "", // 客户名称
        idtfno: "", // 证件号码
        fee_type: "", // 费用类型
      },
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
      feeTypeList: [], // 剩余金额是否清零数据字典
      tableData: [], // 表单数据
      currentPage: 1,
      tableSize: 10,
      tableTotal: 10,
      selectedList: [], // 选中的列表数据
    }
  },
  created() {
    this.getDictList("E_FEE_TYPE", "feeTypeList");
  },
  methods: {
    /**
     * 多选框可选状态控制
     */
    selectable (row, index) {
      return row.isLock !== '1'; // isLock 1-已锁定 0-未锁定
    },
    /**
     * 获取数据字典列表
     */
    getDictList(dictType, listkey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listkey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 转化枚举类型
     */
    formatFeeType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.feeTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    /**
     * 查询
     */
    search() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
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
        lncfno:this.ruleForm.lncfno,
        cust_nm: this.ruleForm.cust_nm,
        fee_type: this.ruleForm.fee_type,
        idtfno: this.ruleForm.idtfno,
        servicecode: "pl2203",
        start: this.currentPage,
        length: this.tableSize,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tableData = res.data;
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
      print(val);
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
     console.log(this.selectedList);
      this.$emit("applySelect", this.selectedList);
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
