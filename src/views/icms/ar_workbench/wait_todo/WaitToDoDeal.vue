<template>
  <div>
    <div class="todo-top">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请书编号:" prop="appl_id" class="upload-item">
              <el-input v-model="ruleForm.appl_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主申请人:" prop="cust_name" class="upload-item">
              <el-input v-model="ruleForm.cust_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态:" prop="appl_state" class="upload-item">
              <el-input v-model="ruleForm.appl_state" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期:" prop="appl_date" class="upload-item">
              <el-input v-model="ruleForm.appl_date" :disabled="true"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="可选节点:" prop="route_id" :rules="[{ required: true, message: '请选择可选节点' }]">
              <el-select v-model="ruleForm.route_id" @change="roadChange" placeholder="请选择可选节点">
                <el-option v-for="(item, i) in roadList" :key="i" :label="item.route_name" :value="item.route_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="routidSelect">
            <el-form-item label="下一处理人:" prop="user_id" :rules="[{ required: true, message: '请选择下一处理人' }]">
              <el-select v-model="ruleForm.user_id" placeholder="请选择下一处理人">
                <el-option v-for="(item, i) in urinfoList" :key="i" :label="item.user_id + '' + item.user_name"
                           :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="custom-common--footer">
          <el-button type="primary" size="small" @click="topSubmit" :disabled="submitLoading">提交</el-button>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tree_menu_name" :name="'tab'+item.tree_seq">
          <pte-resolver v-if="activeName === ('tab'+item.tree_seq)" :c-parent-meta="c_$meta" :c-parent-scope="c_$scope"
                        :c-parent-params="c_$params" :to-request="item.toRequest"></pte-resolver>
        </el-tab-pane>
      </el-tabs>
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
      ln_prodcd_cd:"",
      ruleForm: {
        appl_id: "",
        route_id: "",
        user_id: "",
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
        cust_id: "",
        cust_name: "",
        crdlno: "",
        prod_cd: "",
        margin_ctr_ppsl_id: "",
      },

      activeName: "first",
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.getHeadInfo();
    this.initOptions();
    this.getRoadList(); // 获取可选节点列表
    this.getTabInfo(); // 获取tab信息
    this.c_$params.applid = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.apply_no = this.cParentParams.appl_id; // apply_no参数传递
    this.c_$params.cust_id = this.cParentParams.cust_id; // cust_id参数传递
    this.c_$params.cust_name = this.cParentParams.cust_name;
    this.c_$params.prod_cd = this.cParentParams.prod_cd;//业务产品号
    this.c_$params.margin_ctr_ppsl_id = this.cParentParams.margin_ctr_ppsl_id;
    this.c_$params.wf_inst_id = this.cParentParams.wf_inst_id;
    this.c_$params.temp_type = this.cParentParams.temp_type;//信用评级类型
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
        appId : this.cParentParams.appId,
        task_inst_id: this.cParentParams.task_inst_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            // this.c_$params.prod_cd = res.data.prod_cd;
            // that.c_$params.crdlno= res.data.crdlno;//额度编号
            // that.ruleForm.applno =  res.data.applno;//授信编号
            // that.c_$params.crdlno = res.data.crdlno;//额度编号
            this.c_$params.reserve1 = res.data.reserve1;//预留字段1
            this.c_$params.reserve2 = res.data.reserve2;//预留字段2
            this.c_$params.reserve3 = res.data.reserve3;//预留字段3
            this.c_$params.reserve4 = res.data.reserve4;//预留字段4
            this.c_$params.reserve5 = res.data.reserve5;//预留字段5
            this.ruleForm.appl_id = res.data.appl_id;
            this.ruleForm.cust_name = res.data.cust_name;
            this.ruleForm.cust_id = res.data.cust_id;
            this.ruleForm.appl_state = res.data.appl_state;
            this.ruleForm.appl_date = res.data.appl_date;
            this.ruleForm.brch_cd = res.data.brch_cd;
            this.ruleForm.wf_inst_id = res.data.wf_inst_id;
            this.ruleForm.task_inst_id = res.data.task_inst_id;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    initOptions() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "BPM_E_APPL_STATE";
      request_map["dictKey"] = "BPM_E_APPL_STATE";
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
         appId : this.cParentParams.appId
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
    roadChange(val) {
      let ismanu = "0";
      this.roadList.forEach((item) => {
        if (item.route_id === val) {
          ismanu = item.next_is_manu;
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
    getUrinfoList(route_id) {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        route_id: route_id,
        cur_user_id: JSON.parse(localStorage.user_info).userCode, // userCode
        cur_brch_cd: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "bpm1004",
        appId : this.cParentParams.appId
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
        appId : this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log(res.data, "======================");
            let reqList = res.data;
            let showList = [];
            for(let i=0;i<reqList.length;i++){
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
            if(this.c_$params.temp_type === "1"){
              for(var i=0;i<this.tabList.length;i++){
                if (this.tabList[i].tree_menu_name === "财务因素"){
                  this.tabList.splice(i,1)
                }
              }
            }
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
            appId : this.cParentParams.appId
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
              }else{
                this.$message({
                  type: "error",
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
