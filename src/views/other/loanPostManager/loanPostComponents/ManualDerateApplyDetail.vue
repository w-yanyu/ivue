<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
        <template slot="title">
          <span><em></em>基本信息</span>
        </template>
        <el-form  ref="basicForm" :model="basicForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="借据号">
                <el-input v-model="basicForm.lncfno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称">
                <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户号">
                <el-input v-model="basicForm.custno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码">
                <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品代码">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="减免历史">
                <el-button type="primary" size="small" @click="queryReduHis">减免历史</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
             
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="second">
        <template slot="title">
          <span><em></em>欠款信息</span>
        </template>
        <el-form ref="debtForm" :model="debtForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="贷款账号">
                <el-input v-model="debtForm.acctno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期金额">
                <el-input v-model="debtForm.lnreamTotal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款余额">
                <el-input v-model="debtForm.lnrebl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款状态">
                <el-select v-model="debtForm.clssst" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in clssstList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期天数">
                <el-input v-model="debtForm.ovdays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常本金">
                <el-input v-model="debtForm.lnnpbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期本金">
                <el-input v-model="debtForm.lnopbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆滞本金">
                <el-input v-model="debtForm.lndpbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核销本金">
                <el-input v-model="debtForm.hxxxpr" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应计利息">
                <el-input v-model="debtForm.yjxxni" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收欠息">
                <el-input v-model="debtForm.ysxxoiTotal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期应计利息">
                <el-input v-model="debtForm.yclixi" :disabled="true"></el-input> 
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应计罚息">
                <el-input v-model="debtForm.yjxxpi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收罚息">
                <el-input v-model="debtForm.ysxxpiTotal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核销利息">
                <el-input v-model="debtForm.hxxxinTotal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期违约金">
                <el-input v-model="debtForm.ysxxfe" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="third">
        <template slot="title">
          <span><em></em>调整信息</span>
        </template>
        <el-form ref="adjustForm" :model="adjustForm" label-width="200px" class="custom-common--form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="减免方式" prop="remthd">
                <el-select v-model="adjustForm.remthd" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in remthdList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                    :disabled="Number(debtForm.lnopbl) > 0 && item.dictId === '1'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免类型" prop="remttp">
                <el-select v-model="adjustForm.remttp" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in remttpList"
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
              <el-form-item label="调整申请原因" prop="adjrsn">
                <el-select v-model="adjustForm.adjrsn" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in adjrsnList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户申请减免时间" prop="khjmsqsj">
                <el-date-picker
                 v-model="adjustForm.khjmsqsj"
                 type="date"
                 placeholder="选择日期"
                 format="yyyy-MM-dd"
                 value-format="yyyyMMdd"
                 :picker-options="khjmsqsjOptions"
                 :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="adjustForm.remthd === '3'">
              <el-form-item label="预约减免有效期" prop="yyjmyxq">
                <el-date-picker
                 v-model="adjustForm.yyjmyxq"
                 type="date"
                 placeholder="选择日期"
                 format="yyyy-MM-dd"
                 value-format="yyyyMMdd"
                 :picker-options="pickerOptions"
                 :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="减免利息" prop="jmlixi">
                <el-input v-model="adjustForm.jmlixi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免罚息" prop="jmfaxi">
                <el-input v-model="adjustForm.jmfaxi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免逾期违约金" prop="jmznf">
                <el-input v-model="adjustForm.jmznf" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免总金额">
                <el-input v-model="adjustForm.dtsfam" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" ">
                <el-checkbox v-model="adjustForm.urgent" true-label="1" false-label="0" :disabled="true">已获得管理层审批</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item :label="$i18ns('备注')" prop="remark">
                <el-input v-model="adjustForm.remark" type="textarea" resize="none" :rows="4" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份证附件" prop="attachmentList">
                <div class="file-container" v-for="item in uploadFileList" :key="item.buctetKey">
                  <p class="file-name">{{item.name}}</p>
                  <el-button type="primary" size="small" class="file-btn" @click="downloadFile(item)">{{$i18ns('下载')}}</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请书附件">
                <div class="file-container" v-for="item in apanneFileList" :key="item.buctetKey">
                  <p class="file-name">{{item.name}}</p>
                  <el-button type="primary" size="small" class="file-btn" @click="downloadFile(item)">{{$i18ns('下载')}}</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="征信报告附件">
                <div class="file-container" v-for="item in cdtaneFileList" :key="item.buctetKey">
                  <p class="file-name">{{item.name}}</p>
                  <el-button type="primary" size="small" class="file-btn" @click="downloadFile(item)">{{$i18ns('下载')}}</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="其他证据附件">
                <div class="file-container" v-for="item in otbaneFileList" :key="item.buctetKey">
                  <p class="file-name">{{item.name}}</p>
                  <el-button type="primary" size="small" class="file-btn" @click="downloadFile(item)">{{$i18ns('下载')}}</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <credit-report-info
            :show-dialog="showCreditInfo"
            :cardno="basicForm.idtfno"
            @creditClose="showClose"
            v-if="showCreditInfo"
          />
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-dialog
        v-if = "isLookShow"
        title="减免历史"
        :visible.sync="isLookShow"
        width="1200px"
        :show-close="isLookShow">
      <to-json to-url="/views/other/loanPostManager/redu_history_list.json" :params="lncfnoObj"></to-json>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import accounting from "pte-ui/utils/accounting";
import CreditReportInfo from "../loanPostComponents/CreditReportInfo";

export default {
  name: "ManualDerateApply",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {
    CreditReportInfo,
  },
  data() {
    return {
      activeNasmes: ["first", "second", "third"],
      basicForm: {
        lncfno: "",
        acctna: "",
        custno: "",
        idtfno: "",
        prodna: "",
        prodcd: "",
      },
      debtForm: {
        acctno: "",
        lnreamTotal: "",
        lnrebl: "",
        clssst: "",
        ovdays: "",
        lnnpbl: "",
        lnopbl: "",
        lndpbl: "",
        hxxxpr: "",
        yjxxni: "",
        ysxxoiTotal: "",
        yclixi: "",
        yjxxpi: "",
        ysxxpiTotal: "",
        hxxxinTotal: "",
        ysxxfe: "",
      },
      compareLncfno: "", // 借据号对比字段
      clssstList: [], // 贷款状态下拉
      adjustForm: {
        remthd: "",
        dtsfam: "",
        jmlixi: "",
        jmfaxi: "",
        jmznf: "",
        urgent: "0",
        remttp: "",
        adjrsn: "",
        khjmsqsj: "",
        yyjmyxq: "",
        yyjmyxqDisableDate: "",
        remark: "",
        upload: [],
        apanne: [],
        cdtane: [],
        otbane: [],
      },
      remthdList: [], // 减免方式下拉
      remttpList: [], // 减免类型下拉
      adjrsnList: [], // 调整申请原因下拉
      uploadFileList: [], // 身份证附件文件列表
      apanneFileList: [], // 申请书附件文件列表
      cdtaneFileList: [], // 征信报告附件列表
      otbaneFileList: [], // 其他证据附件列表
      urgentRule: [], // 是否获得管理层审批表单校验
      khjmsqsjOptions: {}, // 客户申请减免时间有效期控件配置
      pickerOptions: {}, // 预约减免有效期控件配置
      isLookShow: false, // 弹出框显示/隐藏控制 减免历史
      showCreditInfo: false, // 弹出框显示/隐藏控制人行征信
      lncfnoObj:{
        lncfno:"",
      }
    }
  },
  computed: {
    debtTotal() {
      let total = this.sumCalc(this.adjustForm.jmlixi, this.adjustForm.jmfaxi, this.adjustForm.jmznf);
      return total;
    }
  },
  created() {
    // 客户申请减免时间有效期控件配置 返回值为 true 则禁用该日期
    this.khjmsqsjOptions.disabledDate = time => {
      return (time.getTime() > new Date().getTime());
    }
    // 预约减免有效期控件配置 返回值为 true 则禁用该日期
    this.pickerOptions.disabledDate = time => {
      let maxDate = this.adjustForm.yyjmyxqDisableDate ? this.$moment(this.adjustForm.yyjmyxqDisableDate)._d.getTime() : Date.now();
      return (time.getTime() > maxDate || time.getTime() <= new Date().getTime() - 86400000);
    }
    this.getDictList("E_CLSSST", "clssstList"); // 获取贷款状态下拉
    this.getDictList("E_REMTHD", "remthdList"); // 获取减免方式下拉
    this.getDictList("E_REMTTP", "remttpList"); // 获取减免类型下拉
    this.getDictList("E_ADJRS", "adjrsnList"); // 调整申请原因下拉
    // 减免信息初始化
    this.getDerateInfo();
  },
  methods: {
    /**
     * 获取减免信息
     */
    getDerateInfo() {
      let params = {
        servicecode: "AS_PLMS_KG_QRYREDU",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const customerLoan = res.data.customerLoan;
            const lnsReduApplyInfo = res.data.lnsReduApplyInfo;
            const redupara = res.data.redupara;
            // 基本信息带回
            this.basicForm.lncfno = customerLoan.lncfno;
            this.basicForm.acctna = customerLoan.acctna;
            this.basicForm.custno = customerLoan.custno;
            this.basicForm.prodna = customerLoan.prodna;
            this.basicForm.idtfno = customerLoan.idtfno;
            this.basicForm.prodcd = customerLoan.prodcd;
            // 欠款信息填充
            this.debtForm.acctno =  customerLoan.acctno;
            this.debtForm.lnreamTotal = this.sumCalc(customerLoan.lnream, customerLoan.yclixi);
            this.debtForm.lnrebl = customerLoan.lnrebl;
            this.debtForm.clssst = customerLoan.clssst;
            this.debtForm.ovdays = customerLoan.ovdays;
            this.debtForm.lnnpbl = customerLoan.lnnpbl;
            this.debtForm.lnopbl = customerLoan.lnopbl;
            this.debtForm.lndpbl = customerLoan.lndpbl;
            this.debtForm.hxxxpr = customerLoan.hxxxpr;
            this.debtForm.yjxxni = this.sumCalc(customerLoan.ysyjni, customerLoan.csyjni); // 应计利息 = 应收应计利息 + 催收应计利息
            this.debtForm.ysxxoiTotal = this.sumCalc(customerLoan.ysxxoi, customerLoan.csxxoi); // 应收欠息（总） = 应收应计利息 + 催收欠息
            this.debtForm.yclixi = Number(customerLoan.yclixi).toFixed(2);
            this.debtForm.yjxxpi = this.sumCalc(customerLoan.ysyjpi, customerLoan.csyjpi); // 应计罚息 = 应收应计罚息 + 催收应计罚息
            this.debtForm.ysxxpiTotal = this.sumCalc(customerLoan.ysxxpi, customerLoan.csxxpi); // 应收罚息(总) = 应收罚息 + 催收罚息
            this.debtForm.hxxxinTotal = this.sumCalc(customerLoan.hxxxin, customerLoan.hxxxoi, customerLoan.hxprin); // 核销利息(总) = 核销利息隐藏 + 核销欠息 + 核销本金利息
            this.debtForm.ysxxfe = customerLoan.ysxxfe;
            // 调整信息带回
            this.adjustForm.remthd = lnsReduApplyInfo.remthd;
            this.adjustForm.remttp = lnsReduApplyInfo.remttp;
            this.adjustForm.adjrsn = lnsReduApplyInfo.adjrsn;
            this.adjustForm.khjmsqsj = lnsReduApplyInfo.khjmsqsj;
            this.adjustForm.yyjmyxq = lnsReduApplyInfo.yyjmyxq;
            this.adjustForm.jmlixi = lnsReduApplyInfo.jmlixi;
            this.adjustForm.jmfaxi = lnsReduApplyInfo.jmfaxi;
            this.adjustForm.jmznf = lnsReduApplyInfo.jmznf;
            this.adjustForm.dtsfam = lnsReduApplyInfo.dtsfam;
            this.adjustForm.urgent = lnsReduApplyInfo.urgent;
            this.adjustForm.remark = lnsReduApplyInfo.remark;
            // 调整信息文件信息带回
            lnsReduApplyInfo.idanne.forEach(item => {
              const fileMap = {
                bucket: item.bucket,
                buctetKey: item.buctetKey,
                name: item.fileName,
                status: "success",
              }
              const pathMap = {
                name: item.fileName,
                path: item.filePath,
              }
              this.uploadFileList.push(fileMap);
              this.adjustForm.upload.push(pathMap);
            });
            lnsReduApplyInfo.apanne.forEach(item => {
              const fileMap = {
                bucket: item.bucket,
                buctetKey: item.buctetKey,
                name: item.fileName,
                status: "success",
              }
              const pathMap = {
                name: item.fileName,
                path: item.filePath,
              }
              this.apanneFileList.push(fileMap);
              this.adjustForm.apanne.push(pathMap);
            });
            lnsReduApplyInfo.cdtane.forEach(item => {
              const fileMap = {
                bucket: item.bucket,
                buctetKey: item.buctetKey,
                name: item.fileName,
                status: "success",
              }
              const pathMap = {
                name: item.fileName,
                path: item.filePath,
              }
              this.cdtaneFileList.push(fileMap);
              this.adjustForm.cdtane.push(pathMap);
            });
            lnsReduApplyInfo.otbane.forEach(item => {
              const fileMap = {
                bucket: item.bucket,
                buctetKey: item.buctetKey,
                name: item.fileName,
                status: "success",
              }
              const pathMap = {
                name: item.fileName,
                path: item.filePath,
              }
              this.otbaneFileList.push(fileMap);
              this.adjustForm.otbane.push(pathMap);
            });
          }
        })
    },
    /**
     * 求和
     */
    sumCalc() {
      let list = [...arguments];
      list = list.map(item => Number(item));
      return Number(this.print(this.$math.sum(this.$math.bignumber(list)))).toFixed(2);
    },
    /**
     * 格式化
     * @param value 传入值
     */
    print(value) {
      const precision = 14;
      return this.$math.format(value, precision);
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
      this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
      .then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      })
      .catch(err => { 
        console.error(err);
      });
    },
    /**
     * 减免方式focus回调
     */
    remthdFocus() {
      if (Number(this.debtForm.lnopbl) > 0) {
        this.$set(this.remthdList[0], "disabled", true);
      } else {
        this.$set(this.remthdList[0], "disabled", false);
      }
    },
    /**
     * 下载文件
     * @param file 文件对象
     */
    downloadFile(file) {
      this.getBase64Url(file.buctetKey, file.bucket, file.name);
    },
    /**
     * 获取base64文件流
     * @param fileUrl 对象存储路径
     * @param bucket 捅名
     */
    getBase64Url(fileUrl, bucket, fileName) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: fileUrl,
        bucket: bucket,
      };
      this.$http
        .invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.downloadBase64(res.data.filebase64Str, fileName);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 将base64文件下载到本地
     * @param base64Url base64文件流
     * @param fileName 文件名称
     */
    downloadBase64(base64Url, fileName) {
      let byteCharacters = atob(base64Url);
      let byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      let blob = new Blob([byteArray], { type: "application/octet-stream" });
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
      } else {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    },
    queryReduHis(){
      this.isLookShow = true
      this.lncfnoObj.lncfno = this.basicForm.lncfno
    },
    showReport(){
      if (this.basicForm.idtfno==="") {
        this.$message({
          type: "warning",
          message: "请先输入身份证号信息"
        });
        return;
      }
      this.showCreditInfo = true;
    },
    showClose() {
      this.showCreditInfo = false;
    },
  }
}
</script>
<style lang="less" scoped>
  .file-container {
    overflow: hidden;
    margin-bottom: 4px;
    .file-name {
      width: calc(100% - 60px);
      margin: 0;
      float: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color: #368ee0;
    }
    .file-btn {
      width: 60px;
      float: left;
    }
  }
</style>