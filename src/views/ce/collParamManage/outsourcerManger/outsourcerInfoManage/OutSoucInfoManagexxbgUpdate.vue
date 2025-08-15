<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>外包商信息</span>
          </template>
          <el-form
            ref="basicForm"
            :rules="basicRules"
            :model="basicForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="部门: " prop="branch_name">
                  <el-input v-model="basicForm.branch_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作机构类型: " prop="org_type">
                  <el-select v-model="basicForm.org_type" :disabled="true">
                    <el-option
                      v-for="item in orgTypeList"
                      :key="item.dictId"
                      :label="item.dictName"
                      :value="item.dictId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input
                    v-model="basicForm.oa_org_name"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="regis_capital">
                  <el-input
                    v-model="basicForm.regis_capital"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="统一社会信用代码"
                  prop="social_credit_code"
                >
                  <el-input
                    v-model="basicForm.social_credit_code"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办公地址" prop="addr">
                  <el-input
                    v-model="basicForm.addr"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="经营状态" prop="operation_status">
                  <el-input
                    v-model="basicForm.operation_status"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营范围" prop="operation_scope">
                  <el-input
                    v-model="basicForm.operation_scope"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表" prop="ceo">
                  <el-input v-model="basicForm.ceo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="股东信息" prop="stockholder">
                  <el-input
                    v-model="basicForm.stockholder"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购评审编号" prop="buyer_review_no">
                  <el-input
                    v-model="basicForm.buyer_review_no"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>外包商工商信息变更</span>
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
                <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input
                    v-model="basicForm.oa_org_name"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后外包机构名称"
                  prop="oa_org_name"

                >
                  <el-input v-model="appForm.oa_org_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="统一社会信用代码"
                  prop="social_credit_code"
                >
                  <el-input
                    v-model="basicForm.social_credit_code"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后统一社会信用代码"
                  prop="social_credit_code"

                >
                  <el-input v-model="appForm.social_credit_code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资本" prop="regis_capital">
                  <el-input
                    v-model="basicForm.regis_capital"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后注册资本"
                  prop="regis_capital"

                >
                  <el-input v-model="appForm.regis_capital"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公地址" prop="addr">
                  <el-input
                    v-model="basicForm.addr"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后办公地址"
                  prop="addr"

                >
                  <el-input v-model="appForm.addr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经营状态" prop="operation_status">
                  <el-input
                    v-model="basicForm.operation_status"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后经营状态"
                  prop="operation_status"

                >
                  <el-input v-model="appForm.operation_status"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营范围" prop="operation_scope">
                  <el-input
                    v-model="basicForm.operation_scope"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后经营范围"
                  prop="operation_scope"

                >
                  <el-input v-model="appForm.operation_scope"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人代表" prop="ceo">
                  <el-input v-model="basicForm.ceo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后法人代表"
                  prop="ceo"

                >
                  <el-input v-model="appForm.ceo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="股东信息" prop="stockholder">
                  <el-input
                    v-model="basicForm.stockholder"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="变更后股东信息"
                  prop="stockholder"

                >
                  <el-input v-model="appForm.stockholder"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  class="require-asterisk"
                  label="变更后营业执照"
                  prop="bgyyzz"

                >
                  <upload-file
                    ref="bgyyzzProp"
                    :uploadFileList="appForm.bgyyzz"
                    :uploadDisabled="false"
                    @changeFile="bgyyzzChange"
                    :key="timer"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  class="require-asterisk"
                  label="变更通知书"
                  prop="bgtzs"

                >
                  <upload-file
                    ref="bgtzsProp"
                    :uploadFileList="appForm.bgtzs"
                    :uploadDisabled="false"
                    @changeFile="bgtzsChange"
                    :key="timer"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  :class="{ 'require-sign': !isShow }"
                  :label="$i18ns('备注:')"
                  prop="remark"
                >
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>变更历史</span>
          </template>
          <div>
            <change-his-list :oaOrgId="basicForm.oa_org_id" :applyType="applyType" :key="timer"></change-his-list>
          </div>
        </el-collapse-item>

      </el-collapse>
    </div>

<div style="height:200px;"></div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFile from "@/views/ce/components/UploadFile.vue";
import ChangeHisList from "./changeHisList";
export default {
  name: "OutSoucInfoManagexxbgUpdate",
  components: {
    UploadFile,
    ChangeHisList,
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
        branch: "",//部门
        branch_name: "",//部门名称
        org_type: "", //机构类型
        oa_org_name: "", //外包机构名称
        regis_capital: "", //注册资本
        social_credit_code: "", //统一社会信用代码
        addr: "", //办公地址
        operation_status: "", //经营状态
        operation_scope: "", //经营范围
        ceo: "", //法人代表
        stockholder: "", //股东信息
        buyer_review_no: "", //采购评审编号
      },
      fileForm: {
        yyzz: [], //营业执照
        frsfz: [], //法人身份证
        gsxxyz: [], //工商信息验证
        ssyz: [], //涉诉验证
        fxscsqbg: [], //风险审查申请报告
        fwry: [], //为我司服务人员信息
        sbzm: [], //为我司服务人员社保证明
        zlht: [], //租赁合同或办公场地照片
        hzjgxy: [], //合作机构协议
        bzjqrh: [], //保证金确认函
        ljhzcns: [], //廉洁合作承诺书
        hgcscnh: [], //合规催收承诺函
        cjcnh: [], //催记承诺函
        qtxy: [], //其他协议
      },
      appForm: {
        oa_org_name: "", //变更后公司名称（变更后外包商机构名称）
        social_credit_code: "", //变更后公司名称统一社会信用代码
        regis_capital: "", //变更后注册资本
        addr: "", //变更后办公地址
        operation_status: "", //变更后经营状态
        operation_scope: "", //变更后经营范围
        ceo: "", //变更后法人代表
        stockholder: "", //变更后股东信息
        bgyyzz: [], //变更后营业执照
        bgtzs: [], //变更通知书
        remark: "", // 备注
      },
      timer:"",
      isShow: true,
      compareCustomerInfo: "",
      branchList: [],
      orgTypeList: [],
      yesOrNoList: [],
      activeNames: ["1", "2","3"],
      applyType : "WBSXXBG",
    };
  },
  created() {
    this.getDictList("E_BRANCH", "branchList"); // 部门
    this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
    this.getDictList("E_YES___", "yesOrNoList"); // 是否
    this.initRule();
    this.getAppInfo();
  },

  methods: {
    initRule() {
      this.appRules = {
        bgyyzz: [{ validator: this.bgyyzzValidate, trigger: "change" }],
        bgtzs: [{ validator: this.bgtzsValidate, trigger: "change" }],
      };
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

    //查询外包商信息（回显）
    getOutInfo() {
      let params = {
        servicecode: "RLMSPLTS1010",
        oaOrgId: this.appForm.oa_org_id,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data.companyInfo;
            this.basicForm = response;
            this.timer = new Date().getTime(); //更新timer，重新加载子组件
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //查询工商信息变更申请信息
    getAppInfo() {
      let params = {
        servicecode: "RLMSBPMTS0097",
        applid: this.cParentParams.applid,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.appForm.oa_org_id = res.data.applyInfo.oa_org_id; //外包商机构编号
            this.appForm.social_credit_code = res.data.applyInfo.social_credit_code;//变更后统一社会信用代码
            this.appForm.oa_org_name = res.data.applyInfo.oa_org_name; //变更后外包机构名称
            this.appForm.regis_capital = res.data.applyInfo.regis_capital; //变更后注册资本
            this.appForm.addr = res.data.applyInfo.addr; //变更后办公地址
            this.appForm.operation_status = res.data.applyInfo.operation_status; //变更后经营状态
            this.appForm.operation_scope = res.data.applyInfo.operation_scope; //变更后经营范围
            this.appForm.ceo = res.data.applyInfo.ceo; //变更后法人代表
            this.appForm.stockholder = res.data.applyInfo.stockholder; //变更后股东信息
            this.appForm.remark = res.data.applyInfo.remark; //备注

            this.appForm.bgyyzz = res.data.bgyyzz; //变更后营业执照
            this.appForm.bgtzs = res.data.bgtzs; //变更通知书

            this.getOutInfo();
            this.initRule();

          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //外包商信息变更申请提交更新
    submit() {
      this.$refs.appForm.validate((valid) => {
        if (valid) {
          if(!this.appForm.oa_org_name && !this.appForm.social_credit_code && !this.appForm.regis_capital && !this.appForm.addr
            && !this.appForm.operation_status && !this.appForm.operation_scope && !this.appForm.ceo && !this.appForm.stockholder){
            this.$message({
              type: "warning",
              message: "至少变更一项信息"
            });
            return;
          };
          this.$confirm("是否保存申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let params = {
              servicecode: "RLMSBPMTS0096",
              applid: this.cParentParams.applid,
              oa_org_name: this.appForm.oa_org_name, //变更后公司名称（变更后外包商机构名称）
              social_credit_code: this.appForm.social_credit_code, //变更后公司名称统一社会信用代码
              regis_capital: this.appForm.regis_capital, //变更后注册资本
              addr: this.appForm.addr, //变更后办公地址
              operation_status: this.appForm.operation_status, //变更后经营状态
              operation_scope: this.appForm.operation_scope, //变更后经营范围
              ceo: this.appForm.ceo, //变更后法人代表
              stockholder: this.appForm.stockholder, //变更后股东信息
              bgyyzz: this.appForm.bgyyzz, //变更后营业执照
              bgtzs: this.appForm.bgtzs, //变更通知书
              remark: this.appForm.remark, //备注
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
              .then((res) => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message,
                  });
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
      this.appForm = {
        oa_org_name: "", //变更后公司名称（变更后外包商机构名称）
        social_credit_code: "", //变更后公司名称统一社会信用代码
        regis_capital: "", //变更后注册资本
        addr: "", //变更后办公地址
        operation_status: "", //变更后经营状态
        operation_scope: "", //变更后经营范围
        ceo: "", //变更后法人代表
        stockholder: "", //变更后股东信息
        bgyyzz: [], //变更后营业执照
        bgtzs: [], //变更通知书
        remark: "", // 备注
      };
      this.$refs.bgyyzzProp.clearFileList();
      this.$refs.bgtzsProp.clearFileList();
    },

    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    bgyyzzChange(val) {
      this.appForm.bgyyzz = val;
    },
    bgtzsChange(val) {
      this.appForm.bgtzs = val;
    },

    bgyyzzValidate(value, rule, callback) {
      if (this.appForm.bgyyzz.length === 0 && this.isShow) {
        return callback(new Error("请上传变更后营业执照"));
      }
      return callback();
    },
    bgtzsValidate(value, rule, callback) {
      if (this.appForm.bgtzs.length === 0 && this.isShow) {
        return callback(new Error("请上传变更通知书"));
      }
      return callback();
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
}
</style>
