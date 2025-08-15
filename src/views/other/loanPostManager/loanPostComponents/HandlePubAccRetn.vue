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
            <el-col :span="8">
              <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="basicForm.lncfno" :disabled="true"></el-input>
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
            <el-col :span="8">
              <el-form-item label="借记卡号" prop="debitCardno">
                <el-input v-model="basicForm.debitcardno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现贷余额" prop="prodcd">
                <el-input v-model="basicForm.restamt" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <!-- <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>欠款信息
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
                <el-input v-model="debtInfoForm.debitcardno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>-->
      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>申请信息
          </span>
        </template>
        <el-form
          ref="retnForm"
          :rules="rules"
          :model="retnForm"
          label-width="160px"
          class="custom-common--form"
        >
          <div class="border-Line">
            <el-row style="padding-left:30px;">
              <el-col :span="6">
                <el-form-item label="选择公账账号">
                  <el-button type="primary" @click="showLookup = true" size="small">{{$i18ns('选择')}}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退还金额" prop="retnamt">
                  <el-input v-model="retnForm.retnamt" id="rpamountId" @input="rpamountCheck"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="caSeq-table">
              <el-table :data="tableData">
                <el-table-column label="是否锁定" align="center">
                  <template slot-scope="scope">{{dattypTranslate(scope.row.isLock)}}</template>
                </el-table-column>
                <el-table-column label="公账序号" align="center" prop="caSeq"></el-table-column>
                <el-table-column label="还款/宕帐日期" align="center" prop="caRepayOrDebtDate"></el-table-column>
                <el-table-column label="付款人" align="center" prop="caPayer"></el-table-column>
                <el-table-column label="金额" align="center" prop="caAmt"></el-table-column>
                <el-table-column label="摘要" align="center" prop="caAbstract"></el-table-column>
                <el-table-column label="剩余金额" align="center" prop="caRestAmt"></el-table-column>
                <el-table-column :label="$i18ns('备注')" align="center" prop="caRemark"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteItem(scope)">{{$i18ns('删除')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <el-row>
            <el-form-item label="是否发送短信" prop="sffsdx">
              <el-radio-group v-model="retnForm.sffsdx">
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
                <el-input type="textarea" v-model="retnForm.remark" :rows="4"></el-input>
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
      <el-button type="primary" size="small" @click="checkAll('save')" :disabled="sfPressbut">{{$i18ns('保存')}}</el-button>
      <el-button @click="reset" size="small">{{$i18ns('重置')}}</el-button>
    </div>
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
  name: "PubAccountReturn",
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
        debitcardno: "",
        restamt: ""
      },
      retnForm: {
        retnamt: "",
        sffsdx: "",
        pubretnacc: "",
        caSeq: "",
        pbacctsq: [], //公账列表
        remark: ""
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
        debitcardno: "" //银行卡号
      },
      otherInfoForm: {
        debitcardno: "", //默认还款账号
        derana: "", //默认还款账户户名
        rpacbr: "", //默认还款账户行号
        atbkna: "", //还款账户开户行名称
        atbkpr: "", //还款账户开户行所在省
        atbkci: "", //还款账户开户行所在市
        isepym: "", //允许提前还款
        retnstus: "" //申请状态
      },
      rules: {
        caSeq: [{ required: true, message: "请选择公账账号" }],
        sffsdx: [{ required: true, message: "请选择是否发送短信" }],
        remark: [{ required: false, message: "请填写备注" }]
      },

      /*  ------公账/个人列表字段---------------*/
      tableData: [], // 选择带回公账还款列表数据
      showLookup: false,
      rpamountA: this.nubFormat(0, 2), //校验用中间字段

      /* ---------字典数组----------------------*/
      dattypList: [], // 是否锁定数据字典
      clssstList: [], //贷款状态字典列表
      yesnoList: [], //是否

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
      personPayshow: false //个人账户还款方式显示控制
    };
  },
  created() {
    this.pickerOptions.disabledDate = time => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
    this.InitialWhenBlur();
  },
  mounted() {
    this.getDictList("E_CLSSST", "clssstList"); //贷款状态字典
    this.getDictList("E_YES___", "yesnoList"); //是否字典
    this.getDictList("E_PBOPRT_TYPE", "pboprtpList"); //公账方式字典
  },

  computed: {},
  methods: {
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
      // 清空上次查询信息
      this.clearHistory();
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
    },
    /*=========================================页面调用方法end====================================== */
    /*=========================================服务实现类start====================================== */
    /**
     *获取初始化借据和申请信息
     *
     */
    getInitialInfo() {
      let params = {
        servicecode: "PLMSKGTS0139",
        applid: this.cParentParams.applid
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
            this.basicForm.debitcardno = loanInfo.rpacno; //借记卡号
            this.basicForm.restamt = loanInfo.lnrebl; //贷款余额
            // 2.申请信息
            this.retnForm.retnamt =
              applyInfo.retnamt != "0.00" ? applyInfo.retnamt : ""; //退款金额
            this.tableData = applyInfo.pbacctsq;
            this.lookSelectAgain(this.tableData); //计算公账金额总和
            this.retnForm.sffsdx = applyInfo.sffsdx
              ? applyInfo.sffsdx === "1"
                ? "是"
                : "否"
              : applyInfo.sffsdx;
            this.retnForm.remark = applyInfo.remark;
            //附件信息返显
            for (var i = 0; i < this.formKeyList.length; i++) {
              console.log(applyInfo[this.formKeyList[i]]);
              this.$set(this.fileNameList, i, applyInfo[this.formKeyList[i]]);
            }
          }
        }
      );
    },
    /**
     *清除历史缓存数据
     *
     */
    clearHistory() {
      this.basicForm.acctna = "";
      this.basicForm.custno = "";
      this.basicForm.idtfno = "";
      this.basicForm.prodna = "";
      this.basicForm.prodcd = "";
      this.basicForm.applid = "";
      this.basicForm.debitcardno = "";
      this.basicForm.restamt = "";
      this.tableData = []; //公账列表清空
      this.retnForm.pbacctsq = []; //公账列表
      this.clearRepayHis();
    },
    /**
     *清除退款信息缓存
     *
     */
    clearRepayHis() {
      this.retnForm.sffsdx = "";
      this.retnForm.remark = "";
      this.pubretnacc = [];
      this.$set(this.fileNameList, 0, []);
    },

    /**
     *保存表单数据校验
     *
     */
    checkAll(val) {
      //校验顺序：退款金额----附件上传----表单其他字段
      if (!this.rpamountCheck(this.retnForm.retnamt)) {
        return;
      }
      //校验附件是否上传
      var warnTimes = 0;
      if (this.ifRequire[0] === true && this.fileStatuList[0] === false) {
        this.$set(this.warning, 0, true);
        warnTimes++;
      }
      if (warnTimes != 0) {
        this.$message({
          type: "warning",
          message: "校验不通过"
        });
      }
      //校验表单必须输入项是否填写
      this.$refs.retnForm.validate(valid => {
        if (warnTimes == 0 && valid) {
          if (val == "submit") {
            this.submitData();
          } else {
            this.saveInfo(val);
          }
        } else {
          if (warnTimes == 0) {
            this.$message({
              type: "warning",
              message: "校验不通过"
            });
          }
        }
      });
    },
    /**
     *数据转换
     *
     */
    transformData() {
      let params = Object.assign({}, this.basicForm, this.retnForm);
      params.sffsdx = params.sffsdx === "是" ? "1" : "0";
      // 上传的附件信息
      params.pubretnacc = this.pubretnacc;
      return params;
    },
    /**
     *保存表单数据
     *
     */
    saveInfo(operation) {
      console.log(operation);

      this.dataIntoPb(); //公账列表
      let params = this.transformData();
      params.servicecode = "PLMSKGTS0137";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg = operation == "save" ? "保存成功" : "";
            this.$msg({
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *提交表单数据
     *
     */
    submitData() {
      this.dataIntoPb(); //公账列表生成
      let params = this.transformData();
      params.servicecode = "PLMSKGTS0135";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log(res);
            let msg = "提交成功";
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
        servicecode: "PLMSKGTS0138",
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
     * 公账信息带回pbacctsq数组中
     */
    dataIntoPb() {
      this.retnForm.pbacctsq = [];
      // 公账还款
      this.tableData.forEach(item => {
        this.retnForm.pbacctsq.push(item);
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
        item.rptype = this.retnForm.rptype;
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
        item.rptype = this.retnForm.rptype;
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.retnForm.retnamt = this.rpamountA;
      this.lookClose();
      console.log(this.retnForm.pbacctsq);
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
      this.retnForm.pbacctsq = [];
      this.tableData.forEach(item => {
        this.retnForm.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.retnForm.rpamount_pub = this.rpamountA;
    },
    /**
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.retnForm.resetFields();
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