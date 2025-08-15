<template>
  <div>
    <div class="fivetypeapp-basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="借据号" prop="lncfno">
              <el-input v-model="basicForm.lncfno" @blur="fivetypeCustomerBlur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="cardno">
              <el-input v-model="basicForm.cardno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneno">
              <el-input v-model="basicForm.phoneno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="custna">
              <el-input v-model="basicForm.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prodna">
              <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款形态">
              <el-select v-model="basicForm.clssst" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in loanStatusList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款账户状态">
              <el-select v-model="basicForm.acctst" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in accountLoanStatusList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款余额" prop="lnhhxbl">
              <el-input v-model="basicForm.lnhhxbl" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人工五级分类（影响征信）">
              <el-select v-model="basicForm.rgzxgradcd" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in rgzxgradcdList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人工五级分类（不影响征信）">
              <el-select v-model="basicForm.rggradcd" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in rgzxgradcdList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="fivetypeapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="五级分类调整类型:" prop="fltype">
                  <el-select v-model="appForm.fltype" placeholder="请选择">
                    <el-option
                      v-for="item in fltypeList"
                      :key="item.value"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="人工五级分类:" prop="rgzxgradcd">
                  <el-select v-model="appForm.rgzxgradcd" placeholder="请选择">
                    <el-option
                      v-for="item in rgzxgradcdList"
                      :key="item.value"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="调整原因:" prop="resion">
                  <el-input type="textarea" v-model="appForm.resion"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="附件上传" prop="fileList">
                  <upload-file-view ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="memo">
                  <el-input type="textarea" v-model="appForm.memo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";
  export default {
    name: "fiveTypeApply",
    components: {
      UploadFileView,
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: "",
          custno: "",
          custna: "",
          phoneno: "",
          cardno: "",
          idtype: "",
          acctbl: "",
          prodcd:"",
          prodna:"",
          clssst:"",
          acctst:"",
          lnhhxbl:"",
          rggradcd:"",
          rgzxgradcd:"",
        },
        appForm:{
          fltype: "", // 五级分类调整类型
          rgzxgradcd: "", // 人工五级分类
          resion: "", // 调整原因
          fileList:[],//附件
          memo: "", // 备注
        },
        fileList:[],//附件
        compareCustomerInfo:"",
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }],
        },
        appRules : {
          fltype: [{required: true, message: "请选择五级分类调整类型"}],
          rgzxgradcd: [{required: true,  message: "请选择人工五级分类"}],
          resion:[{ required: true, message: "请输入申请原因" }],
        },
        accountLoanStatusList:[],
        loanStatusList:[],
        fltypeList:[
          {
            dictName: "不影响征信",
            dictId: "BX"
          },
          {
            dictName: "影响征信",
            dictId: "YX"
          }],
        rgzxgradcdList:[],
        activeNames: ["1"]
      }
    },
    created() {
      this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("E_CLEVEL1", "rgzxgradcdList"); // 人工五级分类
    },

    methods: {
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

      getCustomerInfo(){
        // 清空历史数据
        if (this.compareCustomerInfo) {
          this.basicForm.custno = ""; //客户号
          this.basicForm.custna = ""; // 客户姓名
          this.basicForm.cardno = ""; // 证件号码
          this.basicForm.phoneno = ""; // 手机号码
          this.basicForm.prodcd = ""; // 产品编号
          this.basicForm.prodna = ""; // 产品名称
          this.basicForm.clssst = ""; // 账户形态
          this.basicForm.acctst = ""; // 贷款账户状态
          this.basicForm.idtype = ""; //证件类型
          this.basicForm.lnhhxbl = ""; //贷款余额
          this.basicForm.rgzxgradcd = ""; //人工五级分类（影响征信）
          this.basicForm.rggradcd = ""; //人工五级分类（不影响征信）
        }
        let params = {
          servicecode: "PLMSKGTS0144_qrlncfinfo",
          lncfno: this.basicForm.lncfno,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.lnCustomerInfo;
              this.basicForm = response;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.basicForm.validate(valid => {
          if (valid) {
            this.$refs.appForm.validate(valid => {
              if (valid) {
                this.$confirm("是否确认提交申请?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  let params = {
                    servicecode: "PLMSKGTS0001",
                    lncfno: this.basicForm.lncfno,
                    fltype:this.appForm.fltype,  //五级分类调整类型
                    rgzxgradcd:this.appForm.rgzxgradcd,  //人工五级分类
                    resion:this.appForm.resion,   //原因
                    fileList:this.appForm.fileList,  //附件列表
                    memo:this.appForm.memo,  //备注
                  }
                  MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                    if (res && res.code === "200") {
                      this.$message({
                        type: "success",
                        message: res.message
                      })
                      this.clearData();
                    }
                  }).catch(err => {
                    console.error(err);
                  })
                });
              }
            });
          }
        });


      },
      reset(){
        this.$confirm("是否确认重置申请内容?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
        })
      },

      clearData(){
        this.$refs["basicForm"].resetFields();
        this.$refs["appForm"].resetFields();
        this.basicForm.lncfno = ""; //客户号
        this.basicForm.custno = ""; //客户号
        this.basicForm.custna = ""; // 客户姓名
        this.basicForm.cardno = ""; // 证件号码
        this.basicForm.phoneno = ""; // 手机号码
        this.basicForm.prodcd = ""; // 产品编号
        this.basicForm.prodna = ""; // 产品名称
        this.basicForm.clssst = ""; // 账户形态
        this.basicForm.acctst = ""; // 贷款账户状态
        this.basicForm.idtype = ""; //证件类型
        this.basicForm.lnhhxbl = ""; //贷款余额
        this.basicForm.rgzxgradcd = "";  //人工五级分类（影响征信）
        this.basicForm.rggradcd = "";  //人工五级分类（不影响征信）
        this.appForm.resion = "";   //认定原因
        this.appForm.fileList = [];  //附件列表
        this.appForm.remark = "";  //备注
        this.compareCustomerInfo="";
        this.$refs.uploadProp.clearFileList();
      },

      fivetypeCustomerBlur(){
        if(this.basicForm.lncfno==="" || this.compareCustomerInfo===this.basicForm.lncfno){
          return false;
        }
        this.compareCustomerInfo=this.basicForm.lncfno;
        this.getCustomerInfo();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      changeUploadFile(val){
        this.appForm.fileList = val;  //附件列表
      },
    }
  }

</script>

<style lang="less" scoped>
  .fivetypeapp-basic,.fivetypeapp-detail {
    padding: 16px 40px 0 12px;
  }
  .fivetypeapp-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .attachmentTab {
    min-height: 68.667px;
  }
</style>
