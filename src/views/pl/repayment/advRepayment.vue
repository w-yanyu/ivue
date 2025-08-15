<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>{{$i18ns('基本信息')}}</span>
          </template>
            <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
              <el-row>
                <el-col :span="8">
                  <el-form-item class="require-asterisk"  :label="$i18ns('借据号')" prop="loan_no">
                    <el-input v-model="basicForm.loan_no" @blur="lncfnoBlur"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                    <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                    <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :span="8">
                  <el-form-item :label="$i18ns('产品名称')" prop="prod_name">
                    <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('产品代码')" prop="prod_no">
                    <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('货币代号')" prop="ccy_code"  >
                    <el-select v-model="basicForm.ccy_code" placeholder=" " :disabled="true">
                      <el-option
                        v-for="(item, index) in ccyCodeList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>{{$i18ns('欠款信息')}}</span>
          </template>
          <el-form ref="debtForm" :model="debtForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('贷款账号')" prop="loan_acct_no">
                  <el-input v-model="debtForm.loan_acct_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$i18ns('贷款余额')" prop="loan_bal">
                  <el-input v-model="debtForm.loan_bal" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('贷款状态')" prop="loan_form">
                  <el-select v-model="debtForm.loan_form" :disabled="true" >
                    <el-option v-for="item in loanStatusList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('本金合计')" prop="prcpl_smtn">
                  <el-input v-model="debtForm.prcpl_smtn" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('利息合计')" prop="int_smtn">
                  <el-input v-model="debtForm.int_smtn" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('正常本金')" prop="normal_princi">
                  <el-input v-model="debtForm.normal_princi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('逾期本金')" prop="overdue_princi">
                  <el-input v-model="debtForm.overdue_princi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('呆滞本金')" prop="stagnant_princi">
                  <el-input v-model="debtForm.stagnant_princi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('核销本金')" prop="write_off_princi">
                  <el-input v-model="debtForm.write_off_princi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应计利息')" prop="accrued_inst">
                  <el-input v-model="debtForm.accrued_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收欠息')" prop="recv_debit_inst">
                  <el-input v-model="debtForm.recv_debit_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('逾期应计利息')" prop="ovdue_acd_int">
                  <el-input v-model="debtForm.ovdue_acd_int" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应计罚息')" prop="accrued_penalt_inst">
                  <el-input v-model="debtForm.accrued_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收罚息')" prop="recv_penalt_inst">
                  <el-input v-model="debtForm.recv_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('核销利息')" prop="write_off_inst">
                  <el-input v-model="debtForm.write_off_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('允许提前结清')" prop="is_allow_adv_settle">
                  <el-select v-model="debtForm.is_allow_adv_settle" :disabled="true" >
                    <el-option v-for="item in yesTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('银行卡号')" prop="dflt_rpymt_acct_no">
                  <el-input v-model="debtForm.dflt_rpymt_acct_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>{{$i18ns('申请信息')}}</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
<!--            <el-row>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item class="require-asterisk" label="申请原因" prop="reason">-->
<!--                  <el-select-->
<!--                    v-model="appForm.reason"-->
<!--                    placeholder="请选择">-->
<!--                    <el-option-->
<!--                      v-for="item in reasonTypeList"-->
<!--                      :key="item.value"-->
<!--                      :label="item.dictName"-->
<!--                      :value="item.dictId">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
            <el-row>
                <el-col :span="12" v-show="false">
                    <el-form-item class="require-asterisk" :label="$i18ns('附件上传')" prop="fileList">
                        <upload-file-view ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" :placeholder="$i18ns('请输入备注')" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('提交')}}</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";

export default {
    name: "tqhktsApply",
    components: {
      UploadFileView,
    },
    props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          loan_no: "",//借据号
          cust_no: "",//客户号
          cust_name: "",//客户姓名
          prod_no:"",//产品代码
          prod_name:"",//产品名称
          ccy_code:""//货币代号
        },
        debtForm: { // 欠款信息表单对象
          prcpl_smtn:"",//本金合计
          int_smtn:"",//利息合计
          loan_acct_no: "",//贷款账号
          //lnream: "",//逾期金额
          loan_bal: "",//贷款余额
          loan_form: "",//贷款状态
         // overdue_days: "",//逾期天数
          normal_princi: "",//正常本金
          overdue_princi: "",//逾期本金
          stagnant_princi:"",//呆滞本金
          write_off_princi:"",//核销本金
          accrued_inst:"",//应计利息
          recv_debit_inst:"",//应收欠息
          ovdue_acd_int:"",//逾期应计利息
          accrued_penalt_inst:"",//应计罚息
          recv_penalt_inst:"",//应收罚息
          write_off_inst:"",//核销利息
          recv_fee:"",//逾期违约金
          is_allow_adv_settle:"",//是否允许提前结清
          ispart:"",//是否允许部分提前还款
          dflt_rpymt_acct_no:""//银行卡号
        },
        appForm: {
          reason: "",//申请原因
          fileList:[],//附件
          remark:""//备注
        },
        fileList:[],
        // compareCustomerInfo:"",
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }]
        },
        appRules : {
          // reason: [{ required: true, message: "请输入申请原因" }],
          //fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
        },
        reasonTypeList:[],
        loanStatusList:[],
        activeNames: ["1", "2","3"],
        ccyCodeList:[]
      }
    },
    created() {

      //this.list1 = this.params
            //this.list3 = this.cParentScope
     // this.list2 = this.cParentParams

      this.basicForm.loan_no = this.cParentParams.reserve1;

      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
      }

      this.getDictList("PL_E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("PL_E_ADJRS", "reasonTypeList"); // 初始化原因数据字典
      this.getDictList("MS_E_YESORNO", "yesTypeList"); // 初始化是否数据字典
      this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币数据字典

    },

    methods: {
        /**
     * 附件校验
     * @param value 表单当前值
     * @param rule 校验规则
     *
     * @param callback 回调方法
     */
     fileListValidate(value, rule, callback) {
      //  if (this.appForm.fileList.length === 0) {
      //    return callback(new Error("请上传附件材料"));
      //  }
       return callback();
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

    getCustomerInfo(){
     // if (this.compareCustomerInfo) {
        // this.basicForm.cust_no= "";//客户号
        // this.basicForm.cust_name= "";//客户姓名
        // this.basicForm.prod_no= "";//产品代码
        // this.basicForm.prod_name= "";//产品名称
        // this.$refs["debtForm"].resetFields();
        // this.$refs["appForm"].resetFields();
        // this.appForm.fileList= [];
        // this.fileList=[];
     // }
      let params = {
        servicecode: "ln3101",
        loan_due_bill_num: this.basicForm.loan_no

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res.code === "200") {
          //this.basicForm = res.data.loanInfo;
         // this.debtForm = res.data.loanInfo;;
          //this.debtForm.lnream = this.nubFormat(parseFloat(res.data.loanInfo.lnream) + parseFloat(res.data.loanInfo.yclixi),2);
          // this.debtForm.yjlx = this.nubFormat(Number(res.data.loanInfo.ysyjni) + Number(res.data.loanInfo.csyjni),2);
          // this.debtForm.ysqx = this.nubFormat(parseFloat(res.data.loanInfo.ysxxoi) + parseFloat(res.data.loanInfo.csxxoi), 2);
          // this.debtForm.yjfx = this.nubFormat(parseFloat(res.data.loanInfo.ysyjpi) + parseFloat(res.data.loanInfo.csyjpi),2);
          // this.debtForm.yclixi = this.nubFormat(res.data.loanInfo.yclixi,2);
          // this.debtForm.hxlx = this.nubFormat(parseFloat(res.data.loanInfo.hxxxin) + parseFloat(res.data.loanInfo.hxxxoi) + parseFloat(res.data.loanInfo.hxprin), 2); //核销利息
          // this.debtForm.issett = res.data.lnbSchdRule.issett;
          // this.debtForm.ispart = res.data.lnbSchdRule.ispart;
         // this.basicForm.loan_no=res.data.loan_due_bill_num;
          this.basicForm.cust_name=res.data.cust_nm;
          this.basicForm.ccy_code  =res.data.ccy_code_num;
          this.basicForm.cust_no=res.data.cust_num;
          this.basicForm.prod_name=res.data.prod_nm;
          this.basicForm.prod_no=res.data.prod_code;
          this.debtForm.loan_acct_no=res.data.loan_acct_num;
          //this.basicForm.lnream=res.data.loan_due_bill_num;
          this.debtForm.loan_form=res.data.loan_form;
          this.debtForm.loan_bal=res.data.dstrbl_amt;
          this.debtForm.prcpl_smtn=res.data.prcpl_smtn;
          this.debtForm.int_smtn=res.data.int_smtn;
          this.debtForm.overdue_days=res.data.loan_due_bill_num;
          this.debtForm.normal_princi=res.data.nrl_prcpl;
          this.debtForm.overdue_princi=res.data.ovdue_prcpl;
          this.debtForm.stagnant_princi=res.data.stgnt_prcpl;
          this.debtForm.write_off_princi=res.data.chk_write_off_prcpl;
          this.debtForm.accrued_inst=res.data.stgnt_prcpl;
          this.debtForm.recv_debit_inst=res.data.rcvbl_db_int;
          this.debtForm.ovdue_acd_int=res.data.stgnt_prcpl;
          this.debtForm.accrued_penalt_inst=res.data.rcvbl_acd_pnly_int;
          this.debtForm.write_off_inst=res.data.chk_write_off_int;
          this.debtForm.recv_fee=res.data.recv_fee;
          this.debtForm.recv_penalt_inst=res.data.rcvbl_pnly_int;
          this.debtForm.dflt_rpymt_acct_no=res.data.rpymt_acct_num;
          this.debtForm.is_allow_adv_settle =res.data.adv_rpymt_adjust_flg;

        }
      })
      .catch(err => {
        this.compareCustomerInfo="";
        console.error(err);
      })
    },

    submit() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          this.$refs.appForm.validate(valid => {
            if (valid) {
              this.$confirm("是否确认提交申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let params = {
                  servicecode: "pl0051",
                  loan_no: this.basicForm.loan_no,
                  cust_no: this.basicForm.cust_no , //客户号
                  cust_name:this.basicForm.cust_name, // 客户姓名
                  prod_no:this.basicForm.prod_no , // 产品编号
                  prod_name:this.basicForm.prod_name , // 产品名称
                  clssst:this.basicForm.clssst , // 账户形态
                  issett:this.debtForm.issett , // 是否允许提前结清
                  ispart:this.debtForm.ispart , // 是否允许部分提前还款
                  reason:this.appForm.reason,   //原因
                  fileList:this.appForm.fileList,  //附件列表
                  remark:this.appForm.remark,  //备注
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                  if (res && res.code === "200") {
                    this.$message({
                      type: "success",
                      message: res.message
                    })
                    this.$emit("update", {}),
                      (params.appl_id = res.data.appl_id),
                      (params.cust_name = res.data.cust_name),
                      (params.appl_state = res.data.appl_state),
                      (params.appl_date = res.data.appl_date),
                      (params.appId='plOnl'),
                      (params.wf_inst_id = res.data.wf_inst_id),
                      (params.task_inst_id = res.data.cur_task_id),
                      (params.proc_inst_id = res.data.cur_wfrl_id),
                      (params.frame_cd = res.data.task_url1),
                      // that.cParentScope.parentFormModel.custId = '';
                      this.$openNavTab(
                        "views/pl/workbench/workbench_wait_todo_view.json",
                        "待办事项办理",
                        params,
                        this
                      );
                    this.clearData();
                  }
                }).catch(err => {
                  console.error(err);
                })
              });
            }
          });
        }
      });
    },

    reset(){
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })

    },

    clearData(){
      //this.$refs["basicForm"].resetFields();
      //this.$refs["debtForm"].resetFields();
      //this.$refs["appForm"].resetFields();
      this.appForm.fileList= [];
      this.appForm.remark= "";
      this.fileList=[];
      this.compareCustomerInfo="";
      this.$refs.uploadProp.clearFileList();
    },

    lncfnoBlur(){

      //this.compareCustomerInfo=this.basicForm.loan_no;
      this.getCustomerInfo();

    },
    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    changeUploadFile(val){
      this.appForm.fileList = val;  //附件列表
    },
      /**
       * 数字格式化成金额
       * @param  金额
       * @param 小数点后面有几位 (四舍五入到指定的位数)
       *
       */
      nubFormat(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
        }
        return (t.split("").reverse().join("") +"." +r);
      }
    },
}

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
    }
  }
</style>
