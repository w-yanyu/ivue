<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="185px"
      class="custom-common--form"
    >
      <div class="borderLine">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择公账账号" style="width:100px;padding-left:0px;">
              <el-button type="primary" @click="showLookup = true" size="small">{{$i18ns('选择')}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="还款金额" prop="rpamount" style="width:0px;">
              <el-input v-model="ruleForm.rpamount" @input="rpamountCheck" id="rpamountId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="sfzxqx" style="width:100px;">
              <el-checkbox-group v-model="ruleForm.sfzxqx">
                <el-checkbox label="指向清晰" name="sfzxqx"></el-checkbox>
              </el-checkbox-group>
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
        <el-col :span="7">
          <el-form-item label="公账处理方式" prop="pboprtp">
            <el-select v-model="ruleForm.pboprtp" placeholder="请选择公账处理方式" id="pboprtpId">
              <el-option
                v-for="(item, i) in pboprtpList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left:97px;">
        <el-col :span="4" style="width:180px;">
          <el-form-item prop="sfredcznf">
            <el-checkbox-group v-model="ruleForm.sfredcznf">
              <el-checkbox label="是否减免逾期违约金" name="sfredcznf" :disabled="sfwrite[0]"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="减免逾期违约金" prop="redcznf">
            <el-input v-model="ruleForm.redcznf" disabled="false" type="currency"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="width:180px;margin-left:80px;">
          <el-form-item prop="sfredcpi">
            <el-checkbox-group v-model="ruleForm.sfredcpi">
              <el-checkbox label="是否减免罚息" name="sfredcpi" :disabled="sfwrite[1]"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="减免罚息" prop="redcpi">
            <el-input v-model="ruleForm.redcpi" disabled="false"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width:120px;margin-left:80px;">
          <el-form-item prop="sfmngapply">
            <el-checkbox-group v-model="ruleForm.sfmngapply">
              <el-checkbox label="已获得管理层审批" name="sfmngapply" :disabled="ifwrite"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left:97px;">
        <el-col :span="4" style="width:180px;">
          <el-form-item prop="sfredcni">
            <el-checkbox-group v-model="ruleForm.sfredcni">
              <el-checkbox label="是否减免利息" name="sfredcni" :disabled="sfwrite[2]"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="减免利息" prop="redcni">
            <el-input v-model="ruleForm.redcni" disabled="false"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="width:180px;margin-left:80px;" v-if="ifShowSfjmtqhk">
          <el-form-item prop="sfjmtqhk">
            <el-checkbox-group v-model="ruleForm.sfjmtqhk">
              <el-checkbox label="是否减免提前还款手续费" name="sfjmtqhk"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top:10px;margin-bottom:10px;padding-left:97px;">
        <el-col :span="4">
          <single-upload-vue  class="repay-upload"
            :vueFormKey="formKeyList[0]"
            :vueFormLabel="formLabelList[0]"
            :ifRequire="ifRequire[0]"
            :warning="warning[0]"
            :fileSize=10
            :fileName="fileNameList[0]"
            @fileStatu="getFileStatu"
          />
        </el-col>
        <el-col :span="4">
          <single-upload-vue  class="repay-upload"
            :vueFormKey="formKeyList[1]"
            :vueFormLabel="formLabelList[1]"
            :ifRequire="ifRequire[1]"
            :warning="warning[1]"
            :fileSize=10
            :fileName="fileNameList[1]"
            @fileStatu="getFileStatu"
          />
        </el-col>
        <el-col :span="4">
          <single-upload-vue class="repay-upload"
            :vueFormKey="formKeyList[2]"
            :vueFormLabel="formLabelList[2]"
            :ifRequire="ifRequire[2]"
            :warning="warning[2]"
            :fileSize=10
            :fileName="fileNameList[2]"
            @fileStatu="getFileStatu"
          />
        </el-col>
        <el-col :span="4">
          <single-upload-vue class="repay-upload"
            :vueFormKey="formKeyList[3]"
            :vueFormLabel="formLabelList[3]"
            :ifRequire="ifRequire[3]"
            :warning="warning[3]"
            :fileSize=10
            :fileName="fileNameList[3]"
            @fileStatu="getFileStatu"
          />
        </el-col>
        <el-col :span="5" v-show="ifShowTqhkatt">
          <single-upload-vue class="repay-upload"
            :vueFormKey="formKeyList[4]"
            :vueFormLabel="formLabelList[4]"
            :ifRequire="ifRequire[4]"
            :warning="warning[4]"
            :fileSize=10
            :fileName="fileNameList[4]"
            @fileStatu="getFileStatu"
           />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="申请调整类型" prop="adjty">
            <el-select v-model="ruleForm.adjty" placeholder="请选择申请调整类型">
              <el-option
                v-for="(item, i) in adjtyList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="申请调整原因" prop="adjrs">
            <el-select v-model="ruleForm.adjrs" placeholder="请选择申请调整原因">
              <el-option
                v-for="(item, i) in adjrsList"
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
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
    <div style="width:100%;height:30px;border-bottom:1px solid #ced2d6"></div>
    <div class="submitStyle">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
      <el-button @click="reset" size="small">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ChooseAccountLookup from "./ChooseAccountLookup";
import SingleUploadVue from "../../components/SingleUploadVue";
import _ from "lodash";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "RepaymentApplication",
  components: {
    ChooseAccountLookup,
    SingleUploadVue
  },
  data() {
    return {
      ruleForm: {
        caSeq: "",
        adjty: "",
        adjrs: "",
        rpamount: "",
        redcznf: this.nubFormat(0, 2),
        redcpi: this.nubFormat(0, 2),
        redcni: this.nubFormat(0, 2),
        remark: "",
        sfzxqx: false,  //初始化值--重置值
        sfredcznf: false,
        sfredcpi: false,
        sfredcni: false,
        sfjmtqhk: false, //是否减免提前还款手续费
        sfmngapply: false,
        pboprtp: "0"
      },
      rules: {
        caSeq: [{ required: true, message: "请选择公账账号" }],
        adjty: [{ required: false, message: "请选择申请调整类型" }],
        adjrs: [{ required: false, message: "请选择申请调整原因" }],
        remark:[{ required: false, message: "请填写备注" }]
      },
      showLookup: false,
      tableData: [], // 选择带回列表数据
      dattypList: [], // 是否锁定数据字典

      //实现功能字段
      rpamountA: "", //校验用中间字段
      earPayAmount: "", //提前还款总金额，接口获取
      adjtyList: [], //字典列表
      adjrsList: [], //字典列表
      pboprtpList: [], //字典列表
      sfwrite: [true, true, true, true], //减免项是否可选
      ifShowSfjmtqhk: false,
      ifShowTqhkatt: false,
      formKeyList: ["idatt", "applyatt", "crdtatt", "othatt", "tqhkatt"],
      fileStatuList: [false, false, false, false, false],
      formLabelList: [
        "身份证附件",
        "申请书附件",
        "征信报告附件",
        "其他证据附件",
        "提前还款授权附件"
      ],
      ifRequire: [false, false, false, false, false],
      warning: [false, false, false, false, false],
      filePath: {},
      errorTimes: [0, 0],
      fileNameList: ["", "", "", "", ""], //返显上传文件的名字
      maxbenj: "" //本金
    };
  },

  created() { 
    this.getSubmitData();
    var a=[parseFloat(this.cParentScope.parentFormModel.lnopbl),parseFloat(this.cParentScope.parentFormModel.lndpbl),parseFloat(this.cParentScope.parentFormModel.hxxxpr)];
    this.maxbenj = Math.max.apply(null,a);
  },
  mounted() {
    this.getDictList("E_APPL_CHNG_TYPE", "adjtyList");
    this.getDictList("E_ADJRS", "adjrsList");
    this.getDictList("E_PBOPRT_TYPE", "pboprtpList");
  },

  computed: {
    ifwrite() {
      if (parseFloat(this.ruleForm.redcznf) +parseFloat(this.ruleForm.redcpi) +parseFloat(this.ruleForm.redcni) >50000.0) {
        return false;
      } else {
        this.ruleForm.sfmngapply = false;
        return true;
      }
    }
  },
  methods: {
    //还款金额介于逾期金额和本金(逾期本金lnopbl、呆滞本金lndpbl、核销本金hxxxpr)之间，打开逾期违约金
    rpamount() {
      if (
        parseFloat(this.ruleForm.rpamount) >= this.maxbenj &&
        parseFloat(this.ruleForm.rpamount) <=parseFloat(this.cParentScope.parentFormModel.lnream1)
      ) {
        this.$set(this.sfwrite, 0, false);
        //上述范围内替换还款金额，更新减免数据
        if ( this.ruleForm.sfredcznf) {this.updateRedcznf();}
        if (this.ruleForm.sfredcpi) {this.updateRedcpi();}
        if (this.ruleForm.sfredcni) {this.updateRedcni();}
      } else {
        this.$set(this.sfwrite, 0, true);
        this.ruleForm.sfredcznf = false;
      }
    },
    //逾期违约金；勾选了逾期违约金，开放罚息
    sfredcznf() {
      if (this.ruleForm.sfredcznf) {
        this.updateRedcznf(); //更新逾期违约金
        this.$set(this.sfwrite, 1, false);
        this.rules.adjty[0].required = true;
        this.rules.adjrs[0].required = true;
        this.rules.remark[0].required = true;
        for (var i = 0; i < this.ifRequire.length - 3; i++) {
          this.ifRequire[i] = true;
        }
      } else {
        this.ruleForm.redcznf = this.nubFormat(0, 2);
        //重置关联项
        this.$set(this.sfwrite, 1, true);
        this.$set(this.sfwrite, 2, true);
        this.ruleForm.sfredcpi = false;
        this.ruleForm.sfredcni = false;
        this.rules.adjty[0].required = false;
        this.rules.adjrs[0].required = false;
        this.rules.remark[0].required = false;
        this.$refs.ruleForm.validate(); //校验警告消除
        for (var i = 0; i < this.ifRequire.length - 3; i++) {
          this.ifRequire[i] = false;
        }
      }
    },
    //罚息,勾选了罚息，开放利息
    sfredcpi() {
      if (this.ruleForm.sfredcpi) {
        this.updateRedcpi(); //更新罚息
        this.$set(this.sfwrite, 2, false);
      } else {
        this.ruleForm.redcpi = this.nubFormat(0, 2);
        this.$set(this.sfwrite, 2, true);
        this.ruleForm.sfredcni = false;
      }
    },

    //减免利息
    sfredcni() {
      if (this.ruleForm.sfredcni) {
        this.updateRedcni(); //更新减免利息
      } else {
        this.ruleForm.redcni = this.nubFormat(0, 2);
      }
    },
    //计算减免逾期违约金
    updateRedcznf() {
      let a = parseFloat(this.cParentScope.parentFormModel.lnream1) - parseFloat(this.ruleForm.rpamount);
      let b = parseFloat(this.cParentScope.parentFormModel.ysxxfe); //逾期违约金
      this.ruleForm.redcznf = this.nubFormat(a < b ? a : b, 2);
    },
    //计算减免罚息
    updateRedcpi() {
      this.ruleForm.redcpi = this.nubFormat(
        parseFloat(this.cParentScope.parentFormModel.ysyjpi) + parseFloat(this.cParentScope.parentFormModel.csyjpi) +
          parseFloat(this.cParentScope.parentFormModel.ysxxpi) + parseFloat(this.cParentScope.parentFormModel.csxxpi),2);
    },
    //计算减免利息
    updateRedcni() {
      let a = parseFloat(this.cParentScope.parentFormModel.lnream1) - parseFloat(this.ruleForm.rpamount);
      let b = parseFloat(this.cParentScope.parentFormModel.ysxxfe); //逾期违约金
      if (this.cParentScope.parentFormModel.clssst != "4") {
        //是否是核销状态
        let c = parseFloat(this.cParentScope.parentFormModel.ysqx) + parseFloat(this.cParentScope.parentFormModel.yclixi);
        this.ruleForm.redcni = this.nubFormat(a - b > 0 ? (a - b < c ? a - b : c) : 0, 2);
      } else {
        let c = parseFloat(this.cParentScope.parentFormModel.hxlx);
        this.ruleForm.redcni = this.nubFormat(a - b > 0 ? (a - b < c ? a - b : c) : 0, 2);
      }
    },
    // 公账处理方式
    pboprtp() {
      if (this.ruleForm.pboprtp == "2") {
        this.ifShowSfjmtqhk = true;
        this.getEarPayAmount("1"); //提前还款金额
      } else {
        this.ifShowSfjmtqhk = false;
        //重置提前还款手续费勾选
        this.ruleForm.sfjmtqhk = false;
      }
    },
    //勾选提前还款
    sfjmtqhk() {
      if (this.ruleForm.sfjmtqhk) {
        this.ifShowTqhkatt = true;
        this.ifRequire[4] = true;
        this.getEarPayAmount("0"); //减免提前还款手续费
      } else {
        this.ifShowTqhkatt = false;
        this.ifRequire[4] = false;
        this.getEarPayAmount("1"); //不减免手续费
      }
    },

    lookClose() {
      this.showLookup = false;
    },
    /**
     * 选择带回回调
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
      this.cParentScope.parentFormModel.pbacctsq = [];
      this.tableData.forEach(item => {
        this.cParentScope.parentFormModel.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.ruleForm.rpamount = this.rpamountA;
      this.lookClose();
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
     * 删除列表数据
     */
    deleteItem(item) {
      let rpamountChild = 0;
      let index = 0;
      this.tableData.forEach((ele, i) => {
        if (ele === item.row) index = i;
      });
      this.tableData.splice(index, 1);
      this.cParentScope.parentFormModel.pbacctsq = [];
      this.tableData.forEach(item => {
        this.cParentScope.parentFormModel.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.ruleForm.rpamount = this.rpamountA;
    },
    /**
     * 退回经办岗回显使用
     */
    lookSelectAgain(tableList) {
      let rpamountChild = 0;
      let map = {};
      this.tableData.forEach(item => {
        map[item.caSeq] = true;
      });
      tableList.forEach(item => {
        if (!map[item.caSeq]) {
          this.tableData.push(item);
        }
      });
      this.cParentScope.parentFormModel.pbacctsq = [];
      this.tableData.forEach(item => {
        this.cParentScope.parentFormModel.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
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
          }
        })
        .catch(err => {
          console.error(err);
        });
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
      return (
        t.split("").reverse().join("") +"." +r);},
    /**
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.ruleForm.resetFields();
    },
    /**
     *及时校验还款金额
     *
     */
    rpamountCheck() {
      console.log(this.ruleForm.rpamount);
      var reg1 = /^[1-9]\d*(?=\.{0,1}\d+$|$)/;
      var reg2 = /^0(?=\.{1}\d+$|$)/;
      if ((reg1.test(this.ruleForm.rpamount) ||reg2.test(this.ruleForm.rpamount)) && parseFloat(this.ruleForm.rpamount) != 0) {
        if (parseFloat(this.ruleForm.rpamount) > parseFloat(this.rpamountA)) {
          if (this.errorTimes[0] == 0) {
            this.$message({
              type: "warning",
              message: "还款金额不能大于公账金额总和"
            });
            this.errorTimes[0] += 1;
            setTimeout(() => {
              this.errorTimes[0] = 0;
            }, 3000);
          }
        }
      } else {
        if (this.errorTimes[1] == 0) {
          this.$message({
            type: "warning",
            message: "还款金额不符合规则(不能为空、为零、负数、字母等)"
          });
          this.errorTimes[1] += 1;
          setTimeout(() => {
            this.errorTimes[1] = 0;
          }, 3000);
        }
      }
    },
    /**
     *保存表单数据校验
     *
     */
  submit() {
    //校验顺序：还款金额--减免勾选等--附件上传----表单其他字段

      //校验还款金额与公账金额大小
      var reg1 = /^[1-9]\d*(?=\.{0,1}\d+$|$)/;
      var reg2 = /^0(?=\.{1}\d+$|$)/;
      if ((reg1.test(this.ruleForm.rpamount) ||reg2.test(this.ruleForm.rpamount)) && parseFloat(this.ruleForm.rpamount) != 0) {
        if (parseFloat(this.ruleForm.rpamount) > parseFloat(this.rpamountA)) {
          this.$message({
            type: "warning",
            message: "还款金额不能大于公账金额总和"
          });
          document.getElementById("rpamountId").focus();
          return;
        }
      } else {
        this.$message({
            type: "warning",
            message: "还款金额不符合规则(不能为空、为零、负数、字母等)"
          });
        document.getElementById("rpamountId").focus();
        return;
      }
      if (
        this.ruleForm.pboprtp != "2" &&
        parseFloat(this.ruleForm.rpamount) >
          parseFloat(this.cParentScope.parentFormModel.lnream1)
      ) {
        this.$message({
          type: "warning",
          message: "还款金额大于逾期金额，请选择提前还款方式"
        });
        document.getElementById("pboprtpId").focus();
        return;
      }
      //校验还款金额与提前结清最大金额大小
      if (this.ruleForm.pboprtp == "2") {
        if (this.earPayAmount != undefined) {
          if (parseFloat(this.ruleForm.rpamount) >parseFloat(this.earPayAmount) ||(parseFloat(this.ruleForm.rpamount)<parseFloat(this.earPayAmount)
           && parseFloat(this.ruleForm.rpamount) > parseFloat(this.cParentScope.parentFormModel.lnream1))
          ) {
            this.$message({
              type: "warning",
              message: "还款金额不等于提前结清最大金额"+this.earPayAmount
            });
            document.getElementById("rpamountId").focus();
            return;
          }
        }else{
           this.$message({
              type: "warning",
              message: "提前结清最大金额获取失败，请重新勾选是否收取提前还款手续费"
            });
            return;
        }    
      }
      //减免金额大于5万，已获得管理层审批未勾选校验
      if (this.ifwrite == false && this.ruleForm.sfmngapply == false) {
        this.$message({
              type: "warning",
              message: "已获得管理层审批未勾选"
        });
        return;
      }
      var warnTimes = 0; //校验附件是否上传
      for (var i = 0; i < this.ifRequire.length; i++) {
        if (this.ifRequire[i] == true && this.fileStatuList[i] == false) {
          this.$set(this.warning, i, true);
          warnTimes++;
        }
      }
      if (warnTimes != 0) {
        this.$message({
          type: "warning",
          message: "校验不通过"
        });
      }
      //校验表单必须输入项是否填写
      this.$refs.ruleForm.validate(valid => {
        if (warnTimes == 0 && valid) {
          this.submitData();
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
     *提交表单数据
     *
     */
    submitData() {
      var params = Object.assign(
        {},
        this.cParentScope.parentFormModel,
        this.ruleForm
      );
      params = Object.assign({}, params, this.filePath);
      
      params.servicecode = "PLMSKGTS0026";
      params.hxlx = this.nubFormat(this.cParentScope.parentFormModel.hxlx, 2);
      params.lnream = params.lnream1;
      params.rpamount = this.nubFormat(params.rpamount, 2);
      params.sfzxqx = params.sfzxqx ? "1" : "0";
      params.sfredcznf = params.sfredcznf ? "1" : "0";
      params.sfredcpi = params.sfredcpi ? "1" : "0";
      params.sfredcni = params.sfredcni ? "1" : "0";
      params.sfjmtqhk = params.sfjmtqhk ? "0" : "1"; //后台接口按照收取判断，即不减免传1
      params.sfmngapply = params.sfmngapply ? "1" : "0";

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log(res);
            let msg = this.$i18ns("PTE_successMsg");
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
     *获取提前还款手续费
     *
     */
    getEarPayAmount(feflag) {
      var params = {};
      params.servicecode = "PLMSKGTS0031";
      params.lncfno = this.cParentScope.parentFormModel.lncfno; //贷款借据号
      params.tranam = "0"; //交易金额
      params.repytp = "1"; //还款种类 ：1-结清贷款
      params.adrptp = ""; //提前还款类型：3-全部结清
      params.feflag = feflag; //收取手续费标志：1-是
      params.remark = ""; //备注信息
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.earPayAmount = res.data.totamo;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *获取已经的表单信息(返显查看)----初始化时调用
     *
     */
    getSubmitData() {
      var params = {};
      params.servicecode = "PLMSKGTS0029";
      params.applid = this.cParentScope.parentFormModel.applid;
      console.log(params.applid);
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;
            //公账信息
            this.tableData = data.pbacctsq;
            this.lookSelectAgain(this.tableData);
            //表单选项
            this.ruleForm.rpamount = data.rpamount != "0.00" ? data.rpamount : ""; //还款金额
            this.ruleForm.sfzxqx = data.sfzxqx == "1" ? true : false;
            this.ruleForm.sfredcznf = data.sfredcznf == "1" ? true : false;
            this.ruleForm.sfredcpi = data.sfredcpi == "1" ? true : false;
            this.ruleForm.sfredcni = data.sfredcni == "1" ? true : false;
            this.ruleForm.pboprtp = data.pboprtp ? data.pboprtp : "0"; //公账处理方式
            this.ruleForm.sfjmtqhk = data.sfjmtqhk == "1" ? true : false;
            this.ruleForm.sfmngapply = data.sfmngapply == "1" ? true : false;

            //是否减免违约金关联项赋值
            if (data.sfredcznf == "1") {
              this.sfwrite[0] = false;
              this.sfwrite[1] = false;
              this.rules.adjty[0].required = true;
              this.rules.adjrs[0].required = true;
              this.rules.remark[0].required = true;
              for (var i = 0; i < this.ifRequire.length - 3; i++) {
                this.ifRequire[i] = true;
              }
            }
            //是否减免罚息关联项赋值
             if (data.sfredcpi == "1") {
              this.sfwrite[2] = false;
            }
            //提前还款关联项赋值
            if (data.pboprtp == "2") {
              this.ifShowSfjmtqhk = true;
              if (data.sfjmtqhk == "1") {
                 this.ifShowTqhkatt = true;
                 this.ifRequire[4] = true;
                 this.getEarPayAmount("0"); //减免手续费
              }else{
                 this.getEarPayAmount("1"); //不减免手续费
              }
            }
            this.ruleForm.redcznf = data.redcznf;
            this.ruleForm.redcpi = data.redcpi;
            this.ruleForm.redcni = data.redcni;
            this.ruleForm.adjty = data.adjty;
            this.ruleForm.adjrs = data.adjrs;
            this.ruleForm.remark = data.remark;
            for (var i = 0; i < this.formKeyList.length; i++) {
              this.fileNameList[i] = data[this.formKeyList[i]];
            }
            this.$watch("ruleForm.rpamount",function() { this.rpamount();},{ deep: true });
            this.$watch("ruleForm.sfredcznf",function() {this.sfredcznf();},{ deep: true });
            this.$watch( "ruleForm.sfredcpi",function() {this.sfredcpi();},{ deep: true });
            this.$watch("ruleForm.sfredcni",function() {this.sfredcni();},{ deep: true });
            this.$watch("ruleForm.pboprtp",function() {this.pboprtp();},{ deep: true });
            this.$watch("ruleForm.sfjmtqhk",function() {this.sfjmtqhk();},{ deep: true });
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
    getFileStatu(formKey, path, fileStatu) {
      for (var i = 0; i < this.formKeyList.length; i++) {
        if (this.formKeyList[i] == formKey) {
          this.fileStatuList[i] = fileStatu;
          this.filePath[formKey] = path;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }
}
.caSeq-table {
  padding: 10px 30px;
}
.borderLine {
  padding: 10px 30px;
  margin: 10px 20px 30px 20px;
  border: 1px solid #ced2d6;
  border-radius: 10px;
  // margin-bottom: 30px;
}
.submitStyle {
  text-align: center;
  line-height: 100px;
}
.repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 16px 0 0 0;
    .el-form-item__label {
      display: flex;
      justify-content: flex-start;
    }
  }
  
}
</style>