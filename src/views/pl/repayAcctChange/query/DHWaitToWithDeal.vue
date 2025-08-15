<template>
  <div>
    <div class="todo-top" v-if="show">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请书编号" prop="change_num" class="upload-item">
              <el-input v-model="Applys.change_num" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品类型" prop="prod_no" class="upload-item">
              <el-input v-model="Applys.prod_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('申请人')" prop="start_oprtr" class="upload-item">
              <el-input v-model="Applys.start_oprtr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请状态" prop="change_ste" class="upload-item" :formatter="setStatus">
              <el-select
                v-model="Applys.change_ste"
                placeholder=""
                :disabled="true"
              >
                <el-option
                  v-for="(item, i) in applstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请类型" prop="adp_status" class="upload-item" >
              <el-select
                v-model="Applys.adp_status"
                placeholder=""
                :disabled="true"
              >
                <el-option
                  v-for="(item, i) in applstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" prop="deal_dt" class="upload-item">
              <el-input v-model="Applys.deal_dt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta" :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "ZDHWaitToWithDeal",
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
        cust_name: "",
        corpsize: "",
        evaldt: "",
        reptdt: "",
        temp_id: "",
        indcredit: "",
        start_oprtr:"xadmin"
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        apply_no: "",
        flow_no: "",
        cust_no: "",
        cust_name: "",
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
            url: "/views/pl/repayAcctChange/query/account_detail.json",
            method: "get",
            params: {
             
            },
          },
        },
        {
          idField: "tag5",
          title: "审批记录",
          toRequest: {
            url: "/views/pl/repayAcctChange/query/approval_record.json",
            method: "get",
            params: {
              "apply_no": this.cParentParams.apply_no,
              "proc_inst_id": this.cParentParams.proc_inst_id
            },
          },
        }


      ], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
      applstList: [], // 申请状态数据字典列表
    };
  },
  created() {
    this.Applys.change_num = this.cParentParams.change_num;
    this.Applys.prod_no = this.cParentParams.prod_no;
    this.Applys.start_oprtr = this.cParentParams.start_oprtr;
    this.Applys.change_ste = "已处理";
    this.Applys.adp_status = "还款账户变更";
    this.Applys.deal_dt = this.cParentParams.deal_dt;
    this.Applys.cur_agnt = this.cParentParams.cur_agnt;
    this.Applys.actvn_org = this.cParentParams.actvn_org;
    this.Applys.start_oprtr = this.cParentParams.start_oprtr;

    this.c_$params.change_num = this.cParentParams.change_num;
    this.c_$params.apply_no = this.cParentParams.apply_no; // appid参数传递
    this.c_$params.cust_no = this.cParentParams.cust_no; // appid参数传递
    this.c_$params.flow_no = this.cParentParams.flow_no; // appid参数传递     res.data.applys.procinstid


    this.show = true;
    this.getDictList("PL_E_ALTER_STATUS", "applstList"); // 获取申请状态数据字典

  },
 
  getDictList(dictType, listKey) {
    let params = {
      dictType: dictType,
      dictKey: [dictType],
    };
    MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },  
  methods: {
    setStatus(row, column) {
    return this.getSatus(已处理);
    },
    getSatus(change_ste) {
      switch (change_ste) {
        case "3":
          return "已处理";
        default:
          return "";
      }
    },
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
