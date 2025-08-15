<template>
  <div>
    <div class="purpose-basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="借据号" prop="customerAccount">
              <el-input v-model="basicForm.customerAccount" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户身份证号" prop="customerId">
              <el-input v-model="basicForm.customerId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="basicForm.mobileNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="customerName">
              <el-input v-model="basicForm.customerName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productChineseName">
              <el-input v-model="basicForm.productChineseName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款形态">
              <el-input v-model="basicForm.accountStatus" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款账户状态">
              <el-select v-model="basicForm.accountLoanStatus" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in accountLoanStatusList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款用途">
              <el-input v-model="basicForm.loanUse" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款额度">
              <el-input v-model="basicForm.loanLimit" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签订合同附件">
              <el-input v-model="basicForm.signContractAT" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借记卡号">
              <el-input v-model="basicForm.debitCardNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户id">
              <el-input v-model="basicForm.custno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="purpose-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
           <span><em></em>申请信息</span>
          </template>
          <el-form ref="applyForm" :rules="applyRules" :model="applyForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="动用款时间">
                  <el-input v-model="applyForm.useDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="动用款额">
                  <el-input v-model="applyForm.useQuota" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否本人">
                  <el-radio v-model="applyForm.isSelf" @change="isSelfChange" label="1">是</el-radio>
                  <el-radio v-model="applyForm.isSelf" @change="isSelfChange" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="动款距申请时间差">
                  <el-input v-model="applyForm.applyTimeDiff" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证明材料" :class="{'require-asterisk': applyForm.isSelf === '1'}" prop="credentialList">
                  <el-upload
                    class="credential-upload"
                    :on-preview="uploadPreview"
                    :on-change="credentialChange"
                    :on-remove="credentialRemove"
                    :limit="5"
                    :file-list="credentialFileList"
                    :auto-upload="false"
                  >
                    <el-button size="small" type="primary" v-show="credentialFileList.length < 5">{{$i18ns('选择')}}文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="凭证信息"></el-form-item>
              </el-col>
            </el-row>
            <el-row class="ticket-detail" v-for="(item, index) in applyForm.ticketList" :key="index">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="凭证类型" :prop="`ticketList[${index}].ticketType`">
                    <el-select v-model="applyForm.ticketList[index].ticketType" placeholder="请选择凭证类型" :disabled="true">
                      <el-option
                        v-for="(item, i) in ticketTypeListFilter"
                        :key="i"
                        :label="item.dictName"
                        :value="item.dictId"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="时间凭证区间" :prop="`ticketList[${index}].ticketInterval`">
                    <el-date-picker
                     v-model="applyForm.ticketList[index].ticketInterval"
                     type="daterange"
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     value-format="yyyy-MM-dd"
                     :disabled="true">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="总金额" :prop="`ticketList[${index}].ticketSum`">
                    <el-input v-model="applyForm.ticketList[index].ticketSum" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="require-asterisk" label="附件" :prop="`ticketList[${index}].ticketAccessory`">
                    <el-upload
                      :on-preview="uploadPreview"
                      :on-change="(file, fileList) => { accessoryChange(file, fileList, index) }"
                      :on-remove="(file, fileList) => { accessoryRemove(file, fileList, index) }"
                      :limit="5"
                      :file-list="applyForm.ticketList[index].ticketAccessoryList"
                      :auto-upload="false"
                    >
                      <el-button type="primary" size="small" v-show="applyForm.ticketList[index].ticketAccessoryList.length < 5">{{$i18ns('选择')}}文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="款项用途" >
                  <el-input v-model="applyForm.applyUse"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" resize="none" :rows="4" v-model="applyForm.applyRemark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
           <span><em></em>贷款用途凭证</span>
          </template>
          <el-form ref="voucherForm" :rules="voucherRules" :model="voucherForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="贷款用途凭证交易对手方" prop="voucherAnalogue">
                  <el-input v-model="voucherForm.voucherAnalogue"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="与贷款用途证明文件是否一致">
                  <el-input v-model="voucherForm.isSame" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" resize="none" :rows="4" v-model="voucherForm.voucherRemark"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="工商信息栏位" prop="aaumUploadList">
                  <el-upload
                    class="credential-upload"
                    :on-preview="uploadPreview"
                    :on-change="aaumUploadChange"
                    :on-remove="aaumUploadRemove"
                    :limit="5"
                    :file-list="aaumUploadFileList"
                    :auto-upload="false"
                  >
                    <el-button size="small" type="primary" v-show="aaumUploadFileList.length < 5">{{$i18ns('选择')}}文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small">{{$i18ns('取消')}}</el-button>
    </div>
    <image-preview v-if="imageVisible" :preview-url="previewUrl"  @close="closePreview"/>
    <el-dialog
     :visible.sync="pdfVisible"
     title="PDF文件预览"
     width="1200px"
    >
      <iframe class="preview-frame" :src="pdfUrl" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { basicRules, applyRules, voucherRules, validateHandle } from "../../loanPostConstant/loanPostConstant";
import _ from "lodash";
import ImagePreview from "COM/ImagePreview";

export default {
  name: "LoanPurposeControlDetail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {
    ImagePreview
  },
  data() {
    return {
      basicForm: { // 基础信息表单对象
        customerAccount: "",
        customerId: "",
        mobileNo: "",
        customerName: "",
        productChineseName: "",
        accountStatus: "",
        accountLoanStatus: "",
        loanUse: "",
        loanLimit: "",
        signContractAT: "",
        debitCardNo: "",
        custno:"",
        idtfno:"",
      },
      basicRules, // 基础信息表单校验
      applyForm: { // 申请信息表单对象
        useDate: "",
        useQuota: "",
        isSelf: "0", // 是否直系亲属 1：是 0：否
        applyTimeDiff: "",
        credentialList: [],
        ticketList: [],
        ticketSum: "",
        applyUse: "",
        applyRemark: "",

      },
      credentialFileList: [], // 证明材料文件列表
      applyRules,
      voucherForm: {
        voucherAnalogue: "",
        voucherRemark: "",
        isSame: "",
        aaumUploadList: [],

      },
      voucherRules,
      aaumUploadFileList: [], // 工商信息栏位文件列表
      activeNames: ["1", "2"], // 初始化全部展开折叠面板
      validateList: [], // 校验pormise集合
      ticketTypeList: [], // 凭证类型选项集合
      accountLoanStatusList: [], // 贷款账户状态数据字典集合
      compareCustomerAccount: "", // 借据号对比字段
      imageVisible: false, // 控制图片预览显示/隐藏
      previewUrl: "", // 预览文件地址
      pdfVisible: false, // 控制pdf预览显示/隐藏
      pdfUrl: "", // 预览pdf地址
    }
  },
  computed: {
    ticketTypeListFilter() {
      let ticketTypeList = _.cloneDeep(this.ticketTypeList);
      for (let i = 0;i < this.applyForm.ticketList.length;i++) {
        for (let j = 0;j < ticketTypeList.length;j++) {
          if (this.applyForm.ticketList[i].ticketType === ticketTypeList[j].dictId) {
            ticketTypeList[j].disabled = true;
          }
        }
      }
      return ticketTypeList;
    }
  },
  created() {
    this.applyRuleSync(); // 初始化申请信息校验message
    this.addTicketDetail(); // 初始化添加凭证信息
    this.applyRules.credentialList.push({ validator: this.credentialValidate, trigger: 'blur' });
    this.voucherRules.aaumUploadList.push({ validator: this.aaumUploadValidate, trigger: 'blur' });
    this.getDictList("E_TICKET_TP", "ticketTypeList"); // 初始化获取凭证类型选项
    this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
    this.getLoanPurposeInfo(); // 根据申请号获取贷款用途上传凭证信息
    this.getFileInfo(); // 根据申请号获取贷款用途文件信息
  },
  methods: {
    /**
     * 附件表单校验
     * @param rule 表单校验规则
     * @param value 表单值
     * @param callback 表单校验回调
     */
    accessoryValidate(rule, value, callback) {
      let index = rule.field.split("]")[0].split("[")[1];
      console.log(this.applyForm.ticketList[index].ticketAccessoryList, 111111111);
      if (this.applyForm.ticketList[index].ticketAccessoryList.length === 0) {
        return callback(new Error("请上传附件"));
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
     * 根据申请号获取贷款用途上传凭证信息
     */
    getLoanPurposeInfo() {
      let params = {
        servicecode: "PLMSKGSS0098",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            // 基本信息带回
            this.basicForm.customerAccount = response.lncfno;
            this.basicForm.customerId = response.idtfno;
            this.basicForm.mobileNo = response.phoneno;
            this.basicForm.customerName = response.custna;
            this.basicForm.productChineseName = response.prodna;
            this.basicForm.accountStatus = response.clssst;
            this.basicForm.accountLoanStatus = response.acctst;
            this.basicForm.loanUse = response.loan_purpose;
            this.basicForm.loanLimit = response.crdtam;
            this.basicForm.signContractAT = response.sign_contractat;
            this.basicForm.debitCardNo = response.cardno;
            this.basicForm.custno = response.custid;
            // 申请信息带回
            this.applyForm.useDate = response.loan_date;
            this.applyForm.useQuota = response.loan_amt;
            this.applyForm.useDate = response.loan_date;
            this.applyForm.applyTimeDiff = response.time_diff;
            this.applyForm.applyUse = response.vou_purpose;
            this.applyForm.applyRemark = response.vou_remark;
            // 贷款用途凭证信息带回
            this.voucherForm.useDate = response.loan_date;
            this.voucherForm.useDate = response.loan_date;
          }
        })
    },
    /**
     * 根据申请号获取贷款用途上传凭证文件信息
     */
    getFileInfo() {
      let params = {
        servicecode: "PLMSKGSS0100",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            console.log(response, 11111111);
            const zmcl = response.zmcl[0];
            for (let i = 0 ; i < zmcl.fileName.split("\\b").length; i++) {
              const map = {
                name: zmcl.fileName.split("\\b")[i],
                bucket: zmcl.bucket,
                buctetKey: zmcl.buctetKey.split("\\b")[i],
                type: this.getFileType(zmcl.fileName.split("\\b")[i]),
                status: "success",
              }
              this.credentialFileList.push(map);
            }
            const gslxx = response.gslxx[0];
            for (let i = 0 ; i < gslxx.fileName.split("\\b").length; i++) {
              const map = {
                name: gslxx.fileName.split("\\b")[i],
                bucket: gslxx.bucket,
                buctetKey: gslxx.buctetKey.split("\\b")[i],
                type: this.getFileType(gslxx.fileName.split("\\b")[i]),
                status: "success",
              }
              this.aaumUploadFileList.push(map);
            }
            console.log(this.aaumUploadFileList);
            this.getVoucherInfo(response.dhwjinfo); // 根据申请号获取凭证信息
          }
        })
    },
    /**
     * 根据申请号获取凭证信息
     * @param fileList 上传凭证文件信息
     */
    getVoucherInfo(fileList) {
      let params = {
        servicecode: "PLMSKGSS0097",
        applid: this.cParentParams.applid,
      }
      this.applyForm.ticketList = [];
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            console.log(response, "voucher");
            for (let i = 0; i < response.length; i++) {
              const ele = {
                ticketType: response[i].voucher_type,
                ticketInterval: [response[i].pzstart_date, response[i].pzend_date],
                ticketSum: response[i].voucher_amt,
                ticketAccessoryList: [],
              }
              for (let j = 0; j < fileList[i].fileName.split("\\b").length; j++) {
                const map = {
                  name: fileList[i].fileName.split("\\b")[j],
                  bucket: fileList[i].bucket,
                  buctetKey: fileList[i].buctetKey.split("\\b")[j],
                  type: this.getFileType(fileList[i].fileName.split("\\b")[j]),
                  status: "success",
                }
                ele.ticketAccessoryList.push(map);
              }
              this.applyForm.ticketList.push(ele);
              console.log(this.applyForm.ticketList, "yyyyyyyyyyyyyyyy");
            }
          }
        })
    },
    /**
     * 解析文件类型
     * @param fileName 文件名称
     */
    getFileType(fileName) {
      const type = fileName.split(".").reverse()[0];
      if (["png", "jpg", "jpeg"].indexOf(type) > -1) {
        return type;
      } else if (type === "pdf") {
        return "pdf";
      }
      return "other";
    },
    // 申请信息校验message同步
    applyRuleSync() {
      this.applyRules.ticketSum[0].message = "请输入总金额";
    },
    /**
     * 是否直系亲属change回调
     * @param val 是否为当前亲属
     */
    isSelfChange(val) {
      if (val === 0) {
        this.$refs.applyForm.validateField("credentialList");
      }
    },
    // 票据校验信息动态处理
    ticketValidHandle() {
      this.applyRules.ticketList = [];
      this.applyForm.ticketList.forEach(item => {
        let ticketRule = {
          ticketType: [
            { required: true, message: "请选择凭证类型" }
          ],
          ticketInterval: [
            { required: true, message: "请选择凭证时间区间" }
          ],
          ticketSum: [
            { required: true, message: "请输入总金额" }
          ],
          ticketAccessory: [
            { validator: this.accessoryValidate, trigger: "change" }
          ],
        }
        this.applyRules.ticketList.push(ticketRule);
        console.log(this.applyRules.ticketList, "ticketList");
      })
    },
    // 添加凭证信息
    addTicketDetail() {
      const item = {
        ticketType: "", // 凭证类型
        ticketInterval: "", // 凭证时间区间
        ticketSum: "", // 总金额
        ticketAccessory: [], // 附件 路径集合
        ticketAccessoryList: [], // 附件文件集合
      }
      this.applyForm.ticketList.push(item);
      this.ticketValidHandle();
    },
    /**
     * 删除凭证信息
     * @param index 凭证信息下标
     */
    delTicketDetail(index) {
      this.applyForm.ticketList.splice(index, 1);
      this.ticketValidHandle();
    },
    /**
     * 获取base64文件流
     * @param fileUrl 对象存储路径
     * @param bucket 捅名
     * @param fileName 文件名
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
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     * @param index 当前附件下标
     */
    accessoryChange(file, fileList, index) {
      console.log(file, fileList, "accessoryChange")
      this.applyForm.ticketList[index].ticketAccessoryList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.applyForm.ticketList[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "凭证文件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            this.applyForm.ticketList[index].ticketAccessory.push({"path":res.data.path,"file_name":file.name});
            if (fileList.length === 1) {
              this.$refs.applyForm.validateField(`ticketList[${index}].ticketAccessory`);
            }
          } else {
            this.applyForm.ticketList[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     * @param index 当前附件下标
     */
    accessoryRemove(file, fileList, index) {
      this.applyForm.ticketList[index].ticketAccessoryList.forEach((item, key) => {
        if (item.uid === file.uid) {
          this.applyForm.ticketList[index].ticketAccessory.splice(key, 1);
          this.applyForm.ticketList[index].ticketAccessoryList.splice(key, 1);
        }
      });
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField(`ticketList[${index}].ticketAccessory`);
      }
    },
    /**
     * 证明材料预览回调
     * @param file 点击文件对象
     */
    uploadPreview(file, fileList) {
      if (file.bucket) {
        switch (file.type) {
          case "png":
          case "jpg":
          case "jpeg":
            this.getPreviewUrl(file.buctetKey, file.bucket, file.type);
            break;
          case "pdf":
            this.getPreviewUrl(file.buctetKey, file.bucket, file.type);
            break;
          default:
            this.getBase64Url(file.buctetKey, file.bucket, file.name);
            break;
        }
      }
    },
    /**
     * 获取预览文件路径
     * @param fileUrl 对象存储路径
     * @param bucket 桶名
     * @param fileType 文件类型
     */
    getPreviewUrl(fileUrl, bucket, fileType) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: fileUrl,
        bucket: bucket,
      };
      this.$http
        .invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            let byteCharacters = atob(res.data.filebase64Str);
            let byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            let blob = null;
            switch (fileType) {
              case "jpg":
              case "jpeg":
                this.imageVisible = true;
                blob = new Blob([byteArray], { type: "image/jpeg" });
                this.previewUrl = window.URL.createObjectURL(blob);
                break;
              case "png":
                this.imageVisible = true;
                blob = new Blob([byteArray], { type: "image/png" });
                this.previewUrl = window.URL.createObjectURL(blob);
                break;
              case "pdf":
                this.pdfVisible = true;
                blob = new Blob([byteArray], { type: "application/pdf" });
                this.pdfUrl = window.URL.createObjectURL(blob);
                break;
              default:
                break;
            }

          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 关闭预览
     */
    closePreview() {
      this.imageVisible = false;
    },
    /**
     * 证明材料添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件集合
     */
    credentialChange(file, fileList) {
      console.log(fileList,"ppppppppp")
      this.credentialFileList = fileList; // 记录当前文件列表
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        this.credentialFileList.splice(fileList.indexOf(file), 1); // 文件大小校验不通过 移除记录的文件列表中的文件
        this.$message({
          type: "warning",
          message: "证明材料文件大于8M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            this.applyForm.credentialList.push({"path":res.data.path,"file_name":file.name}); // 记录上传成功文件的文件路径
            if (fileList.length === 1) {
              this.$refs.applyForm.validateField("credentialList"); // 手动触发表单校验
            }
          } else {
            this.credentialFileList.splice(fileList.indexOf(file), 1); // 文件上传失败 移除记录的文件列表中的文件
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 证明材料移除文件回调
     * @param file 当前移除文件对象
     * @param fileList 已添加文件集合
     */
    credentialRemove(file, fileList) {
      let index = null;
      this.credentialFileList.forEach((item, key) => { // 找到移除文件对象下标
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.applyForm.credentialList.splice(index, 1); // 移除记录的文件路径列表中的文件
      this.credentialFileList.splice(index, 1); // 移除记录的文件列表中的文件
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField("credentialList"); // 手动触发表单校验
      }
    },
    /**
     * 证明材料表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    credentialValidate(value, rule, callback) {
      if (this.applyForm.isSelf === "1") {
        if (this.applyForm.credentialList.length === 0) {
          return callback(new Error("请上传证明材料"));
        }
      }
      return callback();
    },
    /**
     * 工商信息添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    aaumUploadChange(file, fileList) {
      this.aaumUploadFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        this.aaumUploadFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "工商信息文件大于8M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            this.voucherForm.aaumUploadList.push({"path":res.data.path,"file_name":file.name});
            if (fileList.length === 1) {
              this.$refs.voucherForm.validateField("aaumUploadList");
            }
          } else {
            this.aaumUploadFileList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 工商信息移除文件回调
     * @param file 当前移除文件对象
     * @param fileList 已添加文件
     */
    aaumUploadRemove(file, fileList) {
      let index = null;
      this.aaumUploadFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.voucherForm.aaumUploadList.splice(index, 1);
      this.aaumUploadFileList.splice(index, 1);
      if (fileList.length === 0) {
        this.$refs.voucherForm.validateField("aaumUploadList");
      }
    },
    /**
     * 工商信息上传表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    aaumUploadValidate(value, rule, callback) {
      // if (this.voucherForm.aaumUploadList.length === 0) {
      //   return callback(new Error("请上传工商信息文件"));
      // }
      return callback();
    },
    submit() {
      console.log("basicForm", this.basicForm)
      console.log("applyForm", this.applyForm)
      console.log("voucherForm", this.voucherForm)
      this.validateList = [];
      const formList = ["basicForm", "applyForm", "voucherForm"];
      formList.forEach(item => {
        this.validateList.push(validateHandle(item, this));
      });
      Promise.all(this.validateList).then(res => {
        let params = {
          servicecode: "PLMSKGSS0091",
          // 基础信息
          lncfno: this.basicForm.customerAccount,//借据号
          custna: this.basicForm.customerName,//客户姓名
          phoneno: this.basicForm.mobileNo,//手机号码
          prodna: this.basicForm.productChineseName,//产品名字
          clssst: this.basicForm.accountStatus,// 贷款形态
          acctst: this.basicForm.accountLoanStatus,// 贷款账户状态
          crdtam: this.basicForm.loanLimit,// 贷款额度
          cardno: this.basicForm.debitCardNo,// 借记卡号
          loan_purpose: this.basicForm.loanUse,// 贷款用途
          sign_contractat: this.basicForm.signContractAT, // 签订合同附件
          custid: this.basicForm.custno,// 客戶号（id）
          idtfno:this.basicForm.customerId,// 证件号
          idtftp: "101",// 证件类型
          lncatp: "DKYTGK", //业务类型

          // 申请信息
          loan_date: this.applyForm.useDate,// 放款时间
          loan_amt: this.applyForm.useQuota,// 放款金额
          ifself: this.applyForm.isSelf,//是否直系
          time_diff: this.applyForm.applyTimeDiff,// 放款距申请时间差
          creden_list: this.applyForm.credentialList,//证明材料
          pzinfo: [],//凭证信息
          vou_purpose: this.applyForm.applyUse,//款项用途
          vou_remark: this.applyForm.applyRemark,//凭证备注
          loan_date: this.applyForm.useDate,//放款日期
          loan_date: this.applyForm.useDate,
          // 贷款用途凭证
          cou_parties: this.voucherForm.voucherAnalogue,// 交易对手方
          is_match: this.voucherForm.isSame,//交易对手方交易是否一致
          cou_remark: this.voucherForm.voucherRemark,//对手方备注
          aaum_list: this.voucherForm.aaumUploadList,//工商栏信息
        }
        this.applyForm.ticketList.forEach(item => {
          let map = {
            voucher_type: item.ticketType,
            pzstart_date: item.ticketInterval[0],
            pzend_date: item.ticketInterval[1],
            voucher_amt: item.ticketSum,
            ticketList: item.ticketAccessory,
          }
          params.pzinfo.push(map);
        });
        this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: res.message
            })
          }
        })
        .catch(err => {
          console.error(err);
        })
      }).catch(err => {
        this.$message({
          type: "warning",
          message: "校验不通过"
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .purpose-basic,.purpose-detail {
    padding: 16px 40px 0 12px;
  }
  .purpose-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .ticket-detail {
    margin-bottom: 16px;
    padding: 16px 0 10px 0;
    position: relative;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
  }
  .ticket-tips {
    padding-left: 20px;
    line-height: 34px;
    color: #0066ff;
  }
  .credential-upload {
    margin-bottom: 20px;
  }
  .preview-frame {
    width: 100%;
    height: 600px;
  }
</style>
