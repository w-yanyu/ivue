<template>
  <div>
    <el-collapse v-model="activeNames" class="custom-common--collapse">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>基本信息
          </span>
        </template>
        <el-form
          ref="basicForm"
          :rules="rules"
          :model="basicForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="借据号" prop="lncfno">
                <el-input
                  v-model="basicForm.lncfno"
                  @blur="InitialWhenBlur"
                  @keyup.enter.native="InitialWhenBlur"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称" prop="acctna">
                <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户号" prop="custno">
                <el-input v-model="basicForm.custno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码" prop="idtfno">
                <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称" prop="prodna">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品代码" prop="prodcd">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码" prop="phonno">
                <el-input v-model="basicForm.phonno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域中心" prop="areaCenter">
                <el-input v-model="basicForm.areaCenter" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款状态" prop="clssst">
                <el-select v-model="basicForm.clssst" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in clssstList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账龄" prop="accoutage">
                <el-input v-model="basicForm.accoutage" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否联合贷" prop="isunitln">
                <el-select v-model="basicForm.isunitln" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in yesnoList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联合贷公司名称" prop="unitname">
                <el-input v-model="basicForm.unitname" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="当前委案机构" prop="noworg">
                <el-input v-model="basicForm.noworg" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>诉讼结果
          </span>
        </template>
        <el-form
          ref="resultForm"
          :rules="rules"
          :model="resultForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="诉讼类型" prop="suitype">
                <el-select v-model="resultForm.suitype" placeholder>
                  <el-option
                    v-for="(item, i) in suitypeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼承办机构" prop="handleorg">
                <el-select v-model="resultForm.handleorg" placeholder>
                  <el-option
                    v-for="(item, i) in noworgList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼受理机构类型" prop="acceptorgtype">
                <el-select v-model="resultForm.acceptorgtype" placeholder>
                  <el-option
                    v-for="(item, i) in acceptorgtypeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼受理机构" prop="acceptorg">
                <el-select v-model="resultForm.acceptorg" placeholder>
                  <el-option
                    v-for="(item, i) in noworgList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="诉讼程序" prop="suitprogrm">
                <el-select v-model="resultForm.suitprogrm" placeholder>
                  <el-option
                    v-for="(item, i) in suitprogrmList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开庭时间" prop="opentime">
                <el-date-picker
                  v-model="resultForm.opentime"
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼案件号" prop="caseno">
                <el-input v-model="resultForm.caseno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼文书类型" prop="documntype">
                <el-select v-model="resultForm.documntype" placeholder>
                  <el-option
                    v-for="(item, i) in documntypeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="诉讼文书落款日期" prop="signDate">
                <el-date-picker
                  v-model="resultForm.signDate"
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上诉方" prop="appellant">
                <el-select v-model="resultForm.appellant" placeholder>
                  <el-option
                    v-for="(item, i) in appellantList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼结果" prop="caseResult">
                <el-select v-model="resultForm.caseResult" placeholder>
                  <el-option
                    v-for="(item, i) in caseResultList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="胜诉金额" prop="winamt">
                <el-input v-model="resultForm.winamt"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <multiple-upload-vue
                class="repay-upload"
                :vueFormKey="formKeyList[0]"
                :vueFormLabel="formLabelList[0]"
                :ifRequire="ifRequire[0]"
                :warning="warning[0]"
                :fileSize="10"
                :fileName="fileNameList[0]"
                @fileInfo="getFileInfo"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$i18ns('备注')" prop="remark">
                <el-input type="textarea" v-model="resultForm.remark" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <choose-account-lookup
            :show-dialog="showLookup"
            @select="lookSelect"
            @close="lookClose"
            v-if="showLookup"
          />
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <!-- <el-button type="primary" size="small" @click="checkAll('save')" :disabled="sfPressbut">{{$i18ns('保存')}}</el-button> -->
      <el-button type="primary" size="small" @click="checkAll('submit')" :disabled="sfPressbut">提交</el-button>
      <!-- <el-button size="small" @click="cancelApply">{{$i18ns('取消')}}</el-button> -->
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="resultShow"
      :width="dialogWidth"
    >
      <div class="el-dialog-dev">
        <pte-resolver
          v-if="resultShow"
          :c-parent-meta="c_$meta"
          :c-parent-scope="c_$scope"
          :c-parent-params="c_$params"
          :to-request="toRequest"
        ></pte-resolver>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ChooseAccountLookup from "./ChooseAccountLookup";
import MultipleUploadVue from "COM/MultipleUploadVue";
import _ from "lodash";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "SuitResultInto",
  components: {
    ChooseAccountLookup,
    MultipleUploadVue
  },
  data() {
    return {
      activeNames: ["1", "2"],
      basicForm: {
        lncfno: "",
        acctna: "",
        custno: "",
        idtfno: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        clssst: "",
        areaCenter: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        noworg: "",
        nowcasetime: "",
        nowcaseamt: ""
      },
      resultForm: {
        suitype: "",
        handleorg: "",
        acceptorg: "",
        acceptorgtype: "",
        suitprogrm: "",
        opentime: "",
        caseno: "",
        documntype: "",
        signDate: "",
        appellant: "",
        caseResult: "",
        winamt: "",
        remark: ""
      },
      otherInfoForm: {
        rpacno: "", //默认退还账号
        derana: "", //默认退还账户户名
        rpacbr: "", //默认退还账户行号
        atbkna: "", //退还账户开户行名称
        atbkpr: "", //退还账户开户行所在省
        atbkci: "", //退还账户开户行所在市
        retnstus: "" //申请状态
      },
      rules: {
        lncfno: [{ required: true, message: "请输入借据号" }],
        suitype: [{ required: true, message: "请选择诉讼类型" }],
        handleorg: [{ required: true, message: "请选择诉讼承办机构" }],
        acceptorg: [{ required: true, message: "请选择诉讼受理机构" }],
        acceptorgtype: [{ required: true, message: "请选择诉讼受理机构类型" }],
        suitprogrm: [{ required: true, message: "请选择诉讼程序" }],
        caseno: [{ required: true, message: "请输入诉讼案件号" }],
        documntype: [{ required: true, message: "请选择诉讼文书类型" }],
        signDate: [{ required: true, message: "请选择诉讼文书落款日期" }],
        appellant: [{ required: true, message: "请选择上诉方" }],
        caseResult: [{ required: true, message: "请选择诉讼结果" }],
        winamt: [{ required: false, message: "请输入胜诉金额" }]
      },

      /*  ------公账/个人列表字段---------------*/
      tableData: [], // 选择带回公账退还列表数据
      showLookup: false,
      rpamountA: this.nubFormat(0, 2), //校验用中间字段

      /* ---------字典数组----------------------*/
      dattypList: [], // 是否锁定数据字典
      clssstList: [], //贷款状态字典列表
      yesnoList: [], //是否字典
      suitypeList: [], //诉讼类型字典
      caseResultList: [], //诉讼结果字典
      appellantList: [], //上诉方字典
      suitprogrmList: [], //诉讼程序字典
      documntypeList: [], //诉讼文书类型字典
      acceptorgtypeList: [], //诉讼受理机构类型字典

      /* ---------附件上传控制------------------------*/
      formKeyList: ["suitbook"], //附件key
      fileStatuList: [false], //附件上传状态
      formLabelList: ["文书上传"], //附件中文名称
      ifRequire: [true], //附件是否必传
      warning: [false], //附件未上传是否警告
      pubretnacc: [], //上传公账退还证明材料信息
      errorTimes: [0, 0], //校验附件是否上传报警次数
      fileNameList: [[]], //返显上传文件的名字
      ifshowAttach: false, //是否显示身份证等四个附件
      /* ---------页面初始化控制字段------------------------*/
      isFirstIn: true, //判断是否是第一次进入页面
      unWatch: [],

      /* ---------其他------------------------*/
      sfPressbut: false, //保存提交按钮是否禁用
      maxbenj: "", //本金
      pickerOptions: {}, //可选日期控件配置
      personPayshow: false, //个人账户退还方式显示控制
      /* ---------借据列表弹窗参数------------------------*/
      resultShow: false, //是否展示详情
      dialogWidth: "80%", //弹框宽度
      dialogTitle: "借据列表",
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        idtfno: "",
        prodcd: ""
      },
      toRequest: {
        url: "/views/other/loanPostManager/public_lncf_list.json",
        method: "POST"
      }
    };
  },
  created() {
    this.pickerOptions.disabledDate = time => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
  },
  mounted() {
    this.getDictList("E_CLSSST", "clssstList"); //贷款状态字典
    this.getDictList("E_YES___", "yesnoList"); //是否字典
    this.getDictList("E_SUITYPE", "suitypeList"); //诉讼类型字典
    this.getDictList("E_SUITRESULT", "caseResultList"); //诉讼结果字典
    this.getDictList("E_APPELLANT", "appellantList"); //上诉方字典
    this.getDictList("E_SUITPROGRM", "suitprogrmList"); //诉讼程序字典
    this.getDictList("E_DOCUMNTYPE", "documntypeList"); //诉讼文书类型字典
    this.getDictList("E_ACCOUNT_TYPE", "acceptorgtypeList"); //诉讼受理机构类型字典
  },
  computed: {},
  methods: {
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
      if (
        !this.basicForm.lncfno ||
        this.lncfnoLocal === this.basicForm.lncfno
      ) {
        return false;
      }
      this.lncfnoLocal = this.basicForm.lncfno; // 记录借据号
      // 清空上次查询信息
      this.clearHistory();
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
    },
    /*=========================================页面调用方法end====================================== */
    /*=========================================服务实现类start====================================== */
    /**
     *获取借据列表
     */
    getLncfList() {
      if (this.basicForm.idtfno === "" || this.basicForm.prodcd === "") {
        this.$message({
          type: "warning",
          message: "请先输入借据号查询基本信息"
        });
      } else {
        this.c_$params.idtfno = this.basicForm.idtfno;
        this.c_$params.prodcd = this.basicForm.prodcd;
        this.resultShow = true;
      }
    },
    /**
     *获取初始化借据属性信息
     *
     */
    getInitialInfo() {
      let params = {
        servicecode: "RLMSPLTS1234",
        lncfno: this.lncfnoLocal
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        res => {
          if (res && res.code === "200" && res.data) {
            let loanInfo = res.data.loanInfo;
            let applid = res.data.applid;
            //1.基本信息
            this.basicForm.lncfno = loanInfo.lncfno;
            this.basicForm.acctna = loanInfo.acctna;
            this.basicForm.custno = loanInfo.custno; //客户号
            this.basicForm.idtfno = loanInfo.idtfno;
            this.basicForm.prodna = loanInfo.prodna;
            this.basicForm.prodcd = loanInfo.prodcd; //产品代码
            this.basicForm.applid = loanInfo.applid;
            this.basicForm.phonno = loanInfo.phonno;
            this.basicForm.clssst = loanInfo.clssst;
            this.basicForm.areaCenter = loanInfo.areaCenter;
            this.basicForm.accoutage = loanInfo.accoutage;
            this.basicForm.isunitln = loanInfo.isunitln;
            this.basicForm.unitname = loanInfo.unitname;
            this.basicForm.noworg = loanInfo.noworg;
            this.basicForm.nowcasetime = loanInfo.nowcasetime;
            this.basicForm.nowcaseamt = loanInfo.nowcaseamt;
            //账户信息
            this.otherInfoForm.rpacno = loanInfo.rpacno; //默认退还账号
            this.otherInfoForm.derana = loanInfo.derana; //默认退还账户户名
            this.otherInfoForm.rpacbr = loanInfo.rpacbr; //默认退还账户行号
            this.otherInfoForm.atbkna = loanInfo.atbkna; //退还账户开户行名称
            this.otherInfoForm.atbkpr = loanInfo.atbkpr; //退还账户开户行所在省
            this.otherInfoForm.atbkci = loanInfo.atbkci; //退还账户开户行所在市
            getInitialInfo(applid);
          }
        }
      );
    },
    /**
     *获取诉讼结果信息
     *
     */
    getInitialInfo(applid) {
      let params = {
        servicecode: "RLMSPLTS1236",
        applid: applid
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            // 2.诉讼结果信息
            this.resultForm.suitype = data.suitype;
            this.resultForm.handleorg = data.suitype;
            this.resultForm.acceptorg = data.acceptorg;
            this.resultForm.acceptorgtype = data.acceptorgtype;
            this.resultForm.suitprogrm = data.suitprogrm;
            this.resultForm.opentime = data.opentime;
            this.resultForm.caseno = data.caseno;
            this.resultForm.documntype = data.documntype;
            this.resultForm.signDate = data.signDate;
            this.resultForm.appellant = data.appellant;
            this.resultForm.caseResult = data.caseResult;
            this.resultForm.winamt = data.winamt;
            this.resultForm.remark = data.remark;
            //3.附件信息返显
            for (var i = 0; i < this.formKeyList.length; i++) {
              console.log(data[this.formKeyList[i]]);
              this.$set(this.fileNameList, i, data[this.formKeyList[i]]);
            }
            // 4.保存提交按钮是否禁用
            this.sfPressbut = data.suitstus
              ? data.suitstus === "3"
                ? false
                : true
              : false;
          }
        }
      );
    },
    /**
     *清除历史缓存数据
     *
     */
    clearHistory() {
      this.basicForm.lncfno = "";
      this.basicForm.acctna = "";
      this.basicForm.custno = ""; //客户号
      this.basicForm.idtfno = "";
      this.basicForm.prodna = "";
      this.basicForm.prodcd = ""; //产品代码
      this.basicForm.applid = "";
      this.basicForm.phonno = "";
      this.basicForm.clssst = "";
      this.basicForm.areaCenter = "";
      this.basicForm.accoutage = "";
      this.basicForm.isunitln = "";
      this.basicForm.unitname = "";
      this.basicForm.noworg = "";
      this.basicForm.nowcasetime = "";
      this.basicForm.nowcaseamt = "";
      this.otherInfoForm.rpacno = ""; //默认退还账号
      this.otherInfoForm.derana = ""; //默认退还账户户名
      this.otherInfoForm.rpacbr = ""; //默认退还账户行号
      this.otherInfoForm.atbkna = ""; //退还账户开户行名称
      this.otherInfoForm.atbkpr = ""; //退还账户开户行所在省
      this.otherInfoForm.atbkci = ""; //退还账户开户行所在市
      this.clearRepayHis();
    },
    /**
     *清除结果信息缓存
     *
     */
    clearRepayHis() {
      this.resultForm.suitype = "";
      this.resultForm.handleorg = "";
      this.resultForm.acceptorg = "";
      this.resultForm.acceptorgtype = "";
      this.resultForm.suitprogrm = "";
      this.resultForm.opentime = "";
      this.resultForm.caseno = "";
      this.resultForm.documntype = "";
      this.resultForm.signDate = "";
      this.resultForm.appellant = "";
      this.resultForm.caseResult = "";
      this.resultForm.winamt = "";
      this.resultForm.remark = "";
      this.suitFile = [];
      this.$set(this.fileNameList, 0, []);
    },

    /**
     *保存表单数据校验
     *
     */
    checkAll(val) {
      //校验顺序：借据号---退款金额----附件上传----表单其他字段
      //1.校验借据号是否填写
      this.$refs.basicForm.validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$message({
            type: "warning",
            message: "校验不通过（请输入借据号）"
          });
          return;
        }
        //2.校验表单必须输入项是否填写
        this.$refs.applyForm.validate(valid => {
          if (warnTimes == 0 && valid) {
            this.submitData(val);
          } else {
            if (warnTimes == 0) {
              this.$message({
                type: "warning",
                message: "校验不通过"
              });
            }
          }
        });
      });
    },
    /**
     *数据转换
     *
     */
    transformData() {
      let params = Object.assign(
        {},
        this.basicForm,
        this.debtInfoForm,
        this.applyForm,
        this.otherInfoForm
      );
      // params.sffsdx = params.sffsdx === "是" ? "1" : "0";
      // 上传的附件信息
      // params.pubretnacc = this.pubretnacc;
      return params;
    },
    /**
     *提交表单数据
     *
     */
    submitData(operation) {
      console.log(operation);
      let params = this.transformData();
      params.servicecode = operation == "submit" ? "RLMSPLTS1235" : "";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg = operation == "submit" ? "提交成功" : "保存成功";
            this.$msg({
              message: msg,
              type: "success"
            });
            this.sfPressbut = true; //禁用提交和保存按钮
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 取消申请
     */
    cancelApply() {
      var params = {
        servicecode: "",
        applid: this.basicForm.applid
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log(res);
            let msg = "申请已取消";
            this.$msg({
              message: msg,
              type: "success"
            });
            this.sfPressbut = false; //禁用提交和保存按钮
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *获取上传附件状态路径信息
     *
     */
    getFileInfo(singleFile, operation) {
      for (var i = 0; i < this.formKeyList.length; i++) {
        if (this.formKeyList[i] === singleFile.attkey) {
          if (operation === "add") {
            switch (i) {
              case 0:
                this.pubretnacc.push(singleFile);
                break;
            }
            this.$set(this.fileStatuList, i, true);
          } else {
            switch (i) {
              case 0:
                this.deleteFile(i, this.pubretnacc, singleFile.atturl);
                break;
            }
          }
        }
      }
    },
    deleteFile(i, arr, atturl) {
      arr.forEach(item => {
        if (item.atturl === atturl) {
          var index = arr.indexOf(item);
          arr.splice(index, 1);
        }
      });
      if (arr.length === 0) {
        this.$set(this.fileStatuList, i, false);
      }
    },

    /*=========================================服务实现end====================================== */
    /*=========================================校验类方法start====================================== */
    /**
     *及时校验退还金额
     */
    rpamountCheck(val) {
      console.log(val);
      var reg1 = /^[1-9]\d*(?=\.{0,1}\d+$|$)/;
      var reg2 = /^0(?=\.{1}\d+$|$)/;
      if ((reg1.test(val) || reg2.test(val)) && parseFloat(val) != 0) {
        // 公账校验
        if (parseFloat(val) > parseFloat(this.rpamountA)) {
          if (this.errorTimes[0] == 0) {
            this.$message({
              type: "warning",
              message: "退款金额不能大于公账金额总和"
            });
            this.errorTimes[0] += 1;
            setTimeout(() => {
              this.errorTimes[0] = 0;
            }, 3000);
            return false;
          }
        }
        return true;
      } else {
        if (this.errorTimes[1] == 0) {
          this.$message({
            type: "warning",
            message: "退款金额不符合规则(不能为空、为零、负数、字母等)"
          });
          this.errorTimes[1] += 1;
          setTimeout(() => {
            this.errorTimes[1] = 0;
          }, 3000);
          return false;
        }
      }
    },

    /*=========================================校验类方法end====================================== */

    lookClose() {
      this.showLookup = false;
    },

    /*=========================================工具方法start====================================== */
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            return this[listKey];
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 是否锁定转换
     */
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 扣款状态转换
     */
    statusTranslate(val) {
      for (let index = 0; index < this.paystatuList.length; index++) {
        const item = this.paystatuList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 回显计算公账金额总和
     */
    lookSelectAgain(tableList) {
      let rpamountChild = 0;
      let map = {};
      this.tableData.forEach(item => {
        map[item.caSeq] = true;
      });
      //将tablelist数据放入tabledata,如果序号相同，则不放入
      tableList.forEach(item => {
        if (!map[item.caSeq]) {
          this.tableData.push(item);
        }
      });
      this.tableData.forEach(item => {
        item.rptype = this.resultForm.rptype;
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
    },
    /**
     * 公账选择带回回调
     */
    lookSelect(tableList, dattypList) {
      let rpamountChild = 0;
      this.dattypList = dattypList;
      let map = {};
      this.tableData.forEach(item => {
        map[item.caSeq] = true;
      });
      tableList.forEach(item => {
        if (!map[item.caSeq]) {
          this.tableData.push(item);
        }
      });
      this.tableData.forEach(item => {
        item.rptype = this.resultForm.rptype;
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.resultForm.retnamt = this.rpamountA;
      this.lookClose();
      console.log(this.resultForm.pbacctsq);
    },
    /**
     * 删除列表数据
     */
    deleteItem(item) {
      console.log(item);
      let rpamountChild = 0;
      let index = 0;
      this.tableData.forEach((ele, i) => {
        if (ele === item.row) index = i;
      });
      this.tableData.splice(index, 1);
      this.resultForm.pbacctsq = [];
      this.tableData.forEach(item => {
        this.resultForm.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.resultForm.rpamount_pub = this.rpamountA;
    },
    /**
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.resultForm.resetFields();
      this.ifshowjm = false;
    },
    /**
     * 多值求和
     */
    sumCalc() {
      let list = [...arguments];
      list = list.map(item => Number(item));
      var s = 0;
      list.forEach(item => (s += item));
      return Number(s).toFixed(2);
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
      var l = s
          .split(".")[0]
          .split("")
          .reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    },
    /**
     * 复制文字数字
     *
     */
    copyContent(val) {
      var input = document.createElement("input"); // 直接构建input
      input.value = val === "0" ? this.earPayAmount : this.jmtqhkje;
      // 设置内容 需要复制的内容
      document.body.appendChild(input); // 添加临时实例
      input.select();
      document.execCommand("Copy");
      document.body.removeChild(input); // 删除临时实例
    }
    /*======================================================工具方法end====================================== */
  }
};
</script>
<style lang="less" scoped>
.checkbx-label-style {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-checkbox {
    line-height: 36.8px;
    /deep/.el-checkbox__label {
      font-size: 14px !important;
    }
  }
  .child {
    /deep/.el-form-item__content {
      margin-left: 13px !important;
    }
  }
  /deep/.el-form-item__label {
    width: 134px !important;
  }
  /deep/.el-form-item__content {
    margin-left: 134px !important;
    .el-select {
      width: 100% !important;
    }
  }
}
.caSeq-table {
  padding: 10px 30px;
}
.border-Line {
  padding: 10px 20px;
  margin: 10px 30px 30px 30px;
  border: 1px solid #ced2d6;
  border-radius: 10px;
}

.earPay-style {
  display: flex;
  // justify-content: center;
  line-height: 36px;
  font-size: 13px;
  color: #d04141;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-user-select: text;
}
.repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 6px 0 6px 0;
  }
}
</style>