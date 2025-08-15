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
            <el-form-item class="upload-item" label="基准币种" prop="base_ccy">
              <el-select v-model="Applys.base_ccy" :disabled="true">
                <el-option v-for="item in ccy_cdList" :key="item.dictId" :label="item.dictName"
                           :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :rules="[{ required: true, message: '此项为必填项' }]" class="upload-item" label="主授信币种" prop="ccy_cd">
              <el-select v-model="Applys.ccy_cd">
                <el-option v-for="item in ccy_cdList" :key="item.dictId" :label="item.dictName"
                           :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="授信总金额" prop="appv_busi_amt">
              <el-input v-model="Applys.appv_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="授信总金额(折基准币种)" prop="base_busi_amt">
              <el-input v-model="Applys.appv_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="授信汇率" prop="exc_rate">
              <el-input v-model="Applys.exc_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="综合授信金额" prop="appv_synt_busi_amt">
              <el-input v-model="Applys.appv_synt_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="综合授信金额(折基准币种)" prop="base_synt_busi_amt">
              <el-input v-model="Applys.appv_synt_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :rules="[{ required: true, message: '此项为必填项' }]" class="upload-item" label="授信额度有效期(月)" prop="appv_tnr">
              <el-input v-model="Applys.appv_tnr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="专项授信金额" prop="appv_spec_busi_amt">
              <el-input v-model="Applys.appv_spec_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="专项授信金额(折基准币种)" prop="base_spec_busi_amt">
              <el-input v-model="Applys.appv_spec_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="upload-item" label="低风险授信金额" prop="appv_lowr_busi_amt">
              <el-input v-model="Applys.appv_lowr_busi_amt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="低风险授信金额(折基准币种)" prop="base_lowr_busi_amt">
              <el-input v-model="Applys.appv_lowr_busi_amt" :disabled="true"></el-input>
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
          :params="item.params" :toUrl="item.toRequest" @jsonCallBack="jsonCallBack"
        ></to-json>
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="group_apply_card" type="card">
      <to-json
        :params="c_$params" :toUrl="toCreditAllocationUrl"
      ></to-json>
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
        cust_no: "",
        cl_no: "",
        base_ccy: "",
        ccy_cd: "",
        exc_rate: "1",
        appv_tnr: "",
        appv_busi_amt: "",
        base_busi_amt: "",
        appv_synt_busi_amt: "",
        base_synt_busi_amt: "",
        appv_spec_busi_amt: "",
        base_spec_busi_amt: "",
        appv_lowr_busi_amt: "",
        base_lowr_busi_amt: ""
      },
      cateForm: {
        appl_id: "",
        cust_no: "",
        class_cd: "",
        group_ccy_cd: "",
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
      toRequest: "/views/us/usManager/creditApply/group_customer_main_apply.json",
      ccy_cdList: [],//币种类型字典
      class_cdList: [], //分类类型字典
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.initGroupCompanyApply();//初始化查询集团授信主申请信息
    this.getDictList("MS_CURRENCY", "ccy_cdList");//初始化币种字典

    this.cateForm.appl_id = this.cParentParams.applid; // appid参数传递
    this.cateForm.cust_no = this.cParentParams.cust_no; // cust_no参数传递

    this.c_$params.applid = this.cParentParams.applid; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.applid; // appid参数传递
    this.c_$params.cust_no = this.cParentParams.cust_no; // appid参数传递
    this.c_$params.proc_inst_id = this.cParentParams.proc_inst_id; // appid参数传递     res.data.applys.procinstid
    this.getTabInfo(true);
    this.getDictList("E_CATE_CLASS_CD", "class_cdList"); // 初始化贷款形态数据字典
  },
  methods: {
    initGroupCompanyApply() {
      let that = this;
      let request_map = {
        servicecode: "qrcrin",
        appl_id: that.cParentParams.applid
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
        .then(res => {
          console.log("initGroupCompanyApply", res);
          if (res.code === "200") {
            console.log("===zmh==" + res.data.cust_no);
            that.Applys.cust_no = res.data.cust_no;
            that.Applys.cl_no = res.data.cl_no;
            that.Applys.base_ccy = res.data.base_ccy;
            that.Applys.ccy_cd = res.data.ccy_cd;
            that.Applys.exc_rate = res.data.exc_rate;
            that.Applys.appv_tnr = res.data.appv_tnr;
            that.Applys.appv_busi_amt = res.data.appv_busi_amt;
            that.Applys.base_busi_amt = res.data.base_busi_amt;
            that.Applys.appv_synt_busi_amt = res.data.appv_synt_busi_amt;
            that.Applys.base_synt_busi_amt = res.data.base_synt_busi_amt;
            that.Applys.appv_spec_busi_amt = res.data.appv_spec_busi_amt;
            that.Applys.base_spec_busi_amt = res.data.base_spec_busi_amt;
            that.Applys.appv_lowr_busi_amt = res.data.appv_lowr_busi_amt;
            that.Applys.base_lowr_busi_amt = res.data.base_lowr_busi_amt;
          }
        })
    },
    mainApplySubmit() {
      this.$refs.ruleForm.validate((valid) => {
         if (valid) {
          let that = this;
          let request_map = {
            servicecode: "upcrin",
            creditType: "GROUP",
            appl_id: that.cParentParams.applid,
            detail: {
              cust_no: that.Applys.cust_no,
              cl_no: that.Applys.cl_no,
              base_ccy: that.Applys.base_ccy,
              ccy_cd: that.Applys.base_ccy,
              exc_rate: that.Applys.exc_rate,
              appv_tnr: that.Applys.appv_tnr,
              appv_busi_amt: that.Applys.appv_busi_amt,
              base_busi_amt: that.Applys.appv_busi_amt,
              appv_synt_busi_amt: that.Applys.appv_synt_busi_amt,
              base_synt_busi_amt: that.Applys.appv_synt_busi_amt,
              appv_spec_busi_amt: that.Applys.appv_spec_busi_amt,
              base_spec_busi_amt: that.Applys.appv_spec_busi_amt,
              appv_lowr_busi_amt: that.Applys.appv_lowr_busi_amt,
              base_lowr_busi_amt: that.Applys.appv_lowr_busi_amt
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
              } else {
                MyMessage({
                  message: res.message,
                  type: "error",
                });
              }
            });
         }else {
           this.$message({
            type: "warning",
            message: "校验不通过",
          });
         }
      });
    },
    jumpUrl(url) {
      const option = {
        toRequest: {
          url: url,
          method: "get",
          params: {
            appl_id: this.cParentParams.applid, // appid参数传递
            cust_no: this.cParentParams.cust_no // cust_no参数传递
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
      this.initGroupCompanyApply(false);
      if (data.gtrantp !== "UPDATE"){
        this.show = false;
        this.getTabInfo(false);
      }
    },
    jumpCallBack(){
      this.initGroupCompanyApply(false);
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
     * 获取table信息
     */
    getTabInfo(first) {
      let params = {
        appl_id: this.cParentParams.applid,
        cust_no: this.cParentParams.cust_no,
        servicecode: "ic1132",//交易码
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tabList = res.data;
          this.tabList.forEach((item) => {
            item.toRequest = this.toRequest;
            item.params = {}
            item.params.group_no = item.group_no;
            item.params.class_cd = item.class_cd;
            item.params.applid = this.cParentParams.applid;
            item.params.cust_no = this.cParentParams.cust_no;
            if (item.class_cd == 'A1') {
              item.title = "公司客户综合授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A2') {
              item.title = "公司客户专项授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A3') {
              item.title = "公司客户低风险授信额度 " + item.group_no;
            }
            item.idField = item.group_no;
          })
          if (this.tabList.length > 0) {
            if (first){
              this.activeName = this.tabList[0].idField;
            }else {
              const last = this.tabList.length - 1;
              this.activeName = this.tabList[last].idField;
            }
            this.show = true;
          }
          console.log("tableList列表" + JSON.stringify(this.tabList));
        }
      }).catch(err => {
        console.error(err);
      })
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    }
  },
};
</script>
<style lang="less" scoped>
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 4px;
  }
}
.custom-common--footer {
  text-align: center;
}

.group_apply_card {
  margin-top: 8px;
}

</style>
