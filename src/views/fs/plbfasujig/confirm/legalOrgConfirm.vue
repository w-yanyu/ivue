<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>合作机构信息</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构名称" prop="oa_org_name">
                  <el-input v-model="basicForm.oa_org_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构类型: " prop="org_type">
                  <el-select v-model="basicForm.org_type" :disabled="true">
                    <el-option v-for="item in orgTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总部/区域中心: " prop="branch_name">
                  <el-input v-model="basicForm.branch_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>合作机构资料</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="贷后诉讼合作机构集体评议确认表" prop="pyqrb" v-show="isShow">
                  <upload-file ref="pyqrbProp" :uploadFileList="appForm.pyqrb" :uploadDisabled="false"
                               @changeFile="pyqrbChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="磋商纪要" prop="csjy" v-show="isShow">
                  <upload-file ref="csjyProp" :uploadFileList="appForm.csjy" :uploadDisabled="false"
                               @changeFile="csjyChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="是否进行实际委案:" prop="commision_status">
                  <el-radio-group v-model="appForm.commision_status">
                    <el-radio v-for="(item,i) in commisionStatusList" :key="i" :label="item.dictId" @change="radioChange">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="签约日期" prop="signDate" v-show="isShow">
                  <el-date-picker
                    v-model="appForm.signDate"
                    align="right"
                    type="date"
                    placeholder="请选择签约日期"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="合作截止时间" prop="endDate" v-show="isShow">
                  <el-date-picker
                    v-model="appForm.endDate"
                    align="right"
                    type="date"
                    placeholder="请选择合作截止时间"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="营业执照" prop="yyzz" v-show="isShow">
                  <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="false"
                               @changeFile="yyzzChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="主执承办律师律师证" prop="zzcblsz" v-show="isShow">
                  <upload-file ref="zzcblszProp" :uploadFileList="appForm.zzcblsz" :uploadDisabled="false"
                               @changeFile="zzcblszChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="外包诉讼协议" prop="wbssxy" v-show="isShow">
                  <upload-file ref="wbssxyProp" :uploadFileList="appForm.wbssxy" :uploadDisabled="false"
                               @changeFile="wbssxyChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="印章使用申请单" prop="yzsysqd" v-show="isShow">
                  <upload-file ref="yzsysqdProp" :uploadFileList="appForm.yzsysqd" :uploadDisabled="false"
                               @changeFile="yzsysqdChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="法律意见审定单" prop="flyjsdd" v-show="isShow">
                  <upload-file ref="flyjsddProp" :uploadFileList="appForm.flyjsdd" :uploadDisabled="false"
                               @changeFile="flyjsddChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="廉洁合作承诺书" prop="ljhzcns" v-show="isShow">
                  <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="false"
                               @changeFile="ljhzcnsChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他协议" prop="qtxy" v-show="isShow">
                  <upload-file ref="qtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="false"
                               @changeFile="qtxyChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="附件" prop="fileList" v-show="!isShow">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false"
                               @changeFile="fileListChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";

  export default {
    name: "legalOrgConfirm",
    components: {
      UploadFile,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          branch_name: "",//总部/区域中心
          org_type: "",//机构类型
          oa_org_name: "",//机构名称
        },
        appForm: {
          commision_status: "1", // 是否进行实际委案
          signDate: "",//签约日期
          endDate: "",//合作截止时间
          pyqrb: [],//贷后诉讼合作机构集体评议确认表
          csjy: [],//磋商纪要
          yyzz: [],//营业执照
          zzcblsz: [],//主执承办律师律师证
          wbssxy: [],//外包诉讼协议
          yzsysqd: [],//印章使用申请单
          flyjsdd: [],//法律意见审定单
          ljhzcns: [],//廉洁合作承诺书
          qtxy: [],//其他协议
          fileList: [],//附件
          remark: "", // 备注
        },
        isShow: true,
        compareCustomerInfo: "",
        branchList: [],
        orgTypeList: [],
        commisionStatusList: [],
        cityList: [],
        checkedAll: false,
        showAllCities: false,
        activeNames: ["1", "2"],
        isXdkzb: false,
      }
    },
    created() {
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
      this.getDictList("E_COMMISION_STATUS", "commisionStatusList"); // 是否进行实际委案

      this.getOutInfo();
    },

    methods: {
      initRule() {
        let secondBranch = JSON.parse(localStorage.user_info).branchSeq.split(".")[2];
        if ("001700" == secondBranch) {
          this.isXdkzb = true;
        }
        this.appRules = {
          commision_status: [{required: this.isShow, message: "请选择是否进行实际委案"}],
          signDate: [{required: this.isShow, message: "请输入签约日期"}],
          endDate: [{required: this.isShow, message: "请输入合作截止时间"}],
          pyqrb: [{validator: this.pyqrbValidate, trigger: 'change'}],
          csjy: [{validator: this.csjyValidate, trigger: 'change'}],
          yyzz: [{validator: this.yyzzValidate, trigger: 'change'}],
          zzcblsz: [{validator: this.zzcblszValidate, trigger: 'change'}],
          wbssxy: [{validator: this.wbssxyValidate, trigger: 'change'}],
          yzsysqd: [{validator: this.yzsysqdValidate, trigger: 'change'}],
          flyjsdd: [{validator: this.flyjsddValidate, trigger: 'change'}],
          ljhzcns: [{validator: this.ljhzcnsValidate, trigger: 'change'}],
          fileList: [{validator: this.fileListValidate, trigger: 'change'}],
          remark: [{required: !this.isShow, message: "请输入备注"}],
        }
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
              this[listKey] = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
      radioChange() {
        if (this.appForm.commision_status == '1' || this.appForm.commision_status == '2') {
          this.isShow = true;
        }
        if (this.appForm.commision_status == '3') {
          this.isShow = false;
        }
        this.initRule();
      },

      getOutInfo() {
        let params = {
          servicecode: "RLMSPLTS1400",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.orgInfo;
              this.basicForm.branch_name = response.branchname;
              this.basicForm.org_type = response.orgType;
              this.basicForm.oa_org_name = response.oa_org_name;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1401",
                oaOrgId: this.cParentParams.oa_org_id,
                commision_status: this.appForm.commision_status,  //是否进行实际委案
                remark: this.appForm.remark,  //备注
              }
              if (this.appForm.commision_status != "3") {
                params.signDate = this.appForm.signDate;   //签约日期
                params.endDate = this.appForm.endDate;   //合作截止时间
                params.pyqrb = this.appForm.pyqrb;//贷后诉讼合作机构集体评议确认表
                params.csjy = this.appForm.csjy;//磋商纪要
                params.yyzz = this.appForm.yyzz;//营业执照
                params.zzcblsz = this.appForm.zzcblsz;//主执承办律师律师证
                params.wbssxy = this.appForm.wbssxy;//外包诉讼协议
                params.yzsysqd = this.appForm.yzsysqd;//印章使用申请单
                params.flyjsdd = this.appForm.flyjsdd;//法律意见审定单
                params.ljhzcns = this.appForm.ljhzcns;//廉洁合作
                params.qtxy = this.appForm.qtxy;//其他协议
              } else {
                params.fileList = this.appForm.fileList;//附件
              }

              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                  this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset() {
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },

      clearData() {
        this.appForm = {
          commision_status: "1", // 是否进行实际委案
          signDate: "",//签约日期
          endDate: "",//合作截止时间
          yyzz: [],//营业执照
          pyqrb: [],//贷后诉讼合作机构集体评议确认表
          csjy: [],//磋商纪要
          zzcblsz: [],//主执承办律师律师证
          wbssxy: [],//外包诉讼协议
          yzsysqd: [],//印章使用申请单
          flyjsdd: [],//法律意见审定单
          ljhzcns: [],//廉洁合作承诺书
          qtxy: [],//其他协议
          fileList: [],//附件
          remark: "", // 备注
        }
        this.$refs.yyzzProp.clearFileList();//营业执照
        this.$refs.pyqrbProp.clearFileList();//贷后诉讼合作机构集体评议确认表
        this.$refs.csjyProp.clearFileList();//磋商纪要
        this.$refs.zzcblszProp.clearFileList();//主执承办律师律师证
        this.$refs.wbssxyProp.clearFileList();//外包诉讼协议
        this.$refs.yzsysqdProp.clearFileList();//印章使用申请单
        this.$refs.flyjsddProp.clearFileList();//法律意见审定单
        this.$refs.ljhzcnsProp.clearFileList();//廉洁合作承诺书
        this.$refs.qtxyProp.clearFileList();//其他协议
        this.$refs.fileListProp.clearFileList();//附件
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      yyzzChange(val) {//营业执照
        this.appForm.yyzz = val;
      },
      pyqrbChange(val) {//贷后诉讼合作机构集体评议确认表
        this.appForm.pyqrb = val;
      },
      csjyChange(val) {//磋商纪要
        this.appForm.csjy = val;
      },
      zzcblszChange(val) {//主执承办律师律师证
        this.appForm.zzcblsz = val;
      },
      wbssxyChange(val) {//外包诉讼协议
        this.appForm.wbssxy = val;
      },
      yzsysqdChange(val) {//印章使用申请单
        this.appForm.yzsysqd = val;
      },
      flyjsddChange(val) {//法律意见审定单
        this.appForm.flyjsdd = val;
      },
      ljhzcnsChange(val) {//廉洁合作承诺书
        this.appForm.ljhzcns = val;
      },
      qtxyChange(val) {//其他协议
        this.appForm.qtxy = val;
      },
      fileListChange(val) {//附件
        this.appForm.fileList = val;
      },

      yyzzValidate(value, rule, callback) {
        if (this.appForm.yyzz.length === 0 && this.isShow) {
          return callback(new Error("请上传营业执照"));
        }
        return callback();
      },
      pyqrbValidate(value, rule, callback) {
        if (this.appForm.pyqrb.length === 0 && this.isShow) {
          return callback(new Error("请上传贷后诉讼合作机构集体评议确认表"));
        }
        return callback();
      },
      csjyValidate(value, rule, callback) {
        if (this.appForm.csjy.length === 0 && this.isShow) {
          return callback(new Error("请上传磋商纪要"));
        }
        return callback();
      },
      zzcblszValidate(value, rule, callback) {
        if (this.appForm.zzcblsz.length === 0 && this.isShow) {
          return callback(new Error("请上传主执承办律师律师证"));
        }
        return callback();
      },
      wbssxyValidate(value, rule, callback) {
        if (this.appForm.wbssxy.length === 0 && this.isShow) {
          return callback(new Error("请上传外包诉讼协议"));
        }
        return callback();
      },
      yzsysqdValidate(value, rule, callback) {
        if (this.appForm.yzsysqd.length === 0 && this.isShow) {
          return callback(new Error("请上传印章使用申请单"));
        }
        return callback();
      },
      flyjsddValidate(value, rule, callback) {
        if (this.appForm.flyjsdd.length === 0 && this.isShow) {
          return callback(new Error("请上传法律意见审定单"));
        }
        return callback();
      },
      ljhzcnsValidate(value, rule, callback) {
        if (this.appForm.ljhzcns.length === 0 && this.isShow) {
          return callback(new Error("请上传廉洁合作承诺书"));
        }
        return callback();
      },
      fileListValidate(value, rule, callback) {
        if (this.appForm.fileList.length === 0 && !this.isShow) {
          return callback(new Error("请上传附件    "));
        }
        return callback();
      }
    }
  }

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;

    .el-row .el-col {
      padding-right: 16px;
    }
  }
  .line-change .el-form-item__label {
    text-align-last: center;
    line-height: 15px;
  }
</style>
