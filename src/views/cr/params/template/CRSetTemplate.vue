<template>
  <div>
    <div class="todo-top">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$i18ns('模板名称')" prop="temp_name" class="upload-item">
              <el-input v-model="ruleForm.temp_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('模板类型')" prop="temp_type" class="upload-item">
              <el-select
                v-model="ruleForm.temp_type"
                placeholder="请选择模板类型"
                :disabled="true"
              >
                <el-option
                  v-for="item in temp_typeOptions"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('模板种类')" prop="temp_kind" class="upload-item">
              <el-select
                v-model="ruleForm.temp_kind"
                placeholder="请选择模板种类"
                :disabled="true"
              >
                <el-option
                  v-for="item in temp_kindOptions"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('财务因素所占权重比(%)')" prop="fincl_rate" class="upload-item">
              <el-input v-model="ruleForm.fincl_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('非财务因素所占权重比(%)')" prop="unfincl_rate" class="upload-item">
              <el-input v-model="ruleForm.unfincl_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('无效分差')" prop="point_diff" class="upload-item">
              <el-input v-model="ruleForm.point_diff" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('是否使用')" prop="is_valid" class="upload-item">
              <el-select
                v-model="ruleForm.is_valid"
                placeholder="请选择是否使用"
                :disabled="true"
              >
                <el-option
                  v-for="item in is_validOptions"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('有效期期限(月)')" prop="dt_term" class="upload-item">
              <el-input v-model="ruleForm.dt_term" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('版本号')" prop="data_version" class="upload-item" v-if="false"> <!--隐藏版本号-->
              <el-input v-model="ruleForm.data_version" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="c_$params"
            :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        :close-on-click-modal="false"
        :title="$i18ns('审批记录')"
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :append-to-body="true"
      >
        <to-json :params="params" :toUrl="toUrl" ></to-json>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CRSetTemplate",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      ruleForm: {
        appl_id: "",
        routid: "",
        usercd: "",
        // apcode: "", // 意见代码
        // apdesc: "", // 意见描述

      },
      temp_typeOptions : [],
      temp_kindOptions : [],
      is_validOptions : [],
      roadList: [], // 可选节点列表
      urinfoList: [], // 可选节点列表
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        temp_id: "",
        is_valid: ""//模板是否启用
      },
      toUrl: "/views/cr/manage/approval_record.json",
      params: "",
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "first",

      tabList: [
        {
          idField: "first",
          title: this.$i18ns('客户关联'),
          toRequest: {
            url: "/views/cr/params/template/customer/customer_info.json",
            method: "get"
          }
        },
        {
          idField: "tag2",
          title: this.$i18ns('检查项'),
          toRequest: {
            url: "/views/cr/params/template/check/check_info.json",
            method: "get"
          },
        },
        {
          idField: "tag3",
          title: this.$i18ns('财务因素'),
          toRequest: {
            url: "/views/cr/params/template/financial/financial_info.json",
            method: "get"
          }
        },
        {
          idField: "tag4",
          title: this.$i18ns('非财务因素'),
          toRequest: {
            url: "/views/cr/params/template/unfinancial/unfinancial_info.json",
            method: "get"
          }
        },
        {
          idField: "tag5",
          title: this.$i18ns('等级规则'),
          toRequest: {
            url: "/views/cr/params/template/rankRule/rankRule_info.json",
            method: "get"
          },
        },
        {
          idField: "tag6",
          title: this.$i18ns('结果调整规则'),
          toRequest: {
            url: "/views/cr/params/template/resultRule/resultRule_info.json",
            method: "get",
          }
        },
        {
          idField: "tag7",
          title: this.$i18ns('流程评级权限'),
          toRequest: {
            url: "/views/cr/params/template/flow/flow_info.json",
            method: "get",
          }
        }
      ], // tab切换列表
      tabList2: [
        {
          idField: "first",
          title: this.$i18ns('客户关联'),
          toRequest: {
            url: "/views/cr/params/template/customer/customer_infopc.json",
            method: "get"
          }
        },
        {
          idField: "tag4",
          title: this.$i18ns('非财务因素'),
          toRequest: {
            url: "/views/cr/params/template/unfinancial/unfinancial_info.json",
            method: "get"
          }
        },
        {
          idField: "tag5",
          title: this.$i18ns('等级规则'),
          toRequest: {
            url: "/views/cr/params/template/rankRule/rankRule_info.json",
            method: "get"
          },
        },
        {
          idField: "tag6",
          title: this.$i18ns('结果调整规则'),
          toRequest: {
            url: "/views/cr/params/template/resultRule/resultRule_info.json",
            method: "get",
          }
        },
        {
          idField: "tag7",
          title: this.$i18ns('流程评级权限'),
          toRequest: {
            url: "/views/cr/params/template/flow/flow_info.json",
            method: "get",
          }
        }
      ], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    }
  },
  created() {
    this.topInpt();
    this.c_$params.temp_id = this.cParentParams.temp_id; // temp_id参数传递
    this.c_$params.is_valid = this.cParentParams.is_valid; // is_valid参数传递
    this.adjustTempType()
  },
  mounted() {
    this.initTempTypeOptions();
    this.initTempKindOptions();
    this.initYesOrNoOptions();
  },
  methods: {
    // 判断模板类型是否为个人评级，个人评级不需要显示财务因素和非财务因素
    adjustTempType(){
      if(this.ruleForm.temp_type ==="1"){
        this.tabList  = this.tabList2
      }
    },
    /**
     * 头部初始化
     */
    topInpt() {
      this.ruleForm.temp_id = this.cParentParams.temp_id;
      this.ruleForm.temp_name = this.cParentParams.temp_name;
      this.ruleForm.temp_type = this.cParentParams.temp_type;
      this.ruleForm.temp_kind = this.cParentParams.temp_kind;
      this.ruleForm.fincl_rate = this.cParentParams.fincl_rate;
      this.ruleForm.unfincl_rate = this.cParentParams.unfincl_rate;
      this.ruleForm.point_diff = this.cParentParams.point_diff;
      this.ruleForm.is_valid = this.cParentParams.is_valid;
      this.ruleForm.dt_term = this.cParentParams.dt_term;
      this.ruleForm.data_version = this.cParentParams.data_version;
    },
    /**
     * 获取可选节点列表
     */
    getRoadList() {
      let params = {
        instid: this.cParentParams.proc_inst_id,
        tkinid: this.cParentParams.task_inst_id,
        servicecode: "AS_ICMS_BPM_LSROUT",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.roadList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    roadChange(val) {
      let ismanu = "0";
      this.roadList.forEach(item => {
        if (item.route_id === val) {
          ismanu = item.ismanu;
        }
      });
      if (ismanu === "1") {
        this.routidSelect = true;
        if (this.urinfoList.length === 0) {
          this.getUrinfoList(val);
        }
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
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          if (res.data && res.data.appvus) {
            this.urinfoList = res.data.appvus.urinfo;
          }
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 获取tab信息
     */
    getTabInfo() {
      let params = {
        framecd: this.cParentParams.upfmcd,
        servicecode: "ICMSPBTS0081",
      }
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
      //   if (res && res.code === "200") {
      //     this.tabList = res.data;
      //     this.activeName = this.tabList[0].idField;
      //   }
      // }).catch(err => {
      //   console.error(err);
      // })
      this.activeName = this.tabList[0].idField;
    },
    /**
     * 头部提交
     */
    topSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            instid: this.cParentParams.proc_inst_id,
            routid: this.ruleForm.routid,
            taskid: this.cParentParams.task_inst_id,
            // usercd: this.ruleForm.usercd,
            // apcode: this.ruleForm.apcode,
            // apdesc: this.ruleForm.apdesc,
            servicecode: "AS_ICMS_BPM_COMTSK",
          }
          if (this.routidSelect) {
            params.usercd = this.ruleForm.usercd;
          }
          this.submitLoading = true;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$dataBus.doCallBack(this, res);
              this.submitLoading = false;
              this.$message({
                type: "success",
                message: res.message
              })
            }
          }).catch(err => {
            console.error(err);
          });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab (){
      const tags = this.$store.state.pte_tagsNav.tagNavList.filter(item => !this.routeEqual(this.$route, item));
      that.$store.commit("SETTAGNAVLIST", tags);
      this.$store.state.pte_tagsNav.tagNavList = tags;
      this.$router.push('/dashboard')
    },
    routeEqual(route1, route2) {
      return (route1.name === route2.name || route2.name === "1101");
    },
    //加载模板类型
    initTempTypeOptions() {
      console.log("initTempTypeOptionsinitTempTypeOptionsinitTempTypeOptionsinitTempTypeOptionsinitTempTypeOptions");
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "CR_E_TEMP_TYPE";
      request_map["dictKey"] = "CR_E_TEMP_TYPE";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            this.temp_typeOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    //加载模板种类
    initTempKindOptions() {
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "CR_E_TEMP_KIND";
      request_map["dictKey"] = "CR_E_TEMP_KIND";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            this.temp_kindOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    //加载是否
    initYesOrNoOptions() {
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "MS_E_YESORNO";
      request_map["dictKey"] = "MS_E_YESORNO";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            this.is_validOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },

    /**
     * 客户基础资料提交
     */
    bottomSubmit() {
      this.$refs.interForm.validate(valid => {
        if (valid) {
          if (this.interForm.result) {
            let params = {
              applid: this.cParentParams.appl_id,
              custid: this.interForm.custid,
              result: this.interForm.result,
              memo: this.interForm.memo,
              servicecode: "AS_ICMS_CM_FIREAD",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: "操作成功"
                })
              }
            }).catch(err => {
              console.error(err);
            })
          } else {
            this.$message({
              type: "warning",
              message: "请选择审批结果"
            })
          }
        }
      })
    }
  }
}
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
  text-align: center;
  margin-bottom: 20px;
}
</style>
