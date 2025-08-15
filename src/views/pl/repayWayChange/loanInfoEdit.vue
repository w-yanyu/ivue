<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>{{ $i18ns('基本信息') }}</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('借据号')" prop="loan_no">
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
                <el-form-item :label="$i18ns('货币代号')" prop="ccy_code">
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
            <span><em></em>{{ $i18ns('还款属性') }}</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px"
                   class="custom-common--form">
                   <el-row>
              <el-col :span="8">
                <el-form-item :label="$i18ns('利率')" prop="nrl_int_rate">
                  <el-input v-model="basicForm.nrl_int_rate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('还款周期')" prop="rpymt_prd">
                  <el-input v-model="basicForm.rpymt_prd" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('还款顺序编号')" prop="rpymt_seq_num">
                  <el-input v-model="basicForm.rpymt_seq_num" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>{{ $i18ns('调整后信息') }}</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$i18ns('利率')" prop="nrl_int_rate">
                  <el-input v-model="basicForm.nrl_int_rate"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('还款周期')" prop="rpymt_prd">
                  <el-input v-model="basicForm.rpymt_prd" @click="choseRpymtPrd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('还款顺序编号')" prop="rpymt_seq_num">
                  <el-input v-model="basicForm.rpymt_seq_num"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{ $i18ns('发起变更') }}</el-button>
      <!-- <el-button size="small" @click="reset">{{ $i18ns('重置') }}</el-button> -->
    </div>
    <el-dialog
            :title="$i18ns('还款周期')"
            :close-on-click-modal="false"
            :visible.sync="pridsDialogShow"
            width="70%"
            append-to-body
        >
            <periodGet
                ref="periodGet"
                setHeight="500"
                :isUseMiniMap="false"
                @input="chageRepaymentPrieds"
            ></periodGet>
        </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import periodGet from "/src/controls/periodGet.vue";

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
        prod_no: "",//贷款产品
        prod_name: "",//贷款产品
        orig_repay_way: "",//原还款方式
        repay_type: "",//变更后还款方式
        cert_no: "",//证件号码
        contract_no: "",//合同号
        ccy_code: "",//币种
        remark: "",//备注
        rpymt_prd: "" ,//还款周期
        nrl_int_rate:"", //利率
        rpymt_seq_num:"" //还款顺序编号
      },
      ccyCodeList: [],//货币代号
      currencyList: [],
      repayList: [],
      activeNames: ["1"],
      pridsDialogShow:false
    }
  },

  mounted() {
    this.getDictList("MS_E_YESORNO", "yesnoList"); //是否字典
    this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币数据字典
  },


  created() {

    this.basicForm.loan_no = this.cParentParams.reserve1;

    if (this.basicForm.loan_no != "" && this.basicForm.loan_no != undefined) {
      this.lncfnoBlur();
    }

    this.getDictList("MS_E_REPAY_WAY", "repayList"); // 还款方式数据字典
    this.getDictList("MS_CURRENCY", "currencyList"); // 币种数据字典

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

    getCustomerInfo() {
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res.code === "200") {

              this.basicForm.cust_name = res.data.cust_nm; //客户名
              this.basicForm.ccy_code = res.data.ccy_code_num; //币种
              this.basicForm.cust_no = res.data.cust_num; //客户号
              this.basicForm.prod_name = res.data.slbl_prod_nm; //产品名
              this.basicForm.prod_no = res.data.slbl_prod_code; //产品码
              this.basicForm.orig_repay_way = res.data.rpymt_way; //还款方式
              this.basicForm.rpymt_seq_num = res.data.rpymt_seq_num; //还款顺序编号
              this.basicForm.nrl_int_rate = res.data.nrl_int_rate; //利率
              this.basicForm.rpymt_prd = res.data.rpymt_prd; //还款周期


            }
            if (this.basicForm.orig_repay_way == '1') {
              this.diasabledInput = false;
            } else {
              this.diasabledInput = true;

            }
          })
          .catch(err => {
            this.compareCustomerInfo = "";
            console.error(err);
          })
    },

    submit() {
      if ((this.basicForm.repay_type) === (this.basicForm.orig_repay_way)) {
        this.$message({
          type: "error",
          message: "提示:当前还款方式相同,请注意!"

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
              cust_no: this.basicForm.cust_no, //客户号
              cust_name: this.basicForm.cust_name, // 客户姓名
              prod_no: this.basicForm.prod_no, // 贷款产品
              cert_no: this.basicForm.cert_no, // 合同号
              contract_no: this.basicForm.contract_no, // 合同号
              orig_repay_way: this.basicForm.orig_repay_way, // 原还款方式
              repay_type: this.basicForm.repay_type, // 变更后还款方式
              ccy_code: this.basicForm.ccy_code,   //币种
              remark: this.basicForm.remark,  //备注
              rpymt_prd: this.basicForm.rpymt_prd,//还款周期
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
                    (params.appId = 'plOnl'),
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

    reset() {
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })

    },
    clearData() {

      this.basicForm.loan_no = "";
      this.basicForm.repay_type = "";
      this.basicForm.remark = "";
      this.basicForm.rpymt_prd = "";
      this.basicForm.orig_repay_way = "";
      this.basicForm.ccy_code = "";
      this.basicForm.prod_no = "";

    },

    chageRepaymentPrieds(value){
      this.basicForm.rpymt_prd =value;
    },
    choseRpymtPrd(){
      this.pridsDialogShow = true;
    },
    /**
     * 借据查询详情信息
     */
    lncfnoBlur() {
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
