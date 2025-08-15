<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>基本信息</span>
          </template>
          <el-form ref="basicForm" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <loan-info ref="loanProp" :formData="basicForm" :key="timer" :propDisabled="false" @changeBasic="changeBasic"></loan-info>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>缴费确认</span>
          </template>
          <el-table ref="modifyTable" :data="tableModifyData" :border="true" stripe>
            <el-table-column label="缴费申请单号" prop="appl_id" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.appl_id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="费用类型" prop="fee_type" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.fee_type_name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="付款金额" prop="pay_amount" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.pay_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="客户承担" prop="cust_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.cust_amt" :min="0" :precision="2" v-if="scope.row.status"></el-input-number>
                <span v-else>{{scope.row.cust_amt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="法院退回" prop="court_back_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.court_back_amt" :min="0" :precision="2" v-if="scope.row.status"></el-input-number>
                <span v-else>{{scope.row.court_back_amt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司承担" prop="compnay_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.compnay_amt" :min="0" :precision="2" v-if="scope.row.status"></el-input-number>
                <span v-else>{{scope.row.compnay_amt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="scope.row.status=true">修改</el-button>
                <el-button type="text" icon="el-icon-check" @click="saveRow(scope.$index,scope.row)">确认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>已确认缴费</span>
          </template>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="申请单号" prop="branch_name" align="center"></el-table-column>
              <el-table-column label="费用类型" prop="accountType" :formatter="formatAccountTypeData"
                               align="center"></el-table-column>
              <el-table-column label="付款金额" prop="orgName" align="center"></el-table-column>
              <el-table-column label="客户承担" prop="receAccName" align="center"></el-table-column>
              <el-table-column label="法院退回" prop="receAccNo" align="center"></el-table-column>
              <el-table-column label="公司承担" prop="receAccNo" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请人')" prop="bank_name" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请时间')" prop="bank_no" align="center"></el-table-column>
              <el-table-column label="结案时间" prop="bank_no" align="center"></el-table-column>
              <el-table-column label="状态" align="center" width="240"></el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination v-show="isShowPage"
                           @size-change="sizeChange"
                           @current-change="currentChange"
                           :current-page="currentPage"
                           :page-sizes="[10,15,20]"
                           :page-size="tableSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tableTotal">
            </el-pagination>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>


  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  import loanInfo from "./loanInfo";
  export default {
    name: "payConfirmApply",
    components: {
      UploadFile,
      loanInfo,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: "",//借据号
          custno: "",//客户号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodcd: "",//产品代码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        },
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
        tableModifyData: [],
        tableData: [],
        isShowPage: false,
        clssstList: [],   //贷款形态
        feeTypeList: [],//费用类型
        activeNames: ["1", "2", "3"],
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 初始化贷款形态数据字典
      this.getDictList("E_FEE_TYPE", "feeTypeList"); // 费用类型
      this.initRule();
    },

    methods: {
      initRule() {
        this.appRules = {

        }
      },
      /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictType
       * @param listKey 列表对象key名称
       */
      getDictList(dictType, listKey) {
        let params = {
          dictType: dictType,
          dictKey: [dictType]
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },

      changeBasic(basicInfo, feeInfo) {
        this.basicForm = basicInfo;
        this.getConfirmFees();
        this.getConfirmedFees();
      },


      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.searchTeller();
      },
      /**
       * 分页currentChange回调
       */
      currentChange(val) {
        this.currentPage = val;
        this.getTableData();
      },

      getConfirmedFees() {
        this.currentPage = 1;
        this.getTableData();
      },

      getTableData() {
        this.tableData=[];
        let params = {
          servicecode: "RLMSPLTS1406",
          lncfno: this.basicForm.lncfno,
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

      getConfirmFees() {
        this.tableModifyData =[];
        let params = {
          servicecode: "RLMSPLTS1405",
          lncfno: this.basicForm.lncfno,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            for(let i = 0; i< res.data.fees.length; i++){
              let item = res.data.fees[i];
              let fee = {};
              fee.appl_id = item.appl_id;
              fee.fee_type = item.fee_type;
              fee.fee_type_name = this.getDictName(item.fee_type,this.feeTypeList);
              fee.pay_amount = item.pay_amount;
              fee.cust_amt = item.cust_amt;
              fee.court_back_amt = item.court_back_amt;
              fee.compnay_amt = item.compnay_amt;
              fee.status=false;
              this.tableModifyData.push(fee);
            }
          }
        }).catch(err => {
          console.error(err);
        });
      },

      formatAccountTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.accountTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      saveRow(index, row) {
        if(!row.status){
          this.$message({type: "warning", message: "请先修改再保存！"});
          return;
        }
        if(row.cust_amt == null){
          this.$message({type: "warning", message: "请输入客户承担！"});
          return;
        }
        if(row.court_back_amt == null){
          this.$message({type: "warning", message: "请输入法院退回！"});
          return;
        }
        if(row.compnay_amt == null){
          this.$message({type: "warning", message: "请输入公司承担！"});
          return;
        }
        if(parseFloat(row.cust_amt) + row.court_back_amt + row.compnay_amt != row.pay_amount){
          this.$message({type: "warning", message: "客户承担+法院退回+公司承担不等于付款金额！"});
          return;
        }
        this.tableModifyData[index] = row;
        this.tableModifyData[index].status = false;
        this.$message({
          type: "success",
          message: "保存成功！"
        })

      },

      submit() {

        if(this.tableModifyData == null || this.tableModifyData.length == 0){
          this.$message({type: "warning", message: "缴费列表为空！"});
          return;
        }
        for(let index in this.tableModifyData){
          let item = this.tableModifyData[index];
          if(parseFloat(item.cust_amt) + item.court_back_amt + item.compnay_amt != item.pay_amount){
            this.$message({type: "warning", message: "缴费申请"+ item.appl_id+"客户承担+法院退回+公司承担不等于付款金额！"});
            return;
          }
        }

        this.$confirm("是否确认提交申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = {
            servicecode: "RLMSPLTS1407",
            lncfno: this.basicForm.lncfno,//借据号
            cust_no: this.basicForm.custno,//客户号
            cust_nm: this.basicForm.acctna,//客户名称
            idtfno: this.basicForm.idtfno,//证件号码
            phonno: this.basicForm.phonno,//手机号码
            prodcd: this.basicForm.prodcd,//产品代码
            prod_name: this.basicForm.prodna,//产品名称
            area_no: this.basicForm.zubhno,//区域中心
            clssst: this.basicForm.clssst,//贷款形态
            ovdays: this.basicForm.ovdays,//逾期天数
            isUnionLoan: this.basicForm.isUnionLoan,//是否联合贷
            unionComp: this.basicForm.unionComp,//联合贷公司名称
            noworg: this.basicForm.noworg,//当前委案机构

            feeList:this.tableModifyData,//费用确认

          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$message({
                type: "success",
                message: res.message
              })
              this.clearData();
            }
          }).catch(err => {
            console.error(err);
          })
        });
      },
      reset() {
        this.$confirm("是否确认重置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
        })
      },

      clearData() {
        this.basicForm = { // 基础信息表单对象
          lncfno: "",//借据号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        };
        this.tableModifyData=[];
        this.tableData = [];
        this.$refs.loanProp.clearData();//基本信息
      },

      /**
       * 获取字典名称
       */
      getDictName(dictId,dictList){
        let dictType = {};
        dictType = dictList.find(item=>{return item.dictId===dictId;})
        return dictType.dictName;
      },

    }
  }

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;

    .el-row .el-col {
      padding-right: 16px;
    }
  }

  .line-change .el-form-item__label {
    text-align-last: center;
    line-height: 15px;
  }

  .container-content {
    .container-content--search {
      padding: 16px 40px 0 12px;
      border-bottom: 0px solid #e3e8f5;
    }

    .container-content--toolbar {
      padding: 10px;
    }

    .container-content--pagination {
      float: right;
      padding: 10px;
    }

    .button-footer {
      text-align: center;
      padding: 0 0 10px 0;
    }

    .container-centent--table {
      margin-top: 10px;
      bottom: 60px;
    }
  }

  .el-dialog-dev {
    max-height: 60vh;
    overflow: auto;
  }

</style>
