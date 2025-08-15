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
            <el-form-item label="主申请人:" prop="custna" class="upload-item">
              <el-input v-model="ruleForm.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态:" prop="applst" class="upload-item">
              <el-select v-model="ruleForm.applst" placeholder="" :disabled="true">
                <el-option
                  v-for="(item, i) in applstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期:" prop="appldt" class="upload-item">
              <el-input v-model="ruleForm.appldt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item label="Branch Code:" prop="brch_cd" class="upload-item">
              <el-input v-model="ruleForm.brch_cd" :disabled="true"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="可选节点:" prop="routid" :rules="[{required: true, message: '请选择可选节点'}]">
              <el-select v-model="ruleForm.routid" @change="roadChange" placeholder="请选择可选节点">
                <el-option
                 v-for="(item, i) in roadList"
                 :key="i"
                 :label="item.route_name"
                 :value="item.route_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-show="routidSelect">
             <el-form-item label="下一处理人:" prop="usercd" :rules="[{required: usercdRules, message: '请选择下一处理人'}]">

              <el-select v-model="ruleForm.usercd" placeholder="请选择下一处理人">
                <el-option
                  v-for="(item, i) in urinfoList"
                  :key="i"
                  :label="item.usercd + '' + item.userna"
                  :value="item.usercd">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
        <el-row class="custom-common--footer">
          <el-button type="primary" size="small" @click="topSubmit">提交</el-button>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.mytitle" :name="item.idField">
          <pte-resolver
            v-if="activeName === item.idField"
           :c-parent-meta="c_$meta"
           :c-parent-scope="c_$scope"
           :c-parent-params="c_$params"
           :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

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
      ruleForm: {
        appl_id: "",
        routid: "",
        usercd: ""

    // apcode: "", // 意见代码
        // apdesc: "", // 意见描述
      },
      roadList: [], // 可选节点列表
      urinfoList: [], // 可选节点列表
      imageForm: { // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "", // 身份证反面
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        applid: "",
        custid:""
      },
      toRequest: {
        url: "@dhInternetVerification",
        method: "get"
      },
      activeName: "first",
      isMaun: "0",
      tabList: [], // tab切换列表
      routidSelect: false,
      usercdRules: false,
      applstList: [] // 申请状态数据字典列表

  }
  },
  created() {
    this.$dataBus.updataCurrentDataBus(this)
    this.topInpt();
    this.getRoadList(); // 获取可选节点列表
    this.getTabInfo(); // 获取tab信息
    this.getDictList("BPM_E_ROUTE_TYPE", "applstList"); // 获取申请状态数据字典
  },
  mounted() {
    this.c_$params.applid = (this.cParentParams.appl_id ? this.cParentParams.appl_id : this.$dataBus.getCurrentcParams(this).data_appl_id); // appid参数传递
    this.c_$params.custid = (this.cParentParams.custid ? this.cParentParams.custid : this.$dataBus.getCurrentcParams(this).data_custid);
  },
  methods: {
    /**
     * 头部初始化
     */
    topInpt() {
      this.ruleForm.appl_id = (this.cParentParams.appl_id ? this.cParentParams.appl_id : this.$dataBus.getCurrentcParams(this).data_appl_id);
      this.ruleForm.custna = (this.cParentParams.creator ? this.cParentParams.creator : this.$dataBus.getCurrentcParams(this).data_creator);
      this.ruleForm.applst = (this.cParentParams.applst ? this.cParentParams.applst : this.$dataBus.getCurrentcParams(this).data_applst);
      this.ruleForm.appldt = (this.cParentParams.appldt ? this.cParentParams.appldt : this.$dataBus.getCurrentcParams(this).data_appldt);
      this.ruleForm.brch_cd = (this.cParentParams.brch_cd ? this.cParentParams.brch_cd : this.$dataBus.getCurrentcParams(this).data_brch_cd);
      this.ruleForm.instid = (this.cParentParams.proc_inst_id ? this.cParentParams.proc_inst_id : this.$dataBus.getCurrentcParams(this).data_proc_inst_id);
      this.ruleForm.taskid = (this.cParentParams.task_inst_id ? this.cParentParams.task_inst_id : this.$dataBus.getCurrentcParams(this).data_task_inst_id);
    },
    /**
     * 获取可选节点列表
     */
    getRoadList() {
      let params = {
        instid: (this.cParentParams.proc_inst_id ? this.cParentParams.proc_inst_id : this.$dataBus.getCurrentcParams(this).data_proc_inst_id),
        tkinid: (this.cParentParams.task_inst_id ? this.cParentParams.task_inst_id :this.$dataBus.getCurrentcParams(this).data_task_inst_id),
        servicecode: "AS_PLMS_BPM_LSROUT",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.roadList = res.data;
        }
      }).catch(err => {
        console.error(err);
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
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    roadChange(val) {
      this.roadList.forEach(item => {
        if (item.route_id === val) {
          this.isMaun = item.ismanu;
        }
      });
      if (this.isMaun  === "1") {
        this.getUrinfoList(val);
        this.routidSelect = true;
        this.usercdRules = true;

      }else{
        this.urinfoList = [];
        this.routidSelect = false;
        this.usercdRules = false;
      }
    },
    /**
     * 获取审批人信息
     */
    getUrinfoList(routId) {
      let params = {
        instid: (this.cParentParams.proc_inst_id ? this.cParentParams.proc_inst_id : this.$dataBus.getCurrentcParams(this).data_proc_inst_id),
        routid: routId,
        cruser: JSON.parse(localStorage.user_info).userCode, // userCode
        crorgg: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "PLMSBPMTS0015",
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
        framecd: (this.cParentParams.upfmcd ? this.cParentParams.upfmcd : this.$dataBus.getCurrentcParams(this).data_upfmcd),
        servicecode: "PLMSPBTS0081",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tabList = res.data;
          this.activeName = this.tabList[0].idField;
        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 头部提交
     */
    topSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            instid: (this.cParentParams.proc_inst_id ? this.cParentParams.proc_inst_id : this.$dataBus.getCurrentcParams(this).data_proc_inst_id),
            routid: this.ruleForm.routid,
            taskid: (this.cParentParams.task_inst_id ? this.cParentParams.task_inst_id : this.$dataBus.getCurrentcParams(this).data_task_inst_id),
            usercd: this.ruleForm.usercd,
            servicecode: "AS_PLMS_BPM_COMTSK",
          }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$dataBus.doCallBack(this, res);
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
    /**
     * 客户基础资料提交
     */
    bottomSubmit() {
      this.$refs.interForm.validate(valid => {
        if (valid) {
          if (this.interForm.result) {
            let params = {
              applid: (this.cParentParams.appl_id ? this.cParentParams.appl_id : this.$dataBus.getCurrentcParams(this).data_appl_id),
              custid: this.interForm.custid,
              result: this.interForm.result,
              memo: this.interForm.memo,
              servicecode: "AS_PLMS_CM_FIREAD",
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
}
</style>
