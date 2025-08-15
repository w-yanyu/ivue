<template>
  <div>
    <div class="todo-top" v-if="show">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请书编号:" prop="instr_id" class="upload-item">
              <el-input v-model="Applys.appl_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品类型:" prop="prodcd" class="upload-item">
              <el-input v-model="Applys.prodcd" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人:" prop="start_usr" class="upload-item">
              <el-input v-model="Applys.start_usr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请状态:" prop="atpy_status" class="upload-item">
              <el-input v-model="Applys.atpy_status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请类型:" prop="instr_id" class="upload-item">
              <el-input v-model="Applys.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期:" prop="val_dt" class="upload-item">
              <el-date-picker v-model="Applys.val_dt" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户经理:" prop="handle_user" class="upload-item">
              <el-input v-model="Applys.handle_user" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请机构:" prop="start_org" class="upload-item">
              <el-input v-model="Applys.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前处理机构:" prop="start_org" class="upload-item">
              <el-input v-model="Applys.start_org" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <pte-resolver :c-parent-meta="c_$meta" :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "DHWaitToWithDeal",
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
        custna: "",
        corpsize: "",
        evaldt: "",
        reptdt: "",
        temp_id: "",
        indcredit: "",
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        applid: "",
        procinstid: "",
        custid: "",
        custna: "",
        tpltid: ""
      },
      params: "",
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "first",
      tabList: [
        {
          idField: "first",
          title: "查看",
          toRequest: {
            url: "/views/dh/atpy/query/account_detail.json",
            method: "get",
            params: {
              "instr_id": this.cParentParams.instr_id
            },
          },
        },
        {
          idField: "tag5",
          title: "审批记录",
          toRequest: {
            url: "/views/dh/atpy/query/approval_record.json",
            method: "get",
          },
        },
      ], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.Applys.instr_id = this.cParentParams.instr_id;
    this.Applys.prodcd = this.cParentParams.prodcd;
    this.Applys.start_usr = this.cParentParams.start_usr;
    this.Applys.atpy_status = this.cParentParams.atpy_status;
    this.Applys.val_dt = this.cParentParams.val_dt;
    this.Applys.handle_user = this.cParentParams.handle_user;
    this.Applys.start_org = this.cParentParams.start_org;

    this.c_$params.instr_id = this.cParentParams.instr_id;
    this.c_$params.applid = this.cParentParams.applid; // appid参数传递
    this.c_$params.custid = this.cParentParams.custid; // appid参数传递
    this.c_$params.procinstid = this.cParentParams.procinstid; // appid参数传递     res.data.applys.procinstid
    this.c_$params.custna = this.cParentParams.custna;

    this.show = true;
  },
  methods: {
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    }
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
  text-align: center;
  margin-bottom: 20px;
}
</style>
