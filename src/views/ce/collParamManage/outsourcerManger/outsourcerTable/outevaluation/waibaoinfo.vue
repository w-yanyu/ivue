<template>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>外包商信息</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门" prop="branch_name">
                  <el-input v-model="basicForm.branch_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input v-model="basicForm.oa_org_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="social_credit_code">
                  <el-input v-model="basicForm.social_credit_code" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="经营期限开始时间" prop="operation_begin_date">
                  <el-input v-model="basicForm.operation_begin_date" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="经营状态" prop="operation_status">
                  <el-input v-model="basicForm.operation_status" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="合作结束时间" prop="work_end_time">
                  <el-input v-model="basicForm.work_end_time" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合作机构类型: " prop="org_type">
                  <el-select v-model="basicForm.org_type" :disabled="true" >
                    <el-option v-for="item in orgTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="注册资本" prop="regis_capital">
                  <el-input v-model="basicForm.regis_capital" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="办公地址" prop="addr">
                  <el-input v-model="basicForm.addr" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="经营期限结束时间" prop="operation_end_date">
                  <el-input v-model="basicForm.operation_end_date" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="合作开始时间" prop="work_begin_time">
                  <el-input v-model="basicForm.work_begin_time" :disabled="true"></el-input>
                </el-form-item>
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
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业执照" prop="yyzz" >
              <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="true" @changeFile="yyzzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人身份证" prop="frsfz">
              <upload-file ref="frsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="true" @changeFile="frsfzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工商信息验证" prop="gsxxyz">
              <upload-file ref="gsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="true" @changeFile="gsxxyzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="涉诉验证" prop="ssyz">
              <upload-file ref="ssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="true" @changeFile="ssyzChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">-->
<!--            <el-form-item label="风险审查申请报告" prop="fxscsqbg">-->
<!--              <upload-file ref="fxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="true" @changeFile="fxscsqbgChange" :key="timer"></upload-file>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="12">
            <el-form-item label="为我司服务人员信息" prop="fwry">
              <upload-file ref="fwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="true" @changeFile="fwryChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="为我司服务人员社保证明" prop="sbzm">
              <upload-file ref="sbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="true" @changeFile="sbzmChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="租赁合同或办公场地照片" prop="zlht">
              <upload-file ref="zlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="true" @changeFile="zlhtChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作机构协议" prop="hzjgxy">
              <upload-file ref="hzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="true" @changeFile="hzjgxyChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="保证金确认函" prop="bzjqrh">
              <upload-file ref="bzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="true" @changeFile="bzjqrhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="廉洁合作承诺书" prop="ljhzcns">
              <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="true" @changeFile="ljhzcnsChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合规催收承诺函" prop="hgcscnh">
              <upload-file ref="hgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="true" @changeFile="hgcscnhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="催记承诺函" prop="cjcnh">
              <upload-file ref="cjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="true" @changeFile="cjcnhChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他协议" prop="qtxy">
              <upload-file ref="qtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="true" @changeFile="qtxyChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item class="require-asterisk" label="附件" prop="fileList">
              <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="true" @changeFile="fileListChange" :key="timer"></upload-file>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <span><em></em>开户行信息</span>
          </template>
          <el-form ref="bankForm" :rules="bankRules" :model="bankForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户账号" prop="acctNo">
                  <el-input v-model="bankForm.acctNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="开户行号" prop="bankNo">
                  <el-input v-model="bankForm.bankNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  label="收款账户名称" prop="acctName">
                  <el-input v-model="bankForm.acctName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="开户行名称" prop="bankName">
                  <el-input v-model="bankForm.bankName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <span><em></em>评价信息</span>
          </template>
          <el-form ref="evalForm" :rules="evalRules" :model="evalForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" prop="evaluate_year" label="评价年份">
                  <el-date-picker
                    v-model="evalForm.evaluate_year"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="评价结果:" prop="evaluate_result">
                    <el-radio-group v-model="evalForm.evaluate_result">
                    <el-radio v-for="(item,i) in yesOrNoList" :key="i" :label="item.dictId" :checked="evalForm.evaluate_result === item.dictId">{{item.dictName}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
               </el-row>
                  <el-row>
                    <!-- <el-col :span="12">
                    <el-form-item class="require-asterisk" label="上传采购项目后评价表" prop="efaprp">
                      <upload-file ref="efaprpProp" :uploadFileList="evalForm.efaprp" :uploadDisabled="false" @changeFile="efaprpChange" :key="timer"></upload-file>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item class="require-asterisk" label="外包项目后评价表" prop="popef">
                      <upload-file ref="popefProp" :uploadFileList="evalForm.popef" :uploadDisabled="false" @changeFile="popefChange" :key="timer"></upload-file>
                    </el-form-item>
                  </el-col>
                 </el-row>
                <el-row>
              <el-col :span="12">
                <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="evalForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
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
    name: "waibaoinfo",
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
        cityForm: {  // 所属城市
          cities: [],
        },
        bankForm: {  //开户行信息
          acctNo:"",//收款账户账号
          bankNo:"",//开户行号
          acctName:"",//收款账户名称
          bankName:"",//开户行名称
        },
        appForm:{  //外包商资料
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
        },
       evalForm:{
          evaluate_year: "", //评价年份，
          evaluate_result: "0", // 是否通过
          // efaprp:[],//上传采购项目后评价表
          popef:[],//上传外包项目后评价表
          remark: "", // 备注
       },
       isShow:true,
       compareCustomerInfo:"",
        timer:"",
        showAllCities:false,
        yesOrNoList:[],
        // branchList:[],
        orgTypeList:[],
        cityList: [],
        activeNames: ["1", "2","3","4","5"],
        isXdkzb: false,
      }
    },
    created() {
      // this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.getDictList("E_EVALRESULT", "yesOrNoList"); // 评价结果
      this.initRule();
      this.getAppInfo();
      this.getBankInfo();
    },
    methods: {
       initRule(){
        this.evalRules = {
            evaluate_result: [{required: true, message: "请选择是否通过"}],
            evaluate_year:[{ required: true,  message: "请输入评价年份" }],
            // efaprp:[{ validator: this.efaprpValidate, trigger: 'change' }],
            popef:[{ validator: this.popefValidate, trigger: 'change' }]
        }
      },
      /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictType
       * @param listKey 列表对象key名称
       */
      getDictList(dictType, listKey) {
        let secondBranch = JSON.parse(localStorage.user_info).branchSeq.split(".")[2];
        if("001700" == this.basicForm.branch){
          this.isXdkzb = true;
        }
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
      /**
       * 外包商信息
       */
      getBankInfo() {
        let params = {
          servicecode: "RLMSPLTS1010",
          oaOrgId: this.cParentParams.oa_org_id,
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
      /**
       * 外包商资料
       */
      getAppInfo() {
        let params = {
          servicecode: "RLMSPLTS1018",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
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
              this.timer = new Date().getTime();//更新timer，重新加载子组件
            }
          })
          .catch(err => {
            console.error(err);
          })
      },
      radioChange(){
        if(this.evalForm.evaluate_result=='0'){
          this.isShow=true;
          this.initRule();
        }
        if(this.evalForm.evaluate_result=='1'){
          this.isShow=false;
          this.initRule();
        }
      },
      submit() {
        this.$refs.evalForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1111",
                oa_org_id: this.cParentParams.oa_org_id, //外包商机构编号
                remark:this.evalForm.remark,  //备注
                // efaprp:this.evalForm.efaprp,//"上传采购项目后评价表"
                popef:this.evalForm.popef,//"上传外包项目后评价表"
                evaluate_year:this.evalForm.evaluate_year, //评价年份
                evaluate_result:this.evalForm.evaluate_result, //评价结果
                lncatp:"PJ",
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
        this.evalForm = { //外包商评价信息
          // efaprp:[],//上传采购项目后评价表
          popef:[],//上传外包项目后评价表
          remark: "", // 备注
          evaluate_year: "",//评价年份
          evaluate_result: "0",//评价结果
        },
        // this.$refs.efaprpProp.clearFileList();
        this.$refs.popefProp.clearFileList();
      },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      // efaprpChange(val){this.evalForm.efaprp= val;},
      popefChange(val){this.evalForm.popef= val;},
      // efaprpValidate(value, rule, callback) {if (this.evalForm.efaprp.length === 0 && true) {  return callback(new Error("上传采购项目后评价表"));   }return callback();   },
      popefValidate(value, rule, callback) {if (this.evalForm.popef.length === 0 && true) {  return callback(new Error("上传外包项目后评价表"));   }return callback();   },
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
