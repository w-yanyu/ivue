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
                  <el-form-item class="require-asterisk"  label="借据号" prop="lncfno">
                    <el-input v-model="basicForm.lncfno" @blur="lncfnoBlur" clearable></el-input>
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
                  <el-form-item label="区域中心" prop="areaCenter">
                    <el-input v-model="basicForm.areaCenter" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="贷款形态" prop="clssst">
                    <el-select
                      v-model="basicForm.clssst"
                      placeholder="请选择"
                      :disabled="true">
                      <el-option
                        v-for="item in clssstList"
                        :key="item.value"
                        :label="item.dictName"
                        :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="逾期天数" prop="ovdays">
                    <el-input v-model="basicForm.ovdays" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否联合贷" prop="isunitln">
                    <el-select
                      v-model="basicForm.isunitln"
                      placeholder="请选择"
                      :disabled="true">
                      <el-option
                        v-for="item in isunitlnList"
                        :key="item.value"
                        :label="item.dictName"
                        :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联合贷公司名称" prop="unitname">
                    <el-input v-model="basicForm.unitname" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="当前委案机构" prop="noworg">
                    <el-input v-model="appForm.noworg" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="require-asterisk" label="收案原因" prop="cogncause">
                    <el-select
                      v-model="appForm.cogncause"
                      placeholder="请选择"
                      clearable>
                      <el-option
                        v-for="item in cogncauseTypeList"
                        :key="item.value"
                        :label="item.dictName"
                        :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="appForm.remark" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "Cognappl",
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: "",//借据号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodna: "",//产品名称
          areaCenter: "",//区域中心
          clssst: "",//贷款形态
          ovdays:"",//逾期天数
          isunitln:"",//是否联合贷
          unitname:""//联合贷公司名称
        },
        appForm: {
          noworg: "",//当前委案机构
          cogncause: "1",//收案原因
          remark:""//备注
        },
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }]
        },
        appRules : {
          cogncause: [{ required: true, message: "请输入收案原因" }]
        },
        cogncauseTypeList:[],
        loanStatusList:[],
        activeNames: ["1", "2","3"]
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 贷款形态数据字典
      this.getDictList("E_COGN_CAUSE", "cogncauseTypeList"); // 收案原因
      this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷
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
    getCustomerInfos(){
      let params = {
        servicecode: "RLMSPLTS1099",
        lncfno: this.basicForm.lncfno,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          this.basicForm = res.data.suitapply;
          this.appForm.noworg = res.data.suitapply.noworg;
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
                  servicecode: "RLMSPLTS1098",
                  lncfno: this.basicForm.lncfno,
                  acctna: this.basicForm.acctna , //客户名称
                  idtfno:this.basicForm.idtfno, // 客户姓名
                  phonno:this.basicForm.phonno , // 手机号码
                  prodna:this.basicForm.prodna , // 产品名称
                  areaCenter:this.basicForm.areaCenter , // 区域中心
                  clssst:this.basicForm.clssst , // 贷款形态
                  ovdays:this.basicForm.ovdays,   //逾期天数
                  isunitln:this.basicForm.isunitln,  //是否联合贷
                  unitname:this.basicForm.unitname,  //联合贷公司名称

                  noworg:this.appForm.noworg,   //当前委案机构
                  cogncause:this.appForm.cogncause,  //收案原因
                  remark:this.appForm.remark,  //备注
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
        }
      });
    },

    // reset(){
    //   this.$confirm("是否确认重置申请内容?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     this.clearData();
    //   })

    // },

    clearData(){
      // this.$refs["basicForm"].resetFields();
      // this.$refs["appForm"].resetFields();
      this.appForm.cogncause= "";
      this.appForm.remark= "";
      this.fileList=[];
      this.compareCustomerInfo="";
      this.$refs.uploadProp.clearFileList();
    },

    lncfnoBlur(){
      if(this.basicForm.lncfno==="" || this.compareCustomerInfo===this.basicForm.lncfno){
        return false;
      }else {
      // this.compareCustomerInfo=this.basicForm.lncfno;
      this.getCustomerInfos();
      }
    },
      // /**
      //  * 数字格式化成金额
      //  * @param  金额
      //  * @param 小数点后面有几位 (四舍五入到指定的位数)
      //  *
      //  */
      // nubFormat(s, n) {
      //   n = n > 0 && n <= 20 ? n : 2;
      //   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      //   var l = s.split(".")[0].split("").reverse(),
      //     r = s.split(".")[1];
      //   var t = "";
      //   for (var i = 0; i < l.length; i++) {
      //     t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      //   }
      //   return (t.split("").reverse().join("") +"." +r);
      // }
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
