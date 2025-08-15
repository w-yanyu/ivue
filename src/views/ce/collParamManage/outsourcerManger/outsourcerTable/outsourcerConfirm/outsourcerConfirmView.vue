<template>
  <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>外包商信息</span>
          </template>
          <el-form ref="basicForm" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="部门: " prop="branch_name">
                  <el-input v-model="basicForm.branch_name" :disabled="true"></el-input>
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
            <span><em></em>外包商资料</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="是否合作:" prop="isWork">
              <el-radio-group v-model="appForm.isWork" :disabled="true">
                <el-radio v-for="(item,i) in yesOrNoList" :key="i" :label="item.dictId" @change="radioChange" :checked="appForm.isWork === item.dictId">{{item.dictName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="所属城市:" prop="cities" v-show="isShow && !isXdkzb">
              <el-checkbox v-model="checkedAll" v-show="showAllCities" :disabled="true">全部城市</el-checkbox>
              <el-checkbox-group v-model="appForm.cities" :disabled="true">
                <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId">{{item.dictName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="收款账户账号" prop="acctNo" v-show="isShow">
              <el-input v-model="appForm.acctNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="开户行号" prop="bankNo" v-show="isShow">
              <el-input v-model="appForm.bankNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="收款账户名称" prop="acctName" v-show="isShow">
              <el-input v-model="appForm.acctName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="开户行名称" prop="bankName" v-show="isShow">
              <el-input v-model="appForm.bankName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合作开始时间" prop="startDate" v-show="isShow">
              <el-date-picker
                v-model="appForm.startDate"
                align="right"
                type="date"
                placeholder="请选择合作开始时间"
                value-format="yyyyMMdd"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合作结束时间" prop="endDate" v-show="isShow">
              <el-date-picker
                v-model="appForm.endDate"
                align="right"
                type="date"
                placeholder="请选择合作结束时间"
                value-format="yyyyMMdd"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="营业执照" prop="yyzz" v-show="isShow">
              <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="法人身份证" prop="frsfz" v-show="isShow">
              <upload-file ref="frsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="工商信息验证" prop="gsxxyz" v-show="isShow">
              <upload-file ref="gsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="涉诉验证" prop="ssyz" v-show="isShow">
              <upload-file ref="ssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">-->
<!--            <el-form-item class="require-asterisk" label="风险审查申请报告" prop="fxscsqbg" v-show="isShow">-->
<!--              <upload-file ref="fxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="为我司服务人员信息" prop="fwry" v-show="isShow">
              <upload-file ref="fwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="为我司服务人员社保证明" prop="sbzm" v-show="isShow">
              <upload-file ref="sbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="租赁合同或办公场地照片" prop="zlht" v-show="isShow">
              <upload-file ref="zlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合作机构协议" prop="hzjgxy" v-show="isShow">
              <upload-file ref="hzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="保证金确认函" prop="bzjqrh" v-show="isShow">
              <upload-file ref="bzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="廉洁合作承诺书" prop="ljhzcns" v-show="isShow">
              <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合规催收承诺函" prop="hgcscnh" v-show="isShow">
              <upload-file ref="hgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="催记承诺函" prop="cjcnh" v-show="isShow">
              <upload-file ref="cjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他协议" prop="qtxy" v-show="isShow">
              <upload-file ref="qtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="附件" prop="fileList" v-show="!isShow">
              <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="true" @changeFile="changeUploadFile" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
              <el-input type="textarea" v-model="appForm.remark" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        </el-collapse-item>
      </el-collapse>
    <div style="height:200px;"></div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "outsourcerConfirmView",
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
        basicForm: { // 外包商信息表单对象
          branch: "",//部门
          branch_name: "",//部门名称
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
        appForm:{
          isWork: "1", // 是否合作
          cities: [], // 所属城市
          acctNo:"",//收款账户账号
          acctName:"",//收款账户名称
          bankNo:"",//开户行号
          bankName:"",//开户行名称
          startDate:"",//合作开始时间
          endDate:"",//合作结束时间
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
          fileList:[],//附件
          remark: "", // 备注
        },
        isShow:true,
        timer:"",
        compareCustomerInfo:"",
        branchList:[],
        orgTypeList:[],
        yesOrNoList:[],
        cityList : [],
        checkedAll: false,
        showAllCities:false,
        activeNames: ["1", "2"],
        isXdkzb: false,
      }
    },
    created() {
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.getDictList("E_YES___", "yesOrNoList"); // 是否
      this.getAppInfo();
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
      getCityList() {
        let secondBranch = JSON.parse(localStorage.user_info).branchSeq.split(".")[2];
        if("001700" == this.basicForm.branch){
          this.isXdkzb = true;
        }
        let params = {
          servicecode: "RLMSPLTS1058",
          branchNo: this.basicForm.branch,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const list = res.data.infos;
              if(list != null){
                let temp = [];
                for (let i = 0; i < list.length; i++) {
                  if(list != null && list[i].city != null && list[i].city.length > 0){
                    let city = {dictName : list[i].city, dictId : list[i].city};
                    if(temp.indexOf(list[i].city) == -1){
                      temp.push(list[i].city);
                      this.cityList.push(city);
                    }
                  }
                }
                if(this.cityList.length > 0){
                  this.showAllCities = true;
                }
              }
            }
          })
          .catch(err => {
            console.error(err);
          });

      },

      getOutInfo(){
        let params = {
          servicecode: "RLMSPLTS1010",
          oaOrgId: this.appForm.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.companyInfo;
              this.basicForm = response;
              this.isXdkzb = this.basicForm.branch == "001700"
              this.getCityList();
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      getAppInfo(){
        let params = {
          servicecode: "RLMSPLTS1004",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.appForm.oa_org_id = res.data.applyInfo.oa_org_id;
              this.appForm.isWork = res.data.applyInfo.iswork;
              this.appForm.cities = res.data.applyInfo.cities ? JSON.parse(res.data.applyInfo.cities) : [];
              this.appForm.acctNo = res.data.applyInfo.acct_no;
              this.appForm.acctName = res.data.applyInfo.acct_name;
              this.appForm.bankNo = res.data.applyInfo.bank_no;
              this.appForm.bankName = res.data.applyInfo.bank_name;
              this.appForm.startDate = res.data.applyInfo.work_begin_time;
              this.appForm.endDate = res.data.applyInfo.work_end_time;
              this.appForm.remark = res.data.applyInfo.remark;
              this.appForm.yyzz = res.data.yyzz;
              this.appForm.frsfz = res.data.frsfz;
              this.appForm.gsxxyz = res.data.gsxxyz;
              this.appForm.ssyz = res.data.ssyz;
              this.appForm.fxscsqbg = res.data.fxscsqbg;
              this.appForm.fwry = res.data.fwry;
              this.appForm.sbzm = res.data.sbzm;
              this.appForm.zlht = res.data.zlht;
              this.appForm.bzjqrh = res.data.bzjqrh;
              this.appForm.ljhzcns = res.data.ljhzcns;
              this.appForm.hgcscnh = res.data.hgcscnh;
              this.appForm.cjcnh = res.data.cjcnh;
              this.appForm.hzjgxy = res.data.hzjgxy;
              this.appForm.qtxy = res.data.qtxy;
              this.appForm.fileList = res.data.fileList;

              this.timer = new Date().getTime();//更新timer，重新加载子组件

              if(this.appForm.isWork === "0"){
                this.isShow = false;
              }

              this.getOutInfo();
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
  .custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
    }
  }
</style>
