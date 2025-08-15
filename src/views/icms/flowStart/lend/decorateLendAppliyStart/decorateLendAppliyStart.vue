<template>
  <div class="menu-form">
    <div class="menu-form--title">装修贷出账申请</div>
    <div class="menu-form--container">
      <el-form ref="applyForm" :model="applyForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="cust_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.cust_name"></el-input>
                <el-button @click="custLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="额度编号" prop="limit_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.limit_no" disabled="true"></el-input>
                <el-button @click="limitLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品编号" prop="sale_prod_cd" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.sale_prod_cd" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称" prop="sale_prod_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.sale_prod_name" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装修阶段" prop="stage_desc" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.stage_desc" disabled="true"></el-input>
                <el-button @click="stageLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷款申请金额" prop="loan_amt" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.loan_amt" ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请期限" prop="loan_term" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.loan_term" clearable placeholder="请选择期限">
                  <el-option
                    v-for="item in termOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款方式" prop="repay_type" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.repay_type" clearable placeholder="请选择还款方式">
                  <el-option
                    v-for="item in repayTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label=" " prop="checked" label-width="195px">
              <el-checkbox v-model="checked">
                我已阅读并同意
                <el-button
                  type="text"
                  v-for="(item, index) in protocolOptions"
                  :key="index"
                  @click="protocolLookup(item)"
                  class="btn"
                >
                  《{{ item.protocol_name }}》
                </el-button>
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="menu-form--title">
            <span class="required">*</span>检查资料
          </div>
          <el-table
            :data="tableData"
            :key="itemKey"
            border
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="doc_no"
              label="资料编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="doc_name"
              label="资料描述"
            >
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

            <el-table-column
              fixed="right"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="fileManageLookup(scope.row)" size="small">图片上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="flowStart">流程启动</el-button>
            <el-button type="primary" size="small" @click="resetPage">{{$i18ns('重置')}}</el-button>
          </el-col>
        </el-row>

      </el-form>
      <el-dialog title="选择阶段计划" :visible.sync="stageVisible" v-if="stageVisible" width="70%" :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :params="applyForm" :toUrl="stageLookupURL" @jsonCallBack="stageCallBack"></to-json>
      </el-dialog>
      <el-dialog title="选择客户" :visible.sync="custVisible" v-if="custVisible" width="70%" :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :toUrl="custLookupURL" @jsonCallBack="custCallBack"></to-json>
      </el-dialog>
      <el-dialog title="选择额度" :visible.sync="limitVisible" v-if="limitVisible" width="70%" :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :params="limitQueryCondition" :toUrl="limitLookupURL" @jsonCallBack="limitCallBack"></to-json>
      </el-dialog>
      <el-dialog title="图片上传" :visible.sync="fileManageVisible" v-if="fileManageVisible" width="70%"
                 :before-close="handleClose" top="30vh"
                 :append-to-body="true">
        <FileManage :cParentParams="fileInfo" @callBack="fileUploadCallBack"></FileManage>
      </el-dialog>
      <el-dialog :title="protocolTitle" :visible.sync="protocolVisible" v-if="protocolVisible" width="70%"
                 :before-close="handleClose" top="30vh"
                 :append-to-body="true">
        <LookAgreement :cParentParams="protocol"></LookAgreement>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import MyMessage from "pte-ui/utils/MyMessage";
  import FileManage from "@/views/icms/flowStart/lend/commUitl/fileManage.vue";
  import LookAgreement from "@/views/pd/protocolManage/lookAgreement.vue";
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
      FileManage,
      LookAgreement
    },
    data() {
      var checkMethod = (rule, value, callback) => {
        if (!this.hasAgreeProtocol()) {
          return callback(new Error('请勾选'));
        } else {
          return callback() // 一些同学的问题可能就出在这里
        }
      };
      return {
        checked: false,
        tableData: [],
        itemKey: "",
        termOptions: [],
        repayList: [],
        repayMap: {},
        repayTypeOptions: [],
        protocolOptions: [],
        protocol: "",
        protocolTitle: "",
        fileInfo: {
          doc_no: "",
          filetype: "",
          is_access_info: "",
          is_check_ps: "",
          fileList: []
        },
        fileMap: new Map(),
        applyForm: {
          sale_prod_name: "",//可售产品名称
          sale_prod_cd: "",//可售产品号
          apply_type:"O",
          busi_type:"LOAN",
          cust_no: "",//客户号
          cust_name: "",//客户名称
          limit_no: "",//额度编号
          order_id: "",//外部订单号（授信阶段的申请号）
          plan_id: "",//计划编号
          stage_desc: "",//阶段描述
          loan_amt: "",//贷款金额
          loan_term: "",//贷款期限
          repay_type: "",//还款方式
          parent_apply_id:"", //父级申请编号
          repay_cycle:""//还款周期
        },
        limitQueryCondition: {
          cust_no: "",
          cl_level: "P",
          status: "Y",
          source_system: "001"
        },
        custLookupURL: "/views/us/privateManage/customer_lookup.json",
        // limitLookupURL: "/views/icms/flowStart/lend/creditBusinessStart/credit_limit_lookup.json",
        limitLookupURL: "/views/icms/flowStart/lend/creditBusinessStart/credit_limit_lookup2.json",
        stageLookupURL: "/views/icms/flowStart/lend/decorateLendAppliyStart/creditPhasePlan_lookup.json",
        showForm: true,
        title: "",
        type: "",
        stageVisible: false, //显示查找对话框
        fileManageVisible: false, //显示查找对话框
        custVisible: false, //显示查找对话框
        limitVisible: false, //显示查找对话框
        protocolVisible: false, //显示协议对话框
        rules: {
          loan_term: [
            {required: true, message: '请选择期限', trigger: 'change'},
          ],
          repay_type: [
            {required: true, message: '请选择还款方式', trigger: 'change'}
          ],
          checked: [
            {required: true, validator: checkMethod, trigger: 'blur'}
          ],
          cust_name: [
            {required: true, message: '请选择选择客户', trigger: 'change'}
          ],
          loan_amt: [
            {required: true, message: '请输入贷款申请金额', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.getRepayMap("PD_E_REPAY_WAY", "repayList");
    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
    },
    methods: {
      hasAgreeProtocol() {
        let that = this;
        console.log(that.protocolOptions, "协议集合");
        if (that.protocolOptions.length > 0) {
          return that.checked;
        }
        return true;
      },
      stageLookup() {
        let that = this;
        that.stageVisible = true;
      },
      custLookup() {
        let that = this;
        that.custVisible = true;
      },
      limitLookup() {
        let that = this;
        that.limitVisible = true;
      },
      protocolLookup(protocol) {
        let that = this;
        console.log("@@@协议信息", protocol);
        that.protocol = protocol;
        that.protocolTitle = protocol.protocol_name;
        that.protocolVisible = true;
      },
      fileManageLookup(rowData) {
        let that = this;
        console.log("rowData", rowData);
        this.fileInfo = this.fileMap.get(rowData.doc_no);
        console.log("fileInfo", this.fileInfo);
        that.fileManageVisible = true;
        console.log("fileManageVisible", that.fileManageVisible)
      },
      stageCallBack(data) {
        let that = this;
        console.log(data, "阶段页面传来的数据");
        that.stageVisible = false;
        that.applyForm.plan_id = data.plan_id;
        that.applyForm.stage_desc = data.stage_desc;
        that.applyForm.loan_amt = data.avail_amt;

      },
      custCallBack(data) {
        let that = this;
        console.log(data, "客户页面传来的数据");
        that.custVisible = false;
        that.applyForm.cust_no = data.cust_no;
        that.limitQueryCondition.cust_no = data.cust_no;
        that.applyForm.cust_name = data.cust_name;
        that.applyForm.cert_type = data.cert_type;
        that.applyForm.cert_no = data.cert_no;
        that.applyForm.mobile_no = data.mobile_no;
        that.applyForm.cust_type = data.cust_type;
        console.log(that.applyForm, "选择客户后的表单数据");
      },
      limitCallBack(data) {
        let that = this;
        console.log(data, "额度页面传来的数据");
        that.limitVisible = false;
        that.applyForm.sale_prod_cd = data.prod_code;
        that.applyForm.sale_prod_name = data.prod_name;
        that.applyForm.limit_no = data.prod_credit_seq;
        that.applyForm.apply_no = data.apply_no;
        that.applyForm.parent_apply_id = data.apply_no;
        console.log(that.applyForm, "选择额度后的表单数据");
        that.initDocDetialList(that.applyForm.sale_prod_cd);
        that.initloanProperty(that.applyForm.sale_prod_cd);
        that.initProtocol(that.applyForm.sale_prod_cd);
      },
      //文件上传回调
      fileUploadCallBack(data) {
        let that = this;
        console.log("@@上传后未添加的fileMapthat", that.fileMap);
        that.fileMap.set(data.doc_no, data);

        //是否上传
        if (data.fileList.length == 0) {
          that.tableData.forEach(oneData => {
            if (oneData.doc_no == data.doc_no) {
              oneData.upload_flag = 0;
              oneData.upload_flag_name = "否";
              console.log("上传和删除后tableData", that.tableData)
            }
          })
        } else {
          that.tableData.forEach(oneData => {
            if (oneData.doc_no == data.doc_no) {
              oneData.upload_flag = 1;
              oneData.upload_flag_name = "是";
              console.log("上传和删除后tableData", that.tableData)
            }
          })
        }
        //刷新表格
        this.itemKey = Math.random();
        console.log("@@上传后的fileMapthat", that.fileMap);
      },
      //初始化产品下的检查资料信息
      initDocDetialList(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          apply_type: "O",
          servicecode: "ar0165",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@检查资料信息", response.data);
              this.tableData = response.data;
              this.tableData.forEach(fileDetail => {
                fileDetail.is_must_name = fileDetail.is_must == 1 ? "是" : "否";
                fileDetail.upload_flag_name = fileDetail.upload_flag == 1 ? "是" : "否";
                fileDetail.filetype_name = fileDetail.filetype == "image" ? "图片类型" : "所有类型";
                if(fileDetail.is_access_info != null){
                  fileDetail.is_access_info_name = fileDetail.is_access_info == 1 ? "是" : "否";
                }
                if(fileDetail.is_check_ps != null ){
                  fileDetail.is_check_ps_name = fileDetail.is_check_ps == 1 ? "是" : "否";
                }
                //与上传组件交互的数据结构
                let fileInfo = {
                  doc_no: fileDetail.doc_no,
                  filetype: fileDetail.filetype,
                  is_access_info: fileDetail.is_access_info,
                  is_check_ps: fileDetail.is_check_ps,
                  fileList: [],
                };
                this.fileMap.set(fileDetail.doc_no, fileInfo);
              });
              console.log("@@@fileMap", this.fileMap);
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //初始化贷款属性
      initloanProperty(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          servicecode: "pd0223",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@贷款属性", response.data);
              let loanProperty = response.data.info;
              this.applyForm.repay_cycle = loanProperty.repay_cycle;
              this.termOptions = [];
              loanProperty.support_installment.forEach(term => {
                let one = {
                  label: term,
                  value: term
                };
                this.termOptions.push(one);
              });
              console.log("贷款期限列表", this.termOptions);
              this.repayTypeOptions = [];
              loanProperty.repay_type_list.forEach(repayType => {
                let one = {
                  label: this.repayMap[repayType].dictName,
                  value: repayType
                };
                this.repayTypeOptions.push(one);
              });
              console.log("还款方式列表", this.repayTypeOptions);
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //初始化协议模板
      initProtocol(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          apply_type: "O",
          servicecode: "pd0250",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@协议模板信息", response.data);
              this.protocolOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      hasUploadFile() {
        let that = this;
        let result = true;
        that.tableData.forEach(checkDocinfo => {
          if (checkDocinfo.is_must == 1 && checkDocinfo.upload_flag == 0) {
            result = false;
          }
        });
        return result;
      },
      //流程启动
      flowStart() {
        let request_map = {};
        request_map["servicecode"] = "ar1011";
        let conditon = {};
        conditon.flowComType = this.applyForm;
        this.getSubmitDocInfo();
        conditon.checkDocInfo = this.tableData;
        conditon.stagePlanInfo = {
          plan_id : this.applyForm.plan_id,
        };
        console.log("@@@tabalData", this.tableData);
        request_map["condition"] = conditon;
        console.log("request_map", request_map);
        this.$refs["applyForm"].validate((valid) => {
          if (valid) {
            //协议校验
            if (!this.hasAgreeProtocol()) {

              return;
            }
            // 上传文件校验
            if (!this.hasUploadFile()) {
              MyMessage({
                message: "请上传必要的文件",
                type: "error",
              });
              return;
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
              .then((response) => {
                if (response.code === "200") {
                  MyMessage({
                    message: "流程启动成功",
                    type: "success",
                  });
                  this.resetPage();
                  this.$publicFn.openNavTab("/views/icms/ar_workbench/into_pool/workbench_into_pool_view.json", "进件池", this.cParentParams, this)
                } else {
                  MyMessage({
                    message: response.message,
                    type: "error",
                  });
                }
              });
          } else {
            MyMessage({
              message: "您还未输入必选项 ！！！",
              type: "error",
            });
            return false;
          }
        });

      },
      //清空页面数据
      resetPage() {
        this.$refs["applyForm"].resetFields();
        this.checked = false;
        this.resetCheckList();
      },
      //清空检查列表
      resetCheckList() {
        this.protocolOptions = [];
        this.tableData = [];
      },
      getSubmitDocInfo() {
        this.tableData.forEach(data => {
          data.file_list = this.fileMap.get(data.doc_no).fileList;
        });
      },
      /**
       * 获取还款方式集合
       * @param dictType  数据字典 dictTyp
       * @param listKey 列表对象key名称
       */
      getRepayMap(dictType, listKey) {
        let params = {
          dictType: dictType,
          dictKey: [dictType],
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
              console.log("下拉列表", this[listKey]);
              this.repayList.forEach(repay => {
                this.repayMap[repay.dictId] = repay;
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
  };
</script>
<style lang="less" scoped>
  .menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .menu-form--title {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      position: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
        background: #727df8;
      }
    }
  }

  .menu-footer {
    margin-top: 10px;
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

  .required {
    color: red;
  }
</style>
