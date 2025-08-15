<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>基本信息</span>
          </template>
          <el-form
            ref="basicForm"
            :rules="basicRules"
            :model="basicForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="借据号" prop="lncfno">
                  <el-input
                    v-model="basicForm.lncfno"
                    @blur="lncfnoBlur"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户号" prop="idtfno">
                  <el-input
                    v-model="basicForm.idtfno"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户名称" prop="acctna">
                  <el-input
                    v-model="basicForm.acctna"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="借据金额" prop="acctna">
                  <el-input
                    v-model="basicForm.acctna"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="本金余额" prop="acctna">
                  <el-input
                    v-model="basicForm.acctna"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="起息日期"
                  prop="zxshoultime"

                                      :disabled="true"

                >
                  <el-date-picker
                                      :disabled="true"

                    v-model="appForm.zxshoultime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyyMMdd"
                    value-format="yyyyMMdd"
                    :picker-options="khjmsqsjOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="到期日期"
                  prop="zxshoultime"
                    :disabled="true"
                >
                  <el-date-picker
                                      :disabled="true"

                    v-model="appForm.zxshoultime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyyMMdd"
                    value-format="yyyyMMdd"
                    :picker-options="khjmsqsjOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总期数" prop="prodna">
                  <el-input
                    v-model="basicForm.prodna"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item name="2"  v-show="false">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form
            ref="appForm"
            :rules="appRules"
            :model="appForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="承办机构"
                  prop="under_agency"
                  :rules="[{ required: true, message: '请选择承办机构' }]"
                >
                  <el-select v-model="appForm.under_agency" placeholder=" ">
                    <el-option
                      v-for="item in under_agencyList"
                      :key="item.entrorg"
                      :label="item.entrorgnm"
                      :value="item.entrorgnm"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="受理机构"
                  prop="shoul_agency"
                  :rules="[{ required: true, message: '请选择受理机构' }]"
                >
                  <el-select v-model="appForm.shoul_agency" placeholder=" ">
                    <el-option
                      v-for="item in shoul_agencyList"
                      :key="item.acceptance_name"
                      :label="item.acceptance_name"
                      :value="item.acceptance_name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="执行受理案号"
                  prop="zxshoulid"
                  :rules="[{ required: true, message: '请输入执行受理案号' }]"
                >
                  <el-input v-model="appForm.zxshoulid" @change="implementNoChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="执行受理时间"
                  prop="zxshoultime"
                  :rules="[{ required: true, message: '请选择执行受理时间' }]"
                >
                  <el-date-picker
                    v-model="appForm.zxshoultime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyyMMdd"
                    value-format="yyyyMMdd"
                    :picker-options="khjmsqsjOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
               <!-- class="require-asterisk" -->
              <el-col :span="12">
                <el-form-item
                 :rules="[{ required: true, message: '请上传附件' }]"
                  label="附件"
                  prop="fjinfo"

                >
                  <upload-file
                    ref="fjinfoProp"
                    :uploadFileList="appForm.fjinfo"
                    :uploadDisabled="false"
                    @changeFile="fjinfoChange"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- :class="{'require-asterisk' : appForm.ifpass === '该受理流水号已经有审批通过的执行受理记录'}" -->
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('备注:')"
                  prop="remark"
                  :rules="[{ required: appForm.ifpass === '该受理流水号已经有审批通过的执行受理记录', message: '请输入备注' }]"
                >
                  <el-input
                    type="textarea"
                    v-model="appForm.remark"
                    maxlength="200"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>



        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>期供信息</span>
          </template>
          <div class="container-centent--table">
            <el-table
              ref="multipleTable"
              :data="payTableData"
              :border="true"
              style="width: 100%"
              stripe
            >
              <el-table-column
                label="是否标志"
                prop="applid"
                align="center"
              ></el-table-column>
              <el-table-column
                label="本期期数"
                prop="appl_user"
                align="center"
              ></el-table-column>
              <el-table-column
                label="起始日期"
                prop="appl_date"
                align="center"
              ></el-table-column>
              <el-table-column
                label="到期日期"
                prop="zxshoulid"
                align="center"
              ></el-table-column>
              <el-table-column
                label="宽限到期日"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="每期还款总数"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="初始本金"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="初始利息"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="调整计划还款类型"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="本期应还本金"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                label="本期应还利息"
                prop="zxshoultime"
                align="center"
              ></el-table-column>


            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination
              v-show="isShowPage"
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15, 20]"
              :page-size="tableSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableTotal"
            >
            </el-pagination>
          </div>
                  <el-dialog
                  title="执行受理申请历史详情"
                  :visible.sync="ApplyInfoVisible"
                  :destroy-on-close="true"
                  v-if="ApplyInfoVisible"
                  width = "75%"
                  :close-on-click-modal="false"
                  :append-to-body="true">
                  <div class="container-content">
                    <div class="container-content--search">
                      <susong-managezxsljl-view-test
                        :applid ="this.applid"
                        :confirmFlag = "true"
                      />
                    </div>
                  </div>
                </el-dialog>
        </el-collapse-item>

        <div class="custom-common--footer">
          <el-button type="primary" size="small" @click="submit" plain
            >提交</el-button
          >
          <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
        </div>


        <div></div>
      </el-collapse>
    </div>
  </div>
</template>

<script>
//import UploadFile from "@/views/pl/components/UploadFile.vue";
import MyAxios from "pte-ui/utils/MyAxios";
// import changeHisList from "@/views/fs/susongManage/changeHisList.vue";
// import susongManagezxsljlViewTest from '@/views/fs/susongManage/susongManagezxsljlViewTest.vue';



export default {
  name: "susongManagezxsljl",
  components: {
  //  changeHisList,
  //   UploadFile,
  //   susongManagezxsljlViewTest,
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      basicForm: {
        // 基础信息表单对象
        lncfno: "",
        idtfno: "",
        phonno: "",
        acctna: "",
        prodna: "",
        jqstus: "",
        hxstus: "",
        areaCenter: "",
        ovdays: "",
        isunitln: "",
        unitname: "",
        nowvtime: "",
        nowvorg: "",
        entrust_status: "",
        suit_status: "",
        islgfe: "",
      },
      appForm: {
        under_agency: "",
        shoul_agency: "",
        zxshoulid: "",
        zxshoultime: "",
        remark: "",
        fjinfo: [], //变更后营业执照
        slnumber: "",
        ifpass: "",
      },
      payTableData: [],
      currentPage: 1,
      tableSize: 10,
      tableTotal: 10,
      isShowPage: false,
      isShow: false,
      remarkShow: false,
      remarkShowot: false,
      remarkShowft: false,
      isShowConfirm: false,
      checkAmount: false,
      isDisabled: false,
      compareCustomerInfo: "",
      branchList: [],
      orgTypeList: [],
      yesOrNoList: [],
      activeNames: ["1", "2", "3"],
      applyType: "ZXSLJLSQ",
      khjmsqsjOptions: {}, //时间有效期控件配置
      areacenterList: [], //区域中心列表
      isunitlnList: [], //是否为联合贷产品列表
      entrust_statusList: [], //当前案件委案状态
      suit_statusList: [], //当前案件诉讼状态
      shoul_agencyList: [], //受理机构名称列表
      under_agencyList: [], //承办机构列表
      jqstusList: [], //结清状态名称列表
      hxstusList: [], //核销状态名称列表
      islgfeList: [], //是否法诉列表
      voiceStatusList: [], //审批状态列表
      ApplyInfoVisible: false,
      showApplyInfo:false,
    };
  },
  created() {
    this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
    this.getDictList("E_YES___", "yesOrNoList"); // 是否
    this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
    this.getDictList("E_ENTRUSTSTUS", "entrust_statusList"); // 当前案件委案状态列表
    this.getDictList("E_SUITSTUS", "suit_statusList"); // 当前案件诉讼状态列表
    this.getDictList("E_YES___", "jqstusList"); // 结清状态（是否结清）
    this.getDictList("E_YES___", "hxstusList"); // 结清状态（是否核销）
    this.getDictList("E_YES___", "islgfeList"); // 是否法诉列表
    this.getDictList("E_VOICESTAT", "voiceStatusList"); //审批状态列表
    this.khjmsqsjOptions.disabledDate = (time) => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
  },

  methods: {
    /**
     * 全角转半角
     */
    implementNoChange(str) {
        let tem = "";
         for (var i = 0; i < str.length; i++) {
             if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                 tem += String.fromCharCode(str.charCodeAt(i) - 65248);
             }
             else {
                 tem += String.fromCharCode(str.charCodeAt(i));
             }
         }
        let a = tem;
        if (a.indexOf(" ") !== -1 || a.indexOf("　") !== -1) {
          tem = "";
        }
        this.appForm.zxshoulid = tem;
         return this.appForm.zxshoulid;
     },

    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // 借据号失焦回调
    lncfnoBlur() {
      if (this.comparelncfno === this.basicForm.lncfno) {
        return false;
      }
      this.comparelncfno = this.basicForm.lncfno; // 记录借据号
      this.getBasciInfo(); // 基础信息带回
      this.getpayTableData(); //申请历史信息带回
      this.getslnumber(); //用借据号查询最新的受理流水号
    },

    // 获取基础信息
    getBasciInfo() {
      // 清空历史数据
      if (this.comparelncfno) {
        this.basicForm.idtfno = "";
        this.basicForm.phonno = "";
        this.basicForm.acctna = "";
        this.basicForm.prodna = "";
        this.basicForm.jqstus = "";
        this.basicForm.hxstus = "";
        this.basicForm.areaCenter = "";
        this.basicForm.ovdays = "";
        this.basicForm.isunitln = "";
        this.basicForm.unitname = "";
        this.basicForm.nowvtime = "";
        this.basicForm.nowvorg = "";
        this.basicForm.entrust_status = "";
        this.basicForm.suit_status = "";
        this.basicForm.islgfe = "";
        this.appForm.slnumber = "";
        this.appForm.under_agency = "";
        this.appForm.shoul_agency = "";
        this.appForm.zxshoulid = "";
        this.appForm.zxshoultime = "";
        this.appForm.remark = "";
        this.appForm.fjinfo = [];
        this.$refs.fjinfoProp.clearFileList();
        // this.clearData();
      }
      let params = {
        servicecode: "RLMSPLTS1234",
        lncfno: this.basicForm.lncfno,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            this.getpayTableData(response.zxinfohis);
            this.basicForm.idtfno = response.idtfno; // 客户身份证号
            this.basicForm.phonno = response.phonno; // 手机号码
            this.basicForm.acctna = response.acctna; // 客户姓名
            this.basicForm.prodna = response.prodna; // 产品名称
            this.basicForm.jqstus = response.jqstus; //结清状态
            this.basicForm.hxstus = response.hxstus; // 核销状态
            this.basicForm.areaCenter = response.areaCenter; // 区域中心
            this.basicForm.ovdays = response.ovdays; // 逾期天数（账龄）
            this.basicForm.isunitln = response.isunitln; // 是否联合贷
            this.basicForm.unitname = response.unitname; // 联合贷公司
            this.basicForm.nowvtime = response.nowvtime; //当前委案时间
            this.basicForm.nowvorg = response.nowvorgnm; //当前委案机构
            this.basicForm.entrust_status = response.entrust_status; //当前案件委案状态
            this.basicForm.suit_status = response.suit_status; //当前案件诉讼状态
            this.basicForm.islgfe = response.islgfe; //是否法诉
            this.getChengBanOrg(); //承办机构名称列表获取
            this.getCaseAcceptOrg(); //案件受理机构名称列表获取
            this.getSecondBranch(); //区域中心列表获取
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //利用借据号查询最新的受理流水号
    getslnumber() {
      let params = {
        servicecode: "RLMSPLZH0026",
        lncfno: this.basicForm.lncfno,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        (res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            if (response.acptsr != null) {
              this.appForm.slnumber = response.acptsr;
            } else {
              this.appForm.slnumber = "";
            }
            this.appForm.ifpass = response.ifpass;
            if (
              this.appForm.ifpass == "该受理流水号已经有审批通过的执行受理记录"
            ){
              this.$message({
                type: "warning",
                message:
                  "已有结案的执行受理记录，请再次核实，如需申请请注明原因",
              });

            }
          }
        }
      );
    },

    //利用借据号查询出申请历史
    getpayTableData() {
      let params = {
        servicecode: "RLMSPLZH0004",
        lncfno: this.basicForm.lncfno,
        start: this.currentPage,
        length: this.tableSize,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        (res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            this.payTableData = response;
            this.isShowPage = false;
            this.tableTotal = response.pageParam ? response.pageParam.total : 0;
          }
        }
      );
    },

    //执行受理信息提交
    submit() {
      // if(this.appForm.fjinfo == ""){
      //       this.$message({type: "error", message: "附件不能为空，请上传附件"})
      //       return false
      // }
      this.$refs.appForm.validate((valid) => {
        if (valid) {
          this.$confirm("是否确认提交申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let params = {
              servicecode: "RLMSPLZH0001",
              lncfno: this.basicForm.lncfno, //借据号
              idtfno: this.basicForm.idtfno, //身份证号码
              phonno: this.basicForm.phonno, //手机号码
              acctna: this.basicForm.acctna, //客户姓名
              prodna: this.basicForm.prodna, // 产品名称
              jqstus: this.basicForm.jqstus, //结清状态
              hxstus: this.basicForm.hxstus, // 核销状态
              areaCenter: this.basicForm.areaCenter, // 区域中心
              ovdays: this.basicForm.ovdays, // 逾期天数（账龄）
              isunitln: this.basicForm.isunitln, // 是否为联合贷产品
              unitname: this.basicForm.unitname, // 联合贷公司名称
              nowvtime: this.basicForm.nowvtime, //当前委案时间
              nowvorg: this.basicForm.nowvorg, //当前委案机构
              entrust_status: this.basicForm.entrust_status, //当前案件委案状态
              suit_status: this.basicForm.suit_status, //当前案件诉讼状态
              islgfe: this.basicForm.islgfe, //是否法诉
              slnumber: this.appForm.slnumber, //最新的受理流水号
              under_agency: this.appForm.under_agency, //承办机构
              shoul_agency: this.appForm.shoul_agency, //受理机构
              zxshoulid: this.appForm.zxshoulid, //执行受理案号
              zxshoultime: this.appForm.zxshoultime, //执行受理时间
              fjinfo: this.appForm.fjinfo, //附件
              remark: this.appForm.remark, //备注
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
              .then((res) => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message,
                  });
                  this.clearData();
                  this.$dialog.close();
                }
              })
              .catch((err) => {
                console.error(err);
              });
          });
        }
      });
    },
    reset() {
      this.$confirm("是否确认取消?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.clearData();
        this.$dialog.close();
      });
    },

    clearData() {
      (this.basicForm = {
        idtfno: "",
        phonno: "",
        acctna: "",
        prodna: "",
        jqstus: "",
        hxstus: "",
        areaCenter: "",
        ovdays: "",
        isunitln: "",
        unitname: "",
        nowvtime: "",
        nowvorg: "",
        entrust_status: "",
        suit_status: "",
        islgfe: "",
        // slnumber:"",
      }),
        (this.appForm = {
          slnumber: "",
        });
      this.$refs.appForm.resetFields();
      this.$refs.fjinfoProp.clearFileList();
      this.payTableData = [];
    },

    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    fjinfoChange(val) {
      this.appForm.fjinfo = val;
    },

      selectMesg(index, row){
        this.applid = row.applid;
        this.showApplyInfo = true;
        this.ApplyInfoVisible = true;
      },

    /**
     * 承办机构名称列表获取
     */
    getChengBanOrg() {
      let params = {
        servicecode: "RLMSPLTS1237",
        area_center: this.basicForm.areacenter,
        lncfno: this.basicForm.lncfno,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("res.data", res.data);
            this.under_agencyList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 案件受理机构名称列表获取
     */
    getCaseAcceptOrg() {
      let params = {
        servicecode: "RLMSPLTS1390",
        area_center: this.basicForm.areacenter,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("res.data", res.data);
            this.shoul_agencyList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /**
     * 区域中心列表获取
     */
    getSecondBranch() {
      let reqMap = {
        servicecode: "RLMSPLTS1068",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then((res) => {
          if (res && res.code === "200") {
            this.areacenterList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //审批状态列表获取
    voicestatuslistinfo(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.voiceStatusList.forEach(function (item, index) {
        if (data == item.dictId) {
          // name = item.dictId + '-' + item.dictName;
          name = item.dictName;
        }
      });
      return name;
    },
  },
};
</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }

  .container-centent--table {
    margin-top: 10px;
    bottom: 60px;
  }
}
</style>
