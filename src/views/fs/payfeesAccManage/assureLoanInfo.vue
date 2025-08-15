<template>
  <div>
      <el-row>
        <el-col :span="8">
          <el-form-item class="require-asterisk" label="借据号" prop="lncfno">
            <el-input v-model="basicForm.lncfno" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="acctna">
            <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="idtfno">
            <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phonno">
            <el-input v-model="basicForm.phonno" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="prodna">
            <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="区域中心" prop="zubhno">
            <el-input v-model="basicForm.zubhno" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="贷款形态" prop="clssst">
            <el-select v-model="basicForm.clssst" prop="clssst" :disabled="true">
              <el-option
                v-for="(item,i) in clssstList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="逾期天数" prop="ovdays">
            <el-input v-model="basicForm.ovdays" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否联合贷" prop="isUnionLoan">
            <el-input v-model="basicForm.isUnionLoan" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联合贷公司名称" prop="unionComp">
            <el-input v-model="basicForm.unionComp" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import ImagePreview from "COM/ImagePreview";

  export default {
    name: "assureloanInfo",
    props: {
      param : "",
    },
    components: {
      ImagePreview
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: this.param,//借据号
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
        clssstList: [],   //贷款形态
        compareCustomerInfo: "",
        isDisabled: false,
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 初始化贷款形态数据字典
      this.getLoanInfo();
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

      getLoanInfo() {
        if (this.basicForm.lncfno === "" || this.compareCustomerInfo === this.basicForm.lncfno) {
          return false;
        }
        this.compareCustomerInfo = this.basicForm.lncfno;
        let params = {
          servicecode: "RLMSPLTS1403",
          lncfno: this.compareCustomerInfo,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.basicForm.custno = res.data.loanInfo.custno;//客户号
              this.basicForm.acctna = res.data.loanInfo.acctna;//客户名称
              this.basicForm.idtfno = res.data.loanInfo.idtfno;//证件号码
              this.basicForm.phonno = res.data.loanInfo.phonno;//手机号码
              this.basicForm.prodcd = res.data.loanInfo.prodcd;//产品代码
              this.basicForm.prodna = res.data.loanInfo.prodna;//产品名称
              this.basicForm.zubhno = res.data.loanInfo.zubhno;//区域中心
              this.basicForm.clssst = res.data.loanInfo.clssst;//贷款形态
              this.basicForm.ovdays = res.data.loanInfo.ovdays;//逾期天数
              this.basicForm.isUnionLoan = res.data.loanInfo.isUnionLoan;//是否联合贷
              this.basicForm.unionComp = res.data.loanInfo.unionComp;//联合贷公司名称
              this.$emit('changeBasic',  this.basicForm, res.data.feeInfo)
            }
          })
          .catch(err => {
            this.compareCustomerInfo = "";
            console.error(err);
          })
      },


      clearData(){
        this.compareCustomerInfo = "";
        this.basicForm={ // 基础信息表单对象
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
        };
      },
    },

  }
</script>
<style lang="less" scoped>
  .el-dialog-dev{
    max-height:70vh;
    overflow:auto;
  }
</style>
