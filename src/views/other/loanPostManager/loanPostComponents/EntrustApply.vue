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
              <el-form-item label="征信报告">
                <el-button type="primary" @click="getLncfList">征信报告</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>财务信息
          </span>
        </template>
        <el-form
          ref="debtInfoForm"
          :rules="rules"
          :model="debtInfoForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="贷款账号">
                <el-input v-model="debtInfoForm.acctno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期金额">
                <el-input v-model="debtInfoForm.lnream" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款余额">
                <el-input v-model="debtInfoForm.lnrebl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款状态">
                <el-select v-model="debtInfoForm.clssst" :disabled="true" placeholder>
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
              <el-form-item label="逾期天数">
                <el-input v-model="debtInfoForm.ovdays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常本金">
                <el-input v-model="debtInfoForm.lnnpbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期本金">
                <el-input v-model="debtInfoForm.lnopbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆滞本金">
                <el-input v-model="debtInfoForm.lndpbl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核销本金">
                <el-input v-model="debtInfoForm.hxxxpr" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常利息">
                <el-input v-model="debtInfoForm.retuin" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期利息">
                <el-input v-model="debtInfoForm.debtin" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="罚息">
                <el-input v-model="debtInfoForm.ysfx" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期违约金">
                <el-input v-model="debtInfoForm.ysxxfe" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="允许提前结清">
                <el-select v-model="debtInfoForm.issett" :disabled="true" placeholder>
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
              <el-form-item label="允许提前部分还款">
                <el-select v-model="debtInfoForm.ispart" :disabled="true" placeholder>
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
              <el-form-item label="银行卡号">
                <el-input v-model="debtInfoForm.rpacno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span>
            <em></em>申请信息
          </span>
        </template>
        <el-form
          ref="applyForm"
          :rules="rules"
          :model="applyForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-form-item label="是否已确认管辖权" prop="isconfrm">
              <el-radio-group v-model="applyForm.isconfrm">
                <el-radio
                  v-for="(item, i) in yesnoList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                >{{item.dictName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="机构类型" prop="orgstyle">
                <el-select v-model="applyForm.orgstyle" placeholder>
                  <el-option
                    v-for="(item, i) in orgstyleList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委案机构" prop="noworg" @click="checkorgtype">
                <el-select v-model="applyForm.noworg" placeholder>
                  <el-option
                    v-for="(item, i) in noworgList"
                    :key="i"
                    :label="item.noworg"
                    :value="item.noworgid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="费用结算模式" prop="clenmode">
                <el-select v-model="applyForm.clenmode" placeholder>
                  <el-option
                    v-for="(item, i) in clenmodeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$i18ns('备注')" prop="remark">
                <el-input type="textarea" v-model="applyForm.remark" :rows="4"></el-input>
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
  name: "EntrustApply",
  components: {
    ChooseAccountLookup,
    MultipleUploadVue
  },
  data() {
    return {
      activeNames: ["1", "2", "3"],
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
        unitname: ""
      },
      debtInfoForm: {
        acctno: "", //贷款账号
        lnream: "", //逾期金额
        lnrebl: "", //贷款余额
        clssst: "", //贷款状态
        ovdays: "", //逾期天数
        lnnpbl: "", //正常本金
        lnopbl: "", //逾期本金
        lndpbl: "", //呆滞本金
        hxxxpr: "", //核销本金
        csxxpi: "", //催收罚息,不展示
        csyjpi: "", //催收应计罚息,不展示
        ysyjpi: "", //应收应计罚息,不展示
        ysxxoi: "", //应收欠息,不展示
        csxxoi: "", //催收欠息,不展示
        yclixi: "", //逾期应计利息,不展示
        retuin: "", //正常利息，页面展示的计算字段----非接口字段
        debtin: "", //逾期利息，页面展示的计算字段----非接口字段
        ysfx: "", //罚息，页面展示的计算字段----非接口字段
        hxlx: "", //核销利息，页面展示的计算字段----非接口字段
        ysxxpi: "", //应收罚息
        ysxxfe: "", //逾期违约金
        issett: "", //允许提前结清
        ispart: "", //允许提前部分还款
        rpacno: "" //银行卡号
      },
      applyForm: {
        isconfrm: "",
        orgstyle: "",
        noworg: "",
        clenmode: "",
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
        isconfrm: [{ required: true, message: "请选择是否已确认管辖权" }],
        orgstyle: [{ required: true, message: "请选择机构类型" }],
        noworg: [{ required: true, message: "请选择案件委案机构" }],
        clenmode: [{ required: true, message: "请选择合作费用结算模式" }],
        remark: [{ required: false, message: "请填写备注" }]
      },

      /* ---------字典数组----------------------*/
      clssstList: [], //贷款状态字典列表
      yesnoList: [], //是否列表
      orgstyleList: [], //承办机构类型列表
      noworgList: [
        { id: "1", name: "是" },
        { id: "1", name: "buyiding" }
      ], //承办机构列表
      clenmodeList: [], //清算模式列表

      /* ---------附件上传控制------------------------*/
      formKeyList: ["pubretnacc"], //附件key
      fileStatuList: [false], //附件上传状态
      formLabelList: ["公账退还材料"], //附件中文名称
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
    this.getDictList("E_ACCEPORG_TYPE", "orgstyleList"); //承办机构类型字典
    this.getDictList("E_CLENMODE", "clenmodeList"); //清算模式
  },

  methods: {
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
      if (!this.basicForm.lncfno) {
        return false;
      }
      this.lncfnoLocal = this.basicForm.lncfno; // 记录借据号
      // 清空上次查询信息
      this.clearHistory();
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
    },
    /**
     *获取征信报告
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
    /*=========================================页面调用方法end====================================== */
    /*=========================================服务实现类start====================================== */

    /**
     *获取初始化借据和申请信息
     *
     */
    getInitialInfo() {
      let params = {
        servicecode: "RLMSPLTS1230",
        lncfno: this.lncfnoLocal
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        res => {
          if (res && res.code === "200" && res.data) {
            let loanInfo = res.data.loanInfo;
            let applyInfo = res.data.applyInfo;
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

            // 2.财务信息
            this.debtInfoForm.acctno = loanInfo.acctno; //贷款账号
            this.debtInfoForm.lnrebl = loanInfo.lnrebl; //贷款余额
            this.debtInfoForm.clssst = loanInfo.clssst; //贷款状态
            this.debtInfoForm.ovdays = loanInfo.ovdays; //逾期天数
            this.debtInfoForm.lnnpbl = loanInfo.lnnpbl; //正常本金
            this.debtInfoForm.lnopbl = loanInfo.lnopbl; //逾期本金
            this.debtInfoForm.lndpbl = loanInfo.lndpbl; //呆滞本金
            this.debtInfoForm.hxxxpr = loanInfo.hxxxpr; //核销本金
            this.debtInfoForm.yclixi = loanInfo.yclixi; //逾期应计利息
            this.debtInfoForm.ysxxpi = loanInfo.ysxxpi; //应收罚息
            this.debtInfoForm.ysxxfe = loanInfo.ysxxfe; //逾期违约金
            this.debtInfoForm.csxxpi = loanInfo.csxxpi; //催收罚息
            this.debtInfoForm.csyjpi = loanInfo.csyjpi;
            this.debtInfoForm.ysyjpi = loanInfo.ysyjpi;
            this.debtInfoForm.ysxxoi = loanInfo.ysxxoi;
            this.debtInfoForm.csxxoi = loanInfo.csxxoi;
            this.debtInfoForm.issett = loanInfo.issett; //是否允许提前结清
            this.debtInfoForm.ispart = loanInfo.ispart; //是否允许提前部分还款
            this.debtInfoForm.rpacno = loanInfo.rpacno; //银行卡号
            //账户信息
            this.otherInfoForm.rpacno = loanInfo.rpacno; //默认退还账号
            this.otherInfoForm.derana = loanInfo.derana; //默认退还账户户名
            this.otherInfoForm.rpacbr = loanInfo.rpacbr; //默认退还账户行号
            this.otherInfoForm.atbkna = loanInfo.atbkna; //退还账户开户行名称
            this.otherInfoForm.atbkpr = loanInfo.atbkpr; //退还账户开户行所在省
            this.otherInfoForm.atbkci = loanInfo.atbkci; //退还账户开户行所在市
            // 3.申请信息
            this.applyForm.isconfrm = applyInfo.atbkci;
            this.applyForm.orgstyle = applyInfo.orgstyle;
            this.applyForm.noworg = applyInfo.noworg;
            this.applyForm.clenmode = applyInfo.clenmode;
            this.applyForm.remark = applyInfo.remark;
            // 4.保存提交按钮是否禁用
            this.sfPressbut = applyInfo.suitstus
              ? applyInfo.suitstus === "3"
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
      this.basicForm.custno = "";
      this.basicForm.prodna = "";
      this.basicForm.prodcd = "";
      this.basicForm.applid = "";
      this.basicForm.phonno = "";
      this.basicForm.clssst = "";
      this.basicForm.areaCenter = "";
      this.basicForm.accoutage = "";
      this.basicForm.isunitln = "";
      this.basicForm.unitname = "";
      this.debtInfoForm.acctno = "";
      this.debtInfoForm.lnream = "";
      this.debtInfoForm.lnrebl = "";
      this.debtInfoForm.clssst = "";
      this.debtInfoForm.ovdays = "";
      this.debtInfoForm.lnnpbl = "";
      this.debtInfoForm.lnopbl = "";
      this.debtInfoForm.lndpbl = "";
      this.debtInfoForm.hxxxpr = "";
      this.debtInfoForm.csxxpi = "";
      this.debtInfoForm.csyjpi = ""; //催收应计罚息,不展示
      this.debtInfoForm.ysyjpi = ""; //应收应计罚息,不展示
      this.debtInfoForm.ysxxoi = ""; //应收欠息,不展示
      this.debtInfoForm.csxxoi = ""; //催收欠息,不展示
      this.debtInfoForm.yclixi = ""; //逾期应计利息,不展示
      this.debtInfoForm.retuin = ""; //正常利息，页面展示的计算字段----非接口字段
      this.debtInfoForm.debtin = ""; //逾期利息，页面展示的计算字段----非接口字段
      this.debtInfoForm.ysfx = ""; //罚息，页面展示的计算字段----非接口字段
      this.debtInfoForm.hxlx = ""; //核销利息，页面展示的计算字段----非接口字段
      this.debtInfoForm.ysxxpi = "";
      this.debtInfoForm.ysxxfe = "";
      this.debtInfoForm.issett = "";
      this.debtInfoForm.ispart = "";
      this.debtInfoForm.rpacno = "";
      this.otherInfoForm.rpacno = ""; //默认退还账号
      this.otherInfoForm.derana = ""; //默认退还账户户名
      this.otherInfoForm.rpacbr = ""; //默认退还账户行号
      this.otherInfoForm.atbkna = ""; //退还账户开户行名称
      this.otherInfoForm.atbkpr = ""; //退还账户开户行所在省
      this.otherInfoForm.atbkci = ""; //退还账户开户行所在市
      this.clearRepayHis();
    },
    /**
     *清除退款信息缓存
     *
     */
    clearRepayHis() {
      this.applyForm.isconfrm = "";
      this.applyForm.orgstyle = "";
      this.applyForm.noworg = "";
      this.applyForm.clenmode = "";
      this.applyForm.remark = "";
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
      params.servicecode = operation == "submit" ? "RLMSPLTS1231" : "";
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
    checkorgtype() {
      if (null == this.applyForm.orgstyle || "" == this.applyForm.orgstyle) {
        let msg = "请先选择机构类型";
        this.$msg({
          message: msg,
          type: "success"
        });
        return;
      } else {
        getNoworgList();
      }
    },
    /*=========================================校验类方法end====================================== */

    /*=========================================工具方法start====================================== */
    /**
     *获取委案机构字典列表
     *
     */
    getNoworgList() {
      var params = {
        servicecode: "RLMSPLTS1238",
        areaCenter: this.basicForm.areaCenter,
        orgstyle: this.applyForm.orgstyle,
        isorno_case: "1",
        current_year_date: "",
        mech_status: "YQY"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.noworgList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

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
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.applyForm.resetFields();
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