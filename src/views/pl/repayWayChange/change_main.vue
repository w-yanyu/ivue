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
                  <el-form-item :label="$i18ns('贷款产品')" prop="prod_name">
                    <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('原还款方式')" prop="orig_repay_way">
                    <el-select v-model="basicForm.orig_repay_way" :disabled="true">
                    <el-option
                        v-for="(item, index) in repayList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
              <el-col :span="8">
                  <el-form-item :label="$i18ns('变更后还款方式')" prop="repay_type" >
                    <el-select v-model="basicForm.repay_type" @change="handleRepayTypeChange">
                      <el-option
                        v-for="(item, index) in repayList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  :label="$i18ns('原还款周期')" prop="orig_rpymt_prd">
                    <el-input v-model="basicForm.orig_rpymt_prd"  :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  :label="$i18ns('变更后还款周期')" prop="rpymt_prd">
                    <periodGet
                      ref="periodGet"
                      :config="periodGetConfig"
                      :isUseMiniMap="false"
                      v-model="basicForm.rpymt_prd"
                      @input="chageRepaymentPrieds"
                  ></periodGet>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('原利率')" prop="orig_int_rate">
                    <el-input v-model="basicForm.orig_int_rate" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('变更后利率')" prop="nrl_int_rate">
                    <el-input v-model="basicForm.nrl_int_rate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('币种')" prop="ccy_code">
                    <el-select v-model="basicForm.ccy_code" :disabled="true">
                      <el-option
                        v-for="(item, index) in currencyList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="8">
                  <el-form-item class="require-asterisk"  :label="$i18ns('原还款日')" prop="orig_rpymt_dt">
                    <el-input v-model="basicForm.orig_rpymt_dt" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="require-asterisk"  :label="$i18ns('变更后还款日')" prop="next_rpymt_dt">
                    <el-input v-model="basicForm.next_rpymt_dt"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item  :label="$i18ns('原还款顺序编号')" prop="orig_rpymt_seq_num">
                    <el-input v-model="basicForm.orig_rpymt_seq_num" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  :label="$i18ns('还款顺序编号')" prop="rpymt_seq_num">
                    <el-input v-model="basicForm.rpymt_seq_num">
                      <el-button slot="append" icon="el-icon-search" @click="getRpymtSeq"></el-button>
                    </el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('备注')" prop="remark"  >
                    <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" :placeholder="$i18ns('请输入备注')" v-model="basicForm.remark"  >

                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
      </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('启动流程')}}</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>

    <el-dialog :title="$i18ns('选择还款顺序编号')" :visible.sync="rpymtSeqShow" width="70%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true">
      <to-json
        :toUrl="'/views/pl/repayWayChange/rpymtSeq_lookup.json'"
        :params="this.params"
        @jsonCallBack="partnerCallback"
      ></to-json>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import periodGet from "../../../controls/periodGet.vue";

export default {
    name: "change_main",
    components: {
      periodGet
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
          prod_no:"",//贷款产品
          prod_name:"",//贷款产品名称
          orig_repay_way:"",//原还款方式
          repay_type:"",//变更后还款方式
          cert_no:"",//证件号码
          contract_no:"",//合同号
          ccy_code:"",//币种
          remark:"",//备注
          rpymt_prd:"", //还款周期
          orig_rpymt_prd:"", //原还款周期
          orig_int_rate:"", //原利率
          nrl_int_rate:"", //变更后利率
          //orig_rpymt_dt:"", //原还款日
          //next_rpymt_dt:"", //变更后还款日
          orig_rpymt_seq_num:"", //原还款顺序
          rpymt_seq_num:"", // 变更后还款顺序
        },
        pridsDialogShow:false,
        currencyList:[],
        repayList:[],
        activeNames: ["1"],
        periodGetConfig: {
          width: "100px"
        },
        params: {
          
        },
        rpymtSeqShow: false,
        basicRules: {
          repay_type: [
            { required: true, message: this.$i18ns('请输入还款方式'), trigger: "change" },
          ],
          rpymt_prd: [
            { required: true, message: this.$i18ns('请选择还款周期'), trigger: "blur" },
          ],
          nrl_int_rate: [
            { required: true, message: this.$i18ns('请输入变更后利率'), trigger: "blur" },
          ],
          rpymt_seq_num: [
            { required: true, message: this.$i18ns('请输入还款顺序编号'), trigger: "blur" },
          ],
        },
      }
    },
    created() {


      this.basicForm.loan_no = this.cParentParams.reserve1;

      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
      }

      this.getDictList("MS_E_REPAY_WAY", "repayList"); // 还款方式数据字典
      this.getDictList("MS_CURRENCY", "currencyList"); // 币种数据字典

    },

    methods: {
      getRpymtSeq() {
        this.rpymtSeqShow = true
      },
      handleClose() {
        this.rpymtSeqShow = false
      },
      partnerCallback(data) {
        console.log("data===========",data)
        this.basicForm.rpymt_seq_num = data.ddc_mny_parm_num
        this.rpymtSeqShow = false
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
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res.code === "200") {

          this.basicForm.cust_name=res.data.cust_nm;
          this.basicForm.ccy_code  =res.data.ccy_code_num;
          this.basicForm.cust_no=res.data.cust_num;

          this.basicForm.prod_no=res.data.slbl_prod_code;
          this.basicForm.prod_name=res.data.slbl_prod_nm;
          this.basicForm.prod_name=res.data.slbl_prod_nm;
          this.basicForm.orig_repay_way=res.data.rpymt_way;
          if(this.basicForm.repay_type == ''){
            this.basicForm.repay_type = res.data.rpymt_way;
          }

          this.basicForm.cert_no=res.data.cert_no;
          this.basicForm.orig_rpymt_prd=res.data.rpymt_prd;
          if(this.basicForm.rpymt_prd == ''){
            this.basicForm.rpymt_prd =res.data.rpymt_prd;
          }

          //this.basicForm.orig_rpymt_dt=res.data.lstklnb_instmt.next_rpymt_dt;
          this.basicForm.orig_int_rate=res.data.nrl_int_rate;
          if(this.basicForm.nrl_int_rate == ''){
            this.basicForm.nrl_int_rate = res.data.nrl_int_rate;
          }

          this.basicForm.orig_rpymt_seq_num = res.data.rpymt_seq_num;
          if(this.basicForm.rpymt_seq_num == ''){
            this.basicForm.rpymt_seq_num = res.data.rpymt_seq_num;
          }
          

        }
        if(this.basicForm.orig_repay_way=='1'){
        this.diasabledInput=false;
      }else{
        this.diasabledInput=true;

      }
      })
      .catch(err => {
        this.compareCustomerInfo="";
        console.error(err);
      })
    },

    submit() {
      if((this.basicForm.repay_type)===(this.basicForm.orig_repay_way)
      && (this.basicForm.rpymt_prd)===(this.basicForm.orig_rpymt_prd) 
      && (this.basicForm.nrl_int_rate)===(this.basicForm.orig_int_rate)
      && (this.basicForm.rpymt_seq_num)===(this.basicForm.orig_rpymt_seq_num)) {
      this.$message({
              type: "error",
              message: "提示:当前贷款信息未变动,请检查!"

            });
     return;
    }
      this.$refs.basicForm.validate(valid => {
        if (valid) {
              this.$confirm("是否确认提交申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let params = {
                  servicecode: "pl0060",
                  loan_no: this.basicForm.loan_no,
                  cust_no: this.basicForm.cust_no , //客户号
                  cust_name:this.basicForm.cust_name, // 客户姓名
                  prod_no:this.basicForm.prod_no , // 贷款产品
                  cert_no:this.basicForm.cert_no , // 合同号
                  contract_no:this.basicForm.contract_no , // 合同号
                  orig_repay_way:this.basicForm.orig_repay_way , // 原还款方式
                  repay_type:this.basicForm.repay_type , // 变更后还款方式
                  ccy_code:this.basicForm.ccy_code,   //币种
                  remark:this.basicForm.remark,  //备注
                  rpymt_prd:this.basicForm.rpymt_prd ,//还款周期
                  orig_rpymt_prd:this.basicForm.orig_rpymt_prd ,//原还款周期
                  //this.basicForm.next_rpymt_dt ,//原还款日
                  orig_int_rate:this.basicForm.orig_int_rate ,//原利率
                  nrl_int_rate:this.basicForm.nrl_int_rate ,//变更后利率
                  orig_rpymt_seq_num:this.basicForm.orig_rpymt_seq_num,
                  rpymt_seq_num:this.basicForm.rpymt_seq_num,
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                  if (res && res.code === "200") {
                    this.$message({
                      type: "success",
                      message: "操作成功"
                    });
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
                  this.$openNavTab(
                    "views/pl/workbench/workbench_wait_todo_view.json",
                    "待办事项办理",
                    params,
                    this
                  );
            this.sfPressbut = true; //禁用提交和保存按钮
            this.basicForm.loan_no = "";
            this.clearData(); //清空信息
          }
                }).catch(err => {
                  console.error(err);
                })
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
    chageRepaymentPrieds(value){
      this.basicForm.rpymt_prd =value;
    },
    choseRpymtPrd(){
      console.log("*****************choseRpymtPrd");
      this.pridsDialogShow = true;
    },
    clearData(){

      this.basicForm.loan_no= "";
      this.basicForm.repay_type="";
      this.basicForm.remark="";
      this.basicForm.rpymt_prd="";
      this.basicForm.orig_rpymt_prd="";
      this.basicForm.orig_repay_way="";
      this.basicForm.ccy_code="";
      this.basicForm.prod_no="";
      this.basicForm.prod_name="";
      //this.basicForm.orig_rpymt_dt="";
      this.basicForm.orig_int_rate="";
      this.basicForm.orig_rpymt_seq_num="";
      this.basicForm.nrl_int_rate="";
      this.basicForm.rpymt_seq_num="";

    },

    handleRepayTypeChange() {
      console.log("handleRepayTypeChange 》 this.basicForm.repay_type=====",this.basicForm.repay_type);

      console.log("handleRepayTypeChange 》 this.basicForm.repay_type=====",this.basicForm.repay_type === '3');
      if (this.basicForm.repay_type === '1') {
        // 如果选择需要还款周期的还款方式，应用验证规则
        this.$set(this.basicRules.rpymt_prd[0], 'required', false);
      } else {
        // 否则，移除还款周期的验证规则
        this.$set(this.basicRules.rpymt_prd[0], 'required', true);
      }
    },
    lncfnoBlur(){

      //this.compareCustomerInfo=this.basicForm.loan_no;
      this.getCustomerInfo();


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
</style>
