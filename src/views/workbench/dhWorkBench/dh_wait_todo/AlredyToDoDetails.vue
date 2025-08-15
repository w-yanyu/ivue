<template>
  <div>
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.mytitle" :name="item.idField">
        <pte-resolver
         :c-parent-meta="c_$meta"
         :c-parent-scope="c_$scope"
         :c-parent-params="c_$params"
         :to-request="item.toRequest"
        ></pte-resolver>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "AlredyToDoDetails",
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
      activeName: "",
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
     * 获取tab信息
     */
    getTabInfo() {
      let params = {
        framecd: (this.cParentParams.refmcd ? this.cParentParams.refmcd : this.$dataBus.getCurrentcParams(this).data_refmcd),
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
  }
}
</script>
<style lang="less" scoped>
.todo-top {
  width: 100%;
  min-height: 200px;
  position: absolute;
  bottom: 6px;
  background: #fff;
  box-shadow: 0px -2px 2px rgba(204,204,204,0.5);
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
  padding: 10px 0;
}
[c-module="dhWaitToDoDeal"] {
  height: 100%;
  position: relative;
  .el-tabs {
    height: calc(100% - 204px);
    overflow-x: scroll;
  }
}
</style>
