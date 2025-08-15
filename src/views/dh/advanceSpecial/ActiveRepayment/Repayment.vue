<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>借据信息</span>
          </template>
            <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
              <el-row>
                <el-col :span="8">
                  <el-form-item class="require-asterisk"  label="借据号" prop="lncfno">
                    <el-input v-model="basicForm.lncfno" @blur="lncfnoBlur"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户名称" prop="acctna">
                    <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">  
                  <el-form-item label="起息日期" prop="instdt">
                    <el-input v-model="basicForm.instdt" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="到期日期" prop="matudt">
                    <el-input v-model="basicForm.matudt" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="贷款期限" prop="termfm">
                    <el-input v-model="basicForm.termfm" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                  <el-form-item label="借据金额" prop="lncfam">
                    <el-input v-model="basicForm.lncfam" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="正常本金" prop="lnnpbl">
                    <el-input v-model="basicForm.lnnpbl" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="逾期本金" prop="lnopbl">
                    <el-input v-model="basicForm.lnopbl" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>还款信息</span>
          </template>
          <el-form ref="rePayForm" :rules="rePayRules" :model="rePayForm" label-width="200px" class="custom-common--form">
           <el-row>
               <el-col :span="8">
                <el-form-item class="require-asterisk" label="还款种类" prop="repytp">
                  <el-select v-model="rePayForm.repytp" >
                    <el-option v-for="item in repytpList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item class="require-asterisk" label="还款金额" prop="repyam">
                    <el-input v-model="rePayForm.repyam" ></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item class="require-asterisk" label="网贷平台日期" prop="chckdt">
                    <el-input v-model="rePayForm.chckdt" ></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
               <el-col :span="8">
                  <el-form-item class="require-asterisk" label="网贷平台流水" prop="chcksq">
                    <el-input v-model="rePayForm.chcksq" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="require-asterisk" label="订单号" prop="ordrid">
                    <el-input v-model="rePayForm.ordrid" ></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item class="require-asterisk" label="支付渠道" prop="pychnl">
                    <el-input v-model="rePayForm.pychnl" ></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
               <el-col :span="8">
                <el-form-item class="require-asterisk" label="提前还款类型" prop="adpytp">
                  <el-select v-model="rePayForm.adpytp" >
                    <el-option v-for="item in adpytpList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
               </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>还款</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "repayment",
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: "",//借据号
          custno: "",//客户号
          acctna: "",//客户姓名
          idtfno: "",//证件号码
          prodcd:"",//产品代码
          prodna:"",//产品名称
          lnnpbl:"",//正常本金
          lnopbl:""//逾期本金
        },
        rePayForm: {
          repytp: "",//还款方式
          repyam:"",//还款金额
          chckdt:"",
          chcksq:"",
          ordrid:"",
          pychnl:"",
          adpytp:""
        },
        // compareCustomerInfo:"",
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }]
        },
        rePayRules : {
          repytp: [{ required: true, message: "选择还款方式" }],
          repyam:[{ required: true, message: "请输入还款金额" }],
          chckdt:[{ required: true, message: "请输入平网贷平台日期" }],
          chcksq:[{ required: true, message: "请输入网贷平台流水" }],
          ordrid:[{ required: true, message: "请输入订单号" }],
          pychnl:[{ required: true, message: "请输入支付渠道" }],
          adpytp:[{ required: true, message: "请输入提前还款类型" }]
        },
        repytpList:[],
        adpytpList:[],
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_REPYTP", "repytpList"); // 化贷款形态数据字典
      this.getDictList("E_ADRPTP", "adpytpList"); // 化贷款形态数据字典
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

    getCustomerInfo(){
      console.log("getcoustomerifo");
      if (this.compareCustomerInfo) {
        this.basicForm.custno= "";//客户号
        this.basicForm.acctna= "";//客户姓名
        this.basicForm.idtfno= "";//证件号码
        this.basicForm.prodcd= "";//产品代码
        this.basicForm.prodna= "";//产品名称
        this.$refs["rePayForm"].resetFields();
      }
       console.log("getcoustomerifo=====");
      let params = {
        servicecode: "qrdtln",
        lncfno: this.compareCustomerInfo,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          console.log("setCoustomerifo=====");
          this.basicForm.acctna = res.data.acctna;
          this.basicForm.instdt = res.data.instdt;
          this.basicForm.matudt = res.data.matudt;
          this.basicForm.termfm = res.data.termfm;
          this.basicForm.lncfam = res.data.lncfam;
          this.basicForm.lnnpbl = res.data.lnnpbl;
          this.basicForm.lnopbl = res.data.lnopbl;
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
          this.$refs.rePayForm.validate(valid => {
            if (valid) {
              this.$confirm("是否确认还款?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let params = {
                  servicecode: "nxrepy",
                  lncfno: this.basicForm.lncfno,
                  repytp: this.rePayForm.repytp,
                  repyam: this.rePayForm.repyam,
                  chckdt: this.rePayForm.chckdt,
                  chcksq: this.rePayForm.chcksq,
                  ordrid: this.rePayForm.ordrid,
                  pychnl: this.rePayForm.pychnl,
                  adpytp: this.rePayForm.adpytp

                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                  if (res && res.code === "200") {
                    this.$message({
                      type: "success",
                      message: res.message
                     
                    })
                    this.clearData();
                    window.opener = null;
                    window.open("about:blank", "_top").close();
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
      this.$confirm("是否确认重置还款内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })

    },

    clearData(){
      this.$refs["basicForm"].resetFields();
      this.$refs["rePayForm"].resetFields();
      this.compareCustomerInfo="";
      this.$refs.uploadProp.clearFileList();
    },

    lncfnoBlur(){
      if(this.basicForm.lncfno==="" || this.compareCustomerInfo===this.basicForm.lncfno){
        return false;
      }
      this.compareCustomerInfo=this.basicForm.lncfno;
      this.getCustomerInfo();
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
