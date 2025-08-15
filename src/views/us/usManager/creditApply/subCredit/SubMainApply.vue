<template>
  <div>
      <el-form ref="ruleForm" :model="Applys" :rules="rules" class="custom-common--form" label-width="190px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="upload-item" label="授信通知书编号" prop="cl_no">
              <el-input v-model="Applys.cl_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基准币种" prop="base_ccy" class="upload-item" >
              <el-select v-model="Applys.base_ccy" :disabled="true">
                <el-option v-for="item in ccy_cdList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主授信币种" prop="ccy_cd" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.ccy_cd">
                <el-option v-for="item in ccy_cdList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信总金额" prop="appv_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信总金额(折基准币种)" prop="base_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信汇率" prop="exc_rate" class="upload-item">
              <el-input v-model="Applys.exc_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="综合授信金额" prop="appv_synt_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_synt_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="综合授信金额(折基准币种)" prop="base_synt_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_synt_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信额度有效期(月)" prop="appv_tnr" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-input v-model="Applys.appv_tnr" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="专项授信金额" prop="appv_spec_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_spec_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专项授信金额(折基准币种)" prop="base_spec_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_spec_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="集团/非集团授信标志" prop="single_group_flag" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.single_group_flag">
                <el-option v-for="item in group_subFlag" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="低风险授信金额" prop="appv_lowr_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_lowr_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="低风险授信金额(折基准币种)" prop="base_lowr_busi_amt" class="upload-item">
              <el-input v-model="Applys.appv_lowr_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否我行关联方" prop="is_hf_rela" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.is_hf_rela">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="是否绿色信贷(银监2018)" prop="is_greenloan_cbrc" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.is_greenloan_cbrc">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否绿色信贷(人行)" prop="is_greenloan_hude" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.is_greenloan_hude">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否绿色信贷(银监2020)" prop="is_greenloan_cbrctt" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.is_greenloan_cbrctt">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="是否政府购买服务标识" prop="is_buy_service_flag" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.is_buy_service_flag">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否企业周转便利金融工具" prop="bljrgj" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-select v-model="Applys.bljrgj">
                <el-option v-for="item in yes_noList" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="授信资金用途" prop="ln_purpose_desc" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-input v-model="Applys.ln_purpose_desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="授信申请方案综述" prop="cl_group_desc" class="upload-item" :rules="[{ required: true, message: '此项为必填项' }]">
              <el-input v-model="Applys.cl_group_desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="custom-common--footer">
          <el-button :disabled="submitLoading" size="small" type="primary" @click="mainApplySubmit">{{$i18ns('保存')}}</el-button>
          <el-button size="small" type="primary" @click="jumpUrl(toGroupCateUrl)">增加额度分类</el-button>
        </el-row>
      </el-form>
      <el-tabs v-if="show" v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <to-json
            v-if="activeName === item.idField"
            :params="item.params"  :toUrl="item.toRequest" @jsonCallBack="jsonCallBack"
          ></to-json>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "GroupMainApply",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      show: false,
      Applys: {
        appl_id:"",
        parent_appl_id:"",
        cust_no:"",
        cl_no: "",
        base_ccy: "",
        ccy_cd: "",
        exc_rate: "1",
        appv_tnr: "",
        appv_busi_amt: "",
        base_busi_amt:"",
        appv_synt_busi_amt:"",
        base_synt_busi_amt:"",
        appv_spec_busi_amt:"",
        base_spec_busi_amt:"",
        appv_lowr_busi_amt:"",
        base_lowr_busi_amt:"",
        single_group_flag:"",
        is_hf_rela:"",
        is_greenloan_cbrc:"",
        is_greenloan_hude:"",
        is_greenloan_cbrctt:"",
        is_buy_service_flag:"",
        bljrgj:"",
        ln_purpose_desc:"",
        cl_group_desc:""
      },
      cateForm: {
        appl_id: "",
        cust_no: "",
        class_cd: "",
        group_ccy_cd : "",
        appv_tnr: "",
        group_amt: "",
        group_desc: ""
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        appl_id: "",
        procinstid: "",
        cust_no: "",
        group_no: "",
        class_cd: ""
      },
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "A1",
      toGroupCateUrl: "/views/us/usManager/creditApply/subCredit/cate/group_creditCate_add.json",
      toCreditAllocationUrl: "/views/us/usManager/creditApply/subCredit/sub_creditAllocation_list.json",
      toRequest:  "/views/us/usManager/creditApply/subCredit/sub_customer_main_apply.json",
      ccy_cdList: [],//币种类型字典
      yes_noList:[],//是否标志字典
      group_subFlag:[],//是否集团授信标志字典
      class_cdList: [], //分类类型字典
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.initSubCompanyApply(true);//初始化查询子公司授信主申请
    this.getDictList("MS_CURRENCY", "ccy_cdList");//初始化币种字典
    this.getDictList("MS_E_YESORNO", "yes_noList");//初始化是否标志字典
    this.getDictList("E_SINGLE_GROUP_FLAG","group_subFlag");//初始化集团授信标志字典

    this.cateForm.appl_id = this.cParentParams.applid; // appid参数传递
    this.cateForm.cust_no = this.cParentParams.cust_no; // cust_no参数传递

    this.c_$params.cust_no = this.cParentParams.cust_no; // appid参数传递
    this.getDictList("E_CATE_CLASS_CD", "class_cdList"); // 初始化贷款形态数据字典
  },
  methods: {
    initSubCompanyApply(init){
      let that = this;
      let request_map = {
        servicecode:"ICMSLNTS5011",
        appl_id: that.cParentParams.applid,
        creditType:"SUBCOM",
        cust_no:that.cParentParams.cust_no,
        cust_name:that.cParentParams.custname
      };
       MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
        .then(res => {
          console.log("initGroupCompanyApply", res);
          if (res.code === "200") {
            console.log("===zmh=="+res.data.appl_id);
            that.Applys.appl_id=res.data.appl_id;
            that.Applys.parent_appl_id=res.data.parent_appl_id;
            that.Applys.cust_no=res.data.cust_no;
            that.Applys.cl_no=res.data.cl_no;
            that.Applys.base_ccy=res.data.base_ccy;
            that.Applys.ccy_cd=res.data.ccy_cd;
            that.Applys.exc_rate=res.data.exc_rate;
            that.Applys.appv_tnr=res.data.appv_tnr;
            that.Applys.appv_busi_amt=res.data.appv_busi_amt;
            that.Applys.base_busi_amt=res.data.base_busi_amt;
            that.Applys.appv_synt_busi_amt=res.data.appv_synt_busi_amt;
            that.Applys.base_synt_busi_amt=res.data.base_synt_busi_amt;
            that.Applys.appv_spec_busi_amt=res.data.appv_spec_busi_amt;
            that.Applys.base_spec_busi_amt=res.data.base_spec_busi_amt;
            that.Applys.appv_lowr_busi_amt=res.data.appv_lowr_busi_amt;
            that.Applys.base_lowr_busi_amt=res.data.base_lowr_busi_amt;
            that.Applys.single_group_flag=res.data.single_group_flag !==null ?res.data.single_group_flag:"";
            that.Applys.is_hf_rela=res.data.is_hf_rela !==null ?res.data.is_hf_rela:"";
            that.Applys.is_greenloan_cbrc=res.data.is_greenloan_cbrc !==null ?res.data.is_greenloan_cbrc:"";
            that.Applys.is_greenloan_hude=res.data.is_greenloan_hude !==null ?res.data.is_greenloan_hude:"";
            that.Applys.is_greenloan_cbrctt=res.data.is_greenloan_cbrctt !==null ?res.data.is_greenloan_cbrctt:"";
            that.Applys.is_buy_service_flag=res.data.is_buy_service_flag !==null ?res.data.is_buy_service_flag:"";
            that.Applys.bljrgj=res.data.bljrgj !==null ?res.data.bljrgj:"";
            that.Applys.ln_purpose_desc=res.data.ln_purpose_desc;
            that.Applys.cl_group_desc=res.data.cl_group_desc;
            //第一次进入页面初始化
            if (init){
              this.getTabInfo(true);
            }
          }
        })
    },
    mainApplySubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let that = this;
          let request_map = {
            servicecode:"upcrin",
            creditType:"SUBCOM",
            appl_id:that.cParentParams.applid,
            cust_no:that.cParentParams.cust_no,
            detail:{
              appl_id:that.Applys.appl_id,
              parent_appl_id:that.Applys.parent_appl_id,
              cust_no:that.Applys.cust_no,
              cl_no:that.Applys.cl_no,
              base_ccy:that.Applys.base_ccy,
              ccy_cd:that.Applys.base_ccy,
              exc_rate:that.Applys.exc_rate,
              appv_tnr:that.Applys.appv_tnr,
              appv_busi_amt:that.Applys.appv_busi_amt,
              base_busi_amt:that.Applys.appv_busi_amt,
              appv_synt_busi_amt:that.Applys.appv_synt_busi_amt,
              base_synt_busi_amt:that.Applys.appv_synt_busi_amt,
              appv_spec_busi_amt:that.Applys.appv_spec_busi_amt,
              base_spec_busi_amt:that.Applys.appv_spec_busi_amt,
              appv_lowr_busi_amt:that.Applys.appv_lowr_busi_amt,
              base_lowr_busi_amt:that.Applys.appv_lowr_busi_amt,
              single_group_flag:that.Applys.single_group_flag,
              is_hf_rela:that.Applys.is_hf_rela,
              is_greenloan_cbrc:that.Applys.is_greenloan_cbrc,
              is_greenloan_hude:that.Applys.is_greenloan_hude,
              is_greenloan_cbrctt:that.Applys.is_greenloan_cbrctt,
              is_buy_service_flag:that.Applys.is_buy_service_flag,
              bljrgj:that.Applys.bljrgj,
              ln_purpose_desc:that.Applys.ln_purpose_desc,
              cl_group_desc:that.Applys.cl_group_desc
            }
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
            .then(res => {
              console.log("mainApplySubmit", res);
              if (res.code === "200") {
                this.submitLoading = false;
                this.$message({
                  type: "success",
                  message: res.message,
                });
              }else {
                MyMessage({
                  message: res.message,
                  type: "error",
                });
              }
            });
        }else{
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    },
    jumpUrl(url){
      const option  = {
        toRequest:{
          url: url,
          method: "get",
          params: {
            appl_id : this.Applys.appl_id, // appid从授信申请信息中获取,子客户的申请id和集团客户的申请id是不同的
            cust_no : this.cParentParams.cust_no // cust_no参数传递
          }
        },
        width: "65%",
        title: "新增",
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.jumpCallBack, option)
      this.$dialog.open(option);
    },
    jsonCallBack(res){
      console.log("jsonCallBack:" + JSON.stringify(res))
      const data = res.data;
      this.initSubCompanyApply(false);
      if (data.gtrantp !== "UPDATE"){
        this.show = false;
        this.getTabInfo(false);
      }
    },
    jumpCallBack(){
      this.initSubCompanyApply(false);
      this.show = false;
      this.getTabInfo(false);
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
    cateClose() {
      this.dialogVisible = false;
    },
    /**
     * 获取tab信息
     * first 是否第一次初始加载页面
     */
    getTabInfo(first) {
      let params = {
        appl_id: this.Applys.appl_id,
        cust_no: this.cParentParams.cust_no,
        servicecode : "ic1132",//交易码
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tabList = res.data;
          this.tabList.forEach((item)=>{
            item.toRequest = this.toRequest;
            item.params = {}
            item.params.group_no = item.group_no;
            item.params.class_cd = item.class_cd;
            item.params.applid = this.Applys.appl_id;
            item.params.cust_no = this.cParentParams.cust_no;
            if (item.class_cd == 'A1'){
              item.title = "公司客户综合授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A2'){
              item.title = "公司客户专项授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A3'){
              item.title = "公司客户低风险授信额度 " + item.group_no;
            }
            item.idField = item.group_no;
          })
          if (this.tabList.length > 0){
            if (first){
              this.activeName = this.tabList[0].idField;
            }else {
              const last = this.tabList.length - 1;
              this.activeName = this.tabList[last].idField;
            }
            this.show = true;
          }
        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>

.custom-common--form{
  padding: 0;
  .el-row .el-col {
    padding-right: 4px;
  }
}

.custom-common--footer {
  text-align: center;
}
</style>
