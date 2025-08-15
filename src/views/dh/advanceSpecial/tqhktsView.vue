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
                  <el-form-item class="require-asterisk" label="借据号" prop="lncfno">
                    <el-input v-model="basicForm.lncfno" :disabled="true" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户名称" prop="acctna">
                    <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户号" prop="custno">
                    <el-input v-model="basicForm.custno" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="证件号码" prop="idtfno">
                    <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品名称" prop="prodna">
                    <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品代码" prop="prodcd">
                    <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>欠款信息</span>
          </template>
          <el-form ref="debtForm" :model="debtForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="6">
                <el-form-item label="贷款账号" prop="acctno">
                  <el-input v-model="debtForm.acctno" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="逾期金额" prop="lnream">
                  <el-input v-model="debtForm.lnream" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="贷款余额" prop="lnrebl">
                  <el-input v-model="debtForm.lnrebl" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="贷款状态: " prop="clssst">
                  <el-select v-model="debtForm.clssst" :disabled="true" >
                    <el-option v-for="item in loanStatusList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="逾期天数" prop="ovdays">
                  <el-input v-model="debtForm.ovdays" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="正常本金" prop="lnnpbl">
                  <el-input v-model="debtForm.lnnpbl" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="逾期本金" prop="lnopbl">
                  <el-input v-model="debtForm.lnopbl" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="呆滞本金" prop="lndpbl">
                  <el-input v-model="debtForm.lndpbl" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="核销本金" prop="hxxxpr">
                  <el-input v-model="debtForm.hxxxpr" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应计利息" prop="yjlx">
                  <el-input v-model="debtForm.yjlx" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应收欠息" prop="ysqx">
                  <el-input v-model="debtForm.ysqx" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="逾期应计利息" prop="yclixi">
                  <el-input v-model="debtForm.yclixi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="应计罚息" prop="yjfx">
                  <el-input v-model="debtForm.yjfx" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应收罚息" prop="ysxxpi">
                  <el-input v-model="debtForm.ysxxpi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="核销利息" prop="hxlx">
                  <el-input v-model="debtForm.hxlx" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="逾期违约金" prop="ysxxfe">
                  <el-input v-model="debtForm.ysxxfe" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="允许提前结清" prop="issett">
                  <el-select v-model="debtForm.issett" :disabled="true" >
                    <el-option v-for="item in yesTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="允许部分提前还款" prop="ispart">
                  <el-select v-model="debtForm.ispart" :disabled="true" >
                    <el-option v-for="item in yesTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="银行卡号" prop="rpacno">
                  <el-input v-model="debtForm.rpacno" :disabled="true"></el-input>
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
<!--            <el-row>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item class="require-asterisk" label="申请原因" prop="reason">-->
<!--                  <el-select-->
<!--                    v-model="appForm.reason"-->
<!--                    placeholder="请选择" :disabled="true" >-->
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
                <el-col :span="12">
                    <el-form-item class="require-asterisk" label="附件上传" prop="fileList">
                      <upload-file-view  v-if="showComponent" ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="true"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" :disabled="true" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";

export default {
    name: "tqhktsView",
    components: {
      UploadFileView,
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
          acctna: "",//客户姓名
          idtfno: "",//证件号码
          prodcd:"",//产品代码
          prodna:""//产品名称
        },
        debtForm: { // 欠款信息表单对象
          acctno: "",//贷款账号
          lnream: "",//逾期金额
          lnrebl: "",//贷款余额
          clssst: "",//贷款状态
          ovdays: "",//逾期天数
          lnnpbl: "",//正常本金
          lnopbl: "",//逾期本金
          lndpbl:"",//呆滞本金
          hxxxpr:"",//核销本金
          yjlx:"",//应计利息
          ysqx:"",//应收欠息
          yclixi:"",//逾期应计利息
          yjfx:"",//应计罚息
          ysxxpi:"",//应收罚息
          hxlx:"",//核销利息
          ysxxfe:"",//逾期违约金
          issett:"",//是否允许提前结清
          ispart:"",//是否允许部分提前还款
          rpacno:""//银行卡号
        },
        appForm: {
          reason: "",//申请原因
          fileList:[],//附件
          remark:""//备注
        },
        fileList:[],
        compareCustomerInfo:"",
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }]
        },
        appRules : {
          reason: [{ required: true, message: "请输入申请原因" }],
          fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
        },
        reasonTypeList:[],
        loanStatusList:[],
        showComponent:true,
        activeNames: ["1", "2","3"]
      }
    },
    created() {
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("E_ADJRS", "reasonTypeList"); // 初始化原因数据字典
      this.getDictList("E_YES___", "yesTypeList"); // 初始化是否数据字典
      this.getApplyInfo();
    },

    methods: {
        /**
     * 附件校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
     fileListValidate(value, rule, callback) {
       if (this.appForm.fileList.length === 0) {
         return callback(new Error("请上传附件材料"));
       }
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

      getApplyInfo(){
        var vm = this;
        let params = {
          servicecode: "PLMSKGTS0092",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.basicForm.lncfno = res.data.applyInfo.lncfno; //客户号
              this.basicForm.custno = res.data.applyInfo.custno; //客户号
              this.basicForm.acctna = res.data.applyInfo.acctna; // 客户姓名
              this.basicForm.idtfno = res.data.applyInfo.idtfno; // 证件号码
              this.basicForm.phoneno =res.data.applyInfo.phoneno; // 手机号码
              this.basicForm.prodcd = res.data.applyInfo.prodcd; // 产品编号
              this.basicForm.prodna = res.data.applyInfo.prodna; // 产品名称

              this.appForm.reason = res.data.applyInfo.reason; //原因
              this.appForm.remark = res.data.applyInfo.remark; //备注

              this.getCustomerInfo();

              vm.appForm.fileList = res.data.fileList;
              this.showComponent=false;
              this.$nextTick(()=>{
                this.showComponent=true;
              })
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      getCustomerInfo(){
        let params = {
          servicecode: "PLMSKGTS0085",
          lncfno: this.basicForm.lncfno,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.basicForm = res.data.loanInfo;
              this.debtForm = res.data.loanInfo;;
              this.debtForm.lnream = this.nubFormat(parseFloat(res.data.loanInfo.lnream) + parseFloat(res.data.loanInfo.yclixi),2);
              this.debtForm.yjlx = this.nubFormat(Number(res.data.loanInfo.ysyjni) + Number(res.data.loanInfo.csyjni),2);
              this.debtForm.ysqx = this.nubFormat(parseFloat(res.data.loanInfo.ysxxoi) + parseFloat(res.data.loanInfo.csxxoi), 2);
              this.debtForm.yjfx = this.nubFormat(parseFloat(res.data.loanInfo.ysyjpi) + parseFloat(res.data.loanInfo.csyjpi),2);
              this.debtForm.yclixi = this.nubFormat(res.data.loanInfo.yclixi,2);
              this.debtForm.hxlx = this.nubFormat(parseFloat(res.data.loanInfo.hxxxin) + parseFloat(res.data.loanInfo.hxxxoi) + parseFloat(res.data.loanInfo.hxprin), 2); //核销利息
              this.debtForm.issett = res.data.lnbSchdRule.issett;
              this.debtForm.ispart = res.data.lnbSchdRule.ispart;
            }
          })
          .catch(err => {
            console.error(err);
          })
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
