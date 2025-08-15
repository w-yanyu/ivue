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
            <el-row>
              <el-col :span="8">
                <el-form-item label="合作开始时间" prop="startDate">
                  <el-date-picker
                    v-model="basicForm.startDate"
                    align="right"
                    type="date"
                    placeholder="请选择合作开始时间"
                    value-format="yyyyMMdd"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作结束时间" prop="endDate">
                  <el-date-picker
                    v-model="basicForm.endDate"
                    align="right"
                    type="date"
                    placeholder="请选择合作结束时间"
                    value-format="yyyyMMdd"
                    :disabled="true"
                  ></el-date-picker>
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
            <el-form-item  label="营业执照：" prop="yyzz" style="color:bule;">
              <outsourcer-upload ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="true" @changeFile="yyzzChange" :key="timer" class="jgStyle">
                <!-- <input type="file"/> -->
              </outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="法人身份证：" prop="frsfz">
              <outsourcer-upload ref="frsfzProp" :uploadFileList="appForm.frsfz" :uploadDisabled="true" @changeFile="frsfzChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="工商信息验证：" prop="gsxxyz">
              <outsourcer-upload ref="gsxxyzProp" :uploadFileList="appForm.gsxxyz" :uploadDisabled="true" @changeFile="gsxxyzChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="涉诉验证：" prop="ssyz">
              <outsourcer-upload ref="ssyzProp" :uploadFileList="appForm.ssyz" :uploadDisabled="true" @changeFile="ssyzChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">-->
<!--            <el-form-item  label="风险审查申请报告：" prop="fxscsqbg">-->
<!--              <outsourcer-upload ref="fxscsqbgProp" :uploadFileList="appForm.fxscsqbg" :uploadDisabled="true" @changeFile="fxscsqbgChange" :key="timer" class="jgStyle"></outsourcer-upload>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="12">
            <el-form-item  label="为我司服务人员信息：" prop="fwry">
              <outsourcer-upload ref="fwryProp" :uploadFileList="appForm.fwry" :uploadDisabled="true" @changeFile="fwryChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="为我司服务人员社保证明：" prop="sbzm">
              <outsourcer-upload ref="sbzmProp" :uploadFileList="appForm.sbzm" :uploadDisabled="true" @changeFile="sbzmChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="租赁合同或办公场地照片：" prop="zlht">
              <outsourcer-upload ref="zlhtProp" :uploadFileList="appForm.zlht" :uploadDisabled="true" @changeFile="zlhtChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="合作机构协议：" prop="hzjgxy">
              <outsourcer-upload ref="hzjgxyProp" :uploadFileList="appForm.hzjgxy" :uploadDisabled="true" @changeFile="hzjgxyChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="保证金确认函：" prop="bzjqrh">
              <outsourcer-upload ref="bzjqrhProp" :uploadFileList="appForm.bzjqrh" :uploadDisabled="true" @changeFile="bzjqrhChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="廉洁合作承诺书：" prop="ljhzcns">
              <outsourcer-upload ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="true" @changeFile="ljhzcnsChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="合规催收承诺函：" prop="hgcscnh">
              <outsourcer-upload ref="hgcscnhProp" :uploadFileList="appForm.hgcscnh" :uploadDisabled="true" @changeFile="hgcscnhChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="催记承诺函：" prop="cjcnh">
              <outsourcer-upload ref="cjcnhProp" :uploadFileList="appForm.cjcnh" :uploadDisabled="true" @changeFile="cjcnhChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="其他协议：" prop="qtxy">
              <outsourcer-upload ref="qtxyProp" :uploadFileList="appForm.qtxy" :uploadDisabled="true" @changeFile="qtxyChange" :key="timer" class="jgStyle"></outsourcer-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
      </el-collapse>
      <div class="custom-common--footer">
        <el-button size="small" type="primary" @click="cancel">关闭</el-button>
      </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import OutsourcerUpload from "./OutsourcerUpload";
  export default {
    name: "OutsourcerView",
    components: {
      OutsourcerUpload,
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
          startDate:"",//合作开始时间
          endDate:"",//合作结束时间
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
        cityForm: {  // 所属城市
          cities: [],
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
        bankForm: {  //开户行信息
          acctNo:"",//收款账户账号
          bankNo:"",//开户行号
          acctName:"",//收款账户名称
          bankName:"",//开户行名称
        },
       evalForm:{
          evaluate_year: "", //评价年份，
          evaluate_result: "0", // 是否通过
          efaprp:[],//上传采购项目后评价表
          popef:[],//上传外包项目后评价表
          remark: "", // 备注
       },
       isShow:true,
       compareCustomerInfo:"",
        timer:"",
        cityList: [],
        showAllCities:false,
        yesOrNoList:[],
        // branchList:[],
        orgTypeList:[],
        activeNames: ["1", "2","3","4","5"],
        isXdkzb: false,
      }
    },
    created() {
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.getDictList("E_EVALRESULT", "yesOrNoList"); // 评价结果
      this.getAppInfo();
      this.getBankInfo();
    },
    methods: {
       initRule(){},
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
       * 外包商开户行信息
       */
      getBankInfo(){
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
            }
            this.isXdkzb = this.basicForm.branch == "001700"
            this.getCityList();
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
      /**
       * 关闭弹窗
       */
      cancel() {
        this.$dialog.close()
      }
    }
  }

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
        .jgStyle {
          line-height:4px;
        }
    }
  }
</style>
