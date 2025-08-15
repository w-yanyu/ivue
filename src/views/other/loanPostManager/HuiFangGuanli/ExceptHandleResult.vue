<template>
  <div>
    <div class="basic-information">
      <el-collapse v-model="activeNames">
        <!-- 申请信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <span>
              <em></em>申请信息
            </span>
          </template>
          <el-form :model="basicForm" :rules="basicRule" ref="basicForm" class="search-form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="借据号" prop="lncfno" label-width="120px">
                  <el-input v-model="basicForm.lncfno" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phoneno" label-width="120px">
                  <el-input v-model="basicForm.phoneno" disabled></el-input>
                </el-form-item>
                <el-form-item label="放款金额" prop="loanamt" label-width="120px">
                  <el-input v-model="basicForm.loanamt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户姓名" prop="acctna" label-width="120px">
                  <el-input v-model="basicForm.acctna" disabled></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="prodna" label-width="120px">
                  <el-input v-model="basicForm.prodna" disabled></el-input>
                </el-form-item>
                <el-form-item label="贷款余额" prop="lendbl" label-width="120px">
                  <el-input v-model="basicForm.lendbl" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="idtfno" label-width="120px">
                  <el-input v-model="basicForm.idtfno" disabled></el-input>
                </el-form-item>
                <el-form-item label="贷款状态" prop="clssst" label-width="120px">
                  <el-select v-model="basicForm.clssst" disabled style="width:303px;">
                    <el-option
                      v-for="(item, index) in clssstOptions"
                      :key="index"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="批次号" prop="batchnum" label-width="120px">
                  <el-input v-model="basicForm.batchnum" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <!-- 回访结果列表 -->
        <el-collapse-item name="2">
          <template slot="title">
            <span>
              <em></em>回访结果列表
            </span>
          </template>
          <el-table :data="reviewData" fixed="right" border>
            <el-table-column label="#" type="index" fixed></el-table-column>
            <el-table-column label="批次号" prop="batchnum"></el-table-column>
            <el-table-column label="借据号" prop="lncfno"></el-table-column>
            <el-table-column label="客户名称" prop="acctna"></el-table-column>
            <el-table-column label="手机号码" prop="phoneno"></el-table-column>
            <el-table-column label="产品名称" prop="prodna"></el-table-column>
            <el-table-column label="放款日期" prop="lona_date"></el-table-column>
            <el-table-column label="放款金额" prop="loanamt"></el-table-column>
            <el-table-column label="贷款用途" prop="loan_purpose">
              <template slot-scope="scope">{{chargeSituation(scope.row.loan_purpose)}}</template>
            </el-table-column>
            <el-table-column label="回访完成时间" prop="complete_time" width="110px"></el-table-column>
            <el-table-column label="通话结果" prop="call_result">
              <template slot-scope="scope">{{callResult(scope.row.call_result)}}</template>
            </el-table-column>
            <el-table-column label="通话类型" prop="call_type">
              <template slot-scope="scope">{{callType(scope.row.call_type)}}</template>
            </el-table-column>
            <el-table-column label="收费情况" prop="charge_situation">
              <template slot-scope="scope">{{chargeSituation(scope.row.charge_situation)}}</template>
            </el-table-column>
            <el-table-column label="培训结果" prop="train_result">
              <template slot-scope="scope">{{trainTranslate(scope.row.train_result)}}</template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <!-- 异常处置 -->
        <el-collapse-item name="3">
          <template slot="title">
            <span>
              <em></em>异常处置
            </span>
          </template>
          <el-form :model="exceptForm" :rules="exceptRule" ref="exceptForm" class="search-form">
            <el-row v-for="(item, index) in exceptForm.locfnos" :key="index">
              <el-col :span="12">
                <el-form-item :label="item.fileType" label-width="120px" :prop="'locfnos.'+index+'.abnormal_type'">
                  <el-radio-group v-model="item.isornot">
                    <el-radio label="1" :disabled="disableState">确认异常</el-radio>
                    <el-radio label="2" :disabled="disableState">解决异常</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="附件信息">
                  <el-row v-for="(ele, key) in item.buctetKey.split(',')" :key="key">
                    <el-col :span="16" class="download-text">{{item.fileName.split("\b")[key]}}</el-col>
                    <el-col :span="8">
                      <el-button type="primary" size="small" @click="fileDownload(item.bucket, ele, item.fileName.split('\b')[key])">{{$i18ns('下载')}}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('备注:')"
                  label-width="120px"
                  :prop="'locfnos.'+index+'.remark'"
                  :rules="rules.remark"
                >
                  <el-input
                    type="textarea"
                    v-model="item.remark"
                    rows="2"
                    show-word-limit
                    :disabled="disableState"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="quota-footer" style="text-align:center">
              <el-col :span="24">
                <el-button
                  type="primary"
                  size="small"
                  @click="submit('exceptForm')"
                  :disabled="disableState"
                >提交</el-button>
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
import PictProductMange from "./PictProductMange";

export default {
  name: "ExceptHandleResult",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    credential: Object,
  },
  data() {
    return {
      basicForm: {
        //异常队列管理搜索框字段声明
        batchnum: "", //批次号
        lncfno: "", //借据号
        acctna: "", //客户名称
        loanamt: "", //放款金额
        prodna: "", //产品名称
        lendbl: "", //贷款金额
        phoneno: "", //手机号码
        idtfno: "", //证件号码
        clssst: "" //贷款状态
      },
      disableState: false, //禁用状态
      basicRule: {}, //申请信息校验
      clssstOptions: [], //贷款状态选项
      activeNames: ["1", "2", "3"], // 初始化全部展开折叠面板
      reviewData: [], //回访结果列表
      exceptForm: {
        index: "",
        abnormal_type: "", //异常类型 1：确认异常，2：解除异常
        locfnos: [],
      },
      abnormaltypeList: [], //异常处置类型列表
      trainResultList: [], //培训结果选项列表
      chargeSituationList: [], //收费情况选项列表
      loanPurposeList: [], //贷款用途选项列表
      callTypeList: [], //通话类型选项列表
      callResultList: [], //通话结果选项列表

      rules: {
        remark: [
          { required: true, message: "备注不能为空", trigger: "change" }
        ],
        credential: [
          { required: true, message: "请上传附件", trigger: "change" }
        ],
        file_name: [
          {trigger: "change"}
        ]
      },
    };
  },
  created() {
    this.getDictList("E_CLSSST", "clssstOptions"); //初始化贷款数据字典
    this.getDictList("E_YICLXING", "abnormaltypeList"); //异常类型数据字典
    this.getDictList("E_PEIXJG","trainResultList"); //培训结果数据字典
    this.getDictList("E_SHOUFQK","chargeSituationList"); //收费情况数据字典
    this.getDictList("E_DAIKYTU","loanPurposeList"); //贷款用途数据字典
    this.getDictList("E_TONGHLX","callTypeList"); //通话类型数据字典
    this.getDictList("E_TONGHJG","callResultList"); //通话结果数据字典
    this.topInit(); //申请信息初始化
    this.getReviewData(); //初始化回访结果列表
    this.getAbnormalTypeList(); //初始化异常处置类型列表
  },
  methods: {
    /**
     * 申请信息初始化
     */
    topInit() {
      this.basicForm.batchnum = this.cParentParams.batchnum;
      this.basicForm.lncfno = this.cParentParams.lncfno;
      this.basicForm.acctna = this.cParentParams.acctna;
      this.basicForm.loanamt = this.cParentParams.loanamt;
      this.basicForm.prodna = this.cParentParams.prodna;
      this.basicForm.lendbl = this.cParentParams.lendbl;
      this.basicForm.phoneno = this.cParentParams.phoneno;
      this.basicForm.idtfno = this.cParentParams.idtfno;
      this.basicForm.clssst = this.cParentParams.clssst;
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
    /**
     * 获取回访管理列表
     */
    getReviewData() {
      let params = {
        servicecode: "PLMSKGTS0058",
        batchnum: this.cParentParams.batchnum, //批次号
        lncfno: this.cParentParams.lncfno //借据号
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.reviewData = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 初始化异常处置类型列表
     */
    getAbnormalTypeList() {
        this.disableState = true;
        let params = {
          servicecode: "PLMSKGTS0071",
          batchnum: this.cParentParams.batchnum, //批次号
          lncfno: this.cParentParams.lncfno, //借据号
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.exceptForm.locfnos = res.data;
            }
          })

          .catch(err => {
            console.error(err);
          });
    },
    /**
     * 附件添加文件回调
     * @param item 当前item对象
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    attachmentChange(item, idx, file, fileList) {

      let filePath = "";
      let fileName = "";
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      formData.append("path", "PD");
      MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            file.status = "success";
            item.credential.push("filePath = "+res.data.path);
            item.file_name.push("fileName = "+file.name);
            if (fileList.length === 1) {
              this.$refs["exceptForm"].validateField("locfnos."+idx+".credential");
              console.log("---------======111====---------========");
            }
          } else {
            item.credential.splice(fileList.indexOf(file), 1);
            this.$message({
              type: "error",
              message: "上传失败！"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
      //}
    },
         /**
    * 下载上传附件
    */
    downLoadFile(file,fileList) {
      var vm = this;
      let index = null;
      vm.currentFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      var params = {};
      params.path = vm.creditApplyForm.fileList[index].filePath;
      if(params.path === "") {
        vm.$message({
          type: "warning",
          message: "该附件未上传"
        })
      }else {
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          var filename =  vm.creditApplyForm.fileList[index].fileName;
          let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
          var a = document.createElement("a");
          a.download = filename;
          a.style.display = "none";
          a.href = window.URL.createObjectURL(URL);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 附件移除文件回调
     * @param item 当前item对象
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    attachmentRemove(item, idx, file, fileList) {
      let index = null;
      item.credential.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      item.credential.splice(index, 1);
      if (fileList.length === 0) {
        console.log(item);
        this.$refs["exceptForm"].validateField("locfnos."+idx+".credential");
      }
    },
    /**
     * 异常类型数据字典转译
     */
    getExceptTypeName(val){
      for (let i = 0; i < this.abnormaltypeList.length; i++){
        const a =  this.abnormaltypeList[i];
        if (val === a.dictId) {
          return a.dictName;
        }
      }
    },
    /**
     * 培训结果数据字典转换
     */
    trainTranslate(val) {
      for (let index = 0; index < this.trainResultList.length; index++) {
        const item = this.trainResultList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 收费情况数据字典转换
     */
    chargeSituation(val) {
      for (let index = 0; index < this.chargeSituationList.length; index++) {
        const item = this.chargeSituationList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 贷款用途数据字典转换
     */
    chargeSituation(val) {
      for (let index = 0; index < this.loanPurposeList.length; index++) {
        const item = this.loanPurposeList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 通话类型数据字典转换
     */
    callType(val) {
      for (let i = 0; i < this.callTypeList.length; i++) {
        const a = this.callTypeList[i];
        if (val === a.dictId) {
          return a.dictName;
        }
      }
    },
    /**
     * 通话结果数据字典转换
     */
    callResult(val) {
      for (let i = 0; i < this.callResultList.length; i++) {
        const a = this.callResultList[i];
        if (val === a.dictId) {
          return a.dictName
        }
      }
    },
    /**
     * 文件下载
     * @param bucket 桶名
     * @param path 对象存储路径
     * @param name 文件名称
     */
    fileDownload(bucket, path, fileName) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        bucket: bucket,
        fileKey: path
      }
      this.$http
        .invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.downloadBase64(res.data.filebase64Str,fileName);
          }

        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 下载bsae64文件
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
  }
}
</script>
<style lang="less" scoped>
.exceptStyle {
  text-align: center;
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.upload-row {
  line-height: 20px;
}
.download-text {
  color: #1890ff;
}
</style>
