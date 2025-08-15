<template>
  <div class="auto-box">
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item padding-l-12 padding-r-12" name="1">
        <template slot="title">
          <!-- <i class="header-icon el-icon-info"></i> -->
          <em></em
          >
          {{ $i18ns("授信申请信息") }}
        </template>
        <!-- <to-json
          toUrl="/views/icms/flowStart/credit/mortgage_flowcom.json"
          :params="this.pageParams"
          :key="flowComKey"
          @jsonCallBack="callbackMeth"
        ></to-json> -->
        <!-- 表单 -->
        <div>
          <el-form ref="condition" :model="condition" :rules="conditionRules" label-width="100px" class="custom-common--form">
            <el-row>
              <el-col :span="7">
                <el-form-item label="可售产品" prop="sale_prod_name" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.sale_prod_name"></el-input>
                    <el-button @click="productLookup" type="success" plain>...</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="授信产品编号" prop="sale_prod_cd" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.sale_prod_cd" disabled="true"></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="业务类型" prop="busi_type" label-width="100px">
                  <div class="lookupDiv">
                    <el-select v-model="condition.busi_type" clearable :placeholder="$i18ns('请选择业务类型')" :disabled="true">
                      <el-option
                        v-for="item in busiTypeOptions"
                        :key="item.id" :label="item.title" :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
               <el-col v-show="false" :span="7">
                <el-form-item label="业务类型名称" prop="prod_type_name" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.prod_type_name" ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="申请金额" prop="loan_amt" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.loan_amt" ></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="贷款期限" prop="loan_term" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.loan_term" type="number">
                      <template slot="append">M</template>
                    </el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="授信资金用途" prop="loan_purpose_desc" label-width="100px">
                  <div class="lookupDiv">
                    <el-input v-model="condition.loan_purpose_desc"></el-input>
                    <el-button @click="loanUseLookup" type="success" plain>...</el-button>
                  </div>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item class="collapse-item padding-l-12 padding-r-12" name="2">
        <template slot="title">
          <!-- <i class="header-icon el-icon-info"></i> -->
          <em></em
          >{{ $i18ns("申请人信息") }}
        </template>
        <to-json
          toUrl="/views/icms/flowStart/credit/mortgage_applyerInfo.json"
          :params="this.pageParams"
          :key="applyerInfoKey"
        ></to-json>
      </el-collapse-item>

      <el-collapse-item class="collapse-item padding-l-12 padding-r-12" name="3">
        <template slot="title">
          <!-- <i class="header-icon el-icon-info"></i> -->
          <em></em
          >{{ $i18ns("房屋信息") }}
        </template>
        <to-json
          toUrl="/views/icms/flowStart/credit/mortgage_houseInfo.json"
          :params="this.pageParams"
          :key="houseInfoKey"
        ></to-json>
      </el-collapse-item>

        <el-row>
          <div class="menu-form--title-min padding-l-12">
            <span class="required">*</span>检查资料
          </div>
          <el-table :data="tableData" :key="itemKey" border style="width: 100%">
            <el-table-column
              fixed
              prop="doc_no"
              label="资料编号"
              align="center"
            ></el-table-column>
            <el-table-column prop="doc_name" label="资料描述">
            </el-table-column>
            <el-table-column
              prop="is_must_name"
              label="是否必须"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="upload_flag_name"
              label="是否上传"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="filetype_name"
              label="附件类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="is_access_info_name"
              label="是否获取GPS信息"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="is_check_ps_name"
              label="是否对图片进行原图检查"
              align="center"
            >
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="fileManageLookup(scope.row)"
                  size="small"
                  >图片上传</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
    </el-collapse>

    <!-- 按钮 -->
    <el-row class="menu-footer">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="flowStart">{{
          $i18ns("流程启动")
        }}</el-button>
        <el-button type="primary" size="small" @click="resetPage">{{
          $i18ns("重置")
        }}</el-button>
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <el-dialog
      title="图片上传"
      :visible.sync="fileManageVisible"
      v-if="fileManageVisible"
      width="70%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true"
    >
      <FileManage
        :cParentParams="fileInfo"
        @callBack="fileUploadCallBack"
      ></FileManage>
    </el-dialog>

    <el-dialog title="选择产品" :visible.sync="productVisible" v-if="productVisible" width="70%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true">
      <to-json :params="cParentParams" :toUrl="productLookupURL" @jsonCallBack="productCallBack"></to-json>
    </el-dialog>

    <el-dialog title="选择贷款用途" :visible.sync="loanUseVisible" v-if="loanUseVisible" width="70%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true">
      <to-json :params="loadUseParams" :toUrl="loanUseLookupURL" @jsonCallBack="loanUseCallBack"></to-json>
    </el-dialog>
  </div>
</template>
<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";
import FileManage from "@/views/icms/flowStart/lend/commUitl/fileManage.vue";

export default {
  name: "houseLoanLetterOfGrantAuto",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  components: {
    FileManage,
  },
  data() {
    return {
      flowCom: "flowCom",
      houseInfo: "houseInfo",
      applyerInfo: "applyerInfo",
      flowComKey: 1,
      houseInfoKey: 2,
      applyerInfoKey: 3,
      onlineFormKey: 4,
      activeNames: ["1", "2", "3"],
      pageParams: {
        sale_prod_cd: "",
        sale_prod_name: "",
        part_project_no: "",
        part_project_version: ""
      },
      condition: {
        sale_prod_cd: "", //可售产品编号
        busi_type: "CL", //业务类型 贷款
        apply_type: "S", //申请类型 贷款申请
        sale_prod_name: "", //可售产品名称
        cust_type: "10", //客户类型 对私客户
        loan_amt: "", //贷款金额
        loan_term: "", //贷款期限
        loan_use: "", //贷款用途（少）
        bind_card_no: "", //业务绑定的银行卡号

        cust_no: "", //客户编号
        cust_name: "", //客户姓名
        prod_type_name: "", //产品类型名称
        apply_type_name: "授信申请", //申请类型名称
        cert_no: "", //证件号码
        cert_type: "", //证件类型
        mobile_no: "", //手机号码
        is_credit: "", //是否授信
        contract_no: "", //合同号
        limit_no: "", //额度编号
        apply_no: "", //申请号
        repay_type: "", //还款方式
        cycling_flag: "", //循环标志
        loan_inst_rate: "", //贷款执行利率
        repay_cycle: "", //还款周期
        open_acct_bank: "", //开户行
        branch_org: "", //分支机构
        trxn_teller: "", //交易用户
        teller_name: "", //用户名称
        avail_amt: "", //可用额度（元）
        effect_date: "", //额度生效日期
        expiry_date: "", //额度失效日期
        parent_apply_id: "", //父级申请号
        is_inherit_files: "", //是否继承资料
        trust_pay_flag: "" //是否受托支付
      },
      mortgageInfo: {
        ppty_pri_name: "", //楼宇名称
        address: "", //地址
        ppty_status: "", //楼宇状态
        house_cert_no: "", //房产证号码
        assetpr_type: "", //产权类型
        ppty_quality: "", //房屋质量
        bldg_structure: "", //房屋结构
        prov_code: "", //省份代码
        buy_price: "", //省份代码
        region: "", //地区
        house_style: "", //住宅类型
        ppty_estate: "", //小区
        usable_area: "", //使用面积
        tot_floor: "", //总楼层
        on_floor: "", //所在楼层
        ppty_market_type: "", //市场类型
        traffic_condation: "", //交通条件：便利、偏僻、一般
        cash_ability: "", //变现能力：强、弱、一般
      },
      flowApplyerInfo: {
        cust_name: "", //客户姓名
        education: "", //学历
        cert_day: "", //证件生效日
        card_end_day: "", //证件到期日
        issuing_addr: "", //签发地址
        marr_state: "", //婚姻状态
        spouse_name: "", //配偶姓名
        spouse_cert_type: "", //配偶证件类型
        spouse_cert_no: "", //配偶证件号码
        spouse_work_unit_name: "", //配偶工作单位名称
        spouse_work_phone: "", //配偶工作单位电话
        is_work: "", //是否有工作单位
        unit_nature: "", //单位性质
        year_income: "", //年收入
        busi_unit_income_ccy: "", //收入币种
        country_code: "", //国籍代号
        family_addr: "", //家庭住址
        nation: "" //民族
      },
      tableData: [], //检查资料表格
      fileMap: new Map(),
      fileInfo: {
        doc_no: "",
        filetype: "",
        is_access_info: "",
        is_check_ps: "",
        fileList: []
      },
      fileManageVisible: false, //显示图片上传对话框
      itemKey: "",
      productLookupURL: "/views/icms/flowStart/credit_sell_product_lookup.json",
      productVisible: false, //显示查找对话框
      busiTypeOptions: [],
      loanUseLookupURL: "/views/icms/docManager/loanPurpose/loanPurpose_lookup.json",
      loanUseVisible: false, //显示查找对话框
      loanUseParams: {

      },
      conditionRules: {
        sale_prod_name: [
          {required: true, message: '请选择产品', trigger: 'blur'}
        ],
        loan_amt: [
          {required: true, message: '申请金额不能为空', trigger: 'blur'}
        ],
        loan_term: [
          {required: true, message: '贷款期限不能为空', trigger: 'blur'}
        ],
      }
    };
  },
  created() {
    this.getBusiList();
    this.getPartnerInfo();
  },
  methods: {
    getBusiList() {
      let params = {
        servicecode: "pd0144",
        grupno: "0006",
        pid: "KSCP"
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.busiTypeOptions = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    productLookup() {
      let that = this;
      that.productVisible = true;
    },
    productCallBack(data) {
      let that = this;
      that.productVisible = false;
      this.condition.sale_prod_name = data.sale_prod_name;
      this.condition.sale_prod_cd = data.sale_prod_cd;
      this.condition.busi_type = data.prod_type || 'CL';

      let params = {
        servicecode: "pd0143",
        grupno: "0006",
        id: this.condition.busi_type
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.condition.prod_type_name = res.data.title;

          }
        })
        .catch(err => {
          console.error(err);
        });
      this.initDocDetialList(this.condition.sale_prod_cd);
    },
    loanUseLookup() {
      let that = this;
      that.loanUseVisible = true;
      this.loanUseParams.sale_prod_cd = this.condition.sale_prod_cd;
      this.loanUseParams.prod_version = this.condition.prod_version || '';
    },
    loanUseCallBack(data) {
      let that = this;
      that.loanUseVisible = false;
      this.condition.loan_purpose_desc = data.amt_purpose_name;
    },
    //流程启动
    flowStart() {
      //必输项校验
      if (!this.formValidate()) {
        return;
      }
      // let flowCom = this.getFlowCom();
      let applyerInfo = this.$dataBus.getCurrentFormData(this).applyerInfo;
      let housesInfo = this.$dataBus.getCurrentFormData(this).houseInfo;
      //let lendApplyContractInfo = this.$dataBus.getCurrentFormData(this).onlineForm.lendApplyContractInfo;
      //let lendIssueInfo = this.$dataBus.getCurrentFormData(this).onlineForm.lendIssueInfo;
      //let transferAcctInfo = this.$dataBus.getCurrentFormData(this).onlineForm.transferAcctInfo;

      //let lendDetailInfo =  {
        //trust_pay_amt: lendApplyContractInfo.trust_pay_amt,
        //trust_pay_limit_flag:  lendApplyContractInfo.trust_pay_limit_flag
      //}
      this.getSubmitDocInfo();
      // 贷款金额=申请金额 贷款期限=申请期限
      //this.condition.loan_amt = lendApplyContractInfo.apply_amt
      //this.condition.loan_term = lendApplyContractInfo.apply_term

      this.condition.cert_type = applyerInfo.cert_type
      this.condition.cert_no = applyerInfo.cert_no
      this.condition.cust_name = applyerInfo.cust_name
      this.condition.mobile_no = applyerInfo.mobile_no

      
      let request_map = {
        servicecode: "ar0020",
        flowCommon: this.condition,
        //lendApplyContractInfo: lendApplyContractInfo,
        flowApplyerInfo: applyerInfo,
        //lendDetailInfo: lendDetailInfo,
        //lendIssueInfo: lendIssueInfo,
        //transferAcctInfo: transferAcctInfo,
        checkDocInfo: this.tableData,
        mortgageInfo: housesInfo,
      };
      
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map).then(
        res => {
          if (res.code === "200") {
            MyMessage({
              message: "流程启动成功",
              type: "success"
            });
            this.resetPage();

            let params = res.data;
            params.appId = "icmsOnl";
            params.task_inst_id = params.cur_task_id;
            params.frame_cd = params.task_url1;
            params.prod_cd = this.cParentParams.sale_prod_cd;
            params.prod_name = this.cParentParams.sale_prod_name;

            this.$publicFn.openNavTab(
              "/views/icms/ar_workbench/workbench_main_tabs.json",
              "任务工作台",
              params,
              this
            );
          } else {
            MyMessage({
              message: res.message,
              type: "error"
            });
          }
        }
      );
    },
    /**
     * 初始化产品下的检查资料信息
     */
    initDocDetialList(sale_prod_cd) {
      let request_map = {
        sale_prod_cd,
        apply_type: "S",
        servicecode: "ar0165"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map).then(
        response => {
          if (response.code === "200") {
            this.tableData = response.data;
            this.tableData.forEach(fileDetail => {
              fileDetail.is_must_name = fileDetail.is_must == 1 ? "是" : "否";
              fileDetail.upload_flag_name =
                fileDetail.upload_flag == 1 ? "是" : "否";
              fileDetail.filetype_name =
                fileDetail.filetype == "image" ? "图片类型" : "所有类型";
              if (fileDetail.is_access_info != null) {
                fileDetail.is_access_info_name =
                  fileDetail.is_access_info == 1 ? "是" : "否";
              }
              if (fileDetail.is_check_ps != null) {
                fileDetail.is_check_ps_name =
                  fileDetail.is_check_ps == 1 ? "是" : "否";
              }
              let fileInfo = {
                doc_no: fileDetail.doc_no,
                filetype: fileDetail.filetype,
                is_access_info: fileDetail.is_access_info,
                is_check_ps: fileDetail.is_check_ps,
                fileList: []
              };
              this.fileMap.set(fileDetail.doc_no, fileInfo);
            });
          } else {
            MyMessage({
              message: response.message,
              type: "error"
            });
          }
        }
      );
    },
    fileManageLookup(rowData) {
      let that = this;
      this.fileInfo = this.fileMap.get(rowData.doc_no);
      that.fileManageVisible = true;
    },
    //文件上传回调
    fileUploadCallBack(data) {
      let that = this;
      that.fileMap.set(data.doc_no, data);

      //是否上传
      if (data.fileList.length == 0) {
        that.tableData.forEach(oneData => {
          if (oneData.doc_no == data.doc_no) {
            oneData.upload_flag = 0;
            oneData.upload_flag_name = "否";
          }
        });
      } else {
        that.tableData.forEach(oneData => {
          if (oneData.doc_no == data.doc_no) {
            oneData.upload_flag = 1;
            oneData.upload_flag_name = "是";
          }
        });
      }
      //刷新表格
      this.itemKey = Math.random();
    },
    getSubmitDocInfo() {
      this.tableData.forEach(data => {
        data.file_list = this.fileMap.get(data.doc_no).fileList;
      });
    },
    /**
     * 获取合作项目信息
     */
    getPartnerInfo() {
      if (this.isNull(this.pageParams.sale_prod_cd)) {
        return;
      }
      let request_map = {
        servicecode: "pd0627",
        sale_prod_cd: this.pageParams.sale_prod_cd
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map).then(
        res => {
          if (res.code === "200") {
            this.pageParams.part_project_no = res.data.part_project_no;
            this.pageParams.part_project_version =
              res.data.part_project_version;
          } else {
            MyMessage({
              message: res.message,
              type: "error"
            });
          }
        }
      );
    },
    /**
     * 组装流程通用复合类型参数
     */
    getFlowCom() {
      let com = this.$dataBus.getCurrentFormData(this).flowCom;
      com.busi_type = this.condition.busi_type;
      com.apply_type = this.condition.apply_type;
      com.cust_type = this.condition.cust_type;
      com.loan_use = this.condition.loan_use;
      return com;
    },
    async formValidate() {
      let flag = false;
      let that = this;
      await this.$dataBus.doAllValidator(that).then(valid => {
        flag = valid;
      });
      return flag;
    },
    isNull(params) {
      if (params === "" || params === null || params === undefined) {
        return true;
      }
      return false;
    },
    //清空页面数据
    resetPage() {
      //清除页面参数
      this.flowComKey = Math.random() + "A";
      this.lendApplyKey = Math.random() + "B";
      this.applyerInfoKey = Math.random() + "C";
      this.houseInfoKey = Math.random() + "D";
      this.onlineFormKey = Math.random() + "E";
    }
  }
};
</script>
<style lang="less" scoped>
.auto-box {
  .el-collapse-item {
    /deep/ .el-collapse-item__header {
      padding-left: 20px;
    }
  }
}
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}

.menu-footer {
  margin-top: 30px;
  text-align: center;
}

.lookupDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-button--medium{
    padding: 7px 12px !important;
  }
}
</style>
