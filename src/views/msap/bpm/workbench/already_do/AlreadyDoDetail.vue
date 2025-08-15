<template>
  <div class="container_wrap">
    <div class="todo-top">
      <el-collapse v-model="activeNames">
        <el-collapse-item class="collapse-item" name="top">
          <template slot="title">
            <i class="header-icon el-icon-info"></i><em></em>{{ $i18ns('bpmmodel.application_info') }}
          </template>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$i18ns('L0501.Application-number')" prop="appl_id" class="upload-item">
                  <el-input v-model="ruleForm.appl_id" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('L0501.principal-Applicant')" prop="cust_name" class="upload-item">
                  <el-input v-model="ruleForm.cust_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('L0501.application-status')" prop="appl_state" class="upload-item">
                  <el-select v-model="ruleForm.appl_state" :disabled="true">
                    <el-option v-for="(item, i) in statusList" :key="i" :label="item.dictName" :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('L0501.application-date')" prop="appl_date" class="upload-item">
                  <el-input v-model="ruleForm.appl_date" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="custom-common--footer">
              <el-button size="small" type="primary" class="submit-item--btn"
                @click="toViewLog">{{ $i18ns('L0501.viewing-process-validation-logs') }}</el-button>
              <el-button size="small" type="primary" class="submit-item--btn"
                @click="toViewAppv">{{ $i18ns('L0501.view-approval-records') }}</el-button>
              <el-button size="small" type="primary"  class="submit-item--btn" v-if="bpm_recallable==='1'"   @click="recallBpm">{{ $i18ns('bpmmodel.bpm_recallable') }}
              </el-button>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item class="collapse-item collapse-item-bottom" name="bottom">
          <el-tabs v-model="activeName"  type="border-card">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tree_menu_name"
              :name="'tab' + item.tree_seq">
              <pte-resolver v-if="activeName === ('tab' + item.tree_seq)" :c-parent-meta="c_$meta"
                :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"></pte-resolver>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import { List } from 'gojs';

export default {
  name: "WaitToDoDeal",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      ln_prodcd_cd: "",
      ruleForm: {
        appl_id: "",
        route_id: "",
        user_id: "",
      },
      roadList: [], // 可选节点列表
      statusList: [],
      urinfoList: [], // 可选节点列表
      activeNames: ["top", "bottom"],//折叠面板
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
        cust_id: "",
        cust_no: "",
        cust_name: "",
        crdlno: "",
        prod_cd: "",
        margin_ctr_ppsl_id: "",
        apply_type: "", //产品中申请类型,
        parent_apply_id: ""//父级申请编号
      },

      activeName: "first",
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
      bpm_recallable:""
    };
  },
  created() {
    //this.getHeadInfo();
    this.topInpt();
    this.getDictList("BPM_E_APPL_STATE", "statusList");
    // this.getRoadList(); // 获取可选节点列表
    this.getTabInfo(); // 获取tab信息
  
    this.c_$params.applid = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.apply_no = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.cust_id = this.isNull(this.cParentParams.cust_id) ? this.cParentParams.cust_no : this.cParentParams.cust_id; // cust_id参数传递
    this.c_$params.cust_no = this.cParentParams.cust_no; // cust_no参数传递
    this.c_$params.cust_name = this.cParentParams.cust_name;
    this.c_$params.prod_cd = this.cParentParams.prod_cd;//业务产品号
    this.c_$params.busi_type = this.cParentParams.busi_type;//业务类型
    this.c_$params.margin_ctr_ppsl_id = this.cParentParams.margin_ctr_ppsl_id;
    this.c_$params.wf_inst_id = this.cParentParams.wf_inst_id;
    this.c_$params.part_project_no = this.cParentParams.part_project_no;
    this.c_$params.part_project_no = this.cParentParams.part_project_no;
    this.c_$params.project_template_no = this.cParentParams.project_template_no;
    this.c_$params.tranType = this.cParentParams.tranType;
    this.c_$params.project_template_version = this.cParentParams.project_template_version;
    this.c_$params.version = this.cParentParams.version;
    this.c_$params.part_no = this.cParentParams.reserve1;
   
    // 进件中心查产品申请类型
    if (this.cParentParams.appId === 'icmsOnl') {
      this.getBuisApplyInfo();//获取业务申请信息
      this.getApplyType();
   
    }
  },
  methods: {
    /**
     * 获取头部信息
     */
    getHeadInfo() {
      let that = this;
      let params = {
        appl_id: this.cParentParams.appl_id,
        servicecode: "bpm1014",
        appId: this.cParentParams.appId,
        task_inst_id: this.cParentParams.task_inst_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.c_$params.reserve1 = res.data.reserve1;//预留字段1
            this.c_$params.reserve2 = res.data.reserve2;//预留字段2
            this.c_$params.reserve3 = res.data.reserve3;//预留字段3
            this.c_$params.reserve4 = res.data.reserve4;//预留字段4
            this.c_$params.reserve5 = res.data.reserve5;//预留字段5
            this.c_$params.prod_cd = res.data.prod_cd;
            that.ruleForm.cust_name = res.data.cust_name;//客户名称
            that.c_$params.crdlno = res.data.crdlno;//额度编号
            that.ruleForm.applno = res.data.applno;//授信编号
            that.c_$params.crdlno = res.data.crdlno;//额度编号
            this.c_$params.part_project_no = this.cParentParams.part_project_no;
            this.c_$params.project_template_no = res.data.reserve3;
            this.c_$params.tranType = this.cParentParams.tranType;
            this.c_$params.project_template_version = this.cParentParams.project_template_version;
            this.c_$params.version = res.data.reserve5;
            this.c_$params.part_no = this.cParentParams.reserve1;
            this.c_$params.bpm_recallable = res.data.bpm_recallable;//是否可撤回
            this.c_$params.sign_tran_flag = res.data.sign_tran_flag;//是否可转签
            this.c_$params.sign_cancel_flag = res.data.sign_cancel_flag;//是否可取消签收
            this.bpm_recallable = res.data.bpm_recallable;//是否可撤回
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取产品中申请类型
     */
    getApplyType() {
      let that = this;
      let params = {
        apply_no: this.cParentParams.appl_id,
        servicecode: "ar0705"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.c_$params.apply_type = res.data.apply_type;
            console.log("当前业务申请信息", res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
        /**
     * 撤回
     */
     recallBpm() {
       this.$confirm(this.$i18ns('bpmmodel.bpm_recallable_tip'), this.$i18ns('watchInfo'), {
          confirmButtonText: this.$i18ns('confirm'),
          cancelButtonText: this.$i18ns('confirmCancel'),
          type: 'warning'
        }).then(() => {
          let that = this;
          let params = {
            wf_inst_id: that.cParentParams.wf_inst_id,
            servicecode: "bpm1017",
            appId:that.cParentParams.appId
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
              if (res && res.code === "200") {
                this.bpm_recallable='0'
                this.$message({
                      type: "success",
                      message: res.message,
                    });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$i18ns('cancelMsg')
          });          
        });
    },
    /**
     * 头部初始化
     */
    topInpt() {
      this.ruleForm.appl_id = this.cParentParams.appl_id;
      this.ruleForm.cust_name = this.cParentParams.cust_name;
      this.ruleForm.cust_id = this.cParentParams.cust_id;
      this.ruleForm.appl_state = this.cParentParams.appl_state;
      this.ruleForm.appl_date = this.cParentParams.system_date;
      this.ruleForm.brch_cd = this.cParentParams.brch_cd;
      this.ruleForm.wf_inst_id = this.cParentParams.wf_inst_id;
      this.ruleForm.task_inst_id = this.cParentParams.task_inst_id;
    },
    initOptions() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "E_appl_stateATUS";
      request_map["dictKey"] = "E_appl_stateATUS";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            let options = response.data
            console.log('initOptions', response.data);
            for (let i in options) {
              if (options[i].dictId === that.ruleForm.appl_state) {
                that.ruleForm.appl_state = options[i].dictName;
                return;
              }
            }
          }
        });
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log("下拉列表" + JSON.stringify(this[listKey]));
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取可选节点列表
     */
    mounted() {
      this.c_$params.applid = this.cParentParams.appl_id
        ? this.cParentParams.appl_id
        : this.$dataBus.getCurrentcParams(this).data_appl_id; // appid参数传递
      this.c_$params.cust_id = this.cParentParams.cust_id
        ? this.cParentParams.cust_id
        : this.$dataBus.getCurrentcParams(this).data_cust_id; //cust_id参数传递
    },
    getRoadList() {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        task_inst_id: this.cParentParams.task_inst_id,
        servicecode: "bpm1003",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.roadList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getBuisApplyInfo() {
      let that = this;
      let params = {
        servicecode: "ar0705",
        apply_no: this.cParentParams.appl_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.c_$params.parent_apply_id = res.data.parent_apply_id;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    roadChange(val) {
      let ismanu = "N";
      this.roadList.forEach((item) => {
        if (item.route_id === val) {
          ismanu = item.next_is_manu;
        }
      });
      if (ismanu === "Y") {
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
    getUrinfoList(route_id) {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        route_id: route_id,
        cur_user_id: JSON.parse(localStorage.user_info).userCode, // userCode
        cur_brch_cd: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "bpm1004",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            if (res.data && res.data.candidate) {
              this.urinfoList = res.data.candidate;
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
        frame_cd: this.cParentParams.frame_cd,
        servicecode: "bpm0048",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log(res.data, "======================");
            let reqList = res.data;
            let showList = [];
            for (let i = 0; i < reqList.length; i++) {
              let node = new Object;
              node.tree_seq = reqList[i].tree_seq;
              node.tree_menu_name = reqList[i].tree_menu_name;
              let toReq = new Object;
              toReq.url = reqList[i].vue_path;
              node.toRequest = toReq;
              showList.push(node);
            }
            this.tabList = showList;
            this.activeName = "tab" + this.tabList[0].tree_seq;
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
            wf_inst_id: this.cParentParams.wf_inst_id,
            route_id: this.ruleForm.route_id,
            task_id: this.cParentParams.task_inst_id,
            servicecode: "bpm1006",
            appId: this.cParentParams.appId
          };
          if (this.routidSelect) {
            params.next_user_id = this.ruleForm.user_id;
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
    * 查看流程校验日志
    */
    toViewLog() {

      this.$dialog.open({
        that: this,
        title: "查看流程校验日志",
        openType: "dialog",
        toRequest: {
          url: "/views/ismt/ct/busiAuth/authOperaLog/authb_system_log_sel.json",
          method: "get",
          params: {
            "appId": this.cParentParams.appId,
            "busi_seq": this.cParentParams.appl_id
          }
        }
      });
    },
    /**
     * 查看审批记录
     */
    toViewAppv() {

      this.$dialog.open({
        that: this,
        title: "查看审批记录",
        openType: "dialog",
        toRequest: {
          url: "/views/msap/bpm/workbench/wait_todo/workbench_appv_view.json",
          method: "get",
          params: {
            "appId": this.cParentParams.appId,
            "wf_inst_id": this.cParentParams.wf_inst_id
          }
        }
      });
    },
    isNull(params) {
      if (params === "" || params === null || params === undefined) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
.container_wrap {
  height: 100%;
}

.todo-top {
  border-bottom: 1px solid #e3e8f5;
  height: 100%;
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

.collapse-item {
  border: 0.996px;
  padding: 10px 10px 0 10px;
}

.collapse-item-bottom {
  height: 100%;
  /deep/ .el-collapse-item__wrap {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    .el-collapse-item__content {
      .el-tabs {
        .el-tabs__content {
          padding: 12px;
        }
      }
    }
  }
}
</style>
