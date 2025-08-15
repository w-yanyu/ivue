<template>
  <div>
    <div class="purpose-basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="借据号" prop="loan_no">
              <el-input v-model="basicForm.loan_no" @blur="customerAccountBlur" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="cust_name">
              <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prod_name">
              <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款形态">
              <!-- <el-input v-model="basicForm.loan_form" :disabled="true"></el-input> -->
                    <el-select v-model="basicForm.loan_form" prop="loan_form" :disabled="true">
                      <el-option
                        v-for="item in clssstList"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="贷款用途">

                    <el-select v-model="basicForm.loan_purp" prop="loan_purp" :disabled="true">
                      <el-option
                        v-for="(item,i) in loanusList"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="放款金额">
              <el-input v-model="basicForm.crdtam" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借记卡号">
              <el-input v-model="basicForm.db_card_num" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
	  <el-col :span="12">
            <el-form-item label="币种">
              <!-- <el-input v-model="basicForm.loan_form" :disabled="true"></el-input> -->
                    <el-select v-model="basicForm.ccy_code" prop="ccy_code" :disabled="true">
                      <el-option
                        v-for="item in ccyList"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="签订合同附件"  prop="concl_sign_ctrct_atchmt">
                  <el-upload
                    class="credential-upload"
                    :on-preview="uploadPreview"
                    :on-change="htfjUploadChange"
                    :on-remove="htfjUploadRemove"
                    :limit="5"
                    :file-list="htfjFileList"
                    :auto-upload="false"
                  >
                  </el-upload>
                </el-form-item>
              </el-col> -->

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
                <el-form-item label="放款时间">
                  <el-input v-model="applyForm.funds_time" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否本人">
                  <el-radio v-model="applyForm.is_self" @change="isSelfChange" label="1">是</el-radio>
                  <el-radio v-model="applyForm.is_self" @change="isSelfChange" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证明材料"  prop="creden_list">
                  <el-upload
                    class="credential-upload"
                    :on-preview="uploadPreview"
                    :on-change="credentialChange"
                    :on-remove="credentialRemove"
                    :limit="5"
                    :file-list="credentialFileList"
                    :auto-upload="false"
                    :disabled="true"
                  >
                    <el-button size="small" type="primary" :disabled="true" v-show="credentialFileList.length < 5">{{$i18ns('选择')}}文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item label="凭证信息"></el-form-item>
              </el-col>
            </el-row>
            <el-row class="ticket-detail" v-for="(item, index) in applyForm.list" :key="index">
              <el-row>
              </el-row>
              <div class="ticket-option">
                <i class="el-icon-plus" v-show="index === applyForm.list.length - 1 && applyForm.list.length < ticketTypeList.length" @click="addTicketDetail(index)"></i>
                <i class="el-icon-minus" v-show="applyForm.list.length > 1" @click="delTicketDetail(index)"></i>
              </div>
            </el-row> -->
            <el-row>
              <el-col :span="12">
                <el-form-item  label="款项用途" prop="loan_purp">
                  <el-input v-model="applyForm.loan_purp" @blur="applyuseurl" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" resize="none" :rows="4" :disabled="true" v-model="applyForm.vou_remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2" v-show="false" >
          <template slot="title">
           <span><em></em>贷款用途凭证</span>
          </template>
          <el-form ref="voucherForm" :rules="voucherRules" :model="voucherForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="贷款用途凭证交易对手方" prop="cou_parties">
                  <el-input v-model="voucherForm.cou_parties" @blur="voucherAnalogueBlur"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
         <el-col :span="12">
            <el-form-item label="对手方是否一致">
              <!-- <el-input v-model="basicForm.is_match" :disabled="true"></el-input> -->
                    <el-select v-model="voucherForm.is_match" prop="is_match" :disabled="true" >
                      <el-option
                        v-for="item in ismatchList"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>

              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" resize="none" :rows="4" v-model="voucherForm.cou_remark"></el-input>
               </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="工商信息栏位" prop="idstl_cmrcl_info_fld">
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
    <image-preview v-if="imageVisible" :preview-url="previewUrl"  @close="closePreview"/>
    <el-dialog
     :visible.sync="pdfVisible"
     title="PDF文件预览"
     width="1200px"
     :append-to-body="true"
    >
      <iframe class="preview-frame" :src="pdfUrl" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { basicRules, applyRules, voucherRules, validateHandle } from "../derate/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
//import ImagePreview from "COM/ImagePreview";
import UploadFileView from "@/views/pl/LevelFiveClasf/UploadFileView.vue";

export default {
  name: "ZLoanPurposeControlapply",
  components: {
    //ImagePreview
    UploadFileView
  },
   props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      basicForm: { // 基础信息表单对象11
        loan_no: "",
        cert_no: "",
        mobile_no: "",
        cust_name: "",
        prod_name: "",
        loan_form: "",
        loan_acct_type: "",
        loan_purp: "",
        crdtam: "",
        signContractAT: "",
        db_card_num: "",
        cust_no:"",
        cert_no:"",
        ccy_code:"",
        concl_sign_ctrct_atchmt:[], //签订合同

      },
      basicRules, // 基础信息表单校验
      applyForm: { // 申请信息表单对象
        funds_time: "",
        funds_lim: "",
        is_self: "0", // 是否本人 1：是 0：否
        time_diff: "",
        creden_list: [],
        list: [],
        vchr_amt: "",
        loan_purp: "",
        vou_remark: "",
      },
       htfjFileList:[],  //签订合同附件
      credentialFileList: [], // 证明材料文件列表
      applyRules,
      voucherForm: {
        cou_parties: "",
        cou_remark: "",
        is_match: "",
        idstl_cmrcl_info_fld: [],
        cou_parties:"",
        system_date:"",
        cert_mterls: [],  //佐证材料

      },
      voucherRules,
      aaumUploadFileList: [], // 工商信息栏位文件列表
      activeNames: ["1", "2"], // 初始化全部展开折叠面板
      validateList: [], // 校验pormise集合
      ticketTypeList: [], // 凭证类型选项集合
      accountLoanStatusList: [], // 贷款账户状态数据字典集合
      compareCustomerAccount: "", // 借据号对比字段
      clssstList:[],   //贷款形态
      ccyList:[],   //币种
      loanusList:[],   //贷款用途
      ismatchList:[],  //对手方是否一致
      zuozheng : false,
      zuozhengUploadFileList: [],
      imageVisible: false, // 控制图片预览显示/隐藏
      previewUrl: "", // 预览文件地址
      pdfVisible: false, // 控制pdf预览显示/隐藏
      pdfUrl: "", // 预览pdf地址
    }
  },
  computed: {
    ticketTypeListFilter() {
      let ticketTypeList = _.cloneDeep(this.ticketTypeList);
      for (let i = 0;i < this.applyForm.list.length;i++) {
        for (let j = 0;j < ticketTypeList.length;j++) {
          if (this.applyForm.list[i].vchr_tp === ticketTypeList[j].dictId) {
            ticketTypeList[j].disabled = true;
          }
        }
      }
      return ticketTypeList;
    }
  },
  created() {

     this.basicForm.loan_no = this.cParentParams.reserve1;


    if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){

        this.getFileInfo();
    }



    this.applyRuleSync(); // 初始化申请信息校验message
    this.addTicketDetail(); // 初始化添加凭证信息
  // this.applyRules.creden_list.push({ validator: this.credentialValidate, trigger: 'blur' });
   // this.voucherRules.idstl_cmrcl_info_fld.push({ validator: this.aaumUploadValidate, trigger: 'blur' });
 //   this.voucherRules.zuozhengUploadList.push({ validator: this.zuozhengUploadValidate, trigger: 'blur' });
    this.getDictList("PL_E_TICKET_TP", "ticketTypeList"); // 初始化获取凭证类型选项
    this.getDictList("PL_E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
    this.getDictList("PL_E_CLSSST", "clssstList"); // 初始化贷款形态数据字典
    this.getDictList("MS_CURRENCY", "ccyList"); // 币种
    this.getDictList("MS_E_LOAN_PURP", "loanusList"); // 初始化贷款用途数据字典
    this.getDictList("MS_E_YESORNO", "ismatchList"); // 初始化对手方是否一致数据字典
    // this.getFileInfo(); //根据借据号外调核心得到BO号，用BO号外调进件中心得到签订合同附件（用信合同）

    this.getApplInfo();
  },
  methods: {
     //对总金额必须大于放款金额的80%进行校验
     moneysum(){
      let  sum = 0;
      this.applyForm.list.forEach((item) =>{
                sum += parseFloat(item.vchr_amt);
              });
      if(this.basicForm.crdtam*0.8  > (sum)) {
        return false;
      }else{
        return true;
      }                       
    },


    validateSum(){
      return (rule, value ,callback) =>{
          if(!value){
            return callback(new Error("请输总金额"));
          }else{
            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if(!reg.test(value)){
              return callback(new Error("请输入正确金额"));
            }else{
              return callback();
            }
          }
        }
    },

    /**
     * 附件表单校验
     * @param rule 表单校验规则
     * @param value 表单值
     * @callback 表单校验回调
     */
    accessoryValidate(rule, value, callback) {
      let index = rule.field.split("]")[0].split("[")[1];
      // console.log(this.applyForm.list[index].ticketAccessoryList, 111111111);
      if (this.applyForm.list[index].ticketAccessoryList.length === 0) {
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
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            // console.log(res.data, 111111111111)
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 申请信息校验message同步
    applyRuleSync() {
     // this.applyRules.vchr_amt[0].message = "请输入总金额";
    },
    /**
     * 是否直系亲属change回调
     * @param val 是否为当前亲属
     */
    isSelfChange(val) {
      if (val === 0) {
        this.$refs.applyForm.validateField("creden_list");
      }
    },
    // 借据号失焦回调
    customerAccountBlur() {
      if (this.compareCustomerAccount === this.basicForm.loan_no) {
        return false;
      }
      this.compareCustomerAccount = this.basicForm.loan_no; // 记录借据号
      this.getBasciInfo(); // 基础信息带回
      this.getFileInfo();  //签订合同附件信息回调
    },
    //对手方是否一致进行判断
    voucherAnalogueBlur(){
      // if(this.voucherForm.cou_parties == this.voucherForm.cou_parties){
        this.voucherForm.is_match="一致";
        this.zuozheng= false;
    },
    //对款项用途的必输项进行判断
      applyuseurl(){
      return (rule, value ,callback) =>{
          if(!value){
            return callback(new Error("请输入款项用途"));
          }
        }
    },


    /**
     * 根据申请号获取贷款用途上传凭证文件信息
     */
    getFileInfo() {

      //清空历史数据
      if (this.compareCustomerAccount) {
        this.basicForm.cert_no = "";
        this.basicForm.mobile_no = "";
        this.basicForm.cust_name = "";
        this.basicForm.prod_name = "";
        this.basicForm.loan_form = "";
        this.basicForm.loan_purp = "";
        this.basicForm.crdtam = "";
        this.basicForm.signContractAT = "";
        this.basicForm.db_card_num = "";
        this.basicForm.cust_no = "";
        this.basicForm.cert_no = "";
      }
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
           const response = res.data;
            var reslist = [];
            reslist = response.prodList;

          this.basicForm.loan_no=res.data.loan_due_bill_num;
       // this.basicForm.cert_no = res.data.;
        this.basicForm.cust_name =res.data.cust_nm;
        //this.basicForm.mobile_no =res.data;
        this.basicForm.prod_name =res.data.prod_nm;
        this.basicForm.ccy_code =res.data.ccy_code_num;
        this.basicForm.loan_form = res.data.loan_form;
        this.basicForm.loan_purp = res.data.loan_purp ;
        this.basicForm.crdtam =res.data.nrl_prcpl;
        this.basicForm.db_card_num = res.data.rpymt_acct_num;
        this.applyForm.funds_time=res.data.open_acct_dt;
        this.basicForm.funds_lim=res.data.lendg_amt;
        //this.basicForm.if_self=res.data;
        //this.basicForm.time_diff=res.data;
       // this.basicForm.is_match=res.data;


            // for (let j = 0; j < reslist.size; j++) {
            //   if (reslist[j].contrType === "10") {
            //     const prodList = reslist[j];
            //    for (let i = 0 ; i < prodList.contrName.split("\\b").length; i++) {
            //   const map = {
            //     name: prodList.contrName.split("\\b")[i],
            //     bucket: prodList.bucket,
            //     buctetKey: prodList.buctetKey.split("\\b")[i],
            //     type: prodList.contrType,
            //     status: "success",
            //   }
            //   this.htfjFileList.push(map);
            //   }
            //   }
            // }
          }
        })
    },
    // 获取基础信息
    getBasciInfo() {
      // 清空历史数据
      if (this.compareCustomerAccount) {
        this.basicForm.cert_no = "";
        this.basicForm.mobile_no= "";
        this.basicForm.cust_name = "";
        this.basicForm.prod_name = "";
        this.basicForm.loan_acct_type = "";
        this.basicForm.loan_purp = "";
        this.basicForm.crdtam = "";
        this.basicForm.signContractAT = "";
        this.basicForm.db_card_num = "";
        this.basicForm.cust_no= "";
        this.basicForm.cert_no = "";
      }
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          const response = res.data;
            this.basicForm.loan_no=res.data.loan_due_bill_num;
       // this.basicForm.cert_no = res.data.;
        this.basicForm.cust_name =res.data.cust_nm;
        //this.basicForm.mobile_no =res.data;
        this.basicForm.prod_name =res.data.prod_nm;
        this.basicForm.ccy_code =res.data.ccy_code_num;
        this.basicForm.loan_form = res.data.loan_form;
        this.basicForm.loan_purp = res.data.loan_purp ;
        this.basicForm.crdtam =res.data.nrl_prcpl;
        this.basicForm.db_card_num = res.data.rpymt_acct_num;
        this.applyForm.funds_time=res.data.open_acct_dt;
        this.basicForm.funds_lim=res.data.lendg_amt;
        }
      })
      .catch(err => {
        console.error(err);
      })
    },
    // 获取申请信息
    getApplInfo() {
      
      let params = {
        servicecode: "pl0090",
        apply_no: this.cParentParams.apply_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          // console.log("获取到的data=",res.data);
          this.applyForm.is_self = res.data.if_self//是否本人
          this.applyForm.vou_remark = res.data.vou_remark//备注
          this.applyForm.loan_purp = res.data.vou_purpose ;
          this.applyForm.creden_list = res.data.creden_list ; //证明材料
          // this.credentialFileList = res.data.creden_list ; //证明材料
          
          res.data.creden_list.forEach(item => {
            this.credentialFileList.push(
              {
                path: item.file_path,
                name: item.orig_file_nm
              }
            )
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
    },
    // 票据校验信息动态处理
    ticketValidHandle() {
      this.applyRules.list = [];
      this.applyForm.list.forEach(item => {
        let ticketRule = {
          vchr_tp: [
            { required: false, message: "请选择凭证类型" }
          ],
          ticketInterval: [
            { required: true, message: "请选择凭证时间区间" }
          ],
          vchr_amt: [
            { required: true, validator : this.validateSum()}
          ],
          atchmt_file: [
            { validator: this.accessoryValidate, trigger: "change" }
          ],
        }
        this.applyRules.list.push(ticketRule);
        // console.log(this.applyRules.list, "list");
      })
    },
    // 添加凭证信息
    addTicketDetail() {
      const item = {
        vchr_tp: "", // 凭证类型
        ticketInterval: "", // 凭证时间区间
        vchr_amt: "", // 总金额
        atchmt_file: [], // 附件 路径集合
        ticketAccessoryList: [], // 附件文件集合
      }
      this.applyForm.list.push(item);
      this.ticketValidHandle();
    },
    /**
     * 删除凭证信息
     * @param index 凭证信息下标
     */
    delTicketDetail(index) {
      this.applyForm.list.splice(index, 1);
      this.ticketValidHandle();
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     * @param index 当前附件下标
     */
    accessoryChange(file, fileList, index) {
      // console.log(file, fileList, "accessoryChange")
      this.applyForm.list[index].ticketAccessoryList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.applyForm.list[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "凭证文件大于20M"
        })
      } else {
        let formData = new FormData();
      //   formData.append("file", file.raw);
      // formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            let url =  window.URL.createObjectURL(file.raw);
            file.url = window.URL.createObjectURL(file.raw);
            file.type = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
            this.applyForm.list[index].atchmt_file.push({"path":res.data.path,"file_name":file.name});
            if (fileList.length === 1) {
              this.$refs.applyForm.validateField(`list[${index}].atchmt_file`);
            }
          } else {
            this.applyForm.list[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
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
      this.applyForm.list[index].ticketAccessoryList.forEach((item, key) => {
        if (item.uid === file.uid) {
          this.applyForm.list[index].atchmt_file.splice(key, 1);
          this.applyForm.list[index].ticketAccessoryList.splice(key, 1);
        }
      });
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField(`list[${index}].atchmt_file`);
      }
    },

    /**
     * 证明材料添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件集合
     */
    credentialChange(file, fileList) {
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
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
             let url =  window.URL.createObjectURL(file.raw);
            file.url = window.URL.createObjectURL(file.raw);
            file.type = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
            this.applyForm.creden_list.push({"path":res.data.path,"file_name":file.name}); // 记录上传成功文件的文件路径
            if (fileList.length === 1) {
              this.$refs.applyForm.validateField("creden_list"); // 手动触发表单校验
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
      this.applyForm.creden_list.splice(index, 1); // 移除记录的文件路径列表中的文件
      this.credentialFileList.splice(index, 1); // 移除记录的文件列表中的文件
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField("creden_list"); // 手动触发表单校验
      }
    },
    /**
     * 证明材料表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    credentialValidate(value, rule, callback) {
      if (this.applyForm.is_self === "0") {
        if (this.applyForm.creden_list.length === 0) {
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
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
             let url =  window.URL.createObjectURL(file.raw);
            file.url = window.URL.createObjectURL(file.raw);
            file.type = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
            this.voucherForm.idstl_cmrcl_info_fld.push({"path":res.data.path,"file_name":file.name});
            if (fileList.length === 1) {
              this.$refs.voucherForm.validateField("idstl_cmrcl_info_fld");
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
      this.voucherForm.idstl_cmrcl_info_fld.splice(index, 1);
      this.aaumUploadFileList.splice(index, 1);
      if (fileList.length === 0) {
        this.$refs.voucherForm.validateField("idstl_cmrcl_info_fld");
      }
    },
    /**
     * 工商信息上传表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    aaumUploadValidate(value, rule, callback) {
       if (this.voucherForm.idstl_cmrcl_info_fld.length === 0) {
         return callback(new Error("请上传工商信息文件"));
       }
      return callback();
    },
    /**
     * 文件预览回调
     * @param file 点击文件对象
     */
    uploadPreview(file, fileList) {
      // console.log("file==============", file);
      if (file.bucket && file.type) {
        var filename = file.name;
        // console.log(filename.length)
        var str = filename.substring(filename.lastIndexOf("."),filename.length);
        switch (str) {
          case ".png":
          case ".jpg":
          case ".jpeg":
            this.getPreviewUrl(file.buctetKey, file.bucket, str);
            break;
          case ".pdf":
            this.getPreviewUrl(file.buctetKey, file.bucket, str);
            break;
          default:
            this.getBase64Url(file.buctetKey, file.bucket, file.name);
            break;
        }
      }else if (file.url){
        switch (file.type) {
              case "jpg":
              case "jpeg":
                this.imageVisible = true;
                this.previewUrl = file.url;
                break;
              case "png":
                this.imageVisible = true;
                this.previewUrl = this.previewUrl = file.url;
                break;
              case "pdf":
                this.pdfVisible = true;
                this.pdfUrl = this.previewUrl = file.url;
                break;
              default:
                break;
            }}else{
                this. handleDownload(file);
            }
    },
    /**
     * 下载文件
     */
    
        handleDownload(file) {
            var vm = this;
            let index = null;
            vm.credentialFileList.forEach((item, key) => {
                if (item.uid === file.uid) {
                    index = key;
                    return false;
                }
            });

            var params = {};
            params.path = vm.credentialFileList[index].path;
            if(params.path === "") {
                vm.$message({
                    type: "warning",
                    message: "该附件未上传"
                })
                return;
            }
            MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
            .then(res => {
                var orig_file_nm =  vm.credentialFileList[index].name;
                let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
                var a = document.createElement("a");
                a.download = orig_file_nm;
                a.style.display = "none";
                a.href = window.URL.createObjectURL(URL);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                })
            .catch(err => {
                console.error(err);
            });

        },
        dataUrlToBlob(data, prefix) {
            var bstr = window.atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: prefix });
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
              case ".jpg":
              case ".jpeg":
                this.imageVisible = true;
                blob = new Blob([byteArray], { type: "image/jpeg" });
                this.previewUrl = window.URL.createObjectURL(blob);
                break;
              case ".png":
                this.imageVisible = true;
                blob = new Blob([byteArray], { type: "image/png" });
                this.previewUrl = window.URL.createObjectURL(blob);
                break;
              case ".pdf":
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
    submit() {
      // console.log("basicForm", this.basicForm)
      // console.log("applyForm", this.applyForm)
      // console.log("voucherForm", this.voucherForm)
      this.validateList = [];
      const formList = ["basicForm", "applyForm", "voucherForm"];
      formList.forEach(item => {
        this.validateList.push(validateHandle(item, this));

      });
      Promise.all(this.validateList).then(res => {
        // console.log("校验",res);
        let params = {
          servicecode: "pl0091",  //上传用途凭证
          // 基础信息
          loan_no: this.basicForm.loan_no,//借据号
          cust_name: this.basicForm.cust_name,//客户姓名
          mobile_no: this.basicForm.mobile_no,//手机号码
          prod_name: this.basicForm.prod_name,//产品名字
          loan_form: this.basicForm.loan_form,// 贷款形态
          crdtam: this.basicForm.crdtam,// 贷款额度
          db_card_num: this.basicForm.db_card_num,// 借记卡号
          loan_purp: this.basicForm.loan_purp,// 贷款用途
          //sign_contractat: this.basicForm.signContractAT, // 签订合同附件
          cust_no: this.basicForm.cust_no,// 客戶号（id）
          cert_no:this.basicForm.cert_no,// 证件号
          cert_type: "101",// 证件类型
          busi_type: "DKYTGK", //业务类型
          cou_parties: this.voucherForm.cou_parties,//对手方
          is_match : this.voucherForm.is_match, //对手方是否一致
          // 申请信息
          loan_date: this.applyForm.funds_time,// 放款时间
          loan_amt: this.applyForm.funds_lim,// 放款金额
          if_self: this.applyForm.is_self,//是否本人
          time_diff: this.applyForm.time_diff,// 放款距申请时间差
          creden_list: this.applyForm.creden_list,//证明材料
          sign_contractat : this.basicForm.concl_sign_ctrct_atchmt,//签订合同附件
          list: [],//凭证信息
          vou_purpose: this.applyForm.loan_purp,//款项用途
          vou_remark: this.applyForm.vou_remark,//凭证备注
          loan_date: this.applyForm.funds_time,//放款日期

          // 贷款用途凭证
          cou_parties: this.voucherForm.cou_parties,// 交易对手方
          is_match: this.voucherForm.is_match,//交易对手方交易是否一致
          cou_remark: this.voucherForm.cou_remark,//对手方备注
          aaum_list: this.voucherForm.idstl_cmrcl_info_fld,//工商栏信息
          cert_mterls : this.voucherForm.zuozhengUploadList, //佐证材料
          system_date : this.voucherForm.system_date  //系统日期
        }
        this.applyForm.list.forEach(item => {
          let map = {
            voucher_type: item.vchr_tp,
            pzstart_date: item.ticketInterval[0],
            pzend_date: item.ticketInterval[1],
            voucher_amt: item.vchr_amt,
            list: item.atchmt_file,
          }
          // console.log(params);
          // params.pzinfo.push(map);
        });
        // ;
        // if(this.applyForm.list[0].ticketInterval[0].length > this.applyForm.funds_time.length  || this.applyForm.list[0].ticketInterval[1].length < this.voucherForm.systemdatee.length ){
        //   this.$message({
        //     type: "warning",
        //     message: "凭证开始日期要小于放款时间、凭证结束日期要大于系统上传凭证日期"
        //   });
        //   return;
        //   };
        if(!this.moneysum()){
          this.$message({
            type: "warning",
            message: "请输入正确的总金额，总金额必须大于或等于放款金额的80%"
          });
          return;
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
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
        console.log(err);
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
    .ticket-option {
      width: 50px;
      height: 32px;
      position: absolute;
      top: calc(50% - 16px);
      right: -60px;
      i {
        width: 20px;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .ticket-tips {
    padding-left: 20px;
    line-height: 34px;
    color: #0066ff;
  }
  .credential-upload {
    margin-bottom: 20px;
    line-height:4px;
  }
</style>
