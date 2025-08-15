<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>基本信息</span>
          </template>
            <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('借据号')" prop="loan_no">
                    <el-input v-model="basicForm.loan_no" @blur="lncfnoBlur" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$i18ns('贷款产品')" prop="prod_no">
                    <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
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
                  <el-form-item :label="$i18ns('变更后还款方式')" prop="repay_type">
                    <el-select v-model="basicForm.repay_type" :disabled="true" >
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
                    <el-input v-model="basicForm.rpymt_prd"  :disabled="true"></el-input>
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
                    <el-input v-model="basicForm.nrl_int_rate" :disabled="true"></el-input>
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
                    <el-input v-model="basicForm.next_rpymt_dt" :disabled="true"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item :label="$i18ns('原还款顺序编号')" prop="orig_rpymt_seq_num">
                    <el-input v-model="basicForm.orig_rpymt_seq_num" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  :label="$i18ns('还款顺序编号')" prop="rpymt_seq_num">
                    <el-input v-model="basicForm.rpymt_seq_num" :disabled="true">
                      <el-button slot="append" icon="el-icon-search" @click="getRpymtSeq"></el-button>
                    </el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('备注')" prop="remark"  >
                    <el-input :disabled="true" type="textarea" :autosize="{minRows:2, maxRows: 5}" :placeholder="$i18ns('请输入备注')" v-model="basicForm.remark"  >

                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
      </el-collapse-item>
      </el-collapse>
   </div>
    <!--
      <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>启动流程</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div> -->
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";


export default {
    name: "change_noinsert",
    components: {
      
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
          orig_repay_way:"",//原还款方式
          repay_type:"",//变更后还款方式
          cert_no:"",//证件号码
          contract_no:"",//合同号
          ccy_code:"",//币种
          remark:"",//备注
          apply_no:"",//申请号
          rpymt_prd:"", //还款周期
          orig_int_rate:"",
          nrl_int_rate:"",
          orig_rpymt_seq_num:"",
          rpymt_seq_num:"",
        },
        
        currencyList:[],
        repayList:[],
        activeNames: ["1"],
      }
    },
    created() {

      
      this.basicForm.loan_no = this.cParentParams.reserve1;
      this.basicForm.apply_no = this.cParentParams.apply_no;

      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
      }

      this.getDictList("MS_E_REPAY_WAY", "repayList"); // 还款方式数据字典
      this.getDictList("MS_CURRENCY", "currencyList"); // 币种数据字典
      this.getrepaytypeInfo();
    },

    methods: {
       
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

   // getCustomerInfo(){
      // let params = {
      //   servicecode: "ln3100",
      //   loan_due_bill_num: this.basicForm.loan_no

      // }
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      // .then(res => {
      //   if (res.code === "200") {
         
      //     this.basicForm.cust_name=res.data.cust_nm;
      //     this.basicForm.ccy_code  =res.data.ccy_code_num;
      //     this.basicForm.cust_no=res.data.cust_no;
          
      //     this.basicForm.prod_no=res.data.slbl_prod_code;
      //     this.basicForm.orig_repay_way=res.data.rpymt_way;
         
      //     this.basicForm.cert_no=res.data.cert_no;
      //     this.basicForm.rpymt_prd=res.data.rpymt_prd;
         

     //   }
    //  })
    //  .catch(err => {
    //    this.compareCustomerInfo="";
   //     console.error(err);
   //   })
   // },
    getrepaytypeInfo(){
      let params = {
        servicecode: "pl0061",
        apply_no: this.basicForm.apply_no

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res.code === "200") {
         
          this.basicForm.repay_type=res.data.repay_type;
          this.basicForm.remark  =res.data.remark;
          this.basicForm.cust_name=res.data.cust_name;
          this.basicForm.ccy_code  =res.data.ccy_code;
          this.basicForm.cust_no=res.data.cust_no;
          
          this.basicForm.prod_no=res.data.prod_no;
          this.basicForm.orig_repay_way=res.data.orig_repay_way;
          this.basicForm.rpymt_prd=res.data.rpymt_prd;
          this.basicForm.cert_no=res.data.cert_no;
          this.basicForm.loan_no=res.data.loan_no;
          this.basicForm.orig_rpymt_prd=res.data.orig_rpymt_prd;

          this.basicForm.orig_int_rate=res.data.orig_int_rate;
          this.basicForm.nrl_int_rate=res.data.nrl_int_rate;
          this.basicForm.orig_rpymt_seq_num=res.data.orig_rpymt_seq_num;
          this.basicForm.rpymt_seq_num=res.data.rpymt_seq_num;
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
                  rpymt_prd:this.basicForm.rpymt_prd, //还款周期
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
      
      this.basicForm.remark= "";
      
    },

    lncfnoBlur(){

      //this.compareCustomerInfo=this.basicForm.loan_no;
      //this.getCustomerInfo();
     // this.getrepaytypeInfo();

    }
    
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
