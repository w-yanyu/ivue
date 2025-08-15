<template>
  <div>
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
            <span><em></em>外包商信息回显</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">

            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户账号" prop="acct_no" >
                  <el-input v-model="basicForm.acct_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="开户行号" prop="bank_no" >
                  <el-input v-model="basicForm.bank_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户名称" prop="acct_name" >
                  <el-input v-model="basicForm.acct_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行名称" prop="bank_name" >
                  <el-input v-model="basicForm.bank_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属城市" prop="cities" v-show="isShow && !isXdkzb">
                  <el-checkbox v-model="checkedAll" @change="checkedAllChange" v-show="showAllCities" :disabled="true">全部城市</el-checkbox>
                  <el-checkbox-group v-model="cityForm.cities">
                    <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId" @change="checkedChange" :disabled="true">{{item.dictName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
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
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>外包商信息修改</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">

            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户账号" prop="acct_no" >
                  <el-input v-model="appForm.acct_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="开户行号" prop="bank_no" >
                  <el-input v-model="appForm.bank_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户名称" prop="acct_name" >
                  <el-input v-model="appForm.acct_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行名称" prop="bank_name" >
                  <el-input v-model="appForm.bank_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属城市" prop="cities" v-show="isShow && !isXdkzb">
                  <el-checkbox v-model="checkedAll" @change="checkedAllChange" v-show="showAllCities" :disabled="true">全部城市</el-checkbox>
                  <el-checkbox-group v-model="appForm.cities">
                    <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId" @change="checkedChange" :disabled="true">{{item.dictName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="营业执照修改" prop="yyzz" >
                  <upload-file ref="bgyyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="true" @changeFile="bgyyzzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="法人身份证修改" prop="frsfz" >
                  <upload-file ref="bgfrsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="true" @changeFile="bgfrsfzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="工商信息验证修改" prop="gsxxyz" >
                  <upload-file ref="bggsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="true" @changeFile="bggsxxyzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉诉验证修改" prop="ssyz" >
                  <upload-file ref="bgssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="true" @changeFile="bgssyzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
<!--              <el-col :span="12">-->
<!--                <el-form-item  label="风险审查申请报告修改" prop="fxscsqbg" >-->
<!--                  <upload-file ref="bgfxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="true" @changeFile="bgfxscsqbgChange" :key="timer"></upload-file>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="12">
                <el-form-item label="为我司服务人员信息修改" prop="fwry" >
                  <upload-file ref="bgfwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="true" @changeFile="bgfwryChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="为我司服务人员社保证明修改" prop="sbzm" >
                  <upload-file ref="bgsbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="true" @changeFile="bgsbzmChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="租赁合同或办公场地照片修改" prop="zlht" >
                  <upload-file ref="bgzlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="true" @changeFile="bgzlhtChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="合作机构协议修改" prop="hzjgxy" >
                  <upload-file ref="bghzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="true" @changeFile="bghzjgxyChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="保证金确认函修改" prop="bzjqrh" >
                  <upload-file ref="bgbzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="true" @changeFile="bgbzjqrhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="廉洁合作承诺书修改" prop="ljhzcns" >
                  <upload-file ref="bgljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="true" @changeFile="bgljhzcnsChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="合规催收承诺函修改" prop="hgcscnh" >
                  <upload-file ref="bghgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="true" @changeFile="bghgcscnhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="催记承诺函修改" prop="cjcnh" >
                  <upload-file ref="bgcjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="true" @changeFile="bgcjcnhChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他协议修改" prop="qtxy" >
                  <upload-file ref="bgqtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="true" @changeFile="bgqtxyChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark" :disabled="true"></el-input>
                </el-form-item>-
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <span><em></em>修改历史</span>
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
    name: "outsourcerConfirmxxxgUpdateSearch",
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
          acct_no:"",//收款账户账号
          acct_name:"",//收款账户名称
          bank_no:"",//开户行号
          bank_name:"",//开户行名称
        },
        cityForm:{
          cities: [], // 所属城市
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
          acct_no:"",//收款账户账号
          acct_name:"",//收款账户名称
          bank_no:"",//开户行号
          bank_name:"",//开户行名称
          cities: [], // 所属城市
          remark: "", // 备注
          yyzz:[],//营业执照修改
          frsfz:[],//法人身份证修改
          gsxxyz:[],//工商信息验证修改
          ssyz:[],//涉诉验证修改
          fxscsqbg:[],//风险审查申请报告修改
          fwry:[],//为我司服务人员信息修改
          sbzm:[],//为我司服务人员社保证明修改
          zlht:[],//租赁合同或办公场地照片修改
          hzjgxy:[],//合作机构协议修改
          bzjqrh:[],//保证金确认函修改
          ljhzcns:[],//廉洁合作承诺书修改
          hgcscnh:[],//合规催收承诺函修改
          cjcnh:[],//催记承诺函修改
          qtxy:[],//其他协议修改
        },
        isShow:true,
        timer:"",
        branchList:[],
        orgTypeList:[],
        cityList : [],
        checkedAll: false,
        showAllCities:false,
        activeNames: ["1", "2","3","4"],
        isXdkzb: false,
        applyType : "WBSXXXG",
      }
    },
    created() {
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


      // 查询外包商信息
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
              this.basicForm.acct_no = response.acct_no;
              this.basicForm.acct_name = response.acct_name;
              this.basicForm.bank_no = response.bank_no;
              this.basicForm.bank_name = response.bank_name;
              const list = res.data.cities;
              if(list != null &&list.length > 0){
                for (let i = 0; i < list.length; i++) {
                  this.cityForm.cities.push(list[i].busi_city_name);
                }
              }
              this.isXdkzb = this.basicForm.branch == "001700"

              this.getCityList();
              this.getOutFiles();
            }
          })
          .catch(err => {
            console.error(err);
          })
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
      //查询工商信息修改申请信息
      getAppInfo(){
        let params = {
          servicecode: "RLMSBPMTS0094",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.appForm.oa_org_id = res.data.applyInfo.oa_org_id;
              this.appForm.acct_no= res.data.applyInfo.acct_no;
              this.appForm.bank_no = res.data.applyInfo.bank_no;
              this.appForm.acct_name = res.data.applyInfo.acct_name;
              this.appForm.bank_name = res.data.applyInfo.bank_name;
              this.appForm.cities = res.data.applyInfo.cities ? JSON.parse(res.data.applyInfo.cities) : [];
              this.appForm.remark = res.data.applyInfo.remark;

              this.appForm.yyzz = res.data.yyzz;
              this.appForm.frsfz = res.data.frsfz;
              this.appForm.gsxxyz = res.data.gsxxyz;
              this.appForm.ssyz = res.data.ssyz;
              this.appForm.fxscsqbg = res.data.fxscsqbg;
              this.appForm.fwry = res.data.fwry;
              this.appForm.sbzm = res.data.sbzm;
              this.appForm.zlht = res.data.zlht;
              this.appForm.hzjgxy = res.data.hzjgxy;
              this.appForm.bzjqrh = res.data.bzjqrh;
              this.appForm.ljhzcns = res.data.ljhzcns;
              this.appForm.hgcscnh = res.data.hgcscnh;
              this.appForm.cjcnh = res.data.cjcnh;
              this.appForm.qtxy = res.data.qtxy;

              this.getOutInfo();
            }
          })
          .catch(err => {
            console.error(err);
          })
      },
      //查询外包商资料信息
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
