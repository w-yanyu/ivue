<template>
  <div>
    <div class="fivetypeapp-basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="借据号" prop="lncfno">
              <el-input v-model="basicForm.lncfno" @blur="fivetypeCustomerBlur" :disabled="true"></el-input>
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
                  <el-select v-model="appForm.fltype" placeholder="请选择" :disabled="true">
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
                  <el-select v-model="appForm.rgzxgradcd" placeholder="请选择" :disabled="true">
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
                  <el-input type="textarea" v-model="appForm.resion" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="附件上传" prop="fileList">
                  <upload-file-view  v-if="showComponent" ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="true"></upload-file-view>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="memo">
                  <el-input type="textarea" v-model="appForm.memo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";
  export default {
    name: "fiveTypeView",
    components: {
      UploadFileView,
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
        compareCustomerInfo:"",
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }],
        },
        appRules : {
          fltype: [{required: true, message: "请选择五级分类调整类型"}],
          rgzxgradcd: [{required: true,  message: "请选择人工五级分类"}],
          reason:[{ required: true, message: "请输入申请原因" }],
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
      this.getApplyInfo();
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

      getApplyInfo(){
        var vm = this;
        let params = {
          servicecode: "PLMSKGTS0002",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.basicForm.lncfno = res.data.applyInfo.lncfno; //客户号
              this.appForm.fltype = res.data.applyInfo.fltype; //五级分类调整类型
              this.appForm.rgzxgradcd = res.data.applyInfo.rgzxgradcd; //人工五级分类
              this.appForm.resion = res.data.applyInfo.resion; //原因
              this.appForm.memo = res.data.applyInfo.memo; //备注

              this.getCustomerInfo();

              vm.appForm.fileList = res.data.fileList;
              this.showComponent=false;
              this.$nextTick(()=>{
                this.showComponent=true;
              })
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      getCustomerInfo(){
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
