<template>
  <div>
    <div class="todo-top">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="custom-common--form" label-width="240px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="upload-item" label="申请书编号:" prop="appl_id">
              <el-input v-model="ruleForm.appl_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="主申请人:" prop="custna">
              <el-input v-model="ruleForm.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="申请状态:" prop="applst">
              <el-input v-model="ruleForm.applst" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="申请日期:" prop="appldt">
              <el-input v-model="ruleForm.appldt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.applno !== ''" :span="8">
            <el-form-item class="upload-item" label="授信编号:" prop="applno">
              <el-input v-model="ruleForm.applno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item label="Branch Code:" prop="brch_cd" class="upload-item">
              <el-input v-model="ruleForm.brch_cd" :disabled="true"></el-input>
            </el-form-item>
          </el-col>-->
          <!--<el-col :span="12">
            <el-form-item label="意见代码:" prop="apcode" class="upload-item">
              <el-input v-model="ruleForm.apcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="意见描述:" prop="apdesc" class="upload-item">
              <el-input v-model="ruleForm.apdesc"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.mytitle" :name="item.idField">
          <pte-resolver v-if="activeName === item.idField" :c-parent-meta="c_$meta" :c-parent-params="c_$params"
                        :c-parent-scope="c_$scope" :to-request="item.toRequest"></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "AlreadyDoDetail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      ln_prodcd_cd:"",
      ruleForm: {
        appl_id: "",
        routid: "",
        usercd: "",
        applno: "",//授信编号
        // apcode: "", // 意见代码
        // apdesc: "", // 意见描述
      },
      roadList: [], // 可选节点列表

      urinfoList: [], // 可选节点列表
      imageForm: {
        // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "", // 身份证反面
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        applid: "",
        appl_id: "",
        custid: "",
        custna: "",
        crdlno: "",
        ln_prod_cd: "",
        margin_ctr_ppsl_id: ""
      },
      toRequest: {
        url: "@InternetVerification",
        method: "get",
      },
      activeName: "first",
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.getHeadInfo();
    this.topInpt();
    this.initOptions();
    this.getTabInfo(); // 获取tab信息
    this.c_$params.applid = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.custid = this.cParentParams.custid; // custid参数传递
    this.c_$params.custna = this.cParentParams.custna;
    this.c_$params.ln_prod_cd = this.cParentParams.ln_prod_cd;//业务产品号
    this.c_$params.margin_ctr_ppsl_id = this.cParentParams.margin_ctr_ppsl_id;
     this.c_$params.wf_inst_id = this.cParentParams.wf_inst_id;
  },
  methods: {
    /**
     * 获取头部信息
     */
    getHeadInfo() {
      let that = this;
      let params = {
        applid: this.cParentParams.appl_id,
        servicecode: "cquery",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.c_$params.ln_prod_cd = res.data.prodcd;
            that.c_$params.crdlno= res.data.crdlno;//额度编号
            that.ruleForm.applno =  res.data.applno;//授信编号
            that.c_$params.crdlno = res.data.crdlno;//额度编号
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 头部初始化
     */
    topInpt() {
      this.ruleForm.appl_id = this.cParentParams.appl_id;
      this.ruleForm.custna = this.cParentParams.custna;
      this.ruleForm.custid = this.cParentParams.custid;
      this.ruleForm.applst = this.cParentParams.applst;
      this.ruleForm.appldt = this.cParentParams.appldt;
      this.ruleForm.brch_cd = this.cParentParams.brch_cd;
      this.ruleForm.instid = this.cParentParams.proc_inst_id;
      this.ruleForm.taskid = this.cParentParams.task_inst_id;
    },
    initOptions() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "E_APPLSTATUS";
      request_map["dictKey"] = "E_APPLSTATUS";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            let options = response.data
            console.log('initOptions', response.data);
            for (let i in options) {
              if (options[i].dictId === that.ruleForm.applst) {
                that.ruleForm.applst = options[i].dictName;
                return;
              }
            }
          }
        });
    },
    /**
     * 获取可选节点列表
     */
    mounted() {
      this.c_$params.applid = this.cParentParams.appl_id
        ? this.cParentParams.appl_id
        : this.$dataBus.getCurrentcParams(this).data_appl_id; // appid参数传递
      this.c_$params.custid = this.cParentParams.custid
        ? this.cParentParams.custid
        : this.$dataBus.getCurrentcParams(this).data_custid; //custid参数传递
    },
    roadChange(val) {
      let ismanu = "0";
      this.roadList.forEach((item) => {
        if (item.route_id === val) {
          ismanu = item.ismanu;
        }
      });
      if (ismanu === "1") {
        this.routidSelect = true;
        // if (this.urinfoList.length === 0) {
        this.getUrinfoList(val);
        //}
      } else {
        this.routidSelect = false;
      }
    },
    /**
     * 获取审批人信息
     */
    getUrinfoList(routId) {
      let params = {
        instid: this.cParentParams.proc_inst_id,
        routid: routId,
        cruser: JSON.parse(localStorage.user_info).userCode, // userCode
        crorgg: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "ICMSBPMTS0015",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            if (res.data && res.data.appvus) {
              this.urinfoList = res.data.appvus.urinfo;
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取tab信息
     */
    getTabInfo() {
      let params = {
        framecd: this.cParentParams.upfmcd + "2",
        servicecode: "ICMSPBTS0081",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log(res.data, "======================");
            this.tabList = res.data;
            this.activeName = this.tabList[0].idField;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 头部提交
     */
    topSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            instid: this.cParentParams.proc_inst_id,
            routid: this.ruleForm.routid,
            taskid: this.cParentParams.task_inst_id,
            // usercd: this.ruleForm.usercd,
            // apcode: this.ruleForm.apcode,
            // apdesc: this.ruleForm.apdesc,
            servicecode: "AS_ICMS_BPM_COMTSK",
          };
          if (this.routidSelect) {
            params.usercd = this.ruleForm.usercd;
          }
          this.submitLoading = true;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
              if (res && res.code === "200") {
                this.$dataBus.doCallBack(this, res);
                this.submitLoading = false;
                this.$message({
                  type: "success",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.submitLoading = false;
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      const tags = this.$store.state.pte_tagsNav.tagNavList.filter(
        (item) => !this.routeEqual(this.$route, item)
      );
      this.$store.commit("SETTAGNAVLIST", tags);
      this.$store.state.pte_tagsNav.tagNavList = tags;
      this.$router.push("/dashboard");
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    },
    /**
     * 客户基础资料提交
     */
    bottomSubmit() {
      this.$refs.interForm.validate((valid) => {
        if (valid) {
          if (this.interForm.result) {
            let params = {
              applid: this.cParentParams.appl_id,
              custid: this.interForm.custid,
              result: this.interForm.result,
              memo: this.interForm.memo,
              servicecode: "AS_ICMS_CM_FIREAD",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
              .then((res) => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: "操作成功",
                  });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            this.$message({
              type: "warning",
              message: "请选择审批结果",
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
</style>
