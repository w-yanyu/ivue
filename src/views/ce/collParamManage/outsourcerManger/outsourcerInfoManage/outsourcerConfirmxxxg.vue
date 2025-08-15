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
                  <el-input v-model="appForm.acct_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="开户行号" prop="bank_no" >
                  <el-input v-model="appForm.bank_no"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户名称" prop="acct_name" >
                  <el-input v-model="appForm.acct_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行名称" prop="bank_name" >
                  <el-input v-model="appForm.bank_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属城市" prop="cities" v-show="isShow && !isXdkzb">
                  <el-checkbox v-model="checkedAll" @change="checkedAllChange" v-show="showAllCities">全部城市</el-checkbox>
                  <el-checkbox-group v-model="appForm.cities">
                    <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId" @change="checkedChange">{{item.dictName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="营业执照修改" prop="yyzz" >
                  <upload-file ref="bgyyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="false" @changeFile="bgyyzzChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="法人身份证修改" prop="frsfz" >
                  <upload-file ref="bgfrsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="false" @changeFile="bgfrsfzChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="工商信息验证修改" prop="gsxxyz" >
                  <upload-file ref="bggsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="false" @changeFile="bggsxxyzChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉诉验证修改" prop="ssyz" >
                  <upload-file ref="bgssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="false" @changeFile="bgssyzChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
<!--              <el-col :span="12">-->
<!--                <el-form-item  label="风险审查申请报告修改" prop="fxscsqbg" >-->
<!--                  <upload-file ref="bgfxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="false" @changeFile="bgfxscsqbgChange"></upload-file>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="12">
                <el-form-item label="为我司服务人员信息修改" prop="fwry" >
                  <upload-file ref="bgfwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="false" @changeFile="bgfwryChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="为我司服务人员社保证明修改" prop="sbzm" >
                  <upload-file ref="bgsbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="false" @changeFile="bgsbzmChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="租赁合同或办公场地照片修改" prop="zlht" >
                  <upload-file ref="bgzlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="false" @changeFile="bgzlhtChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="合作机构协议修改" prop="hzjgxy" >
                  <upload-file ref="bghzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="false" @changeFile="bghzjgxyChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="保证金确认函修改" prop="bzjqrh" >
                  <upload-file ref="bgbzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="false" @changeFile="bgbzjqrhChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="廉洁合作承诺书修改" prop="ljhzcns" >
                  <upload-file ref="bgljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="false" @changeFile="bgljhzcnsChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="合规催收承诺函修改" prop="hgcscnh" >
                  <upload-file ref="bghgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="false" @changeFile="bghgcscnhChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="催记承诺函修改" prop="cjcnh" >
                  <upload-file ref="bgcjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="false" @changeFile="bgcjcnhChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他协议修改" prop="qtxy" >
                  <upload-file ref="bgqtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="false" @changeFile="bgqtxyChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>-
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <div class="custom-common--footer">
          <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
          <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
        </div>

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
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  import ChangeHisList from "./changeHisList";
  export default {
    name: "outsourcerConfirmxxxg",
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
          branchNo: "",//部门
          branch_name: "",//部门
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
          remark: "", // 备注
        },
        isShow:true,
        compareCustomerInfo:"",
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
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.getOutInfo();
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

     //查询外包商信息
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

      checkedAllChange(){
        if(this.checkedAll === true){
          this.appForm.cities = [];
          for (let i = 0; i < this.cityList.length; i++) {
            this.appForm.cities.push(this.cityList[i].dictName);
          }
        }else{
          this.appForm.cities = [];
        }
      },
      checkedChange(){
        if(this.appForm.cities.length < this.cityList.length){
          this.checkedAll = false;
        }else{
          this.checkedAll = true;
        }
      },


      submit() {
        if(!this.appForm.acct_no && !this.appForm.acct_name && !this.appForm.bank_no && !this.appForm.bank_name
          && this.appForm.cities.length == 0
          && this.appForm.yyzz.length == 0 && this.appForm.frsfz.length == 0
          && this.appForm.gsxxyz.length == 0 && this.appForm.ssyz.length == 0
          && this.appForm.fxscsqbg.length == 0 && this.appForm.fwry.length == 0
          && this.appForm.sbzm.length == 0 && this.appForm.zlht.length == 0
          && this.appForm.hzjgxy.length == 0 && this.appForm.bzjqrh.length == 0
          && this.appForm.ljhzcns.length == 0 && this.appForm.hgcscnh.length == 0
          && this.appForm.cjcnh.length == 0 && this.appForm.qtxy.length == 0){
          this.$message({
            type: "warning",
            message: "至少变更一项信息"
          });
          return;
        }

        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSBPMTS0092",
                oa_org_id: this.cParentParams.oa_org_id,//oa_org_id
                acct_no:this.appForm.acct_no,   //收款账户账号
                bank_no:this.appForm.bank_no,   //开户行号
                acct_name:this.appForm.acct_name,   //收款账户名称
                bank_name:this.appForm.bank_name,   //开户行名称
                cities:this.appForm.cities, //所属城市
                yyzz:this.appForm.yyzz,//营业执照修改
                frsfz:this.appForm.frsfz,//法人身份修改
                gsxxyz:this.appForm.gsxxyz,//工商信息修改
                ssyz:this.appForm.ssyz,//涉诉验证协议修改修改
                fxscsqbg:this.appForm.fxscsqbg,//风险审查修改
                fwry:this.appForm.fwry,//为我司服修改
                sbzm:this.appForm.sbzm,//社保证明修改
                zlht:this.appForm.zlht,//租赁合同修改
                hzjgxy:this.appForm.hzjgxy,//合作机构修改
                bzjqrh:this.appForm.bzjqrh,//保证金确修改
                ljhzcns:this.appForm.ljhzcns,//廉洁合作修改
                hgcscnh:this.appForm.hgcscnh,//合规催收修改
                cjcnh:this.appForm.cjcnh,//催记承诺修改
                qtxy:this.appForm.qtxy,//其他协议修改
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
          acct_no:"",//收款账户账号
          bank_no:"",//开户行号
          acct_name:"",//收款账户名称
          bank_name:"",//开户行名称
          cities: [], // 所属城市
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
          remark: "", // 备注
        }
        this.$refs.bgyyzzProp.clearFileList();
        this.$refs.bgfrsfzProp.clearFileList();
        this.$refs.bggsxxyzProp.clearFileList();
        this.$refs.bgssyzProp.clearFileList();
        //this.$refs.bgfxscsqbgProp.clearFileList();
        this.$refs.bgfwryProp.clearFileList();
        this.$refs.bgsbzmProp.clearFileList();
        this.$refs.bgzlhtProp.clearFileList();
        this.$refs.bghzjgxyProp.clearFileList();
        this.$refs.bgbzjqrhProp.clearFileList();
        this.$refs.bgljhzcnsProp.clearFileList();
        this.$refs.bghgcscnhProp.clearFileList();
        this.$refs.bgcjcnhProp.clearFileList();
        this.$refs.bgqtxyProp.clearFileList();

      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      bgyyzzChange(val){this.appForm.yyzz= val;},
      bgfrsfzChange(val){this.appForm.frsfz= val;},
      bggsxxyzChange(val){this.appForm.gsxxyz= val;},
      bgssyzChange(val){this.appForm.ssyz= val;},
      bgfxscsqbgChange(val){this.appForm.fxscsqbg= val;},
      bgfwryChange(val){this.appForm.fwry= val;},
      bgsbzmChange(val){this.appForm.sbzm= val;},
      bgzlhtChange(val){this.appForm.zlht= val;},
      bghzjgxyChange(val){this.appForm.hzjgxy= val;},
      bgbzjqrhChange(val){this.appForm.bzjqrh= val;},
      bgljhzcnsChange(val){this.appForm.ljhzcns= val;},
      bghgcscnhChange(val){this.appForm.hgcscnh= val;},
      bgcjcnhChange(val){this.appForm.cjcnh= val;},
      bgqtxyChange(val){this.appForm.qtxy= val;},
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
