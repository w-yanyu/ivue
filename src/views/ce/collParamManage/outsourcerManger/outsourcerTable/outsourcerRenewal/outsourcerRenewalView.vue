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
        <el-collapse-item name="2" v-show="!isXdkzb">
          <template slot="title">
            <span><em></em>所属城市</span>
          </template>
          <el-form ref="cityForm" :model="cityForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属城市:" prop="cities">
                  <el-checkbox v-model="checkedAll" v-show="showAllCities" :disabled="true">全部城市</el-checkbox>
                  <el-checkbox-group v-model="cityForm.cities" :disabled="true">
                    <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId">{{item.dictName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>外包商资料</span>
          </template>
          <el-form ref="fileForm" :model="fileForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="营业执照" prop="yyzz" :disabled="true">
                  <upload-file ref="yyzzProp" :uploadFileList="fileForm.yyzz" :uploadDisabled="true" @changeFile="yyzzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人身份证" prop="frsfz" :disabled="true">
                  <upload-file ref="frsfzProp" :uploadFileList="fileForm.frsfz" :uploadDisabled="true" @changeFile="frsfzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工商信息验证" prop="gsxxyz" :disabled="true">
                  <upload-file ref="gsxxyzProp" :uploadFileList="fileForm.gsxxyz" :uploadDisabled="true" @changeFile="gsxxyzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉诉验证" prop="ssyz" :disabled="true">
                  <upload-file ref="ssyzProp" :uploadFileList="fileForm.ssyz" :uploadDisabled="true" @changeFile="ssyzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
<!--              <el-col :span="12">-->
<!--                <el-form-item label="风险审查申请报告" prop="fxscsqbg" :disabled="true">-->
<!--                  <upload-file ref="fxscsqbgProp" :uploadFileList="fileForm.fxscsqbg" :uploadDisabled="true" @changeFile="fxscsqbgChange" :key="timer"></upload-file>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="12">
                <el-form-item label="为我司服务人员信息" prop="fwry" :disabled="true">
                  <upload-file ref="fwryProp" :uploadFileList="fileForm.fwry" :uploadDisabled="true" @changeFile="fwryChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="为我司服务人员社保证明" prop="sbzm" :disabled="true">
                  <upload-file ref="sbzmProp" :uploadFileList="fileForm.sbzm" :uploadDisabled="true" @changeFile="sbzmChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="租赁合同或办公场地照片" prop="zlht" :disabled="true">
                  <upload-file ref="zlhtProp" :uploadFileList="fileForm.zlht" :uploadDisabled="true" @changeFile="zlhtChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合作机构协议" prop="hzjgxy" :disabled="true">
                  <upload-file ref="hzjgxyProp" :uploadFileList="fileForm.hzjgxy" :uploadDisabled="true" @changeFile="hzjgxyChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="保证金确认函" prop="bzjqrh" :disabled="true">
                  <upload-file ref="bzjqrhProp" :uploadFileList="fileForm.bzjqrh" :uploadDisabled="true" @changeFile="bzjqrhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="廉洁合作承诺书" prop="ljhzcns" :disabled="true">
                  <upload-file ref="ljhzcnsProp" :uploadFileList="fileForm.ljhzcns" :uploadDisabled="true" @changeFile="ljhzcnsChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合规催收承诺函" prop="hgcscnh" :disabled="true">
                  <upload-file ref="hgcscnhProp" :uploadFileList="fileForm.hgcscnh" :uploadDisabled="true" @changeFile="hgcscnhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="催记承诺函" prop="cjcnh" :disabled="true">
                  <upload-file ref="cjcnhProp" :uploadFileList="fileForm.cjcnh" :uploadDisabled="true" @changeFile="cjcnhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他协议" prop="qtxy" :disabled="true">
                  <upload-file ref="qtxyProp" :uploadFileList="fileForm.qtxy" :uploadDisabled="true" @changeFile="qtxyChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <span><em></em>开户行信息</span>
          </template>
          <el-form ref="bankForm" :model="bankForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="收款账户账号" prop="acctNo">
                  <el-input v-model="bankForm.acctNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行号" prop="bankNo">
                  <el-input v-model="bankForm.bankNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收款账户名称" prop="acctName">
                  <el-input v-model="bankForm.acctName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行名称" prop="bankName">
                  <el-input v-model="bankForm.bankName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <span><em></em>续约信息</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="续签开始时间" prop="startDate">
                  <el-date-picker
                    v-model="appForm.startDate"
                    align="right"
                    type="date"
                    placeholder="请选择续签开始时间"
                    value-format="yyyyMMdd"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="续签结束时间" prop="endDate">
                  <el-date-picker
                    v-model="appForm.endDate"
                    align="right"
                    type="date"
                    placeholder="请选择续签结束时间"
                    value-format="yyyyMMdd"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="续约材料" prop="xycl">
                  <upload-file ref="xyclProp" :uploadFileList="appForm.xycl" :uploadDisabled="true" @changeFile="xyclChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他材料" prop="qtcl">
                  <upload-file ref="qtclProp" :uploadFileList="appForm.qtcl" :uploadDisabled="true" @changeFile="qtclChange" :key="timer"></upload-file>
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
    name: "outsourcerRenewalView",
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
          startDate:"",//合作开始时间
          endDate:"",//合作结束时间
        },
        cityForm: {
          cities:[]
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
        bankForm:{
          acctNo:"",//收款账户账号
          acctName:"",//收款账户名称
          bankNo:"",//开户行号
          bankName:"",//开户行名称
        },
        appForm:{
          startDate:"",//合作开始时间
          endDate:"",//合作结束时间
          xycl:[],//续约材料
          qtcl:[],//其他材料
          remark: "", // 备注
        },
        timer:"",
        branchList:[],
        orgTypeList:[],
        cityList : [],
        checkedAll: false,
        showAllCities:false,
        activeNames: ["1", "2","3","4","5"],
        isXdkzb: false,
      }
    },
    created() {
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
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
              this.basicForm.startDate = response.work_begin_time;
              this.basicForm.endDate = response.work_end_time;
              this.bankForm.acctNo = response.acct_no;
              this.bankForm.acctName = response.acct_name;
              this.bankForm.bankNo = response.bank_no;
              this.bankForm.bankName = response.bank_name;
              const list = res.data.cities;
              if(list != null &&list.length > 0){
                for (let i = 0; i < list.length; i++) {
                  this.cityForm.cities.push(list[i].busi_city_name);
                }
              }
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
          servicecode: "RLMSPLTS1017",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.appForm.oa_org_id = res.data.applyInfo.oa_org_id;
              this.appForm.startDate = res.data.applyInfo.work_begin_time;
              this.appForm.endDate = res.data.applyInfo.work_end_time;
              this.appForm.remark = res.data.applyInfo.remark;
              this.appForm.xycl = res.data.xycl;
              this.appForm.qtcl = res.data.qtcl;

              this.timer = new Date().getTime();//更新timer，重新加载子组件
              this.getOutInfo();
              this.getOutFiles();
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      getOutFiles(){
        let params = {
          servicecode: "RLMSPLTS1018",
          oaOrgId: this.appForm.oa_org_id,
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
