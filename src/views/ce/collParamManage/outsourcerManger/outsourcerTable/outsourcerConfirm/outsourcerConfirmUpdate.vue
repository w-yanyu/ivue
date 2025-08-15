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
            <span><em></em>外包商资料</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="是否合作:" prop="isWork">
              <el-radio-group v-model="appForm.isWork">
                <el-radio v-for="(item,i) in yesOrNoList" :key="i" :label="item.dictId" @change="radioChange">{{item.dictName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="所属城市:" prop="cities" v-show="isShow && !isXdkzb">
              <el-checkbox v-model="checkedAll" @change="checkedAllChange" v-show="showAllCities">全部城市</el-checkbox>
              <el-checkbox-group v-model="appForm.cities">
                <el-checkbox v-for="(item,i) in cityList" :key="item.dictId" :label="item.dictId" @change="checkedChange">{{item.dictName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="收款账户账号" prop="acctNo" v-show="isShow">
              <el-input v-model="appForm.acctNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="开户行号" prop="bankNo" v-show="isShow">
              <el-input v-model="appForm.bankNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="收款账户名称" prop="acctName" v-show="isShow">
              <el-input v-model="appForm.acctName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="开户行名称" prop="bankName" v-show="isShow">
              <el-input v-model="appForm.bankName"></el-input>
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
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="营业执照" prop="yyzz" v-show="isShow">
              <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="false" @changeFile="yyzzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="法人身份证" prop="frsfz" v-show="isShow">
              <upload-file ref="frsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="false" @changeFile="frsfzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="工商信息验证" prop="gsxxyz" v-show="isShow">
              <upload-file ref="gsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="false" @changeFile="gsxxyzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="涉诉验证" prop="ssyz" v-show="isShow">
              <upload-file ref="ssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="false" @changeFile="ssyzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">-->
<!--            <el-form-item class="require-asterisk" label="风险审查申请报告" prop="fxscsqbg" v-show="isShow">-->
<!--              <upload-file ref="fxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="false" @changeFile="fxscsqbgChange" :key="timer"></upload-file>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="为我司服务人员信息" prop="fwry" v-show="isShow">
              <upload-file ref="fwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="false" @changeFile="fwryChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="为我司服务人员社保证明" prop="sbzm" v-show="isShow">
              <upload-file ref="sbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="false" @changeFile="sbzmChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="租赁合同或办公场地照片" prop="zlht" v-show="isShow">
              <upload-file ref="zlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="false" @changeFile="zlhtChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合作机构协议" prop="hzjgxy" v-show="isShow">
              <upload-file ref="hzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="false" @changeFile="hzjgxyChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="保证金确认函" prop="bzjqrh" v-show="isShow">
              <upload-file ref="bzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="false" @changeFile="bzjqrhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="廉洁合作承诺书" prop="ljhzcns" v-show="isShow">
              <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="false" @changeFile="ljhzcnsChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="合规催收承诺函" prop="hgcscnh" v-show="isShow">
              <upload-file ref="hgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="false" @changeFile="hgcscnhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="催记承诺函" prop="cjcnh" v-show="isShow">
              <upload-file ref="cjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="false" @changeFile="cjcnhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他协议" prop="qtxy" v-show="isShow">
              <upload-file ref="qtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="false" @changeFile="qtxyChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="附件" prop="fileList" v-show="!isShow">
              <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="fileListChange" :key="timer"></upload-file>
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
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
    <div style="height:200px;"></div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "outsourcerConfirmUpdate",
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
      initRule(){
        let secondBranch = JSON.parse(localStorage.user_info).branchSeq.split(".")[2];
        if("001700" == this.basicForm.branch){
          this.isXdkzb = true;
        }
        this.appRules = {
            isWork: [{required: this.isShow, message: "请选择是否合作"}],
            cities: [{required: this.isShow && !this.isXdkzb,  message: "请选择所属城市"}],
            // acctNo: [{required: this.isShow, validator : this.validateAcctNo()}],
            // bankNo: [{required: this.isShow, validator : this.validateBankNo()}],
            acctNo: [{required: this.isShow, message: "请输收款账户账号"}],
            bankNo: [{required: this.isShow, message : "请输入开户行号"}],
            acctName: [{required: this.isShow,  message: "请输入收款账户名称"}],
            bankName: [{required: this.isShow,  message: "请输入开户行名称"}],
            startDate: [{required: this.isShow,  message: "请输入合作开始时间"}],
            endDate: [{required: this.isShow,  message: "请输入合作结束时间"}],
            yyzz:[{ validator: this.yyzzValidate, trigger: 'change' }],
            frsfz:[{ validator: this.frsfzValidate, trigger: 'change' }],
            gsxxyz:[{ validator: this.gsxxyzValidate, trigger: 'change' }],
            ssyz:[{ validator: this.ssyzValidate, trigger: 'change' }],
            //fxscsqbg:[{ validator: this.fxscsqbgValidate, trigger: 'change' }],
            fwry:[{ validator: this.fwryValidate, trigger: 'change' }],
            sbzm:[{ validator: this.sbzmValidate, trigger: 'change' }],
            zlht:[{ validator: this.zlhtValidate, trigger: 'change' }],
            hzjgxy:[{ validator: this.hzjgxyValidate, trigger: 'change' }],
            bzjqrh:[{ validator: this.bzjqrhValidate, trigger: 'change' }],
            ljhzcns:[{ validator: this.ljhzcnsValidate, trigger: 'change' }],
            hgcscnh:[{ validator: this.hgcscnhValidate, trigger: 'change' }],
            cjcnh:[{ validator: this.cjcnhValidate, trigger: 'change' }],
            fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
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
      getCityList() {
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
      radioChange(){
        if(this.appForm.isWork=='1'){
          this.isShow=true;
          this.initRule();
        }
        if(this.appForm.isWork=='0'){
          this.isShow=false;
          this.initRule();
        }
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
              this.isXdkzb = this.basicForm.branch == "001700";
              this.appRules.cities = [{required: this.isShow && !this.isXdkzb,  message: "请选择所属城市"}];
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
              this.initRule();
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否保存申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1005",
                applid: this.cParentParams.applid,
                isWork:this.appForm.isWork,  //是否合作
                remark:this.appForm.remark,  //备注
              }
              if(this.appForm.isWork == "1"){
                params.cities=JSON.stringify(this.appForm.cities);  //所属城市
                params.acctNo=this.appForm.acctNo;   //收款账户账号
                params.bankNo=this.appForm.bankNo;   //开户行号
                params.acctName=this.appForm.acctName;   //收款账户名称
                params.bankName=this.appForm.bankName;   //开户行名称
                params.startDate=this.appForm.startDate;   //合作开始时间
                params.endDate=this.appForm.endDate;   //合作结束时间
                params.yyzz=this.appForm.yyzz;//营业执照
                params.frsfz=this.appForm.frsfz;//法人身份
                params.gsxxyz=this.appForm.gsxxyz;//工商信息
                params.ssyz=this.appForm.ssyz;//工商信息
                //params.fxscsqbg=this.appForm.fxscsqbg;//风险审查
                params.fwry=this.appForm.fwry;//为我司服
                params.sbzm=this.appForm.sbzm;//社保证明
                params.zlht=this.appForm.zlht;//租赁合同
                params.hzjgxy=this.appForm.hzjgxy;//合作机构
                params.bzjqrh=this.appForm.bzjqrh;//保证金确
                params.ljhzcns=this.appForm.ljhzcns;//廉洁合作
                params.hgcscnh=this.appForm.hgcscnh;//合规催收
                params.cjcnh=this.appForm.cjcnh;//催记承诺
                params.hzjgxy=this.appForm.hzjgxy;//合作机构
                params.qtxy=this.appForm.qtxy;//其他协议
              }else{
                params.fileList=this.appForm.fileList;//附件
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.$confirm("是否确认重置申请信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
        })
      },

      clearData(){
        this.appForm ={
          isWork: "1", // 是否合作
          cities: [], // 所属城市
          acctNo:"",//收款账户账号
          bankNo:"",//开户行号
          acctName:"",//收款账户名称
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
        }
        this.$refs.yyzzProp.clearFileList();
        this.$refs.frsfzProp.clearFileList();
        this.$refs.gsxxyzProp.clearFileList();
        this.$refs.ssyzProp.clearFileList();
        //this.$refs.fxscsqbgProp.clearFileList();
        this.$refs.fwryProp.clearFileList();
        this.$refs.sbzmProp.clearFileList();
        this.$refs.zlhtProp.clearFileList();
        this.$refs.hzjgxyProp.clearFileList();
        this.$refs.bzjqrhProp.clearFileList();
        this.$refs.ljhzcnsProp.clearFileList();
        this.$refs.hgcscnhProp.clearFileList();
        this.$refs.cjcnhProp.clearFileList();
        this.$refs.hzjgxyProp.clearFileList();
        this.$refs.qtxyProp.clearFileList();
        this.$refs.fileListProp.clearFileList();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      yyzzChange(val){this.appForm.yyzz= val;},
      frsfzChange(val){this.appForm.frsfz= val;},
      gsxxyzChange(val){this.appForm.gsxxyz= val;},
      ssyzChange(val){this.appForm.ssyz= val;},
      fxscsqbgChange(val){this.appForm.fxscsqbg= val;},
      fwryChange(val){this.appForm.fwry= val;},
      sbzmChange(val){this.appForm.sbzm= val;},
      zlhtChange(val){this.appForm.zlht= val;},
      hzjgxyChange(val){this.appForm.hzjgxy= val;},
      bzjqrhChange(val){this.appForm.bzjqrh= val;},
      ljhzcnsChange(val){this.appForm.ljhzcns= val;},
      hgcscnhChange(val){this.appForm.hgcscnh= val;},
      cjcnhChange(val){this.appForm.cjcnh= val;},
      qtxyChange(val){this.appForm.qtxy= val;},
      fileListChange(val){this.appForm.fileList= val;},
      validateBankNo(){
        return (rule, value ,callback) =>{
          if(!value){
            return callback(new Error("请输入开户行号"));
          }else{
            let reg = /^\d{12}$/;
            if(!reg.test(value)){
              return callback(new Error("请输入12位开户行号"));
            }else{
              this.$refs.bankNo.clearValidate();
              return callback();
            }
          }
        }
      },

      validateAcctNo(){
        return (rule, value ,callback) =>{
          if(!value){
            return callback(new Error("请输收款账户账号"));
          }else{
            let reg16 = /^\d{16}$/;
            let reg19 = /^\d{19}$/;
            if(!reg16.test(value) && !reg19.test(value)){
              return callback(new Error("请输入16或19位收款账户账号"));
            }else{
              this.$refs.bankNo.clearValidate();
              return callback();
            }
          }
        }
      },
      yyzzValidate(value, rule, callback) {if (this.appForm.yyzz.length === 0 && this.isShow) {  return callback(new Error("请上传营业执照"));   }return callback();   },
      frsfzValidate(value, rule, callback) {if (this.appForm.frsfz.length === 0 && this.isShow) {  return callback(new Error("请上传法人身份证"));   }return callback();   },
      gsxxyzValidate(value, rule, callback) {if (this.appForm.gsxxyz.length === 0 && this.isShow) {  return callback(new Error("请上传工商信息验证"));   }return callback();   },
      ssyzValidate(value, rule, callback) {if (this.appForm.ssyz.length === 0 && this.isShow) {  return callback(new Error("请上传涉诉验证"));   }return callback();   },
      fxscsqbgValidate(value, rule, callback) {if (this.appForm.fxscsqbg.length === 0 && this.isShow) {  return callback(new Error("请上传风险审查申请报告"));   }return callback();   },
      fwryValidate(value, rule, callback) {if (this.appForm.fwry.length === 0 && this.isShow) {  return callback(new Error("请上传为我司服务人员信息"));   }return callback();   },
      sbzmValidate(value, rule, callback) {if (this.appForm.sbzm.length === 0 && this.isShow) {  return callback(new Error("请上传为我司服务人员社保证明"));   }return callback();   },
      zlhtValidate(value, rule, callback) {if (this.appForm.zlht.length === 0 && this.isShow) {  return callback(new Error("请上传租赁合同或办公场地照片"));   }return callback();   },
      hzjgxyValidate(value, rule, callback) {if (this.appForm.hzjgxy.length === 0 && this.isShow) {  return callback(new Error("请上传合作机构协议"));   }return callback();   },
      bzjqrhValidate(value, rule, callback) {if (this.appForm.bzjqrh.length === 0 && this.isShow) {  return callback(new Error("请上传保证金确认函"));   }return callback();   },
      ljhzcnsValidate(value, rule, callback) {if (this.appForm.ljhzcns.length === 0 && this.isShow) {  return callback(new Error("请上传廉洁合作承诺书"));   }return callback();   },
      hgcscnhValidate(value, rule, callback) {if (this.appForm.hgcscnh.length === 0 && this.isShow) {  return callback(new Error("请上传合规催收承诺函"));   }return callback();   },
      cjcnhValidate(value, rule, callback) {if (this.appForm.cjcnh.length === 0 && this.isShow) {  return callback(new Error("请上传催记承诺函"));   }return callback();   },
      qtxyValidate(value, rule, callback) {if (this.appForm.qtxy.length === 0 && this.isShow) {  return callback(new Error("请上传其他协议"));   }return callback();   },
      fileListValidate(value, rule, callback) {if (this.appForm.fileList.length === 0 && !this.isShow) {  return callback(new Error("请上传附件"));   }return callback();   }
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
