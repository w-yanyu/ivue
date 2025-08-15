<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">

        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>外包商信息</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
              <el-form-item label="部门: " prop="branch">
                <el-select v-model="basicForm.branch" :disabled="true" >
                  <el-option v-for="item in branchList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作机构类型: " prop="org_type">
                  <el-select v-model="basicForm.org_type" :disabled="true" >
                    <el-option v-for="item in orgTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input v-model="basicForm.oa_org_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="regis_capital">
                  <el-input v-model="basicForm.regis_capital" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="social_credit_code">
                  <el-input v-model="basicForm.social_credit_code" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办公地址" prop="addr">
                  <el-input v-model="basicForm.addr" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="经营状态" prop="operation_status">
                  <el-input v-model="basicForm.operation_status" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营范围" prop="operation_scope">
                  <el-input v-model="basicForm.operation_scope" :disabled="true"></el-input>
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
                  <el-input v-model="basicForm.stockholder" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购评审编号" prop="buyer_review_no">
                  <el-input v-model="basicForm.buyer_review_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>


        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>外包商信息修改</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">

        <el-row>
                  <el-col :span="12">
                  <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input v-model="basicForm.oa_org_name" :disabled="true"></el-input>
                  </el-form-item>
                  </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后外包机构名称" prop="bgoa_org_name" v-show="isShow">
              <el-input v-model="appForm.bgoa_org_name"></el-input>
            </el-form-item>
          </el-col>
                 <el-col :span="12">
                 <el-form-item label="统一社会信用代码" prop="social_credit_code">
                 <el-input v-model="basicForm.social_credit_code" :disabled="true"></el-input>
                 </el-form-item>
                 </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后统一社会信用代码" prop="bgsocial_credit_code" v-show="isShow">
              <el-input v-model="appForm.bgsocial_credit_code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
                  <el-col :span="12">
                  <el-form-item label="注册资本" prop="regis_capital">
                  <el-input v-model="basicForm.regis_capital" :disabled="true"></el-input>
                  </el-form-item>
                  </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后注册资本" prop="bgregis_capital" v-show="isShow">
              <el-input v-model="appForm.bgregis_capital"></el-input>
            </el-form-item>
          </el-col>
                    <el-col :span="12">
                    <el-form-item label="办公地址" prop="addr">
                    <el-input v-model="basicForm.addr" :disabled="true"></el-input>
                   </el-form-item>
                    </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后办公地址" prop="bgaddr" v-show="isShow">
              <el-input v-model="appForm.bgaddr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
                  <el-col :span="12">
                  <el-form-item label="经营状态" prop="operation_status">
                  <el-input v-model="basicForm.operation_status" :disabled="true"></el-input>
                  </el-form-item>
                  </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后经营状态" prop="bgoperation_status" v-show="isShow">
              <el-input v-model="appForm.bgoperation_status"></el-input>
            </el-form-item>
          </el-col>
                    <el-col :span="12">
                    <el-form-item label="经营范围" prop="operation_scope">
                    <el-input v-model="basicForm.operation_scope" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后经营范围" prop="bgoperation_scope" v-show="isShow">
              <el-input v-model="appForm.bgoperation_scope"></el-input>
            </el-form-item>
          </el-col>
                    <el-col :span="12">
                    <el-form-item label="法人代表" prop="ceo">
                    <el-input v-model="basicForm.ceo" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后法人代表" prop="bgceo" v-show="isShow">
              <el-input v-model="appForm.bgceo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


          <el-row>
                 <el-col :span="12">
                 <el-form-item label="股东信息" prop="stockholder">
                 <el-input v-model="basicForm.stockholder" :disabled="true"></el-input>
                 </el-form-item>
                 </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后股东信息" prop="bgstockholder" v-show="isShow">
              <el-input v-model="appForm.bgstockholder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        


        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更后营业执照" prop="bgyyzz" v-show="isShow">
              <upload-file ref="bgyyzzProp" :uploadFileList="appForm.bgyyzz" :uploadDisabled="false" @changeFile="bgyyzzChange"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="变更通知书" prop="bgtzs" v-show="isShow">
              <upload-file ref="bgtzsProp" :uploadFileList="appForm.bgtzs" :uploadDisabled="false" @changeFile="bgtzsChange"></upload-file>
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
      <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "OutSoucInfoManage",
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
          branch: "",//部门
          org_type: "",//机构类型
          oa_org_name: "",//外包机构名称
          regis_capital: "",//注册资本
          social_credit_code:"",//统一社会信用代码
          addr:"",//办公地址
          operation_status:"",//经营状态
          operation_scope:"",//经营范围
          ceo:"",//法人代表
          stockholder:"",//股东信息
          buyer_review_no:"",//采购评审编号
        },
        fileForm:{
          yyzz:[],//营业执照
          frsfz:[],//法人身份证
          gsxxyz:[],//工商信息验证
          ssyz:[],//涉诉验证
          fxscsqbg:[],//风险审查申请报告
          fwry:[],//为我司服务人员信息
          sbzm:[],//为我司服务人员社保证明
          zlht:[],//租赁合同或办公场地照片
          hzjgxy:[],//合作机构协议
          bzjqrh:[],//保证金确认函
          ljhzcns:[],//廉洁合作承诺书
          hgcscnh:[],//合规催收承诺函
          cjcnh:[],//催记承诺函
          qtxy:[],//其他协议
        },
        appForm:{
          bgoa_org_name:"",//变更后公司名称（变更后外包商机构名称）
          bgsocial_credit_code:"",//变更后公司名称统一社会信用代码
          bgregis_capital:"",//变更后注册资本
          bgaddr:"",//变更后办公地址
          bgoperation_status:"",//变更后经营状态
          bgoperation_scope:"",//变更后经营范围
          bgceo:"",//变更后法人代表
          bgstockholder:"",//变更后股东信息
          bgyyzz:[],//变更后营业执照
          bgtzs:[],//变更通知书
          remark: "", // 备注
        },
        isShow:true,
        compareCustomerInfo:"",
        branchList:[],
        orgTypeList:[],
        yesOrNoList:[],
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.getDictList("E_YES___", "yesOrNoList"); // 是否
      this.initRule();
      this.getOutInfo();
      this.getOutFiles();
    },

    methods: {
      initRule(){
        this.appRules = {
            acct_no: [{required: this.isShow,  message: "请输入收款账户账号"}],
            bank_no: [{required: this.isShow,  message: "请输入开户行号"}],
            acct_name: [{required: this.isShow,  message: "请输入收款账户名称"}],
            bank_name: [{required: this.isShow,  message: "请输入开户行名称"}],
            work_begin_time: [{required: this.isShow,  message: "请输入合作开始时间"}],
            work_end_time: [{required: this.isShow,  message: "请输入合作结束时间"}],
            yyzzxg:[{ validator: this.yyzzxgValidate, trigger: 'change' }],
            frsfzxg:[{ validator: this.frsfzxgValidate, trigger: 'change' }],
            gsxxyzxg:[{ validator: this.gsxxyzxgValidate, trigger: 'change' }],
            suyzxyxg:[{ validator: this.suyzxyxgValidate, trigger: 'change' }],
            xmfxscxg:[{ validator: this.xmfxscxgValidate, trigger: 'change' }],
            fwryxxxg:[{ validator: this.fwryxxxgValidate, trigger: 'change' }],
            fwrysbpzxg:[{ validator: this.fwrysbpzxgValidate, trigger: 'change' }],
            zlhtbgcdzpxg:[{ validator: this.zlhtbgcdzpxgValidate, trigger: 'change' }],
            hzjgxyxg:[{ validator: this.hzjgxyxgValidate, trigger: 'change' }],
            bzjqrhxg:[{ validator: this.bzjqrhxgValidate, trigger: 'change' }],
            ljhzcnsxg:[{ validator: this.ljhzcnsxgValidate, trigger: 'change' }],
            hgcscnsxg:[{ validator: this.hgcscnsxgValidate, trigger: 'change' }],
            cjcnsxg:[{ validator: this.cjcnsxgValidate, trigger: 'change' }],
            qtxg:[{ validator: this.qtxgValidate, trigger: 'change' }],
            remark:[{required: !this.isShow,  message: "请输入备注"}],
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

      radioChange(){
        if(this.appForm.isWork=='1'){
          this.isShow=true;
          this.clearData();
          this.appForm.isWork = "1";
          this.initRule();
        }
        if(this.appForm.isWork=='0'){
          this.isShow=false;
          this.clearData();
          this.appForm.isWork = "0";
          this.initRule();
        }
      },

      getOutInfo(){
        let params = {
          servicecode: "RLMSPLTS1010",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.companyInfo;
              this.basicForm = response;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      //从外包商资料表中查询出相对应的文件信息（回显原文件）
      getOutFiles(){
        let params = {
          servicecode: "RLMSPLTS1018",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.fileForm.yyzz = res.data.yyzz;
              this.fileForm.frsfz = res.data.frsfz;
              this.fileForm.gsxxyz = res.data.gsxxyz;
              this.fileForm.ssyz = res.data.ssyz;
              this.fileForm.fxscsqbg = res.data.fxscsqbg;
              this.fileForm.fwry = res.data.fwry;
              this.fileForm.sbzm = res.data.sbzm;
              this.fileForm.zlht = res.data.zlht;
              this.fileForm.bzjqrh = res.data.bzjqrh;
              this.fileForm.ljhzcns = res.data.ljhzcns;
              this.fileForm.hgcscnh = res.data.hgcscnh;
              this.fileForm.cjcnh = res.data.cjcnh;
              this.fileForm.hzjgxy = res.data.hzjgxy;
              this.fileForm.qtxy = res.data.qtxy;
              this.timer = new Date().getTime();//更新timer，重新加载子组件
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
                servicecode: "RLMSBPMTS0093",
                oa_org_id: this.cParentParams.oa_org_id,  //外包商机构编号
                bgoa_org_name:this.appForm.bgoa_org_name,//变更后公司名称（变更后外包商机构名称）
                bgsocial_credit_code:this.appForm.bgsocial_credit_code,//变更后公司名称统一社会信用代码
                bgregis_capital:this.appForm.bgregis_capital,  //变更后注册资本 
                bgaddr:this.appForm.bgaddr, //变更后办公地址
                bgoperation_status:this.appForm.bgoperation_status, //变更后经营状态
                bgoperation_scope:this.appForm.bgoperation_scope, //变更后经营范围
                bgceo:this.appForm.bgceo,//变更后法人代表
                bgstockholder:this.appForm.bgstockholder,//变更后股东信息
                bgyyzz:this.appForm.bgyyzz,//变更后营业执照
                bgtzs:this.appForm.bgtzs,//变更通知书
                remark:this.appForm.remark,  //备注
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
      reset(){
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },

      clearData(){
        this.appForm ={
          bgoa_org_name:"",//变更后公司名称（变更后外包商机构名称）
          bgsocial_credit_code:"",//变更后公司名称统一社会信用代码
          bgregis_capital:"",//变更后注册资本
          bgaddr:"",//变更后办公地址
          bgoperation_status:"",//变更后经营状态
          bgoperation_scope:"",//变更后经营范围
          bgceo:"",//变更后法人代表
          bgstockholder:"",//变更后股东信息
          bgyyzz:[],//变更后营业执照
          bgtzs:[],//变更通知书
          remark: "", // 备注
        }
        this.$refs.bghyyzzProp.clearFileList();
        this.$refs.bbtzsProp.clearFileList();
    
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      bgyyzzChange(val){this.appForm.bgyyzz= val;},
      bgtzsChange(val){this.appForm.bgtzs= val;},


      bgyyzzValidate(value, rule, callback) {if (this.appForm. bgyyzz.length === 0 && this.isShow) {  return callback(new Error("请上传变更后营业执照"));   }return callback();   },
      bgtzsValidate(value, rule, callback) {if (this.appForm.bgtzs.length === 0 && this.isShow) {  return callback(new Error("请上传变更通知书"));   }return callback();   },
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
</style>
